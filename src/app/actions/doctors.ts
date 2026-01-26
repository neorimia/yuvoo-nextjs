"use server";

/**
 * Doctor Server Actions
 *
 * Server actions for doctor search and management.
 */

import { headers } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";
import { doctorsSearch } from "@/modules/doctors/doctors.search";
import type { DoctorSearchFilters, DoctorSearchResult } from "@/modules/doctors/doctors.types";
import {
  getDoctorBySlug,
  searchDoctors,
  getDoctorsBySpecialty,
  updateDoctor,
  deleteDoctor,
  verifyDoctorOwnership,
} from "@/modules/doctors/doctors.service";
import type { Doctor } from "@/modules/doctors/doctors.types";
import { trackEventServer } from "@/lib/analytics/tracking-server";
import { PostHogEvents, PostHogProperties } from "@/lib/analytics/events";
import { getSession } from "@/lib/auth/session";
import { requireRole } from "@/modules/auth/auth.service";
import { rateLimit, getClientIdentifierFromHeaders, RATE_LIMIT_CONFIGS } from "@/lib/rate-limit";
import { routes } from "@/lib/routes";

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
  // Rate limiting: prevent abuse of search endpoint
  try {
    const headersList = await headers();
    const session = await getSession();
    const identifier = getClientIdentifierFromHeaders(session?.dbUser?.id, headersList);
    const rateLimitResult = await rateLimit(
      `search-doctors:${identifier}`,
      RATE_LIMIT_CONFIGS.SEARCH
    );

    if (!rateLimitResult.success) {
      // Return empty result instead of error for better UX
      return {
        doctors: [],
        total: 0,
        page: filters.page || 1,
        pageSize: filters.pageSize || 20,
      };
    }
  } catch (rateLimitError) {
    // Don't block search if rate limiting fails (log and continue)
    console.error("[RateLimit] Error checking rate limit for doctor search:", rateLimitError);
  }

  try {
    const result = await searchDoctors(filters);

    // Track search event (non-blocking)
    try {
      const session = await getSession();
      const distinctId = session?.user.id || "anonymous";
      await trackEventServer(PostHogEvents.DOCTOR_SEARCHED, {
        distinctId,
        ...(filters.specialty && { [PostHogProperties.DOCTOR_SPECIALTY]: filters.specialty }),
        // Phase 6: Track cityId instead of city text (if available, fetch city name for tracking)
        ...(filters.cityId && { [PostHogProperties.CLUB_CITY]: filters.cityId }), // Reusing CLUB_CITY property for city
      });
    } catch (trackingError) {
      // Don't fail search if tracking fails
      if (process.env.NODE_ENV === "development") {
        console.error("[PostHog] Error tracking doctor search:", trackingError);
      }
    }

    return result;
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
  cityId?: string, // Phase 6: Changed from city (string) to cityId (string)
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

    if (cityId) {
      filters.cityId = cityId; // Phase 6: Use cityId instead of city
    }

    const result = await doctorsSearch.search(filters);

    return result;
  } catch (error) {
    console.error("[Doctors] Error getting recommended doctors:", error);
    throw new Error("Eroare la obținerea doctorilor recomandați");
  }
}

/**
 * Update doctor profile (doctor role only, with ownership verification)
 */
export async function updateDoctorAction(
  doctorId: string,
  input: unknown
): Promise<{ success: boolean; doctor?: Doctor; error?: string }> {
  try {
    // Require doctor role
    const user = await requireRole("doctor");

    // Verify ownership
    await verifyDoctorOwnership(doctorId, user.id);

    // Validate input (using a simple schema for updates - can be extended)
    // For now, accept any object with doctor fields
    const updates = input as Parameters<typeof updateDoctor>[2];

    // Update doctor
    const doctor = await updateDoctor(doctorId, user.id, updates);

    // Revalidate cache
    revalidatePath(routes.doctor.profile);
    if (doctor.slug) {
      revalidatePath(`/doctori/${doctor.slug}`);
      // Revalidate cache tags
      revalidateTag(`doctor-${doctor.id}`, "max");
      revalidateTag(`doctor-slug-${doctor.slug}`, "max");
      revalidateTag("doctors-list", "max");
      revalidateTag("home-featured-doctors", "max");
    }

    return { success: true, doctor };
  } catch (error) {
    console.error("Error updating doctor:", error);
    if (error instanceof Error && error.message.includes("permisiunea")) {
      return {
        success: false,
        error: error.message,
      };
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : "Eroare la actualizarea profilului de doctor",
    };
  }
}

/**
 * Delete doctor profile (doctor role only, with ownership verification)
 */
export async function deleteDoctorAction(
  doctorId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Require doctor role
    const user = await requireRole("doctor");

    // Verify ownership and delete
    await deleteDoctor(doctorId, user.id);

    // Revalidate cache
    revalidatePath(routes.doctor.dashboard);
    revalidatePath(routes.doctor.profile);
    // Revalidate cache tags
    revalidateTag("doctors-list", "max");
    revalidateTag("home-featured-doctors", "max");

    return { success: true };
  } catch (error) {
    console.error("Error deleting doctor:", error);
    if (error instanceof Error && error.message.includes("permisiunea")) {
      return {
        success: false,
        error: error.message,
      };
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : "Eroare la ștergerea profilului de doctor",
    };
  }
}
