/**
 * Clubs Repository
 *
 * Data access layer for sports clubs.
 * Handles database queries for club data using Drizzle ORM.
 */

import { db } from "@/lib/db";
import { clubs } from "@/lib/db/schema";
import { eq, desc, asc, inArray } from "drizzle-orm";
import type { Club } from "./clubs.types";

/**
 * Map database club record to Club type
 * Maps all fields from schema to Club interface, handling optional fields and defaults.
 */
export function mapDbClubToClub(dbClub: typeof clubs.$inferSelect): Club {
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
  // Schema: city (notNull), district (optional), address (optional), latitude/longitude (optional)
  const location: Club["location"] = {
    city: dbClub.city, // Schema: notNull
    district: dbClub.district || undefined, // Schema: optional
    address: dbClub.address || "", // Schema: optional, but interface requires string
    coordinates:
      dbClub.latitude && dbClub.longitude
        ? {
            lat: parseFloat(dbClub.latitude),
            lng: parseFloat(dbClub.longitude),
          }
        : undefined,
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

  return mapDbClubToClub(dbClub);
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

  return mapDbClubToClub(dbClub);
}

/**
 * Get all clubs
 */
export async function getAllClubs(): Promise<Club[]> {
  const dbClubs = await db.query.clubs.findMany({
    orderBy: [desc(clubs.createdAt)],
  });

  return dbClubs.map(mapDbClubToClub);
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

  return dbClubs.map(mapDbClubToClub);
}

/**
 * Get clubs pending verification (pending or in_review)
 */
export async function getClubsPendingVerification(): Promise<Club[]> {
  const dbClubs = await db.query.clubs.findMany({
    where: inArray(clubs.verificationStatus, ["pending", "in_review"]),
    orderBy: [asc(clubs.createdAt)], // Oldest first
  });

  return dbClubs.map(mapDbClubToClub);
}

/**
 * Get clubs by sport type
 */
export async function findBySportType(sportType: string): Promise<Club[]> {
  const dbClubs = await db.query.clubs.findMany({
    where: eq(clubs.sportType, sportType),
    orderBy: [desc(clubs.verified), desc(clubs.createdAt)], // Verified first, then newest
  });

  return dbClubs.map(mapDbClubToClub);
}

/**
 * Get unique locations (city/district combinations) from clubs
 * Returns array of { city, district? } objects
 */
export async function getUniqueLocations(): Promise<Array<{ city: string; district?: string }>> {
  const dbClubs = await db.query.clubs.findMany({
    columns: {
      city: true,
      district: true,
    },
  });

  // Use Set to track unique combinations
  const locationSet = new Set<string>();
  const locations: Array<{ city: string; district?: string }> = [];

  for (const club of dbClubs) {
    // Create a unique key for city/district combination
    const key = club.district ? `${club.city}|${club.district}` : club.city;

    if (!locationSet.has(key)) {
      locationSet.add(key);
      locations.push({
        city: club.city,
        district: club.district || undefined,
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

  return mapDbClubToClub(dbClub);
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
