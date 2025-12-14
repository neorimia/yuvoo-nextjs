/**
 * Quiz Service
 *
 * Business logic for AI Coach Quiz.
 * Handles quiz submission, AI analysis, and sport recommendations.
 */

import { quizRepository } from "./quiz.repository";
import { quizAnalyzer } from "./quiz.analyzer";
import type { QuizResult, CreateQuizInput } from "./quiz.types";

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
    const recommendations = await quizAnalyzer.analyze(submission);

    // Validate recommendations were generated
    if (!recommendations || recommendations.length === 0) {
      throw new Error("Nu s-au putut genera recomandări. Te rugăm să încerci din nou.");
    }

    // Step 3: Save results
    const result = await quizRepository.saveResults(submission.id, recommendations);

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
