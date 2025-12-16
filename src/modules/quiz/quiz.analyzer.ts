/**
 * Quiz Analyzer
 *
 * AI-powered analysis of quiz responses.
 * Uses OpenAI to generate sport recommendations based on child profile.
 * Includes fallback mechanism for reliability.
 * Integrates programmatic risk signal detection for validation.
 */

import {
  generateRecommendationsWithCache,
  generateFallbackRecommendations,
} from "./ai-recommendations-cache.service";
import {
  detectRiskSignals,
  riskSignalsToSpecialistRecommendation,
} from "./risk-signal-detection.service";
import type { QuizSubmission, SportRecommendation, SpecialistRecommendation } from "./quiz.types";

/**
 * Analysis result containing both sport and specialist recommendations
 */
export interface AnalysisResult {
  sportRecommendations: SportRecommendation[];
  specialistRecommendation?: SpecialistRecommendation;
}

/**
 * Analyze quiz submission and generate recommendations
 *
 * Attempts to use AI for personalized recommendations.
 * Falls back to generic age-based recommendations if AI fails.
 * Integrates programmatic risk signal detection to validate/override AI specialist recommendations.
 *
 * @param submission - Quiz submission with answers
 * @returns Analysis result with sport recommendations and optional specialist recommendation
 */
export async function analyze(submission: QuizSubmission): Promise<AnalysisResult> {
  // Step 1: Detect risk signals programmatically
  const riskDetection = detectRiskSignals(submission.answers);
  const programmaticRecommendation = riskSignalsToSpecialistRecommendation(riskDetection);

  try {
    // Step 2: Attempt AI-powered recommendations (with caching)
    const aiResult = await generateRecommendationsWithCache(submission.answers);

    // Step 3: Merge specialist recommendations (programmatic takes precedence if both exist)
    let finalSpecialistRecommendation: SpecialistRecommendation | undefined;

    if (programmaticRecommendation) {
      // Programmatic detection takes precedence (more reliable for risk signals)
      finalSpecialistRecommendation = programmaticRecommendation;
      console.log(
        `Risk signal detected: ${programmaticRecommendation.specialty} (${programmaticRecommendation.priority})`
      );
    } else if (aiResult.specialistRecommendation) {
      // Use AI recommendation if no programmatic signals detected
      finalSpecialistRecommendation = aiResult.specialistRecommendation;
    }

    return {
      sportRecommendations: aiResult.sportRecommendations,
      specialistRecommendation: finalSpecialistRecommendation,
    };
  } catch (error) {
    // Log error for monitoring
    console.error("AI recommendation generation failed, using fallback:", error);

    // Fallback to generic recommendations based on age
    const fallbackRecommendations = generateFallbackRecommendations(submission.answers);

    // Still include programmatic specialist recommendation in fallback
    return {
      sportRecommendations: fallbackRecommendations,
      specialistRecommendation: programmaticRecommendation,
    };
  }
}

export const quizAnalyzer = {
  analyze,
};
