/**
 * Clubs Service
 *
 * Business logic for sports club operations.
 * Handles club discovery, search, filtering, and details.
 */

import { db } from "@/lib/db";
import { clubs } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
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
 * Get unique locations (city/district combinations) from clubs
 * Used for generating location-specific landing pages
 */
export async function getUniqueLocations(): Promise<Array<{ city: string; district?: string }>> {
  return clubsRepository.getUniqueLocations();
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

/**
 * Verify club ownership
 * Throws error if club doesn't exist or user doesn't own it
 */
export async function verifyClubOwnership(clubId: string, userId: string): Promise<Club> {
  const club = await clubsRepository.getClubById(clubId);
  if (!club) {
    throw new Error("Club-ul nu a fost găsit");
  }

  // Check ownership via adminUserId
  const dbClub = await db.query.clubs.findFirst({
    where: eq(clubs.id, clubId),
    columns: { adminUserId: true },
  });

  if (!dbClub || dbClub.adminUserId !== userId) {
    throw new Error("Nu ai permisiunea de a gestiona acest club");
  }

  return club;
}

/**
 * Update club (with ownership verification)
 */
export async function updateClub(
  clubId: string,
  userId: string,
  updates: Partial<{
    name: string;
    description: string;
    sportType: string;
    city: string;
    district: string | null;
    address: string;
    phone: string | null;
    email: string | null;
    website: string | null;
    schedule: unknown;
    pricing: unknown;
    ageGroups: number[];
    experienceLevels: string[];
    logoUrl: string | null;
    galleryUrls: string[];
  }>
): Promise<Club> {
  // Verify ownership first
  await verifyClubOwnership(clubId, userId);

  // Update club
  const [updatedClub] = await db
    .update(clubs)
    .set({
      ...updates,
      updatedAt: new Date(),
    })
    .where(and(eq(clubs.id, clubId), eq(clubs.adminUserId, userId)))
    .returning();

  if (!updatedClub) {
    throw new Error("Eroare la actualizarea clubului");
  }

  return clubsRepository.mapDbClubToClub(updatedClub);
}

/**
 * Delete club (with ownership verification)
 */
export async function deleteClub(clubId: string, userId: string): Promise<void> {
  // Verify ownership first
  await verifyClubOwnership(clubId, userId);

  // Delete club
  await db.delete(clubs).where(and(eq(clubs.id, clubId), eq(clubs.adminUserId, userId)));
}
