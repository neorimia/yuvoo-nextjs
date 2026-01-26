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
 * Count verified clubs
 * Used for displaying availability in Founding Club program
 */
export async function countVerifiedClubs(): Promise<number> {
  const verifiedClubs = await db.query.clubs.findMany({
    where: and(eq(clubs.verificationStatus, "approved")),
    columns: { id: true }, // Only need IDs for counting
  });

  return verifiedClubs.length;
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
 * Suggest alternative clubs for expired leads
 * Finds similar clubs based on sport, location, and age group
 *
 * @param options - Search options
 * @param options.sportId - Sport type to match
 * @param options.locationId - Location ID (city or county)
 * @param options.excludeClubId - Club ID to exclude (the expired lead's club)
 * @param options.limit - Maximum number of clubs to return (default: 5)
 * @returns Array of alternative clubs
 */
export async function suggestAlternativeClubs(options: {
  sportId?: string | null;
  locationId?: string | null;
  excludeClubId: string;
  limit?: number;
}): Promise<Club[]> {
  const limit = options.limit || 5;

  // Build search filters
  const filters: ClubSearchFilters = {
    page: 1,
    pageSize: limit + 5, // Get a few extra in case some are filtered out
    sortBy: "verified", // Prioritize verified clubs
  };

  // Filter by sport if provided
  if (options.sportId) {
    filters.sportId = options.sportId;
  }

  // Filter by location if provided
  if (options.locationId) {
    // Try to determine if it's a city or county
    // For now, we'll search by cityId first, then fallback to countyId
    filters.cityId = options.locationId;
  }

  // Search for clubs
  const result = await clubsSearch.search(filters);

  // Filter out the excluded club and limit results
  const alternativeClubs = result.clubs
    .filter((club) => club.id !== options.excludeClubId)
    .slice(0, limit);

  return alternativeClubs;
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

  return await clubsRepository.mapDbClubToClub(updatedClub);
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

/**
 * Get club by admin user ID
 */
export async function getClubByAdminUserId(adminUserId: string): Promise<Club | null> {
  return clubsRepository.getClubByAdminUserId(adminUserId);
}

/**
 * Calculate profile completeness percentage
 * Checks required fields: name, description, sportType, city, address, phone, email, schedule, pricing, ageGroups, logoUrl
 */
export function calculateProfileCompleteness(club: Club): {
  percentage: number;
  completedFields: number;
  totalFields: number;
  missingFields: string[];
} {
  const requiredFields = [
    { key: "name", label: "Nume" },
    { key: "description", label: "Descriere" },
    { key: "sportId", label: "Tip sport" },
    { key: "location.city", label: "Oraș" },
    { key: "location.address", label: "Adresă" },
    { key: "contact.phone", label: "Telefon" },
    { key: "contact.email", label: "Email" },
    { key: "schedule", label: "Program" },
    { key: "pricing", label: "Prețuri" },
    { key: "ageGroups", label: "Grupuri de vârstă" },
    { key: "images", label: "Logo" },
  ];

  let completedFields = 0;
  const missingFields: string[] = [];

  for (const field of requiredFields) {
    let isComplete = false;

    switch (field.key) {
      case "name":
        isComplete = !!club.name && club.name.trim().length > 0;
        break;
      case "description":
        isComplete = !!club.description && club.description.trim().length > 0;
        break;
      case "sportId":
        isComplete = !!club.sportId && club.sportId.trim().length > 0;
        break;
      case "location.city":
        isComplete = !!club.location?.city && club.location.city.trim().length > 0;
        break;
      case "location.address":
        isComplete = !!club.location?.address && club.location.address.trim().length > 0;
        break;
      case "contact.phone":
        isComplete = !!club.contact?.phone && club.contact.phone.trim().length > 0;
        break;
      case "contact.email":
        isComplete = !!club.contact?.email && club.contact.email.trim().length > 0;
        break;
      case "schedule":
        isComplete = !!club.schedule && Array.isArray(club.schedule) && club.schedule.length > 0;
        break;
      case "pricing":
        isComplete = !!club.pricing;
        break;
      case "ageGroups":
        isComplete = !!club.ageGroups && Array.isArray(club.ageGroups) && club.ageGroups.length > 0;
        break;
      case "images":
        isComplete = !!club.images && Array.isArray(club.images) && club.images.length > 0;
        break;
    }

    if (isComplete) {
      completedFields++;
    } else {
      missingFields.push(field.label);
    }
  }

  const totalFields = requiredFields.length;
  const percentage = Math.round((completedFields / totalFields) * 100);

  return {
    percentage,
    completedFields,
    totalFields,
    missingFields,
  };
}
