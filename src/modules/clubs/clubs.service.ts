/**
 * Clubs Service
 *
 * Business logic for sports club operations.
 * Handles club discovery, search, filtering, and details.
 */

import { clubsRepository } from "./clubs.repository";
import { clubsSearch } from "./clubs.search";
import type { Club, ClubSearchFilters, ClubSearchResult } from "./clubs.types";

/**
 * Get club by slug
 */
export async function getClubBySlug(slug: string): Promise<Club | null> {
  return clubsRepository.getClubBySlug(slug);
}

/**
 * Search clubs with filters
 */
export async function searchClubs(filters: ClubSearchFilters): Promise<ClubSearchResult> {
  return clubsSearch.search(filters);
}

/**
 * Get clubs by sport
 */
export async function getClubsBySport(sportId: string): Promise<Club[]> {
  return clubsRepository.findBySportType(sportId);
}

/**
 * Get verified clubs only
 */
export async function getVerifiedClubs(): Promise<Club[]> {
  return clubsRepository.getClubsByVerificationStatus("approved");
}

/**
 * Get all clubs
 * Used for sitemap generation and bulk operations
 */
export async function getAllClubs(): Promise<Club[]> {
  return clubsRepository.getAllClubs();
}

/**
 * Search clubs near a location
 *
 * Convenience function for location-based search.
 * Finds clubs within a specified radius of given coordinates.
 *
 * @param latitude - Latitude of the search location
 * @param longitude - Longitude of the search location
 * @param radiusKm - Search radius in kilometers (default: 10km)
 * @param additionalFilters - Additional search filters (sport, age, etc.)
 * @returns Search result with clubs sorted by distance
 */
export async function searchNearbyClubs(
  latitude: number,
  longitude: number,
  radiusKm: number = 10,
  additionalFilters?: Omit<ClubSearchFilters, "latitude" | "longitude" | "radiusKm" | "sortBy">
): Promise<ClubSearchResult> {
  return clubsSearch.search({
    ...additionalFilters,
    latitude,
    longitude,
    radiusKm,
    sortBy: "distance", // Always sort by distance for nearby search
  });
}
