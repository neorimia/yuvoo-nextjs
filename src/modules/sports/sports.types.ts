/**
 * Sports Types
 *
 * TypeScript types for sports domain.
 */

import type { SportData } from "@/lib/db/seed-data/sports";

/**
 * Sport interface
 * Extends SportData with additional computed fields
 */
export interface Sport extends SportData {
  clubCount?: number; // Number of clubs offering this sport
  verifiedClubCount?: number; // Number of verified clubs offering this sport
}

/**
 * Sport category type
 */
export type SportCategory = "echipa" | "individual" | "combat" | "artistic" | "altul";

/**
 * Sport listing filters
 */
export interface SportFilters {
  category?: SportCategory;
  minAge?: number;
  maxAge?: number;
  search?: string;
}
