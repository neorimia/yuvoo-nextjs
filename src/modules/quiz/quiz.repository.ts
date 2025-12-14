/**
 * Quiz Repository
 *
 * Data access layer for quiz submissions and results.
 * Handles database queries for quiz data using Drizzle ORM.
 */

import { db } from "@/lib/db";
import { quizzes } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import type {
  QuizSubmission,
  QuizResult,
  CreateQuizInput,
  SportRecommendation,
  QuizAnswers,
} from "./quiz.types";

/**
 * Create quiz submission
 *
 * Saves quiz answers to database. Recommendations are saved separately after AI processing.
 *
 * @param input - Quiz submission with child ID and answers
 * @returns Quiz submission with generated ID and submission timestamp
 */
export async function create(input: CreateQuizInput): Promise<QuizSubmission> {
  const quizId = uuidv4();

  await db.insert(quizzes).values({
    id: quizId,
    childId: input.childId,
    answers: input.answers as unknown as Record<string, unknown>, // JSONB type
    recommendations: null, // Will be updated after AI processing
  });

  return {
    id: quizId,
    childId: input.childId,
    answers: input.answers,
    submittedAt: new Date(),
  };
}

/**
 * Save quiz results
 *
 * Updates quiz record with AI-generated recommendations.
 *
 * @param quizId - UUID of the quiz submission
 * @param recommendations - Array of AI-generated sport recommendations
 * @returns Complete quiz result with recommendations
 * @throws Error if quiz not found after update
 */
export async function saveResults(
  quizId: string,
  recommendations: SportRecommendation[]
): Promise<QuizResult> {
  await db
    .update(quizzes)
    .set({
      recommendations: recommendations as unknown as Record<string, unknown>[], // JSONB type
    })
    .where(eq(quizzes.id, quizId));

  const quiz = await db.query.quizzes.findFirst({
    where: eq(quizzes.id, quizId),
  });

  if (!quiz) {
    throw new Error(`Quiz with ID ${quizId} not found after saving results`);
  }

  return {
    id: quiz.id,
    childId: quiz.childId,
    recommendations: quiz.recommendations as unknown as SportRecommendation[],
    createdAt: quiz.createdAt,
  };
}

/**
 * Find quiz result by ID
 *
 * Retrieves complete quiz with answers and recommendations.
 * Only returns quizzes that have completed AI processing (have recommendations).
 *
 * @param quizId - UUID of the quiz result
 * @returns Quiz result or null if not found or incomplete
 */
export async function findResultById(quizId: string): Promise<QuizResult | null> {
  const quiz = await db.query.quizzes.findFirst({
    where: eq(quizzes.id, quizId),
  });

  if (!quiz) {
    return null;
  }

  // Only return if recommendations exist
  if (!quiz.recommendations) {
    return null;
  }

  return {
    id: quiz.id,
    childId: quiz.childId,
    recommendations: quiz.recommendations as unknown as SportRecommendation[],
    createdAt: quiz.createdAt,
  };
}

/**
 * Find all quizzes by child ID
 *
 * Returns quiz history for a specific child, ordered by most recent first.
 * Filters out incomplete quizzes (without recommendations).
 *
 * @param childId - UUID of the child profile
 * @returns Array of completed quiz results
 */
export async function findByChildId(childId: string): Promise<QuizResult[]> {
  const childQuizzes = await db.query.quizzes.findMany({
    where: eq(quizzes.childId, childId),
    orderBy: [desc(quizzes.createdAt)],
  });

  // Filter out quizzes without recommendations (incomplete)
  return childQuizzes
    .filter((quiz) => quiz.recommendations !== null)
    .map((quiz) => ({
      id: quiz.id,
      childId: quiz.childId,
      recommendations: quiz.recommendations as unknown as SportRecommendation[],
      createdAt: quiz.createdAt,
    }));
}

/**
 * Get quiz answers by ID
 *
 * Retrieves quiz answers without recommendations (used for AI processing).
 *
 * @param quizId - UUID of the quiz submission
 * @returns Quiz answers or null if not found
 */
export async function getQuizAnswers(quizId: string): Promise<QuizAnswers | null> {
  const quiz = await db.query.quizzes.findFirst({
    where: eq(quizzes.id, quizId),
  });

  if (!quiz) {
    return null;
  }

  return quiz.answers as unknown as QuizAnswers;
}

export const quizRepository = {
  create,
  saveResults,
  findResultById,
  findByChildId,
};
