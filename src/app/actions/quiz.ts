/**
 * Quiz Server Actions
 *
 * Server Actions for AI Coach Quiz submission and results.
 * All error messages are in Romanian as per project requirements.
 */

"use server";

import { revalidatePath } from "next/cache";
import { requireAuth } from "@/modules/auth/auth.service";
import { getChildById } from "@/modules/children/children.service";
import { submitQuiz, getQuizResult, getQuizHistory } from "@/modules/quiz/quiz.service";
import { createQuizInputSchema } from "@/lib/validations/quiz";
import type { QuizResult, CreateQuizInput } from "@/modules/quiz/quiz.types";

/**
 * Submit quiz and get AI recommendations
 *
 * Validates input, requires authentication, and orchestrates quiz submission.
 * Returns success/error response with Romanian error messages.
 *
 * @param input - Quiz submission with child ID and answers
 * @returns Success response with quiz result or error response
 */
export async function submitQuizAction(
  input: CreateQuizInput
): Promise<{ success: boolean; result?: QuizResult; error?: string }> {
  try {
    // Step 1: Authentication check
    await requireAuth();

    // Step 2: Validate input with Zod schema
    const validationResult = createQuizInputSchema.safeParse(input);

    if (!validationResult.success) {
      // Extract first validation error message (in Romanian)
      const firstError = validationResult.error.errors[0];
      return {
        success: false,
        error: firstError?.message || "Date invalide. Te rugăm să verifici răspunsurile.",
      };
    }

    // Step 3: Submit quiz (includes AI processing)
    const result = await submitQuiz(validationResult.data);

    // Step 4: Revalidate cache
    revalidatePath("/chestionar");
    revalidatePath(`/chestionar/rezultate/${result.id}`);

    return { success: true, result };
  } catch (error) {
    console.error("Error submitting quiz:", error);

    // Handle authentication errors
    if (error instanceof Error && error.message.includes("Unauthorized")) {
      return {
        success: false,
        error: "Trebuie să fii autentificat pentru a trimite chestionarul.",
      };
    }

    // Return error message (already in Romanian from service layer)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Eroare la trimiterea chestionarului",
    };
  }
}

/**
 * Get quiz result by ID
 *
 * Retrieves quiz results with recommendations.
 * Note: Quiz results are public (no authentication required for viewing),
 * but authentication is required for saving results to account.
 *
 * @param quizId - Quiz ID to retrieve
 * @returns Quiz result with recommendations or null if not found
 */
export async function getQuizResultAction(quizId: string): Promise<QuizResult | null> {
  try {
    // Validate quizId format (UUID)
    if (!quizId || typeof quizId !== "string" || quizId.length !== 36) {
      console.error("Invalid quiz ID format:", quizId);
      return null;
    }

    const result = await getQuizResult(quizId);

    // Note: Ownership verification can be added here if needed
    // For now, quiz results are public (shareable via link)

    return result;
  } catch (error) {
    console.error("Error getting quiz result:", error);
    return null;
  }
}

/**
 * Get quiz history for a child
 *
 * Retrieves all completed quizzes for a specific child.
 * Requires authentication and verifies child ownership.
 *
 * @param childId - Child ID to get quiz history for
 * @returns Array of quiz results (empty array if none found or error)
 */
export async function getQuizHistoryAction(childId: string): Promise<QuizResult[]> {
  try {
    // Step 1: Authentication check
    const user = await requireAuth();

    // Step 2: Validate childId format
    if (!childId || typeof childId !== "string" || childId.length !== 36) {
      console.error("Invalid child ID format:", childId);
      return [];
    }

    // Step 3: Verify child belongs to user
    const child = await getChildById(childId, user.id);
    if (!child) {
      console.error(`Child ${childId} not found or access denied for user ${user.id}`);
      return [];
    }

    // Step 4: Get quiz history
    return await getQuizHistory(childId);
  } catch (error) {
    console.error("Error getting quiz history:", error);

    // Handle authentication errors
    if (error instanceof Error && error.message.includes("Unauthorized")) {
      console.error("Unauthorized access to quiz history");
      return [];
    }

    return [];
  }
}

/**
 * Save quiz results (mark as saved/bookmarked)
 *
 * Note: Quiz results are already saved in the database when submitted.
 * This action confirms the save and can be used for future "favorites" functionality.
 */
export async function saveQuizResultsAction(
  quizId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Step 1: Authentication check
    await requireAuth();

    // Step 2: Validate quizId format
    if (!quizId || typeof quizId !== "string" || quizId.length !== 36) {
      return {
        success: false,
        error: "ID-ul chestionarului este invalid.",
      };
    }

    // Step 3: Verify quiz result exists
    const result = await getQuizResult(quizId);
    if (!result) {
      return {
        success: false,
        error: "Rezultatele chestionarului nu au fost găsite.",
      };
    }

    // Step 4: Verify child belongs to user (if childId exists)
    // Note: Quiz results are already saved, this is just confirmation
    // Future: Could add a "saved" flag or favorites table entry here

    // For now, just confirm the save (results are already persisted)
    // TODO: Add saved/bookmarked functionality if needed

    return { success: true };
  } catch (error) {
    console.error("Error saving quiz results:", error);

    if (error instanceof Error && error.message.includes("Unauthorized")) {
      return {
        success: false,
        error: "Trebuie să fii autentificat pentru a salva rezultatele.",
      };
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : "Eroare la salvarea rezultatelor.",
    };
  }
}
