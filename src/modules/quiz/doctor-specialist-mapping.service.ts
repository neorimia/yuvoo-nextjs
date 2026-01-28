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
import type { Doctor, DoctorSpecialty } from "@/modules/doctors/doctors.types";
import type { SpecialistRecommendation } from "./quiz.types";

// Re-export display utilities for backward compatibility (server-side only)
export { getSpecialtyDisplayName, getPriorityDisplayName } from "@/lib/utils/specialist-display";

/**
 * External specialists that are not available in the Yuvoo platform
 * These require referral to specialized medical centers
 */
const EXTERNAL_SPECIALISTS = ["cardiologist", "neurologist", "pulmonologist"] as const;

/**
 * Map quiz specialist recommendations to platform doctor specialties
 *
 * External specialists (cardiologist, neurologist, pulmonologist) are mapped
 * to 'general' since they require external referral.
 */
function mapToPlatformSpecialty(
  quizSpecialty: SpecialistRecommendation["specialty"]
): DoctorSpecialty {
  if (EXTERNAL_SPECIALISTS.includes(quizSpecialty as (typeof EXTERNAL_SPECIALISTS)[number])) {
    return "general"; // External specialists map to general pediatrician
  }
  return quizSpecialty as DoctorSpecialty;
}

/**
 * Check if a specialist recommendation is for an external specialist
 */
export function isExternalSpecialist(specialty: SpecialistRecommendation["specialty"]): boolean {
  return EXTERNAL_SPECIALISTS.includes(specialty as (typeof EXTERNAL_SPECIALISTS)[number]);
}

/**
 * Get recommended doctors based on specialist recommendation
 *
 * Finds doctors matching the recommended specialty, prioritizing:
 * 1. Verified doctors
 * 2. Doctors accepting new patients
 * 3. Doctors offering online consultations (if applicable)
 *
 * Note: External specialists (cardiologist, neurologist, pulmonologist) will
 * return general pediatricians as these require external referral.
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

  // Map quiz specialty to platform specialty
  const platformSpecialty = mapToPlatformSpecialty(specialistRecommendation.specialty);

  // Search for doctors by specialty
  const searchFilters = {
    specialty: platformSpecialty,
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
