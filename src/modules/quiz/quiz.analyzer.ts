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
import { shouldExcludeSport } from "./sport-exclusion.service";
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

    // Step 2.5: Filter out excluded sports based on medical contraindications
    const filteredRecommendations = aiResult.sportRecommendations.filter((rec) => {
      const exclusion = shouldExcludeSport(rec.sportId, submission.answers, riskDetection.signals);

      if (exclusion.exclude && !exclusion.allowedWithModifications) {
        // Sport is excluded - log for monitoring
        console.log(`Excluded sport ${rec.sportId}: ${exclusion.reason}`);
        return false;
      }

      // If allowed with modifications, add warning to considerations
      if (exclusion.exclude && exclusion.allowedWithModifications) {
        rec.considerations.push(
          `⚠️ ${exclusion.reason} Consultare medicală recomandată înainte de începere.`
        );
      }

      return true;
    });

    // Step 3: Ensure at least 1 recommendation (use fallback if all excluded)
    let finalRecommendations: SportRecommendation[];
    if (filteredRecommendations.length === 0) {
      console.warn("All sports excluded, using fallback recommendations");
      // Use fallback but still apply exclusions
      const fallbackRecommendations = generateFallbackRecommendations(submission.answers);
      finalRecommendations = fallbackRecommendations.filter((rec) => {
        const exclusion = shouldExcludeSport(
          rec.sportId,
          submission.answers,
          riskDetection.signals
        );
        if (exclusion.exclude && !exclusion.allowedWithModifications) {
          return false;
        }
        if (exclusion.exclude && exclusion.allowedWithModifications) {
          rec.considerations.push(
            `⚠️ ${exclusion.reason} Consultare medicală recomandată înainte de începere.`
          );
        }
        return true;
      });

      // If even fallback is empty, return low-impact sports only
      if (finalRecommendations.length === 0) {
        console.warn("Even fallback excluded, returning low-impact sports only");
        finalRecommendations = [
          {
            sportId: "inot",
            sportName: "Înot",
            matchScore: 70,
            reasoning:
              "Înotul este un sport de impact redus care poate fi potrivit după evaluare medicală. Vă recomandăm consultarea unui specialist înainte de începere.",
            benefits: [
              "Dezvoltă coordonarea și rezistența",
              "Impact redus asupra articulațiilor",
              "Activitate sigură pentru majoritatea condițiilor medicale",
            ],
            considerations: [
              "⚠️ Consultare medicală necesară înainte de începere",
              "Echipament minim necesar",
              "Disponibil în multe locații din România",
            ],
          },
        ];
      }
    } else {
      finalRecommendations = filteredRecommendations;
    }

    // Step 4: Merge specialist recommendations (programmatic takes precedence if both exist)
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
      sportRecommendations: finalRecommendations,
      specialistRecommendation: finalSpecialistRecommendation,
    };
  } catch (error) {
    // Log error for monitoring
    console.error("AI recommendation generation failed, using fallback:", error);

    // Fallback to generic recommendations based on age
    const fallbackRecommendations = generateFallbackRecommendations(submission.answers);

    // Apply sport exclusions to fallback recommendations
    const filteredFallback = fallbackRecommendations.filter((rec) => {
      const exclusion = shouldExcludeSport(rec.sportId, submission.answers, riskDetection.signals);
      if (exclusion.exclude && !exclusion.allowedWithModifications) {
        return false;
      }
      if (exclusion.exclude && exclusion.allowedWithModifications) {
        rec.considerations.push(
          `⚠️ ${exclusion.reason} Consultare medicală recomandată înainte de începere.`
        );
      }
      return true;
    });

    // Still include programmatic specialist recommendation in fallback
    return {
      sportRecommendations:
        filteredFallback.length > 0 ? filteredFallback : fallbackRecommendations,
      specialistRecommendation: programmaticRecommendation,
    };
  }
}

export const quizAnalyzer = {
  analyze,
};
