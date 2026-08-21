/**
 * Clubs Server Actions
 *
 * Server Actions for sports club search and management.
 */

"use server";

import { headers } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";
import {
  getClubBySlug,
  searchClubs,
  getClubsBySport,
  updateClub,
  deleteClub,
  verifyClubOwnership,
} from "@/modules/clubs/clubs.service";
import type { Club, ClubSearchFilters, ClubSearchResult } from "@/modules/clubs/clubs.types";
import type { ClubProfileUpdateInput } from "@/lib/validations/club";
import { trackEventServer } from "@/lib/analytics/tracking-server";
import { PostHogEvents, PostHogProperties } from "@/lib/analytics/events";
import { getSession } from "@/lib/auth/session";
import { requireRole } from "@/modules/auth/auth.service";
import { rateLimit, getClientIdentifierFromHeaders, RATE_LIMIT_CONFIGS } from "@/lib/rate-limit";
import { routes } from "@/lib/routes";
import { pingIndexNowForClub } from "@/lib/seo/indexnow-ping";

/**
 * Get club by slug (public action)
 */
export async function getClubBySlugAction(slug: string): Promise<Club | null> {
  try {
    return await getClubBySlug(slug);
  } catch (error) {
    console.error("Error getting club:", error);
    return null;
  }
}

/**
 * Get club by ID (public action)
 */
export async function getClubByIdAction(id: string): Promise<Club | null> {
  try {
    const { getClubById } = await import("@/modules/clubs/clubs.repository");
    return await getClubById(id);
  } catch (error) {
    console.error("Error getting club by ID:", error);
    return null;
  }
}

/**
 * Search clubs with filters (public action)
 */
export async function searchClubsAction(filters: ClubSearchFilters): Promise<ClubSearchResult> {
  // Rate limiting: prevent abuse of search endpoint
  try {
    const headersList = await headers();
    const session = await getSession();
    const identifier = getClientIdentifierFromHeaders(session?.dbUser?.id, headersList);
    const rateLimitResult = await rateLimit(
      `search-clubs:${identifier}`,
      RATE_LIMIT_CONFIGS.SEARCH
    );

    if (!rateLimitResult.success) {
      // Return empty result instead of error for better UX
      return {
        clubs: [],
        total: 0,
        page: filters.page || 1,
        pageSize: filters.pageSize || 20,
      };
    }
  } catch (rateLimitError) {
    // Don't block search if rate limiting fails (log and continue)
    console.error("[RateLimit] Error checking rate limit for club search:", rateLimitError);
  }

  try {
    const result = await searchClubs(filters);

    // Track search event (non-blocking)
    try {
      const session = await getSession();
      const distinctId = session?.user.id || "anonymous";
      await trackEventServer(PostHogEvents.CLUB_SEARCHED, {
        distinctId,
        ...(filters.sportId && { [PostHogProperties.CLUB_SPORT]: filters.sportId }),
        // Phase 6: Track cityId instead of city text (if available, fetch city name for tracking)
        ...(filters.cityId && { [PostHogProperties.CLUB_CITY]: filters.cityId }),
        // Note: We don't track location (latitude/longitude) for privacy
      });
    } catch (trackingError) {
      // Don't fail search if tracking fails
      if (process.env.NODE_ENV === "development") {
        console.error("[PostHog] Error tracking club search:", trackingError);
      }
    }

    return result;
  } catch (error) {
    console.error("Error searching clubs:", error);
    return {
      clubs: [],
      total: 0,
      page: filters.page || 1,
      pageSize: filters.pageSize || 20,
    };
  }
}

/**
 * Get clubs by sport (public action)
 */
export async function getClubsBySportAction(sportId: string): Promise<Club[]> {
  try {
    return await getClubsBySport(sportId);
  } catch (error) {
    console.error("Error getting clubs by sport:", error);
    return [];
  }
}

/**
 * Get recommended clubs based on sport recommendation
 *
 * @param sportId - Sport ID from quiz recommendation
 * @param city - Optional city filter
 * @param limit - Maximum number of clubs to return (default: 5)
 * @returns List of recommended clubs
 */
