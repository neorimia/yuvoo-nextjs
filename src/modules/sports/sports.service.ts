/**
 * Sports Service
 *
 * Business logic for sports operations.
 */

import {
  SPORTS_DATA,
  getSportBySlug as getSportBySlugData,
  getSportById as getSportByIdData,
  getSportsByCategory,
} from "@/lib/db/seed-data/sports";
import { clubsRepository } from "@/modules/clubs/clubs.repository";
import type { Sport, SportFilters } from "./sports.types";

/**
 * Get all sports
 *
 * @param filters - Optional filters for sports
 * @returns Array of sports
 */
export async function getAllSports(filters?: SportFilters): Promise<Sport[]> {
  let sports = [...SPORTS_DATA];

  // Apply category filter
  if (filters?.category) {
    sports = getSportsByCategory(filters.category);
  }

  // Apply age filters
  if (filters?.minAge !== undefined) {
    sports = sports.filter((sport) => sport.maxAge >= filters.minAge!);
  }
  if (filters?.maxAge !== undefined) {
    sports = sports.filter((sport) => sport.minAge <= filters.maxAge!);
  }

  // Apply search filter
  if (filters?.search) {
    const searchLower = filters.search.toLowerCase();
    sports = sports.filter(
      (sport) =>
        sport.name.toLowerCase().includes(searchLower) ||
        sport.description.toLowerCase().includes(searchLower)
    );
  }

  // Get club counts for each sport
  const sportsWithCounts = await Promise.all(
    sports.map(async (sport) => {
      try {
        const clubs = await clubsRepository.findBySportType(sport.id);
        const verifiedClubs = clubs.filter((club) => club.verified);

        return {
          ...sport,
          clubCount: clubs.length,
          verifiedClubCount: verifiedClubs.length,
        } as Sport;
      } catch (_error) {
        // If repository method doesn't exist yet, return sport without counts
        return {
          ...sport,
          clubCount: 0,
          verifiedClubCount: 0,
        } as Sport;
      }
    })
  );

  return sportsWithCounts;
}

/**
 * Get sport by slug
 *
 * @param slug - Sport slug
 * @returns Sport or null if not found
 */
export async function getSportBySlug(slug: string): Promise<Sport | null> {
  const sportData = getSportBySlugData(slug);

  if (!sportData) {
    return null;
  }

  // Get club counts
  try {
    const clubs = await clubsRepository.findBySportType(sportData.id);
    const verifiedClubs = clubs.filter((club) => club.verified);

    return {
      ...sportData,
      clubCount: clubs.length,
      verifiedClubCount: verifiedClubs.length,
    } as Sport;
  } catch (_error) {
    return {
      ...sportData,
      clubCount: 0,
      verifiedClubCount: 0,
    } as Sport;
  }
}

/**
 * Get sport by ID
 *
 * @param id - Sport ID
 * @returns Sport or null if not found
 */
export async function getSportById(id: string): Promise<Sport | null> {
  const sportData = getSportByIdData(id);

  if (!sportData) {
    return null;
  }

  // Get club counts
  try {
    const clubs = await clubsRepository.findBySportType(sportData.id);
    const verifiedClubs = clubs.filter((club) => club.verified);

    return {
      ...sportData,
      clubCount: clubs.length,
      verifiedClubCount: verifiedClubs.length,
    } as Sport;
  } catch (_error) {
    return {
      ...sportData,
      clubCount: 0,
      verifiedClubCount: 0,
    } as Sport;
  }
}
