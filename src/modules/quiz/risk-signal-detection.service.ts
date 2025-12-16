/**
 * Risk Signal Detection Service
 *
 * Programmatically detects risk signals from quiz answers that may indicate
 * the need for specialist consultation. Provides structured risk analysis
 * independent of AI recommendations for validation and tracking.
 */

import type { QuizAnswers } from "./quiz.types";
import type { SpecialistRecommendation } from "./quiz.types";

/**
 * Risk signal severity levels
 */
export type RiskSeverity = "high" | "medium" | "low";

/**
 * Detected risk signal with context
 */
export interface RiskSignal {
  specialty: SpecialistRecommendation["specialty"];
  severity: RiskSeverity;
  reason: string; // Romanian explanation
  indicators: string[]; // Specific indicators that triggered this signal
}

/**
 * Risk detection result
 */
export interface RiskDetectionResult {
  signals: RiskSignal[];
  hasHighRisk: boolean;
  hasMediumRisk: boolean;
  hasLowRisk: boolean;
  recommendedSpecialist?: SpecialistRecommendation["specialty"];
}

/**
 * Detect risk signals from quiz answers
 *
 * Analyzes quiz answers programmatically to identify potential health,
 * developmental, or behavioral concerns that may require specialist consultation.
 *
 * @param answers - Complete quiz answers
 * @returns Risk detection result with identified signals
 */
export function detectRiskSignals(answers: QuizAnswers): RiskDetectionResult {
  const signals: RiskSignal[] = [];

  // 1. Orthopedist Risk Signals
  const orthopedistSignals = detectOrthopedistRisks(answers);
  signals.push(...orthopedistSignals);

  // 2. Nutritionist Risk Signals
  const nutritionistSignals = detectNutritionistRisks(answers);
  signals.push(...nutritionistSignals);

  // 3. Psychologist Risk Signals
  const psychologistSignals = detectPsychologistRisks(answers);
  signals.push(...psychologistSignals);

  // 4. General Pediatrician Risk Signals
  const generalSignals = detectGeneralPediatricianRisks(answers);
  signals.push(...generalSignals);

  // Determine overall risk levels
  const hasHighRisk = signals.some((s) => s.severity === "high");
  const hasMediumRisk = signals.some((s) => s.severity === "medium");
  const hasLowRisk = signals.some((s) => s.severity === "low");

  // Recommend highest priority specialist
  const recommendedSpecialist = determineRecommendedSpecialist(signals);

  return {
    signals,
    hasHighRisk,
    hasMediumRisk,
    hasLowRisk,
    recommendedSpecialist,
  };
}

/**
 * Detect orthopedist-related risk signals
 */
function detectOrthopedistRisks(answers: QuizAnswers): RiskSignal[] {
  const signals: RiskSignal[] = [];
  const indicators: string[] = [];

  // Check coordination level
  if (answers.coordinationLevel === "challenges") {
    indicators.push("Nivel de coordonare: Provocări");
    signals.push({
      specialty: "orthopedist",
      severity: "high",
      reason:
        "Nivelul scăzut de coordonare poate indica probleme de dezvoltare motorie care necesită evaluare ortopedică.",
      indicators: [...indicators],
    });
  } else if (answers.coordinationLevel === "developing") {
    indicators.push("Nivel de coordonare: În dezvoltare");
    signals.push({
      specialty: "orthopedist",
      severity: "medium",
      reason:
        "Coordonarea în dezvoltare poate beneficia de evaluare pentru a identifica sporturi potrivite.",
      indicators: [...indicators],
    });
  }

  // Check physical considerations
  if (answers.physicalConsiderations) {
    const considerations = answers.physicalConsiderations.toLowerCase();
    const orthopedicKeywords = [
      "dureri",
      "durere",
      "articulație",
      "articulații",
      "postură",
      "postura",
      "echilibru",
      "mobilitate",
      "accidentare",
      "accidentări",
      "fractură",
      "fracturi",
      "luxație",
      "luxații",
    ];

    if (orthopedicKeywords.some((keyword) => considerations.includes(keyword))) {
      indicators.push("Considerații fizice menționate");
      signals.push({
        specialty: "orthopedist",
        severity: "high",
        reason:
          "Mențiunile despre probleme fizice necesită evaluare ortopedică înainte de începerea unui sport.",
        indicators: [...indicators],
      });
    }
  }

  // Check health conditions
  if (answers.healthConditions && answers.healthConditions.length > 0) {
    const orthopedicConditions = answers.healthConditions.filter((condition) => {
      const lower = condition.toLowerCase();
      return (
        lower.includes("ortoped") ||
        lower.includes("articula") ||
        lower.includes("os") ||
        lower.includes("coloană") ||
        lower.includes("spate")
      );
    });

    if (orthopedicConditions.length > 0) {
      indicators.push(`Condiții de sănătate: ${orthopedicConditions.join(", ")}`);
      signals.push({
        specialty: "orthopedist",
        severity: "high",
        reason: "Condițiile de sănătate menționate necesită evaluare ortopedică specializată.",
        indicators: [...indicators],
      });
    }
  }

  return signals;
}