export async function getRecommendedClubsAction(
  sportId: string,
  cityId?: string, // Phase 6: Changed from city (string) to cityId (string)
  limit: number = 5
): Promise<ClubSearchResult> {
  try {
    const filters: ClubSearchFilters = {
      sportId,
      verified: true, // Only show verified clubs
      page: 1,
      pageSize: limit,
      sortBy: "verified", // Verified clubs first
    };

    if (cityId) {
      filters.cityId = cityId; // Phase 6: Use cityId instead of city
    }

    const result = await searchClubs(filters);

    return result;
  } catch (error) {
    console.error("[Clubs] Error getting recommended clubs:", error);
    throw new Error("Eroare la obținerea cluburilor recomandate");
  }
}

/**
 * Get featured clubs for homepage (public action)
 */
export async function getFeaturedClubs(): Promise<{
  success: boolean;
  data?: Club[];
  error?: string;
}> {
  try {
    // Search for featured and verified clubs, limit to 6
    const result = await searchClubs({
      featured: true,
      verified: true,
      page: 1,
      pageSize: 6,
    });
    return {
      success: true,
      data: result.clubs,
    };
  } catch (error) {
    console.error("Error getting featured clubs:", error);
    return {
      success: false,
      data: [],
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Update club profile (club_admin only, with ownership verification)
 */
export async function updateClubAction(
  clubId: string,
  input: unknown
): Promise<{ success: boolean; club?: Club; error?: string }> {
  try {
    // Require club_admin role
    const user = await requireRole("club_admin");

    // Verify ownership
    await verifyClubOwnership(clubId, user.id);

    // Validate input (using a simple schema for updates - can be extended)
    // For now, accept any object with club fields
    const updates = input as Parameters<typeof updateClub>[2];

    // Update club
    const club = await updateClub(clubId, user.id, updates);

    // Revalidate cache
    revalidatePath(routes.club.profile);
    revalidatePath(routes.club.dashboard);
    if (club.slug) {
      revalidatePath(`/cluburi/${club.slug}`);
      // Revalidate cache tags
      revalidateTag(`club-${club.id}`, "max");
      revalidateTag(`club-slug-${club.slug}`, "max");
      revalidateTag("clubs-list", "max");
      revalidateTag("home-featured-clubs", "max");
    }
    // Revalidate user-specific cache
    revalidateTag(`user-${user.id}`, "max");
    revalidateTag(`club-dashboard-${user.id}`, "max");

    pingIndexNowForClub(club);

    return { success: true, club };
  } catch (error) {
    console.error("Error updating club:", error);
    if (error instanceof Error && error.message.includes("permisiunea")) {
      return {
        success: false,
        error: error.message,
      };
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : "Eroare la actualizarea clubului",
    };
  }
}

/**
 * Update club profile (for club admin - automatically gets club ID)
 */
export async function updateClubProfileAction(
  input: unknown
): Promise<{ success: boolean; club?: Club; error?: string }> {
  try {
    // Require club_admin role
    const user = await requireRole("club_admin");

    // Get club for this admin
    const { getClubByAdminUserId } = await import("@/modules/clubs/clubs.service");
    const club = await getClubByAdminUserId(user.id);

    if (!club) {
      return {
        success: false,
        error: "Clubul nu a fost găsit",
      };
    }

    // Validate input with Zod schema
    const { clubProfileUpdateSchema } = await import("@/lib/validations/club");

    // Debug: Log input before validation
    if (process.env.NODE_ENV === "development" && input && typeof input === "object") {
      if ("schedule" in input) {
        console.log("Schedule in input:", (input as { schedule?: unknown }).schedule);
      }
      if ("pricing" in input) {
        console.log("Pricing in input:", (input as { pricing?: unknown }).pricing);
      }
    }

    // Safely parse input - handle potential undefined arrays
    let validatedInput: ClubProfileUpdateInput;
    try {
      validatedInput = clubProfileUpdateSchema.parse(input);
    } catch (parseError) {
      // Log detailed error for debugging
      console.error("Validation error:", parseError);
      if (parseError && typeof parseError === "object" && "issues" in parseError) {
        const zodError = parseError as {
          issues: Array<{ message: string; path?: Array<string | number> }>;
        };
        const firstError = zodError.issues[0];
        const fieldPath = firstError?.path ? firstError.path.join(".") : "";
        throw new Error(
          `${firstError?.message || "Date invalide"}${fieldPath ? ` (${fieldPath})` : ""}`
        );
      }
      throw parseError;
    }

    // Debug: Log validated input
    if (process.env.NODE_ENV === "development") {
      if (validatedInput.schedule) {
        console.log("Schedule after validation:", validatedInput.schedule);
      }
      if (validatedInput.pricing) {
        console.log("Pricing after validation:", validatedInput.pricing);
      }
    }

    // Ensure arrays are properly formatted before update
    const safeUpdates: Parameters<typeof updateClub>[2] = {
      ...validatedInput,
      // Ensure arrays are arrays or undefined (not null)
      schedule: Array.isArray(validatedInput.schedule) ? validatedInput.schedule : undefined,
      pricing: Array.isArray(validatedInput.pricing) ? validatedInput.pricing : undefined,
      ageGroups: Array.isArray(validatedInput.ageGroups) ? validatedInput.ageGroups : undefined,
      experienceLevels: Array.isArray(validatedInput.experienceLevels)
        ? validatedInput.experienceLevels
        : undefined,
      galleryUrls: Array.isArray(validatedInput.galleryUrls)
        ? validatedInput.galleryUrls
        : undefined,
    };

    // Update club
    const updatedClub = await updateClub(club.id, user.id, safeUpdates);

    // Revalidate cache
    revalidatePath(routes.club.profile);
    revalidatePath(routes.club.dashboard);
    if (updatedClub.slug) {
      revalidatePath(`/cluburi/${updatedClub.slug}`);
      // Revalidate cache tags
      revalidateTag(`club-${updatedClub.id}`, "max");
      revalidateTag(`club-slug-${updatedClub.slug}`, "max");
      revalidateTag("clubs-list", "max");
      revalidateTag("home-featured-clubs", "max");
    }
    // Revalidate user-specific cache
    revalidateTag(`user-${user.id}`, "max");
    revalidateTag(`club-dashboard-${user.id}`, "max");

    pingIndexNowForClub(updatedClub);

    return { success: true, club: updatedClub };
  } catch (error) {
    console.error("Error updating club profile:", error);
    if (error instanceof Error && error.message.includes("permisiunea")) {
      return {
        success: false,
        error: error.message,
      };
    }
    // Handle Zod validation errors
    if (error && typeof error === "object" && "issues" in error) {
      const zodError = error as {
        issues: Array<{ message: string; path?: Array<string | number> }>;
      };
      const firstError = zodError.issues[0];
      const fieldPath = firstError?.path ? firstError.path.join(".") : "";
      return {
        success: false,
        error: firstError?.message
          ? `${firstError.message}${fieldPath ? ` (${fieldPath})` : ""}`
          : "Date invalide",
      };
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : "Eroare la actualizarea profilului",
    };
  }
}

/**
 * Delete club (club_admin only, with ownership verification)
 */
export async function deleteClubAction(
  clubId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Require club_admin role
    const user = await requireRole("club_admin");

    // Verify ownership and delete
    await deleteClub(clubId, user.id);

    // Revalidate cache
    revalidatePath(routes.club.dashboard);
    revalidatePath(routes.club.profile);
    // Revalidate cache tags
    revalidateTag("clubs-list", "max");
    revalidateTag("home-featured-clubs", "max");

    return { success: true };
  } catch (error) {
    console.error("Error deleting club:", error);
    if (error instanceof Error && error.message.includes("permisiunea")) {
      return {
        success: false,
        error: error.message,
      };
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : "Eroare la ștergerea clubului",
    };
  }
}
