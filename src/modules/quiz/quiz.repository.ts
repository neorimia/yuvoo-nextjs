/**
 * Quiz Repository
 *
 * Data access layer for quiz submissions and results.
 * Handles database queries for quiz data using Drizzle ORM.
 */

import { db } from "@/lib/db";
import { quizzes } from "@/lib/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import type {
  QuizSubmission,
  QuizResult,
  CreateQuizInput,
  SportRecommendation,
  SpecialistRecommendation,
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
  const quizId = crypto.randomUUID();

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
 * Quiz results structure stored in database
 */
interface StoredQuizResults {
  sportRecommendations: SportRecommendation[];
  specialistRecommendation?: SpecialistRecommendation;
}

/**
 * Save quiz results
 *
 * Updates quiz record with AI-generated recommendations (sport and specialist).
 *
 * @param quizId - UUID of the quiz submission
 * @param sportRecommendations - Array of AI-generated sport recommendations
 * @param specialistRecommendation - Optional specialist recommendation
 * @returns Complete quiz result with recommendations
 * @throws Error if quiz not found after update
 */
export async function saveResults(
  quizId: string,
  sportRecommendations: SportRecommendation[],
  specialistRecommendation?: SpecialistRecommendation
): Promise<QuizResult> {
  // Structure results for storage
  const results: StoredQuizResults = {
    sportRecommendations,
    ...(specialistRecommendation && { specialistRecommendation }),
  };

  await db
    .update(quizzes)
    .set({
      recommendations: results as unknown as Record<string, unknown>, // JSONB type
    })
    .where(eq(quizzes.id, quizId));

  const quiz = await db.query.quizzes.findFirst({
    where: eq(quizzes.id, quizId),
  });

  if (!quiz) {
    throw new Error(`Quiz with ID ${quizId} not found after saving results`);
  }

  // Parse stored results
  const storedResults = quiz.recommendations as unknown as StoredQuizResults;

  return {
    id: quiz.id,
    childId: quiz.childId,
    recommendations: storedResults.sportRecommendations || [],
    specialistRecommendation: storedResults.specialistRecommendation,
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

  // Parse stored results
  const storedResults = quiz.recommendations as unknown as StoredQuizResults;

  return {
    id: quiz.id,
    childId: quiz.childId,
    recommendations: storedResults.sportRecommendations || [],
    specialistRecommendation: storedResults.specialistRecommendation,
    location: quiz.location || null,
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
    .map((quiz) => {
      const storedResults = quiz.recommendations as unknown as StoredQuizResults;
      return {
        id: quiz.id,
        childId: quiz.childId,
        recommendations: storedResults.sportRecommendations || [],
        specialistRecommendation: storedResults.specialistRecommendation,
        location: quiz.location || null,
        createdAt: quiz.createdAt,
      };
    });
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

/**
 * Get quiz email (email gate)
 */
export async function getQuizEmail(quizId: string): Promise<string | null> {
  const quiz = await db.query.quizzes.findFirst({
    where: eq(quizzes.id, quizId),
    columns: { email: true },
  });
  return quiz?.email?.trim() || null;
}

/**
 * Update quiz email
 *
 * Updates the email field in the quiz record.
 *
 * @param quizId - UUID of the quiz
 * @param email - Email address to store
 */
export async function updateQuizEmail(quizId: string, email: string): Promise<void> {
  await db
    .update(quizzes)
    .set({
      email: email.trim(),
    })
    .where(eq(quizzes.id, quizId));
}

/**
 * Update quiz location
 *
 * Updates the location field in the quiz record.
 *
 * @param quizId - UUID of the quiz
 * @param location - City/location to store
 */
export async function updateQuizLocation(quizId: string, location: string): Promise<void> {
  await db
    .update(quizzes)
    .set({
      location: location.trim(),
    })
    .where(eq(quizzes.id, quizId));
}

/**
 * Get total quiz count
 *
 * Returns the total number of quiz submissions in the database.
 * Used for social proof messaging.
 *
 * @returns Total number of quizzes
 */
export async function getQuizCount(): Promise<number> {
  const result = await db.select({ count: sql<number>`count(*)` }).from(quizzes);

  return Number(result[0]?.count ?? 0);
}

export const quizRepository = {
  create,
  saveResults,
  findResultById,
  findByChildId,
  getQuizAnswers,
  updateQuizEmail,
  updateQuizLocation,
  getQuizEmail,
  getQuizCount,
};
