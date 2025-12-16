/**
 * Clubs Repository
 *
 * Data access layer for sports clubs.
 * Handles database queries for club data using Drizzle ORM.
 */

import { db } from "@/lib/db";
import { clubs } from "@/lib/db/schema";
import { eq, desc, asc } from "drizzle-orm";
import type { Club } from "./clubs.types";

/**
 * Map database club record to Club type
 */
function mapDbClubToClub(dbClub: typeof clubs.$inferSelect): Club {
  // Parse schedule from JSONB
  const scheduleData = dbClub.schedule as unknown;
  const schedule =
    Array.isArray(scheduleData) && scheduleData.length > 0
      ? (scheduleData as { day: string; time: string }[])
      : undefined;

  // Parse pricing from JSONB (can be array or object)
  const pricingData = dbClub.pricing as unknown;
  let pricing: Club["pricing"] = undefined;
  if (pricingData) {
    if (Array.isArray(pricingData) && pricingData.length > 0) {
      // If array, take first pricing option
      pricing = pricingData[0] as Club["pricing"];
    } else if (typeof pricingData === "object" && pricingData !== null) {
      // If object, use directly
      pricing = pricingData as Club["pricing"];
    }
  }

  // Build location with coordinates
  const location: Club["location"] = {
    city: dbClub.city,
    district: dbClub.district || undefined,
    address: dbClub.address || "",
    coordinates:
      dbClub.latitude && dbClub.longitude
        ? {
            lat: parseFloat(dbClub.latitude),
            lng: parseFloat(dbClub.longitude),
          }
        : undefined,
  };

  // Build contact info
  const contact: Club["contact"] = {
    phone: dbClub.phone || undefined,
    email: dbClub.email || undefined,
    website: dbClub.website || undefined,
  };

  // Map sportType to sportId and sportName
  // For now, sportType is the sportId, and we'll use it as sportName too
  // TODO: Join with sports table when available
  const sportId = dbClub.sportType;
  const sportName = dbClub.sportType; // Will be replaced with actual sport name from sports table

  return {
    id: dbClub.id,
    name: dbClub.name,
    slug: dbClub.slug || dbClub.id, // Fallback to ID if slug is null
    description: dbClub.description || "",
    sportId,
    sportName,
    location,
    ageGroups: dbClub.ageGroups || [],
    levels: dbClub.experienceLevels || [],
    verified: dbClub.verified || false,
    featured: dbClub.featured || false,
    images: dbClub.galleryUrls || [],
    contact,
    schedule,
    pricing,
    createdAt: dbClub.createdAt,
    updatedAt: dbClub.updatedAt,
  };
}

/**
 * Find club by slug
 */
export async function findBySlug(slug: string): Promise<Club | null> {
  const club = await db.query.clubs.findFirst({
    where: eq(clubs.slug, slug),
  });

  if (!club) {
    return null;
  }

  return mapDbClubToClub(club);
}

/**
 * Find clubs by sport
 */
export async function findBySport(sportId: string): Promise<Club[]> {
  const results = await db.query.clubs.findMany({
    where: eq(clubs.sportType, sportId),
    orderBy: [desc(clubs.verified), desc(clubs.rating), asc(clubs.name)],
  });

  return results.map(mapDbClubToClub);
}

/**
 * Find verified clubs
 */
export async function findVerified(): Promise<Club[]> {
  const results = await db.query.clubs.findMany({
    where: eq(clubs.verified, true),
    orderBy: [desc(clubs.featured), desc(clubs.rating), asc(clubs.name)],
  });

  return results.map(mapDbClubToClub);
}

/**
 * Find all clubs
 */
export async function findAll(): Promise<Club[]> {
  const results = await db.query.clubs.findMany({
    orderBy: [desc(clubs.verified), desc(clubs.featured), desc(clubs.rating), asc(clubs.name)],
  });

  return results.map(mapDbClubToClub);
}

export const clubsRepository = {
  findBySlug,
  findBySport,
  findVerified,
  findAll,
  mapDbClubToClub, // Export for use in search service
};
