/**
 * Doctor Specialist Mapping Service
 *
 * Maps quiz specialist recommendations to actual doctors in the database.
 * Provides functionality to find doctors matching specialist recommendations.
 */

import { searchDoctors } from "@/modules/doctors/doctors.service";
import type { Doctor } from "@/modules/doctors/doctors.types";
import type { SpecialistRecommendation } from "./quiz.types";

/**
 * Get recommended doctors based on specialist recommendation
 *
 * Finds doctors matching the recommended specialty, prioritizing:
 * 1. Verified doctors
 * 2. Doctors accepting new patients
 * 3. Doctors offering online consultations (if applicable)
 *
 * @param specialistRecommendation - Specialist recommendation from quiz
 * @param city - Optional city filter for location-based recommendations
 * @param limit - Maximum number of doctors to return (default: 5)
 * @returns Array of recommended doctors
 */
export async function getRecommendedDoctors(
  specialistRecommendation: SpecialistRecommendation,
  city?: string,
  limit: number = 5
): Promise<Doctor[]> {
  if (!specialistRecommendation.needed) {
    return [];
  }

  // Search for doctors by specialty
  const searchFilters = {
    specialty: specialistRecommendation.specialty,
    city: city,
    verified: true, // Prioritize verified doctors
    page: 1,
    pageSize: limit * 2, // Get more to filter further
    sortBy: "verified" as const,
  };

  const searchResult = await searchDoctors(searchFilters);

  // Filter and prioritize doctors
  let doctors = searchResult.doctors;

  // Prioritize doctors accepting new patients
  const acceptingNewPatients = doctors.filter((d) => d.acceptingNewPatients === true);
  const notAccepting = doctors.filter((d) => d.acceptingNewPatients !== true);

  // Combine: accepting new patients first, then others
  doctors = [...acceptingNewPatients, ...notAccepting];

  // Limit results
  return doctors.slice(0, limit);
}

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
