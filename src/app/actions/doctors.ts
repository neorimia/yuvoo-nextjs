"use server";

/**
 * Doctor Server Actions
 *
 * Server actions for doctor search and management.
 */

import { doctorsSearch } from "@/modules/doctors/doctors.search";
import type { DoctorSearchFilters, DoctorSearchResult } from "@/modules/doctors/doctors.types";
import {
  getDoctorBySlug,
  searchDoctors,
  getDoctorsBySpecialty,
} from "@/modules/doctors/doctors.service";
import type { Doctor } from "@/modules/doctors/doctors.types";

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
 * Get doctor by ID (public action)
 */
export async function getDoctorByIdAction(id: string): Promise<Doctor | null> {
  try {
    const { getDoctorById } = await import("@/modules/doctors/doctors.repository");
    return await getDoctorById(id);
  } catch (error) {
    console.error("Error getting doctor by ID:", error);
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

/**
 * Get recommended doctors based on specialist recommendation
 *
 * @param specialty - Medical specialty (orthopedist, nutritionist, psychologist, general)
 * @param city - Optional city filter
 * @param limit - Maximum number of doctors to return (default: 5)
 * @returns List of recommended doctors
 */
export async function getRecommendedDoctorsAction(
  specialty: "orthopedist" | "nutritionist" | "psychologist" | "general",
  city?: string,
  limit: number = 5
): Promise<DoctorSearchResult> {
  try {
    const filters: DoctorSearchFilters = {
      specialty,
      verified: true, // Only show verified doctors
      acceptingNewPatients: true, // Only show doctors accepting new patients
      page: 1,
      pageSize: limit,
      sortBy: "verified", // Verified doctors first
    };

    if (city) {
      filters.city = city;
    }

    const result = await doctorsSearch.search(filters);

    return result;
  } catch (error) {
    console.error("[Doctors] Error getting recommended doctors:", error);
    throw new Error("Eroare la obținerea doctorilor recomandați");
  }
}
