/**
 * Quiz Service
 *
 * Business logic for AI Coach Quiz.
 * Handles quiz submission, AI analysis, and sport recommendations.
 */

import { db } from "@/lib/db";
import { children, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { quizRepository } from "./quiz.repository";
import { quizAnalyzer } from "./quiz.analyzer";
import type { QuizResult, CreateQuizInput } from "./quiz.types";
import type { AnalysisResult } from "./quiz.analyzer";

/**
 * Submit quiz and get AI recommendations
 *
 * Orchestrates the complete quiz submission flow:
 * 1. Save quiz answers to database
 * 2. Generate AI recommendations (with fallback)
 * 3. Save recommendations to database
 * 4. Return complete quiz result
 *
 * @param input - Quiz submission with child ID and answers
 * @returns Complete quiz result with recommendations
 * @throws Error if submission fails or database operations fail
 */
export async function submitQuiz(input: CreateQuizInput): Promise<QuizResult> {
  try {
    // Step 1: Save quiz submission
    const submission = await quizRepository.create(input);

    // Step 2: Analyze with AI (includes fallback mechanism)
    const analysisResult: AnalysisResult = await quizAnalyzer.analyze(submission);

    // Validate recommendations were generated
    if (!analysisResult.sportRecommendations || analysisResult.sportRecommendations.length === 0) {
      throw new Error("Nu s-au putut genera recomandări. Te rugăm să încerci din nou.");
    }

    // Step 3: Save results (including specialist recommendation if present)
    const result = await quizRepository.saveResults(
      submission.id,
      analysisResult.sportRecommendations,
      analysisResult.specialistRecommendation
    );

    return result;
  } catch (error) {
    // Enhanced error handling with Romanian messages
    if (error instanceof Error) {
      // Re-throw with original message if it's already in Romanian
      if (error.message.includes("Eroare") || error.message.includes("Nu")) {
        throw error;
      }
      // Otherwise, wrap with generic Romanian message
      throw new Error(
        `Eroare la procesarea chestionarului: ${error.message}. Te rugăm să încerci din nou.`
      );
    }

    // Unknown error type
    throw new Error(
      "Eroare neașteptată la procesarea chestionarului. Te rugăm să încerci din nou."
    );
  }
}

/**
 * Get quiz result by ID
 *
 * Retrieves a complete quiz result with recommendations.
 * Public access - no authentication required (results are shareable via link).
 *
 * @param quizId - UUID of the quiz result
 * @returns Quiz result or null if not found
 */
export async function getQuizResult(quizId: string): Promise<QuizResult | null> {
  return quizRepository.findResultById(quizId);
}

/**
 * Get quiz history for a child
 *
 * Retrieves all completed quizzes for a specific child, ordered by most recent first.
 * Only returns quizzes that have completed AI processing.
 *
 * @param childId - UUID of the child profile
 * @returns Array of quiz results (most recent first)
 */
export async function getQuizHistory(childId: string): Promise<QuizResult[]> {
  return quizRepository.findByChildId(childId);
}

/**
 * Minimal child info for creating temporary child before quiz
 */
export interface TempChildInput {
  age: number;
  gender?: "male" | "female" | "other";
  childName?: string;
}

/**
 * Create temporary child for quiz (unauthenticated users)
 *
 * Creates a temporary child record for quiz submission when user is not authenticated
 * or when using a placeholder child ID. Uses minimal child info.
 *
 * @param childInfo - Minimal child information (age, optional gender and name)
 * @param parentId - Optional parent ID (null for anonymous users)
 * @returns Child ID for quiz submission
 */
export async function createTemporaryChildForQuiz(
  childInfo: TempChildInput,
  parentId: string | null
): Promise<string> {
  // Calculate date of birth from age (approximate - use January 1st of birth year)
  const currentYear = new Date().getFullYear();
  const birthYear = currentYear - childInfo.age;
  const dateOfBirth = new Date(birthYear, 0, 1); // January 1st

  let actualParentId: string;

  if (parentId) {
    // Use provided parent ID
    actualParentId = parentId;
  } else {
    // Create or get anonymous system user
    const anonymousEmail = "anonymous@yuvoo.local";
    const existingAnonymousUser = await db
      .select()
      .from(users)
      .where(eq(users.email, anonymousEmail))
      .limit(1);

    if (existingAnonymousUser.length > 0) {
      actualParentId = existingAnonymousUser[0].id;
    } else {
      // Create anonymous system user
      const [newUser] = await db
        .insert(users)
        .values({
          id: crypto.randomUUID(),
          email: anonymousEmail,
          role: "parent",
          stackUserId: `anonymous-${crypto.randomUUID()}`, // Placeholder Stack user ID
        })
        .returning();
      actualParentId = newUser.id;
    }
  }

  // Create temporary child
  const childId = crypto.randomUUID();
  await db.insert(children).values({
    id: childId,
    parentId: actualParentId,
    firstName: childInfo.childName || "Copil", // Use provided name or generic
    lastName: "Temporar",
    dateOfBirth,
    gender: childInfo.gender || "other",
  });

  return childId;
}
