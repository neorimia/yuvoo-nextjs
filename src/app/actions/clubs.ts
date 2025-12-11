/**
 * Clubs Server Actions
 *
 * Server Actions for sports club search and management.
 */

"use server";

import { getClubBySlug, searchClubs, getClubsBySport } from "@/modules/clubs/clubs.service";
import type { Club, ClubSearchFilters, ClubSearchResult } from "@/modules/clubs/clubs.types";

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
 * Search clubs with filters (public action)
 */
export async function searchClubsAction(filters: ClubSearchFilters): Promise<ClubSearchResult> {
  try {
    // TODO: Validate filters with Zod schema

    return await searchClubs(filters);
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
