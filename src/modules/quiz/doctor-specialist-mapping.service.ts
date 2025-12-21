/**
 * Doctor Specialist Mapping Service
 *
 * Maps quiz specialist recommendations to actual doctors in the database.
 * Provides functionality to find doctors matching specialist recommendations.
 *
 * Note: Display name utilities have been moved to @/lib/utils/specialist-display
 * to avoid importing database code in client components.
 */

import { searchDoctors } from "@/modules/doctors/doctors.service";
import type { Doctor } from "@/modules/doctors/doctors.types";
import type { SpecialistRecommendation } from "./quiz.types";

// Re-export display utilities for backward compatibility (server-side only)
export { getSpecialtyDisplayName, getPriorityDisplayName } from "@/lib/utils/specialist-display";

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
