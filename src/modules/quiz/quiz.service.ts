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
 */
export async function submitQuiz(input: CreateQuizInput): Promise<QuizResult> {
  // Save quiz submission
  const submission = await quizRepository.create(input);

  // Analyze with AI
  const recommendations = await quizAnalyzer.analyze(submission);

  // Save results
  const result = await quizRepository.saveResults(submission.id, recommendations);

  return result;
}

/**
 * Get quiz result by ID
 */
export async function getQuizResult(quizId: string): Promise<QuizResult | null> {
  return quizRepository.findResultById(quizId);
}

/**
 * Get quiz history for a child
 */
export async function getQuizHistory(childId: string): Promise<QuizResult[]> {
  return quizRepository.findByChildId(childId);
}
