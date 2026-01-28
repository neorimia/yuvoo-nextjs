/**
 * Sport Exclusion Service
 *
 * Categorizes sports by risk level and excludes unsafe sports based on medical conditions.
 * Prevents recommendations of high-risk sports for children with contraindications.
 */

import type { QuizAnswers } from "./quiz.types";
import type { RiskSignal } from "./risk-signal-detection.service";

/**
 * Sport category definition
 */
export interface SportCategory {
  id: string;
  name: string;
  sports: string[];
}

/**
 * Sport categories by risk level
 */
const SPORT_CATEGORIES: SportCategory[] = [
  {
    id: "contact_sports",
    name: "Sporturi de contact",
    sports: [
      "fotbal",
      "handbal",
      "baschet",
      "arte-martiale",
      "judo",
      "karate",
      "taekwondo",
      "rugby",
    ],
  },
  {
    id: "high_impact",
    name: "Sporturi de impact ridicat",
    sports: [
      "gimnastica",
      "atletism",
      "volei",
      "dans",
      "balet",
      "skateboarding",
      "escalada",
      "alpinism",
    ],
  },
  {
    id: "low_impact",
    name: "Sporturi de impact redus",
    sports: ["inot", "ciclism", "polo"],
  },
  {
    id: "endurance",
    name: "Sporturi de rezistență",
    sports: ["atletism", "alergare", "ciclism"],
  },
  {
    id: "racquet_sports",
    name: "Sporturi cu rachetă",
    sports: ["tenis", "tenis-de-masa", "badminton"],
  },
  {
    id: "skill_based",
    name: "Sporturi bazate pe abilități",
    sports: ["golf", "sah", "tir-cu-arcul"],
  },
];

/**
 * Exclusion result for a sport
 */
export interface ExclusionResult {
  exclude: boolean;
  reason: string | null;
  allowedWithModifications?: boolean;
  requiredSpecialist?: "cardiologist" | "neurologist" | "orthopedist" | "pulmonologist";
}

/**
 * Get sport category ID for a given sport
 *
 * @param sportId - Sport ID (e.g., "fotbal", "inot")
 * @returns Category ID or "other" if not found
 */
function getSportCategory(sportId: string): string {
  for (const category of SPORT_CATEGORIES) {
    if (category.sports.includes(sportId)) {
      return category.id;
    }
  }
  return "other";
}

/**
 * Check if a sport belongs to any of the given categories
 *
 * @param sportId - Sport ID to check
 * @param categories - Array of category IDs to check against
 * @returns True if sport belongs to any of the categories
 */
function isInCategory(sportId: string, categories: string[]): boolean {
  const sportCategory = getSportCategory(sportId);
  return categories.includes(sportCategory);
}

/**
 * Check if sport should be excluded based on critical health conditions
 *
 * @param sportId - Sport ID to check
 * @param answers - Quiz answers containing critical health data
 * @param riskSignals - Risk signals detected (optional, for future use)
 * @returns Exclusion result with reason and modifications
 */