/**
 * Detect nutritionist-related risk signals
 */
function detectNutritionistRisks(answers: QuizAnswers): RiskSignal[] {
  const signals: RiskSignal[] = [];
  const indicators: string[] = [];

  // Check physical build extremes
  if (answers.physicalBuild === "slim") {
    // Could indicate underweight concerns
    indicators.push("Constituție fizică: Subțire");
  }

  // Check health conditions related to nutrition
  if (answers.healthConditions && answers.healthConditions.length > 0) {
    const nutritionConditions = answers.healthConditions.filter((condition) => {
      const lower = condition.toLowerCase();
      return (
        lower.includes("greutate") ||
        lower.includes("obez") ||
        lower.includes("subponderal") ||
        lower.includes("supraponderal") ||
        lower.includes("alimentație") ||
        lower.includes("dietă") ||
        lower.includes("intoleranță") ||
        lower.includes("alergie alimentară")
      );
    });

    if (nutritionConditions.length > 0) {
      indicators.push(`Condiții de sănătate: ${nutritionConditions.join(", ")}`);
      signals.push({
        specialty: "nutritionist",
        severity: "high",
        reason:
          "Condițiile de sănătate legate de nutriție necesită consultare cu un nutriționist pediatric.",
        indicators: [...indicators],
      });
    }
  }

  // Check physical considerations for nutrition-related keywords
  if (answers.physicalConsiderations) {
    const considerations = answers.physicalConsiderations.toLowerCase();
    const nutritionKeywords = [
      "greutate",
      "obez",
      "subponderal",
      "supraponderal",
      "alimentație",
      "dietă",
      "nutriție",
    ];

    if (nutritionKeywords.some((keyword) => considerations.includes(keyword))) {
      indicators.push("Considerații fizice legate de nutriție");
      signals.push({
        specialty: "nutritionist",
        severity: "medium",
        reason:
          "Considerațiile legate de greutate sau nutriție ar putea beneficia de consultare specializată.",
        indicators: [...indicators],
      });
    }
  }

  return signals;
}

/**
 * Detect psychologist-related risk signals
 */
function detectPsychologistRisks(answers: QuizAnswers): RiskSignal[] {
  const signals: RiskSignal[] = [];
  const indicators: string[] = [];

  // Check personality traits for social/emotional concerns
  const concerningTraits = answers.personality.filter((trait) => {
    const lower = trait.toLowerCase();
    return (
      lower.includes("anxios") ||
      lower.includes("temător") ||
      lower.includes("izolat") ||
      lower.includes("rezervat") ||
      lower.includes("frică") ||
      lower.includes("frică")
    );
  });

  if (concerningTraits.length > 0) {
    indicators.push(`Trăsături de personalitate: ${concerningTraits.join(", ")}`);
    signals.push({
      specialty: "psychologist",
      severity: "medium",
      reason:
        "Trăsăturile de personalitate menționate pot indica nevoia de suport psihologic pentru dezvoltarea încrederii și participării la sport.",
      indicators: [...indicators],
    });
  }

  // Check why stopped previous sports
  if (answers.whyStoppedSports && answers.whyStoppedSports.length > 0) {
    const psychologicalReasons = answers.whyStoppedSports.filter((reason) => {
      const lower = reason.toLowerCase();
      return (
        lower.includes("frică") ||
        lower.includes("anxietate") ||
        lower.includes("neplăcut") ||
        lower.includes("izolat") ||
        lower.includes("bullying") ||
        lower.includes("motivație") ||
        lower.includes("încredere")
      );
    });

    if (psychologicalReasons.length > 0) {
      indicators.push(`Motiv oprire sporturi: ${psychologicalReasons.join(", ")}`);
      signals.push({
        specialty: "psychologist",
        severity: "high",
        reason:
          "Motivele pentru oprirea sporturilor anterioare indică nevoia de suport psihologic pentru a depăși barierele emoționale.",
        indicators: [...indicators],
      });
    }
  }

  // Check health conditions for psychological concerns
  if (answers.healthConditions && answers.healthConditions.length > 0) {
    const psychologicalConditions = answers.healthConditions.filter((condition) => {
      const lower = condition.toLowerCase();
      return (
        lower.includes("anxietate") ||
        lower.includes("depresie") ||
        lower.includes("ADHD") ||
        lower.includes("autism") ||
        lower.includes("psiholog")
      );
    });

    if (psychologicalConditions.length > 0) {
      indicators.push(`Condiții de sănătate: ${psychologicalConditions.join(", ")}`);
      signals.push({
        specialty: "psychologist",
        severity: "high",
        reason:
          "Condițiile de sănătate menționate necesită suport psihologic specializat pentru participarea la sport.",
        indicators: [...indicators],
      });
    }
  }

  return signals;
}

