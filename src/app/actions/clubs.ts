/**
 * Clubs Server Actions
 *
 * Server Actions for sports club search and management.
 */

"use server";

import { getClubBySlug, searchClubs, getClubsBySport } from "@/modules/clubs/clubs.service";
import type { Club, ClubSearchFilters, ClubSearchResult } from "@/modules/clubs/clubs.types";
import { trackEventServer } from "@/lib/analytics/tracking-server";
import { PostHogEvents, PostHogProperties } from "@/lib/analytics/events";
import { getSession } from "@/lib/auth/session";

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
  try {
    const result = await searchClubs(filters);

    // Track search event (non-blocking)
    try {
      const session = await getSession();
      const distinctId = session?.user.id || "anonymous";
      await trackEventServer(PostHogEvents.CLUB_SEARCHED, {
        distinctId,
        ...(filters.sportId && { [PostHogProperties.CLUB_SPORT]: filters.sportId }),
        ...(filters.city && { [PostHogProperties.CLUB_CITY]: filters.city }),
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
  city?: string,
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

    if (city) {
      filters.city = city;
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
