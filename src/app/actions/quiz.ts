/**
 * Quiz Server Actions
 *
 * Server Actions for AI Coach Quiz submission and results.
 */

"use server";

import { revalidatePath } from "next/cache";
import { requireAuth } from "@/modules/auth/auth.service";
import { submitQuiz, getQuizResult, getQuizHistory } from "@/modules/quiz/quiz.service";
import type { QuizResult, CreateQuizInput } from "@/modules/quiz/quiz.types";

/**
 * Submit quiz and get AI recommendations
 */
export async function submitQuizAction(
  input: CreateQuizInput
): Promise<{ success: boolean; result?: QuizResult; error?: string }> {
  try {
    const user = await requireAuth();

    // TODO: Validate input with Zod schema

    const result = await submitQuiz(input);

    revalidatePath("/chestionar");
    revalidatePath(`/chestionar/rezultate/${result.id}`);

    return { success: true, result };
  } catch (error) {
    console.error("Error submitting quiz:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Eroare la trimiterea chestionarului",
    };
  }
}

/**
 * Get quiz result by ID
 */
export async function getQuizResultAction(quizId: string): Promise<QuizResult | null> {
  try {
    const user = await requireAuth();

    const result = await getQuizResult(quizId);

    // Verify ownership (if needed)
    // TODO: Add ownership check if quiz results are user-specific

    return result;
  } catch (error) {
    console.error("Error getting quiz result:", error);
    return null;
  }
}

/**
 * Get quiz history for a child
 */
export async function getQuizHistoryAction(childId: string): Promise<QuizResult[]> {
  try {
    const user = await requireAuth();

    // TODO: Verify child belongs to user

    return await getQuizHistory(childId);
  } catch (error) {
    console.error("Error getting quiz history:", error);
    return [];
  }
}
