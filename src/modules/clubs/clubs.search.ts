/**
 * Clubs Search
 *
 * Search and filtering logic for sports clubs.
 * Handles complex queries with multiple filters, sorting, and pagination.
 */

import { db } from "@/lib/db";
import { clubs } from "@/lib/db/schema";
import { eq, and, ilike, desc, asc, sql, arrayOverlaps } from "drizzle-orm";
import { clubsRepository } from "./clubs.repository";
import type { ClubSearchFilters, ClubSearchResult } from "./clubs.types";

/**
 * Calculate distance between two coordinates using Haversine formula
 * Returns distance in kilometers
 */
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Search clubs with filters
 *
 * Supports filtering by:
 * - sportId: Filter by sport type
 * - age: Filter by age (checks if age is in ageGroups array)
 * - city: Filter by city (case-insensitive)
 * - district: Filter by district (case-insensitive)
 * - level: Filter by experience level
 * - verified: Filter by verification status
 * - featured: Filter by featured status
 * - latitude/longitude + radiusKm: Location-based radius search
 *
 * Supports sorting by:
 * - name: Alphabetical by name
 * - verified: Verified clubs first
 * - rating: Highest rating first
 * - distance: Closest clubs first (requires latitude/longitude)
 *
 * Supports pagination with page and pageSize.
 */
export async function search(filters: ClubSearchFilters): Promise<ClubSearchResult> {
  const page = filters.page || 1;
  const pageSize = filters.pageSize || 20;
  const offset = (page - 1) * pageSize;

  // Check if location-based search is requested
  const hasLocationSearch =
    filters.latitude !== undefined &&
    filters.longitude !== undefined &&
    !isNaN(filters.latitude) &&
    !isNaN(filters.longitude);

  // Build where conditions
  const conditions = [];

  // Sport filter
  if (filters.sportId) {
    conditions.push(eq(clubs.sportType, filters.sportId));
  }

  // Age filter (check if age is in ageGroups array)
  // Use arrayOverlaps to check if ageGroups array contains the age value
  if (filters.age) {
    conditions.push(arrayOverlaps(clubs.ageGroups, [filters.age]));
  }

  // City filter (case-insensitive, exact match preferred)
  if (filters.city) {
    conditions.push(ilike(clubs.city, filters.city));
  }

  // District filter (case-insensitive, exact match preferred)
  if (filters.district) {
    conditions.push(ilike(clubs.district, filters.district));
  }

  // Level filter (check if level is in experienceLevels array)
  // Use arrayOverlaps to check if experienceLevels array contains the level value
  if (filters.level) {
    conditions.push(arrayOverlaps(clubs.experienceLevels, [filters.level]));
  }

  // Verified filter
  if (filters.verified !== undefined) {
    conditions.push(eq(clubs.verified, filters.verified));
  }

  // Featured filter
  if (filters.featured !== undefined) {
    conditions.push(eq(clubs.featured, filters.featured));
  }

  // Location-based radius filter (if coordinates provided)
  if (hasLocationSearch && filters.radiusKm) {
    // Use Haversine formula in SQL to filter by radius
    // Only include clubs that have coordinates
    conditions.push(sql`${clubs.latitude} IS NOT NULL AND ${clubs.longitude} IS NOT NULL`);
    // Calculate distance and filter by radius
    // Haversine formula: distance = 2 * R * asin(sqrt(sin²(Δlat/2) + cos(lat1) * cos(lat2) * sin²(Δlon/2)))
    // Where R = 6371 km (Earth's radius)
    const radiusKm = filters.radiusKm;
    const lat = filters.latitude!;
    const lng = filters.longitude!;
    conditions.push(
      sql`(
        6371 * acos(
          cos(radians(${lat})) *
          cos(radians(CAST(${clubs.latitude} AS DOUBLE PRECISION))) *
          cos(radians(CAST(${clubs.longitude} AS DOUBLE PRECISION)) - radians(${lng})) +
          sin(radians(${lat})) *
          sin(radians(CAST(${clubs.latitude} AS DOUBLE PRECISION)))
        )
      ) <= ${radiusKm}`
    );
  }

  // Build where clause
  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  // Build order by clause
  let orderBy;
  if (filters.sortBy === "distance" && hasLocationSearch) {
    // Sort by distance (closest first)
    const lat = filters.latitude!;
    const lng = filters.longitude!;
    orderBy = [
      sql`(
        6371 * acos(
          cos(radians(${lat})) *
          cos(radians(CAST(${clubs.latitude} AS DOUBLE PRECISION))) *
          cos(radians(CAST(${clubs.longitude} AS DOUBLE PRECISION)) - radians(${lng})) +
          sin(radians(${lat})) *
          sin(radians(CAST(${clubs.latitude} AS DOUBLE PRECISION)))
        )
      ) ASC`,
      desc(clubs.verified),
      desc(clubs.featured),
      asc(clubs.name),
    ];
  } else {
    switch (filters.sortBy) {
      case "name":
        orderBy = [asc(clubs.name)];
        break;
      case "rating":
        orderBy = [desc(clubs.rating), desc(clubs.verified), asc(clubs.name)];
        break;
      case "verified":
      default:
        orderBy = [desc(clubs.verified), desc(clubs.featured), desc(clubs.rating), asc(clubs.name)];
        break;
    }
  }

  // Get total count (for pagination metadata)
  const countResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(clubs)
    .where(whereClause);
  const total = Number(countResult[0]?.count || 0);

  // Get paginated results
  const results = await db.query.clubs.findMany({
    where: whereClause,
    orderBy,
    limit: pageSize,
    offset,
  });

  // Map database results to Club type
  const clubsList = results.map(clubsRepository.mapDbClubToClub);

  // Calculate distances if location-based search was used
  const distances = new Map<string, number>();
  if (hasLocationSearch && filters.latitude !== undefined && filters.longitude !== undefined) {
    clubsList.forEach((club) => {
      if (club.location.coordinates) {
        const distance = calculateDistance(
          filters.latitude!,
          filters.longitude!,
          club.location.coordinates.lat,
          club.location.coordinates.lng
        );
        distances.set(club.id, distance);
      }
    });
  }

  return {
    clubs: clubsList,
    total,
    page,
    pageSize,
    distances: distances.size > 0 ? distances : undefined,
  };
}

export const clubsSearch = {
  search,
};
