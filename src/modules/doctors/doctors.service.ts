/**
 * Doctors Service
 *
 * Business logic for pediatric specialist operations.
 * Handles doctor discovery, search, and details.
 */

import { doctorsRepository } from "./doctors.repository";
import { doctorsSearch } from "./doctors.search";
import type { Doctor, DoctorSearchFilters, DoctorSearchResult } from "./doctors.types";

/**
 * Get doctor by slug
 */
export async function getDoctorBySlug(slug: string): Promise<Doctor | null> {
  return doctorsRepository.findBySlug(slug);
}

/**
 * Search doctors with filters
 */
export async function searchDoctors(filters: DoctorSearchFilters): Promise<DoctorSearchResult> {
  return doctorsSearch.search(filters);
}

/**
 * Get doctors by specialty
 */
export async function getDoctorsBySpecialty(specialty: string): Promise<Doctor[]> {
  return doctorsRepository.findBySpecialty(specialty);
}
