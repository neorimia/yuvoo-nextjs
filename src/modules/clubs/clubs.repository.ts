/**
 * Clubs Repository
 *
 * Data access layer for sports clubs.
 * Handles database queries for club data using Drizzle ORM.
 */

import { db } from "@/lib/db";
import { clubs } from "@/lib/db/schema";
import { eq, desc, asc, inArray } from "drizzle-orm";
import { getLocationNamesByIds } from "@/lib/db/location-helpers";
import type { Club } from "./clubs.types";

/**
 * Map database club record to Club type
 * Maps all fields from schema to Club interface, handling optional fields and defaults.
 * Phase 5: Now populates location names from foreign keys when available.
 */
export async function mapDbClubToClub(dbClub: typeof clubs.$inferSelect): Promise<Club> {
  // Parse schedule from JSONB - handle both old format (time) and new format (startTime/endTime)
  // Schema: schedule jsonb default '[]'
  const scheduleData = dbClub.schedule as unknown;
  const schedule: Club["schedule"] =
    Array.isArray(scheduleData) && scheduleData.length > 0
      ? (scheduleData as { day: string; time?: string; startTime?: string; endTime?: string }[])
      : undefined;

  // Parse pricing from JSONB (can be array or object)
  // Schema: pricing jsonb default '[]'
  // Always return as array for consistency
  const pricingData = dbClub.pricing as unknown;
  let pricing: Club["pricing"] = undefined;
  if (pricingData) {
    if (Array.isArray(pricingData) && pricingData.length > 0) {
      // If array, use directly
      pricing = pricingData as Club["pricing"];
    } else if (typeof pricingData === "object" && pricingData !== null) {
      // If single object, wrap in array for backward compatibility
      pricing = [
        pricingData as {
          type: "monthly" | "per_class" | "per_semester";
          amount: number;
          currency: "RON";
        },
      ];
    }
  }

  // Build location with coordinates
  // Phase 5: Populate location names from foreign keys when available, fallback to text fields
  // Schema: city (notNull), district (optional), address (optional), latitude/longitude (optional)
  // Schema: cityId (notNull), sectorId (optional), countyId (notNull) - Phase 3
  const locationIds = [dbClub.cityId, dbClub.sectorId, dbClub.countyId].filter(
    (id): id is string => !!id
  );
  const locationNames = await getLocationNamesByIds(locationIds);

  const location: Club["location"] = {
    // Phase 6: Location names are now always fetched from foreign keys (no text fallback)
    city: locationNames.get(dbClub.cityId || "") || "", // Required - must have cityId
    district: dbClub.sectorId ? locationNames.get(dbClub.sectorId) || undefined : undefined, // Optional
    address: dbClub.address || "", // Schema: optional, but interface requires string
    coordinates:
      dbClub.latitude && dbClub.longitude
        ? {
            lat: parseFloat(dbClub.latitude),
            lng: parseFloat(dbClub.longitude),
          }
        : undefined,
    // Phase 5: Include location IDs for filtering and joins
    cityId: dbClub.cityId || undefined,
    sectorId: dbClub.sectorId || undefined,
    countyId: dbClub.countyId || undefined,
  };

  // Map images from logoUrl and galleryUrls
  // Schema: logoUrl (optional), galleryUrls (text array, default '{}')
  const images: string[] = [];
  if (dbClub.logoUrl) {
    images.push(dbClub.logoUrl);
  }
  if (dbClub.galleryUrls && Array.isArray(dbClub.galleryUrls)) {
    images.push(...dbClub.galleryUrls);
  }

  return {
    id: dbClub.id, // Schema: primaryKey
    name: dbClub.name, // Schema: notNull
    slug: dbClub.slug || "", // Schema: unique, optional (but interface requires string)
    description: dbClub.description || "", // Schema: optional (but interface requires string)
    sportId: dbClub.sportType, // Schema: sport_type (notNull) - mapped to sportId
    sportName: dbClub.sportType, // Schema: sport_type (notNull) - TODO: Map to sport name from sports table
    location,
    ageGroups: dbClub.ageGroups || [], // Schema: integer array, default '{}'
    levels: dbClub.experienceLevels || [], // Schema: text array, default '{}'
    verified: dbClub.verified || false, // Schema: boolean, default false, notNull
    featured: dbClub.featured || false, // Schema: boolean, default false, notNull
    logoUrl: dbClub.logoUrl || "", // Schema: logo_url (optional text) - default to empty string for interface requirement
    galleryUrls: dbClub.galleryUrls || [], // Schema: gallery_urls (text array, default '{}')
    images, // Computed from logoUrl + galleryUrls for backward compatibility
    contact: {
      phone: dbClub.phone || undefined, // Schema: optional
      email: dbClub.email || undefined, // Schema: optional
      website: dbClub.website || undefined, // Schema: optional
    },
    schedule,
    pricing,
    verificationStatus: dbClub.verificationStatus || "pending", // Schema: notNull, default "pending"
    verificationDocuments: dbClub.verificationDocuments || [], // Schema: text array, default '{}'
    profileComplete: dbClub.profileComplete ?? false, // Schema: notNull, default false
    rating: dbClub.rating || 0, // Schema: integer, default 0
    createdAt: dbClub.createdAt, // Schema: notNull, defaultNow
    updatedAt: dbClub.updatedAt, // Schema: notNull, defaultNow
  };
}

