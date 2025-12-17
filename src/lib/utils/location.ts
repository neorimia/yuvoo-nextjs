/**
 * Location Utilities
 *
 * Helper functions for location-related operations (slug generation, parsing, etc.)
 */

import { generateSlug } from "@/lib/utils";

/**
 * Generate location slug from city and optional district
 * Examples:
 * - "București" -> "bucuresti"
 * - "București", "Sector 1" -> "bucuresti-sector-1"
 */
export function generateLocationSlug(city: string, district?: string): string {
  const citySlug = generateSlug(city);
  if (district) {
    const districtSlug = generateSlug(district);
    return `${citySlug}-${districtSlug}`;
  }
  return citySlug;
}

/**
 * Parse location slug back to city and district
 * Returns { city: string, district?: string }
 */
export function parseLocationSlug(locationSlug: string): {
  city: string;
  district?: string;
} {
  const parts = locationSlug.split("-");

  // Handle Bucharest sectors: "bucuresti-sector-1", "bucuresti-sector-2", etc.
  if (parts.length >= 3 && parts[0] === "bucuresti" && parts[1] === "sector") {
    // Extract sector number (could be just a number or contain additional parts)
    const sectorNumber = parts[2];
    return {
      city: "București",
      district: `Sector ${sectorNumber}`,
    };
  }

  // Handle other city-district combinations
  // Pattern: "city-district" - we'll try to detect if there's a district
  // For now, if it's just "bucuresti", return city only
  if (parts[0] === "bucuresti" && parts.length === 1) {
    return {
      city: "București",
    };
  }

  // Map common city slugs to their proper names
  const cityMap: Record<string, string> = {
    bucuresti: "București",
    cluj: "Cluj-Napoca",
    timisoara: "Timișoara",
    iasi: "Iași",
    constanta: "Constanța",
    brasov: "Brașov",
  };

  // If the first part matches a known city, use it
  if (cityMap[parts[0]]) {
    const city = cityMap[parts[0]];
    // If there are more parts, treat them as district
    if (parts.length > 1) {
      const district = parts
        .slice(1)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      return { city, district };
    }
    return { city };
  }

  // Default: convert slug back to readable format
  // Capitalize first letter of each word
  const city = locationSlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return { city };
}

/**
 * Get display name for location (city + district)
 */
export function getLocationDisplayName(city: string, district?: string): string {
  if (district) {
    return `${district}, ${city}`;
  }
  return city;
}