export function shouldExcludeSport(
  sportId: string,
  answers: QuizAnswers,
  _riskSignals?: RiskSignal[] // Will be used in Task 1.4.1 for enhanced detection
): ExclusionResult {
  // Check for absolute contraindications from critical health screening
  const hasCardiacRisk =
    answers.criticalHealth?.cardiacSymptoms === true ||
    answers.criticalHealth?.cardiacFamilyHistory === true;

  const hasConcussionRisk =
    answers.criticalHealth?.recentConcussion === true ||
    answers.criticalHealth?.multipleConcussions === true;

  // Check for concussion in injury details (from "why stopped sports")
  if (
    answers.injuryDetails?.type === "concussion" &&
    (answers.injuryDetails.when === "<1month" || answers.injuryDetails.when === "1-3months")
  ) {
    // Recent concussion from injury history also triggers exclusion
    // (This supplements the critical health screening)
  }

  // Check for growth plate injury (from injury details)
  const hasGrowthPlateInjury =
    answers.injuryDetails?.type === "growth-plate" &&
    (answers.injuryDetails.when === "<1month" ||
      answers.injuryDetails.when === "1-3months" ||
      answers.injuryDetails.when === "3-6months");

  // Cardiac contraindications
  if (hasCardiacRisk) {
    // Exclude contact sports, high-impact sports, and endurance sports
    if (
      isInCategory(sportId, ["contact_sports", "high_impact", "endurance"]) &&
      !isInCategory(sportId, ["low_impact"])
    ) {
      return {
        exclude: true,
        reason:
          "Simptome cardiace detectate. Consultare cardiologică necesară înainte de orice sport.",
        requiredSpecialist: "cardiologist",
      };
    }

    // Allow low-impact sports with modifications
    if (isInCategory(sportId, ["low_impact"])) {
      return {
        exclude: true,
        reason:
          "Simptome cardiace detectate. Consultare cardiologică necesară înainte de începere.",
        allowedWithModifications: true,
        requiredSpecialist: "cardiologist",
      };
    }
  }

  // Concussion contraindications
  if (hasConcussionRisk) {
    // Exclude contact sports and high-impact sports
    if (
      isInCategory(sportId, ["contact_sports", "high_impact"]) &&
      !isInCategory(sportId, ["low_impact"])
    ) {
      return {
        exclude: true,
        reason:
          "Istoric de contuzie. Consultare neurologică necesară înainte de sporturi de contact sau impact ridicat.",
        requiredSpecialist: "neurologist",
      };
    }

    // Allow low-impact sports with modifications
    if (isInCategory(sportId, ["low_impact"])) {
      return {
        exclude: true,
        reason: "Istoric de contuzie. Consultare neurologică recomandată înainte de începere.",
        allowedWithModifications: true,
        requiredSpecialist: "neurologist",
      };
    }
  }

  // Growth plate injury contraindications
  if (hasGrowthPlateInjury) {
    // Exclude high-impact and contact sports
    if (
      isInCategory(sportId, ["high_impact", "contact_sports"]) &&
      !isInCategory(sportId, ["low_impact"])
    ) {
      return {
        exclude: true,
        reason:
          "Accidentare recentă la placa de creștere. Consultare ortopedică necesară înainte de sporturi de impact.",
        requiredSpecialist: "orthopedist",
      };
    }

    // Allow low-impact sports with modifications
    if (isInCategory(sportId, ["low_impact"])) {
      return {
        exclude: true,
        reason:
          "Accidentare recentă la placa de creștere. Consultare ortopedică recomandată înainte de începere.",
        allowedWithModifications: true,
        requiredSpecialist: "orthopedist",
      };
    }
  }

  // Check for unhealed injuries with restrictions
  if (
    answers.injuryDetails &&
    answers.injuryDetails.healed === false &&
    answers.injuryDetails.restrictions === true
  ) {
    // Exclude high-impact and contact sports for unhealed injuries with restrictions
    if (
      isInCategory(sportId, ["high_impact", "contact_sports"]) &&
      !isInCategory(sportId, ["low_impact"])
    ) {
      return {
        exclude: true,
        reason:
          "Accidentare netratată completă cu restricții medicale. Consultare medicală necesară înainte de sporturi de impact.",
        requiredSpecialist: "orthopedist",
      };
    }

    // Allow low-impact sports with modifications
    if (isInCategory(sportId, ["low_impact"])) {
      return {
        exclude: true,
        reason:
          "Accidentare netratată completă cu restricții medicale. Consultare medicală recomandată înainte de începere.",
        allowedWithModifications: true,
        requiredSpecialist: "orthopedist",
      };
    }
  }

  // Check for severe asthma (exclude endurance sports)
  if (answers.asthmaSeverity === "severe") {
    if (
      isInCategory(sportId, ["endurance", "high_impact"]) &&
      !isInCategory(sportId, ["low_impact"])
    ) {
      return {
        exclude: true,
        reason:
          "Astm sever necontrolat. Evaluare pulmonară necesară înainte de sporturi de intensitate ridicată.",
        requiredSpecialist: "pulmonologist",
      };
    }

    // Allow low-impact sports with modifications
    if (isInCategory(sportId, ["low_impact"])) {
      return {
        exclude: true,
        reason: "Astm sever necontrolat. Evaluare pulmonară recomandată înainte de începere.",
        allowedWithModifications: true,
        requiredSpecialist: "pulmonologist",
      };
    }
  }

  // Check for severe joint pain (exclude high-impact sports)
  if (answers.jointPainSeverity === "severe") {
    if (
      isInCategory(sportId, ["high_impact", "contact_sports"]) &&
      !isInCategory(sportId, ["low_impact"])
    ) {
      return {
        exclude: true,
        reason:
          "Dureri articulare severe. Evaluare ortopedică urgentă necesară înainte de sporturi de impact.",
        requiredSpecialist: "orthopedist",
      };
    }

    // Allow low-impact sports with modifications
    if (isInCategory(sportId, ["low_impact"])) {
      return {
        exclude: true,
        reason: "Dureri articulare severe. Evaluare ortopedică recomandată înainte de începere.",
        allowedWithModifications: true,
        requiredSpecialist: "orthopedist",
      };
    }
  }

  // Check for moderate joint pain (exclude high-impact sports, allow with modifications)
  if (answers.jointPainSeverity === "moderate") {
    if (
      isInCategory(sportId, ["high_impact", "contact_sports"]) &&
      !isInCategory(sportId, ["low_impact"])
    ) {
      return {
        exclude: true,
        reason:
          "Dureri articulare moderate. Evaluare ortopedică recomandată pentru identificarea sporturilor potrivite.",
        allowedWithModifications: false,
        requiredSpecialist: "orthopedist",
      };
    }
  }

  // No exclusions
  return {
    exclude: false,
    reason: null,
  };
}

/**
 * Get all sport categories
 *
 * @returns Array of sport categories
 */
export function getSportCategories(): SportCategory[] {
  return SPORT_CATEGORIES;
}

/**
 * Get category for a specific sport
 *
 * @param sportId - Sport ID
 * @returns Category ID or "other"
 */
export function getCategoryForSport(sportId: string): string {
  return getSportCategory(sportId);
}

/**
 * Check if a sport is in a specific category
 *
 * @param sportId - Sport ID to check
 * @param categoryId - Category ID to check against
 * @returns True if sport belongs to the category
 */
export function isSportInCategory(sportId: string, categoryId: string): boolean {
  return getSportCategory(sportId) === categoryId;
}
