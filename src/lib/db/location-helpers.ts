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
 * Get county ID (parent) for a city ID
 * Cities have parentId pointing to their county
 */
export async function getCountyIdByCityId(
  cityId: string | null | undefined
): Promise<string | null> {
  if (!cityId) return null;

  const city = await db.query.locations.findFirst({
    where: and(eq(locations.id, cityId), eq(locations.type, "city")),
    columns: { parentId: true },
  });

  return city?.parentId ?? null;
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

/** Normalize city name for comparison (București, Bucharest). */
function isBucharestCity(cityName: string): boolean {
  const normalized = cityName.trim().toLowerCase().replace(/ș/g, "s").replace(/ț/g, "t");
  return normalized === "bucuresti" || normalized === "bucharest";
}

/**
 * Resolve a quiz/location string to location IDs for filtering (e.g. clubs list URL).
 *
 * Supports formats:
 * - "City, County" (e.g. "Focșani, Vrancea") → countyId, cityId
 * - "Sector N, București" (Bucharest) → countyId, cityId, sectorId
 *
 * @param location - Location string from quiz or form (e.g. "Focșani, Vrancea" or "Sector 1, București")
 * @returns Object with countyId, cityId, sectorId (only set when resolved); empty object on parse failure
 */
export async function resolveLocationToIds(
  location: string | null | undefined
): Promise<{ countyId?: string; cityId?: string; sectorId?: string }> {
  const result: { countyId?: string; cityId?: string; sectorId?: string } = {};
  if (!location?.trim()) return result;

  try {
    const locationParts = location.split(",").map((p) => p.trim());
    if (locationParts.length < 2) return result;

    const firstPart = locationParts[0];
    const secondPart = locationParts[1];
    // Bucharest: "Sector 1, București" → city is second part, sector is first part
    // Other: "Focșani, Vrancea" → city is first part, county is second part
    const isBucharestSector = isBucharestCity(secondPart) && /^Sector\s+\d$/i.test(firstPart);
    const cityName = isBucharestSector ? secondPart : firstPart;
    const cityId = await getCityIdByName(cityName);
    if (!cityId) return result;

    result.cityId = cityId;
    const countyId = await getCountyIdByCityId(cityId);
    if (countyId) result.countyId = countyId;

    if (isBucharestSector) {
      const sectorId = await getSectorIdByName(firstPart, cityId);
      if (sectorId) result.sectorId = sectorId;
    }

    return result;
  } catch (e) {
    console.warn("[resolveLocationToIds] location lookup failed:", e);
    return result;
  }
}
