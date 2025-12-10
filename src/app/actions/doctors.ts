/**
 * Doctors Server Actions
 *
 * Server Actions for pediatric specialist search and management.
 */

"use server";

import {
  getDoctorBySlug,
  searchDoctors,
  getDoctorsBySpecialty,
} from "@/modules/doctors/doctors.service";
import type {
  Doctor,
  DoctorSearchFilters,
  DoctorSearchResult,
} from "@/modules/doctors/doctors.types";

/**
 * Get doctor by slug (public action)
 */
export async function getDoctorBySlugAction(slug: string): Promise<Doctor | null> {
  try {
    return await getDoctorBySlug(slug);
  } catch (error) {
    console.error("Error getting doctor:", error);
    return null;
  }
}

/**
 * Search doctors with filters (public action)
 */
export async function searchDoctorsAction(
  filters: DoctorSearchFilters
): Promise<DoctorSearchResult> {
  try {
    // TODO: Validate filters with Zod schema

    return await searchDoctors(filters);
  } catch (error) {
    console.error("Error searching doctors:", error);
    return {
      doctors: [],
      total: 0,
      page: filters.page || 1,
      pageSize: filters.pageSize || 20,
    };
  }
}

/**
 * Get doctors by specialty (public action)
 */
export async function getDoctorsBySpecialtyAction(specialty: string): Promise<Doctor[]> {
  try {
    return await getDoctorsBySpecialty(specialty);
  } catch (error) {
    console.error("Error getting doctors by specialty:", error);
    return [];
  }
}
