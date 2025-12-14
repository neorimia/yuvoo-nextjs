/**
 * Sport-Club Mapping Service
 *
 * Maps quiz sport recommendations to clubs.
 * Handles filtering clubs by recommended sports and location.
 */

import { getClubsBySport } from "@/modules/clubs/clubs.service";
import type { SportRecommendation } from "./quiz.types";
import type { Club } from "@/modules/clubs/clubs.types";

/**
 * Get clubs for recommended sports
 *
 * Filters clubs by sport IDs from quiz recommendations.
 * Optionally filters by city for location-based recommendations.
 * Deduplicates clubs (a club might offer multiple recommended sports).
 *
 * @param recommendations - Array of sport recommendations from quiz
 * @param city - Optional city filter (parent's city) for location-based filtering
 * @returns Array of unique clubs matching recommended sports
 */
export async function getClubsForRecommendations(
  recommendations: SportRecommendation[],
  city?: string
): Promise<Club[]> {
  // Extract sport IDs from recommendations
  const sportIds = recommendations.map((rec) => rec.sportId);

  // Get clubs for each recommended sport
  const clubPromises = sportIds.map((sportId) => getClubsBySport(sportId));
  const clubArrays = await Promise.all(clubPromises);

  // Flatten and deduplicate clubs (a club might offer multiple sports)
  const allClubs = clubArrays.flat();
  const uniqueClubs = Array.from(new Map(allClubs.map((club) => [club.id, club])).values());

  // Filter by city if provided
  if (city) {
    return uniqueClubs.filter((club) => club.location.city.toLowerCase() === city.toLowerCase());
  }

  return uniqueClubs;
}

/**
 * Get recommended sport IDs from quiz recommendations
 *
 * Extracts sport IDs from recommendations array.
 * Used for filtering and matching operations.
 *
 * @param recommendations - Array of sport recommendations from quiz
 * @returns Array of unique sport IDs
 */
export function getRecommendedSportIds(recommendations: SportRecommendation[]): string[] {
  return recommendations.map((rec) => rec.sportId);
}

/**
 * Check if club matches quiz recommendations
 *
 * Determines if a club's sport matches any recommended sport from quiz.
 * Used to display "Recomandat" badge on matching clubs.
 *
 * @param club - Club to check
 * @param recommendedSportIds - Array of recommended sport IDs from quiz
 * @returns True if club's sportId is in the recommended list
 */
export function isClubRecommended(club: Club, recommendedSportIds: string[]): boolean {
  return recommendedSportIds.includes(club.sportId);
}

/**
 * Rank clubs by recommendation match scores
 *
 * Returns clubs sorted by recommendation match score in descending order.
 * Clubs matching higher-scored sports are ranked higher.
 * Useful for displaying "best matches first" in club listings.
 *
 * @param clubs - Array of clubs to rank
 * @param recommendations - Array of sport recommendations with match scores
 * @returns Sorted array of clubs (highest match score first, lowest last)
 */
export function rankClubsByRecommendations(
  clubs: Club[],
  recommendations: SportRecommendation[]
): Club[] {
  // Create a map of sportId -> matchScore for quick lookup
  const sportScoreMap = new Map<string, number>();
  recommendations.forEach((rec) => {
    sportScoreMap.set(rec.sportId, rec.matchScore);
  });

  // Sort clubs by match score (highest first)
  return [...clubs].sort((a, b) => {
    const scoreA = sportScoreMap.get(a.sportId) || 0;
    const scoreB = sportScoreMap.get(b.sportId) || 0;
    return scoreB - scoreA; // Descending order
  });
}