/**
 * Detect general pediatrician risk signals
 */
function detectGeneralPediatricianRisks(answers: QuizAnswers): RiskSignal[] {
  const signals: RiskSignal[] = [];
  const indicators: string[] = [];

  // Check for very low energy level
  if (answers.energyLevel === "low") {
    indicators.push("Nivel de energie: Scăzut");
    signals.push({
      specialty: "general",
      severity: "medium",
      reason:
        "Nivelul scăzut de energie poate indica probleme de sănătate generale care necesită evaluare medicală.",
      indicators: [...indicators],
    });
  }

  // Check for multiple health conditions
  if (answers.healthConditions && answers.healthConditions.length >= 2) {
    indicators.push(`Multiple condiții de sănătate: ${answers.healthConditions.length}`);
    signals.push({
      specialty: "general",
      severity: "high",
      reason:
        "Prezența mai multor condiții de sănătate necesită evaluare medicală generală înainte de începerea unui sport nou.",
      indicators: [...indicators],
    });
  }

  // Check for any health conditions without specific specialist match
  if (answers.healthConditions && answers.healthConditions.length > 0) {
    const hasSpecificSpecialist = signals.some(
      (s) =>
        s.specialty !== "general" && s.indicators.some((i) => i.includes("Condiții de sănătate"))
    );

    if (!hasSpecificSpecialist) {
      indicators.push(`Condiții de sănătate: ${answers.healthConditions.join(", ")}`);
      signals.push({
        specialty: "general",
        severity: "medium",
        reason:
          "Condițiile de sănătate menționate necesită evaluare medicală generală pentru a determina sporturile potrivite.",
        indicators: [...indicators],
      });
    }
  }

  // Check for very young age with concerns
  if (answers.age < 6 && (answers.healthConditions?.length || answers.physicalConsiderations)) {
    indicators.push("Vârstă tânără cu considerații de sănătate");
    signals.push({
      specialty: "general",
      severity: "low",
      reason:
        "Pentru copiii mici cu considerații de sănătate, este recomandată o verificare medicală generală înainte de începerea unui sport.",
      indicators: [...indicators],
    });
  }

  return signals;
}

/**
 * Determine recommended specialist based on risk signals
 *
 * Prioritizes specialists by severity and specialty type.
 */
function determineRecommendedSpecialist(
  signals: RiskSignal[]
): SpecialistRecommendation["specialty"] | undefined {
  if (signals.length === 0) {
    return undefined;
  }

  // Sort by severity (high > medium > low)
  const severityOrder: Record<RiskSeverity, number> = {
    high: 3,
    medium: 2,
    low: 1,
  };

  const sortedSignals = [...signals].sort(
    (a, b) => severityOrder[b.severity] - severityOrder[a.severity]
  );

  // Priority order: orthopedist > psychologist > nutritionist > general
  const specialtyPriority: Record<SpecialistRecommendation["specialty"], number> = {
    orthopedist: 4,
    psychologist: 3,
    nutritionist: 2,
    general: 1,
  };

  // Find highest priority specialist among high/medium severity signals
  const highPrioritySignals = sortedSignals.filter(
    (s) => s.severity === "high" || s.severity === "medium"
  );

  if (highPrioritySignals.length > 0) {
    return highPrioritySignals.sort(
      (a, b) => specialtyPriority[b.specialty] - specialtyPriority[a.specialty]
    )[0].specialty;
  }

  // If no high/medium, return highest priority from low severity
  return sortedSignals.sort(
    (a, b) => specialtyPriority[b.specialty] - specialtyPriority[a.specialty]
  )[0].specialty;
}

/**
 * Convert risk detection result to specialist recommendation
 *
 * Transforms programmatic risk detection into a specialist recommendation
 * format compatible with the quiz system.
 */
export function riskSignalsToSpecialistRecommendation(
  result: RiskDetectionResult
): SpecialistRecommendation | undefined {
  if (!result.recommendedSpecialist || result.signals.length === 0) {
    return undefined;
  }

  // Find the primary signal for the recommended specialist
  const primarySignal = result.signals.find((s) => s.specialty === result.recommendedSpecialist);

  if (!primarySignal) {
    return undefined;
  }

  // Determine priority based on severity
  const priority: SpecialistRecommendation["priority"] =
    primarySignal.severity === "high"
      ? "high"
      : primarySignal.severity === "medium"
        ? "medium"
        : "low";

  return {
    specialty: result.recommendedSpecialist,
    needed: true,
    reason: primarySignal.reason,
    priority,
  };
}
