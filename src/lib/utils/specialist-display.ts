/**
 * Specialist Display Utilities
 *
 * Pure utility functions for displaying specialist information.
 * No server-side dependencies - safe to use in client components.
 */

import type { SpecialistRecommendation } from "@/modules/quiz/quiz.types";

/**
 * Get doctor specialty display name in Romanian
 *
 * @param specialty - Doctor specialty
 * @returns Romanian display name
 */
export function getSpecialtyDisplayName(specialty: SpecialistRecommendation["specialty"]): string {
  const specialtyNames: Record<SpecialistRecommendation["specialty"], string> = {
    orthopedist: "Ortopedie pediatrică",
    nutritionist: "Nutriție pediatrică",
    psychologist: "Psihologie pediatrică",
    general: "Medic pediatru",
  };

  return specialtyNames[specialty];
}

/**
 * Get priority display name in Romanian
 *
 * @param priority - Recommendation priority
 * @returns Romanian display name
 */
export function getPriorityDisplayName(priority: SpecialistRecommendation["priority"]): string {
  if (!priority) return "Normal";

  const priorityNames: Record<NonNullable<SpecialistRecommendation["priority"]>, string> = {
    high: "Ridicată",
    medium: "Medie",
    low: "Scăzută",
  };

  return priorityNames[priority];
}
