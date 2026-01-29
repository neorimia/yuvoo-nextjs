/**
 * Quiz Analyzer
 *
 * AI-powered analysis of quiz responses.
 * Uses OpenAI to generate sport recommendations based on child profile.
 * Includes fallback mechanism for reliability.
 * Integrates programmatic risk signal detection for validation.
 *
 * Security: Uses audit logger for medical decision tracking.
 * Performance: Includes timing instrumentation.
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
import { auditLogger, PerformanceTimer } from "./audit-logger.service";
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
 * Security: Uses sanitized audit logging for medical decision tracking.
 * Performance: Instrumented with performance timers.
 *
 * @param submission - Quiz submission with answers
 * @returns Analysis result with sport recommendations and optional specialist recommendation
 */
export async function analyze(submission: QuizSubmission): Promise<AnalysisResult> {
  const timer = new PerformanceTimer();
  const sessionContext = { quizId: submission.childId };

  auditLogger.quizAnalysisStart(sessionContext);

  // Step 1: Detect risk signals programmatically
  timer.mark("riskDetection");
  auditLogger.riskDetectionStart(sessionContext);

  const riskDetection = detectRiskSignals(submission.answers);
  const programmaticRecommendation = riskSignalsToSpecialistRecommendation(riskDetection);

  const riskDetectionTime = timer.sinceMark("riskDetection") ?? 0;
  auditLogger.riskDetectionComplete(
    riskDetection.signals.length,
    riskDetection.hasHighRisk,
    riskDetectionTime,
    sessionContext
  );

  // Log each detected risk signal (sanitized)
  for (const signal of riskDetection.signals) {
    auditLogger.riskSignalDetected(
      signal.specialty,
      signal.severity,
      signal.indicators.length,
      sessionContext
    );
  }

  let excludedCount = 0;

  try {
    // Step 2: Attempt AI-powered recommendations (with caching)
    timer.mark("aiGeneration");
    auditLogger.aiGenerationStart(sessionContext);

    const aiResult = await generateRecommendationsWithCache(submission.answers);

    const aiGenerationTime = timer.sinceMark("aiGeneration") ?? 0;
    auditLogger.aiGenerationComplete(
      aiResult.sportRecommendations.length,
      false, // Cache hit status would come from the cache service
      aiGenerationTime,
      sessionContext
    );

    // Step 2.5: Filter out excluded sports based on medical contraindications
    const filteredRecommendations = aiResult.sportRecommendations.filter((rec) => {
      const exclusion = shouldExcludeSport(rec.sportId, submission.answers, riskDetection.signals);

      if (exclusion.exclude && !exclusion.allowedWithModifications) {
        // Sport is excluded - audit log (sanitized, no medical details)
        auditLogger.sportExcluded(rec.sportId, exclusion.requiredSpecialist, sessionContext);
        excludedCount++;
        return false;
      }

      // If allowed with modifications, add warning to considerations
      if (exclusion.exclude && exclusion.allowedWithModifications) {
        auditLogger.sportAllowedWithModifications(
          rec.sportId,
          exclusion.requiredSpecialist,
          sessionContext
        );
        rec.considerations.push(
          `⚠️ ${exclusion.reason} Consultare medicală recomandată înainte de începere.`
        );
      }

      return true;
    });

    // Step 3: Ensure at least 1 recommendation (use fallback if all excluded)
    let finalRecommendations: SportRecommendation[];
    if (filteredRecommendations.length === 0) {
      auditLogger.fallbackActivated("all_sports_excluded", "age_based", sessionContext);

      // Use fallback but still apply exclusions
      const fallbackRecommendations = generateFallbackRecommendations(submission.answers);
      finalRecommendations = fallbackRecommendations.filter((rec) => {
        const exclusion = shouldExcludeSport(
          rec.sportId,
          submission.answers,
          riskDetection.signals
        );
        if (exclusion.exclude && !exclusion.allowedWithModifications) {
          excludedCount++;
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
        auditLogger.fallbackActivated("fallback_also_excluded", "low_impact_only", sessionContext);

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
      auditLogger.specialistRecommended(
        programmaticRecommendation.specialty,
        programmaticRecommendation.priority,
        sessionContext
      );
    } else if (aiResult.specialistRecommendation) {
      // Use AI recommendation if no programmatic signals detected
      finalSpecialistRecommendation = aiResult.specialistRecommendation;
      auditLogger.specialistRecommended(
        aiResult.specialistRecommendation.specialty,
        aiResult.specialistRecommendation.priority,
        sessionContext
      );
    }

    // Log analysis completion with performance
    auditLogger.quizAnalysisComplete(
      finalRecommendations.length,
      !!finalSpecialistRecommendation,
      excludedCount,
      timer.elapsed(),
      sessionContext
    );

    return {
      sportRecommendations: finalRecommendations,
      specialistRecommendation: finalSpecialistRecommendation,
    };
  } catch (error) {
    // Log error for monitoring (sanitized - no stack trace in production)
    const errorType = error instanceof Error ? error.constructor.name : "UnknownError";
    auditLogger.aiGenerationFailed(errorType, sessionContext);

    // Fallback to generic recommendations based on age
    auditLogger.fallbackActivated("ai_failure", "age_based", sessionContext);
    const fallbackRecommendations = generateFallbackRecommendations(submission.answers);

    // Apply sport exclusions to fallback recommendations
    const filteredFallback = fallbackRecommendations.filter((rec) => {
      const exclusion = shouldExcludeSport(rec.sportId, submission.answers, riskDetection.signals);
      if (exclusion.exclude && !exclusion.allowedWithModifications) {
        excludedCount++;
        return false;
      }
      if (exclusion.exclude && exclusion.allowedWithModifications) {
        rec.considerations.push(
          `⚠️ ${exclusion.reason} Consultare medicală recomandată înainte de începere.`
        );
      }
      return true;
    });

    // Log analysis completion even in error case
    auditLogger.quizAnalysisComplete(
      filteredFallback.length > 0 ? filteredFallback.length : fallbackRecommendations.length,
      !!programmaticRecommendation,
      excludedCount,
      timer.elapsed(),
      sessionContext
    );

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
