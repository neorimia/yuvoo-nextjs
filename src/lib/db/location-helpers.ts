/**
 * Location Helpers
 *
 * Utility functions for working with location foreign keys.
 * Provides helpers to fetch location names from IDs and vice versa.
 */

import { db } from "@/lib/db";
import { locations } from "@/lib/db/schema";
import { eq, and, inArray } from "drizzle-orm";

/**
 * Get location name by ID
 */
export async function getLocationNameById(
  locationId: string | null | undefined
): Promise<string | null> {
  if (!locationId) return null;

  const location = await db.query.locations.findFirst({
    where: eq(locations.id, locationId),
    columns: { name: true },
  });

  return location?.name || null;
}

/**
 * Get multiple location names by IDs
 * Returns a Map<locationId, locationName>
 */
export async function getLocationNamesByIds(
  locationIds: (string | null | undefined)[]
): Promise<Map<string, string>> {
  const validIds = locationIds.filter((id): id is string => !!id);
  if (validIds.length === 0) return new Map();

  const locationsList = await db.query.locations.findMany({
    where: inArray(locations.id, validIds),
    columns: { id: true, name: true },
  });

  const map = new Map<string, string>();
  for (const loc of locationsList) {
    if (validIds.includes(loc.id)) {
      map.set(loc.id, loc.name);
    }
  }

  return map;
}

/**
 * Get location IDs for a city name (fuzzy match)
 * Returns the first matching location ID or null
 */
export async function getCityIdByName(cityName: string): Promise<string | null> {
  if (!cityName) return null;

  const location = await db.query.locations.findFirst({
    where: and(eq(locations.type, "city"), eq(locations.name, cityName)),
    columns: { id: true },
  });

  return location?.id || null;
}

/**
 * Get location IDs for a sector name within a city
 */
export async function getSectorIdByName(
  sectorName: string,
  cityId: string
): Promise<string | null> {
  if (!sectorName || !cityId) return null;

  const location = await db.query.locations.findFirst({
    where: and(
      eq(locations.type, "sector"),
      eq(locations.name, sectorName),
      eq(locations.parentId, cityId)
    ),
    columns: { id: true },
  });

  return location?.id || null;
}
