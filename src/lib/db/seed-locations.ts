/**
 * Locations Seed Script
 *
 * Populates the locations table with all Romanian counties, cities, and sectors.
 * Run with: npx tsx src/lib/db/seed-locations.ts
 *
 * This script:
 * - Removes duplicates from the data
 * - Validates parent-child relationships
 * - Inserts data in correct order (counties → cities → sectors)
 * - Is idempotent (can be run multiple times safely)
 *
 * Last Updated: January 2025
 */

import * as dotenv from "dotenv";
import { db } from "./index";
import { locations } from "./schema";
import { eq } from "drizzle-orm";
import {
  counties,
  countyCapitals,
  bucharestSectors,
  majorCities,
  type LocationData,
} from "./locations-data";

// Load environment variables
dotenv.config({ path: ".env.local" });

/**
 * Remove duplicates from location data
 * Removes duplicates by:
 * 1. ID (same location ID appears multiple times)
 * 2. (name, type, parentId) combination (same location with different IDs)
 *
 * For duplicates by (name, type, parentId), keeps the first occurrence.
 */
function removeDuplicates(locations: LocationData[]): LocationData[] {
  const seenIds = new Set<string>();
  const seenKeyCombinations = new Set<string>();
  const unique: LocationData[] = [];

  for (const loc of locations) {
    // Skip if we've already seen this ID
    if (seenIds.has(loc.id)) {
      continue;
    }

    // Create a composite key for (name, type, parentId)
    // This ensures we don't have duplicate locations with different IDs
    const key = `${loc.name}|${loc.type}|${loc.parentId || "null"}`;

    // Skip if we've already seen this (name, type, parentId) combination
    if (seenKeyCombinations.has(key)) {
      console.log(`   ⚠️  Skipping duplicate: ${loc.name} (${loc.type}) - ID: ${loc.id}`);
      continue;
    }

    // Add to both sets and include in unique array
    seenIds.add(loc.id);
    seenKeyCombinations.add(key);
    unique.push(loc);
  }

  return unique;
}

/**
 * Validate parent-child relationships
 * Ensures all parentId references point to existing locations
 */
