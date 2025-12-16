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

  // Map images
  const images: string[] = [];
  if (dbClub.logoUrl) {
    images.push(dbClub.logoUrl);
  }
  if (dbClub.galleryUrls && Array.isArray(dbClub.galleryUrls)) {
    images.push(...dbClub.galleryUrls);
  }

  return {
    id: dbClub.id,
    name: dbClub.name,
    slug: dbClub.slug || "",
    description: dbClub.description || "",
    sportId: dbClub.sportType, // Map sportType to sportId
    sportName: dbClub.sportType, // TODO: Map to sport name from sports table
    location,
    ageGroups: dbClub.ageGroups || [],
    levels: dbClub.experienceLevels || [],
    verified: dbClub.verified,
    featured: dbClub.featured,
    images,
    contact: {
      phone: dbClub.phone || undefined,
      email: dbClub.email || undefined,
      website: dbClub.website || undefined,
    },
    schedule,
    pricing,
    verificationStatus: dbClub.verificationStatus,
    verificationDocuments: dbClub.verificationDocuments || [],
    createdAt: dbClub.createdAt,
    updatedAt: dbClub.updatedAt,
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

export const clubsRepository = {
  getClubBySlug,
  getClubById,
  getAllClubs,
  getClubsByVerificationStatus,
  getClubsPendingVerification,
  findBySportType,
};
