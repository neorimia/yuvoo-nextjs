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
  return clubsRepository.findBySlug(slug);
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
  return clubsRepository.findBySport(sportId);
}

/**
 * Get verified clubs only
 */
export async function getVerifiedClubs(): Promise<Club[]> {
  return clubsRepository.findVerified();
}