function validateRelationships(allLocations: LocationData[]): { valid: boolean; errors: string[] } {
  const locationIds = new Set(allLocations.map((loc) => loc.id));
  const errors: string[] = [];

  for (const loc of allLocations) {
    if (loc.parentId !== null && !locationIds.has(loc.parentId)) {
      errors.push(`Location ${loc.id} (${loc.name}) has invalid parentId: ${loc.parentId}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Sort locations by insertion order
 * Counties first (no parent), then cities (parent = county), then sectors (parent = city)
 */
function sortForInsertion(locations: LocationData[]): LocationData[] {
  return locations.sort((a, b) => {
    // Counties first (parentId is null)
    if (a.parentId === null && b.parentId !== null) return -1;
    if (a.parentId !== null && b.parentId === null) return 1;

    // If both have parents or both don't, sort by type
    const typeOrder = { county: 0, city: 1, sector: 2 };
    const typeDiff = typeOrder[a.type] - typeOrder[b.type];
    if (typeDiff !== 0) return typeDiff;

    // If same type, sort by name
    return a.name.localeCompare(b.name, "ro");
  });
}

/**
 * Seed Locations
 */
async function seedLocations() {
  console.log("🌍 Seeding locations (counties, cities, sectors)...\n");

  // Combine all location data
  let allLocationsData: LocationData[] = [
    ...counties,
    ...countyCapitals,
    ...bucharestSectors,
    ...majorCities,
  ];

  console.log(`📊 Initial data count: ${allLocationsData.length} locations`);

  // Remove duplicates
  allLocationsData = removeDuplicates(allLocationsData);
  console.log(`   After deduplication: ${allLocationsData.length} unique locations`);

  // Validate relationships
  const validation = validateRelationships(allLocationsData);
  if (!validation.valid) {
    console.error("\n❌ Validation errors found:");
    validation.errors.forEach((error) => console.error(`   - ${error}`));
    throw new Error("Location data validation failed");
  }
  console.log("   ✅ All parent-child relationships are valid");

  // Sort for insertion (counties → cities → sectors)
  allLocationsData = sortForInsertion(allLocationsData);

  // Count by type
  const countiesCount = allLocationsData.filter((loc) => loc.type === "county").length;
  const citiesCount = allLocationsData.filter((loc) => loc.type === "city").length;
  const sectorsCount = allLocationsData.filter((loc) => loc.type === "sector").length;

  console.log(`\n📋 Data breakdown:`);
  console.log(`   - Counties: ${countiesCount}`);
  console.log(`   - Cities: ${citiesCount}`);
  console.log(`   - Sectors: ${sectorsCount}`);
  console.log(`   - Total: ${allLocationsData.length}\n`);

  // Insert locations
  let locationsCreated = 0;
  let locationsSkipped = 0;
  let locationsUpdated = 0;
  const errors: string[] = [];

  for (const loc of allLocationsData) {
    try {
      // Check if location already exists
      const existingLocations = await db
        .select()
        .from(locations)
        .where(eq(locations.id, loc.id))
        .limit(1);
      const existing = existingLocations[0] || null;

      if (existing) {
        // Update if data has changed
        const hasChanges =
          existing.name !== loc.name ||
          existing.type !== loc.type ||
          existing.parentId !== loc.parentId ||
          existing.code !== loc.code ||
          existing.isActive !== true;

        if (hasChanges) {
          await db
            .update(locations)
            .set({
              name: loc.name,
              type: loc.type,
              parentId: loc.parentId as string | null,
              code: loc.code,
              isActive: true,
              updatedAt: new Date(),
            })
            .where(eq(locations.id, loc.id));
          locationsUpdated++;
          console.log(`   🔄 Updated: ${loc.name} (${loc.type})`);
        } else {
          locationsSkipped++;
        }
      } else {
        // Insert new location
        await db.insert(locations).values({
          id: loc.id,
          name: loc.name,
          type: loc.type,
          parentId: loc.parentId as string | null,
          code: loc.code,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        locationsCreated++;
        if (locationsCreated % 50 === 0) {
          console.log(`   ✅ Inserted ${locationsCreated} locations...`);
        }
      }
    } catch (error: unknown) {
      const err = error as { code?: string; message?: string };
      const errorMsg = `Error processing ${loc.name} (${loc.id}): ${err?.message || String(error)}`;
      errors.push(errorMsg);
      console.error(`   ❌ ${errorMsg}`);
    }
  }

  console.log(`\n📊 Seeding Summary:`);
  console.log(`   ✅ Created: ${locationsCreated} locations`);
  console.log(`   🔄 Updated: ${locationsUpdated} locations`);
  console.log(`   ⚠️  Skipped: ${locationsSkipped} locations (already exist)`);

  if (errors.length > 0) {
    console.log(`   ❌ Errors: ${errors.length}`);
    console.log("\n❌ Errors encountered:");
    errors.forEach((error) => console.error(`   - ${error}`));
    throw new Error(`Failed to seed ${errors.length} locations`);
  }

  // Verify final counts
  const finalCounts = await db.query.locations.findMany({
    columns: { type: true },
  });

  const finalCounties = finalCounts.filter((loc) => loc.type === "county").length;
  const finalCities = finalCounts.filter((loc) => loc.type === "city").length;
  const finalSectors = finalCounts.filter((loc) => loc.type === "sector").length;

  console.log(`\n✅ Verification:`);
  console.log(`   - Counties in DB: ${finalCounties}`);
  console.log(`   - Cities in DB: ${finalCities}`);
  console.log(`   - Sectors in DB: ${finalSectors}`);
  console.log(`   - Total in DB: ${finalCounts.length}`);

  return {
    created: locationsCreated,
    updated: locationsUpdated,
    skipped: locationsSkipped,
    total: allLocationsData.length,
    finalCount: finalCounts.length,
  };
}

/**
 * Main seed function
 */
async function seed() {
  try {
    console.log("🌱 Starting locations seed...\n");

    const result = await seedLocations();

    console.log("\n✅ Locations seed completed successfully!");
    console.log("\n📊 Final Summary:");
    console.log(`   - Locations created: ${result.created}`);
    console.log(`   - Locations updated: ${result.updated}`);
    console.log(`   - Locations skipped: ${result.skipped}`);
    console.log(`   - Total processed: ${result.total}`);
    console.log(`   - Final count in DB: ${result.finalCount}`);

    // Verify data integrity
    console.log("\n🔍 Data Integrity Check:");

    // Check for orphaned locations (parentId that doesn't exist)
    const allLocationsInDb = await db.query.locations.findMany({
      columns: { id: true, parentId: true, name: true, type: true },
    });

    const locationIds = new Set(allLocationsInDb.map((loc) => loc.id));
    const orphaned: string[] = [];

    for (const loc of allLocationsInDb) {
      if (loc.parentId !== null && !locationIds.has(loc.parentId)) {
        orphaned.push(`${loc.name} (${loc.id}) - parent ${loc.parentId} not found`);
      }
    }

    if (orphaned.length > 0) {
      console.log(`   ⚠️  Found ${orphaned.length} orphaned locations:`);
      orphaned.forEach((orphan) => console.log(`      - ${orphan}`));
    } else {
      console.log("   ✅ No orphaned locations found");
    }

    // Check for counties without proper structure
    const countiesInDb = allLocationsInDb.filter((loc) => loc.type === "county");
    const countiesWithParent = countiesInDb.filter((loc) => loc.parentId !== null);
    if (countiesWithParent.length > 0) {
      console.log(
        `   ⚠️  Found ${countiesWithParent.length} counties with parent (should be null)`
      );
    } else {
      console.log("   ✅ All counties have null parentId");
    }
  } catch (error) {
    console.error("\n❌ Error seeding locations:", error);
    process.exit(1);
  }
}

// Run seed if called directly
if (require.main === module) {
  seed()
    .then(() => {
      console.log("\n✨ Locations seed process finished!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Locations seed process failed:", error);
      process.exit(1);
    });
}

export { seed, seedLocations };