/**
 * Get club by slug
 */
export async function getClubBySlug(slug: string): Promise<Club | null> {
  const dbClub = await db.query.clubs.findFirst({
    where: eq(clubs.slug, slug),
  });

  if (!dbClub) {
    return null;
  }

  return await mapDbClubToClub(dbClub);
}

/**
 * Get club by ID
 */
export async function getClubById(id: string): Promise<Club | null> {
  const dbClub = await db.query.clubs.findFirst({
    where: eq(clubs.id, id),
  });

  if (!dbClub) {
    return null;
  }

  return await mapDbClubToClub(dbClub);
}

/**
 * Get all clubs
 */
export async function getAllClubs(): Promise<Club[]> {
  const dbClubs = await db.query.clubs.findMany({
    orderBy: [desc(clubs.createdAt)],
  });

  return Promise.all(dbClubs.map(mapDbClubToClub));
}

/**
 * Get clubs by verification status
 */
export async function getClubsByVerificationStatus(
  status: "pending" | "in_review" | "approved" | "rejected"
): Promise<Club[]> {
  const dbClubs = await db.query.clubs.findMany({
    where: eq(clubs.verificationStatus, status),
    orderBy: [asc(clubs.createdAt)], // Oldest first (FIFO for review queue)
  });

  return Promise.all(dbClubs.map(mapDbClubToClub));
}

/**
 * Get clubs pending verification (pending or in_review)
 */
export async function getClubsPendingVerification(): Promise<Club[]> {
  const dbClubs = await db.query.clubs.findMany({
    where: inArray(clubs.verificationStatus, ["pending", "in_review"]),
    orderBy: [asc(clubs.createdAt)], // Oldest first
  });

  return Promise.all(dbClubs.map(mapDbClubToClub));
}

/**
 * Get clubs by sport type
 */
export async function findBySportType(sportType: string): Promise<Club[]> {
  const dbClubs = await db.query.clubs.findMany({
    where: eq(clubs.sportType, sportType),
    orderBy: [desc(clubs.verified), desc(clubs.createdAt)], // Verified first, then newest
  });

  return Promise.all(dbClubs.map(mapDbClubToClub));
}

/**
 * Get unique locations (city/district combinations) from clubs
 * Phase 6: Updated to use location foreign keys instead of text columns
 * Returns array of { city, district? } objects
 */
export async function getUniqueLocations(): Promise<Array<{ city: string; district?: string }>> {
  const dbClubs = await db.query.clubs.findMany({
    columns: {
      cityId: true,
      sectorId: true,
    },
  });

  // Collect all unique location IDs
  const locationIds = new Set<string>();
  const locationPairs = new Map<string, { cityId: string; sectorId?: string }>();

  for (const club of dbClubs) {
    if (!club.cityId) continue; // Skip clubs without cityId

    const key = club.sectorId ? `${club.cityId}|${club.sectorId}` : club.cityId;

    if (!locationPairs.has(key)) {
      locationPairs.set(key, {
        cityId: club.cityId,
        sectorId: club.sectorId || undefined,
      });
      locationIds.add(club.cityId);
      if (club.sectorId) locationIds.add(club.sectorId);
    }
  }

  // Fetch location names
  const locationNames = await getLocationNamesByIds(Array.from(locationIds));

  // Build result array
  const locations: Array<{ city: string; district?: string }> = [];
  for (const { cityId, sectorId } of locationPairs.values()) {
    const city = locationNames.get(cityId);
    if (city) {
      locations.push({
        city,
        district: sectorId ? locationNames.get(sectorId) || undefined : undefined,
      });
    }
  }

  return locations;
}

/**
 * Get club by admin user ID
 */
export async function getClubByAdminUserId(adminUserId: string): Promise<Club | null> {
  const dbClub = await db.query.clubs.findFirst({
    where: eq(clubs.adminUserId, adminUserId),
  });

  if (!dbClub) {
    return null;
  }

  return await mapDbClubToClub(dbClub);
}

export const clubsRepository = {
  getClubBySlug,
  getClubById,
  getAllClubs,
  getClubsByVerificationStatus,
  getClubsPendingVerification,
  findBySportType,
  getUniqueLocations,
  getClubByAdminUserId,
  mapDbClubToClub,
};
