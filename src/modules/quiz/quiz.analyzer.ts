/**
 * Quiz Analyzer
 *
 * AI-powered analysis of quiz responses.
 * Uses OpenAI to generate sport recommendations based on child profile.
 * Includes fallback mechanism for reliability.
 */

import {
  generateRecommendationsWithCache,
  generateFallbackRecommendations,
} from "./ai-recommendations-cache.service";
import type { QuizSubmission, SportRecommendation } from "./quiz.types";

/**
 * Analyze quiz submission and generate recommendations
 *
 * Attempts to use AI for personalized recommendations.
 * Falls back to generic age-based recommendations if AI fails.
 *
 * @param submission - Quiz submission with answers
 * @returns Array of sport recommendations
 */
export async function analyze(submission: QuizSubmission): Promise<SportRecommendation[]> {
  try {
    // Attempt AI-powered recommendations (with caching)
    const recommendations = await generateRecommendationsWithCache(submission.answers);
    return recommendations;
  } catch (error) {
    // Log error for monitoring
    console.error("AI recommendation generation failed, using fallback:", error);

    // Fallback to generic recommendations based on age
    const fallbackRecommendations = generateFallbackRecommendations(submission.answers);
    return fallbackRecommendations;
  }
}

export const quizAnalyzer = {
  analyze,
};
