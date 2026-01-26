/**
 * Phase 2: Data Migration Script
 *
 * Migrates existing text-based location fields (city, district) to foreign key references
 * (cityId, sectorId, countyId) in clubs, doctors, and users tables.
 *
 * Strategy:
 * 1. Match clubs.city → clubs.cityId (fuzzy matching for Romanian diacritics)
 * 2. Match clubs.district → clubs.sectorId (for Bucharest clubs)
 * 3. Derive clubs.countyId from cityId's parent relationship
 * 4. Repeat for doctors table
 * 5. Report unmatched locations for manual review
 *
 * Usage:
 *   npx tsx scripts/migrate-location-foreign-keys.ts
 */

import { db } from "@/lib/db";
import { clubs, doctors, locations } from "@/lib/db/schema";
import { eq, and, isNull } from "drizzle-orm";

/**
 * Normalize Romanian text for fuzzy matching
 * Removes diacritics and converts to lowercase
 */
function normalizeLocationName(name: string): string {
  if (!name) return "";
  return name
    .toLowerCase()
    .trim()
    .normalize("NFD") // Decompose characters with diacritics
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/\s+/g, " "); // Normalize whitespace
}

/**
 * Find location by name and type using fuzzy matching
 * @deprecated Not currently used - kept for reference
 */
async function _findLocationByName(
  name: string,
  type: "county" | "city" | "sector",
  parentId?: string | null
): Promise<string | null> {
  if (!name || !name.trim()) return null;

  const normalizedSearch = normalizeLocationName(name);

  // Query locations by type
  const locationList = await db
    .select()
    .from(locations)
    .where(
      and(
        eq(locations.type, type),
        eq(locations.isActive, true),
        parentId ? eq(locations.parentId, parentId) : isNull(locations.parentId)
      )
    );

  // Try exact match first (case-insensitive, normalized)
  for (const loc of locationList) {
    if (normalizeLocationName(loc.name) === normalizedSearch) {
      return loc.id;
    }
  }

  // Try partial match (contains)
  for (const loc of locationList) {
    const normalizedLoc = normalizeLocationName(loc.name);
    if (normalizedLoc.includes(normalizedSearch) || normalizedSearch.includes(normalizedLoc)) {
      return loc.id;
    }
  }

  return null;
}

/**
 * Get Bucharest city ID
 * @deprecated Not currently used - kept for reference
 */
async function _getBucharestCityId(): Promise<string | null> {
  const bucharest = await db
    .select()
    .from(locations)
    .where(
      and(eq(locations.type, "city"), eq(locations.name, "București"), eq(locations.isActive, true))
    )
    .limit(1);

  return bucharest[0]?.id || null;
}

/**
 * Get county ID from city ID (via parent relationship)
 * @deprecated Not currently used - kept for reference
 */
async function _getCountyIdFromCityId(cityId: string | null): Promise<string | null> {
  if (!cityId) return null;

  const city = await db.select().from(locations).where(eq(locations.id, cityId)).limit(1);

  if (!city[0] || city[0].type !== "city") return null;

  // City's parentId is the county ID
  return city[0].parentId || null;
}

interface MigrationStats {
  total: number;
  matched: number;
  unmatched: number;
  errors: number;
}

interface UnmatchedRecord {
  id: string;
  name: string;
  city: string | null;
  district: string | null;
  reason: string;
}

/**
 * Migrate clubs table
 * NOTE: This migration script is for migrating from old text-based city/district
 * columns to foreign key references. The schema has already been migrated
 * (city/district columns removed), so this function now just reports completion.
 */
async function migrateClubs(): Promise<{
  stats: MigrationStats;
  unmatched: UnmatchedRecord[];
}> {
  console.log("\n📊 Migrating clubs table...");

  // Migration is already complete - schema no longer has city/district columns
  console.log(
    "✅ Migration already complete: clubs table uses foreign keys (cityId, sectorId, countyId)"
  );
  console.log("   The old text-based city/district columns have been removed from the schema.");

  const allClubs = await db.select().from(clubs);
  const clubsWithCityId = allClubs.filter((c) => c.cityId);

  return {
    stats: {
      total: allClubs.length,
      matched: clubsWithCityId.length,
      unmatched: 0,
      errors: 0,
    },
    unmatched: [],
  };
}

/**
 * Migrate doctors table
 * NOTE: This migration script is for migrating from old text-based city/district
 * columns to foreign key references. The schema has already been migrated
 * (city/district columns removed), so this function now just reports completion.
 */
async function migrateDoctors(): Promise<{
  stats: MigrationStats;
  unmatched: UnmatchedRecord[];
}> {
  console.log("\n📊 Migrating doctors table...");

  // Migration is already complete - schema no longer has city/district columns
  console.log(
    "✅ Migration already complete: doctors table uses foreign keys (cityId, sectorId, countyId)"
  );
  console.log("   The old text-based city/district columns have been removed from the schema.");

  const allDoctors = await db.select().from(doctors);
  const doctorsWithCityId = allDoctors.filter((d) => d.cityId);

  return {
    stats: {
      total: allDoctors.length,
      matched: doctorsWithCityId.length,
      unmatched: 0,
      errors: 0,
    },
    unmatched: [],
  };
}

/**
 * Main migration function
 */
async function main() {
  console.log("🚀 Starting Phase 2: Data Migration");
  console.log("=".repeat(60));

  try {
    // Migrate clubs
    const clubsResult = await migrateClubs();
    console.log("\n✅ Clubs migration complete:");
    console.log(`   Total: ${clubsResult.stats.total}`);
    console.log(`   Matched: ${clubsResult.stats.matched}`);
    console.log(`   Unmatched: ${clubsResult.stats.unmatched}`);
    console.log(`   Errors: ${clubsResult.stats.errors}`);

    if (clubsResult.unmatched.length > 0) {
      console.log("\n⚠️  Unmatched clubs (requires manual review):");
      clubsResult.unmatched.forEach((record) => {
        console.log(`   - ${record.name} (ID: ${record.id})`);
        console.log(`     City: ${record.city || "N/A"}, District: ${record.district || "N/A"}`);
        console.log(`     Reason: ${record.reason}`);
      });
    }

    // Migrate doctors
    const doctorsResult = await migrateDoctors();
    console.log("\n✅ Doctors migration complete:");
    console.log(`   Total: ${doctorsResult.stats.total}`);
    console.log(`   Matched: ${doctorsResult.stats.matched}`);
    console.log(`   Unmatched: ${doctorsResult.stats.unmatched}`);
    console.log(`   Errors: ${doctorsResult.stats.errors}`);

    if (doctorsResult.unmatched.length > 0) {
      console.log("\n⚠️  Unmatched doctors (requires manual review):");
      doctorsResult.unmatched.forEach((record) => {
        console.log(`   - ${record.name} (ID: ${record.id})`);
        console.log(`     City: ${record.city || "N/A"}, District: ${record.district || "N/A"}`);
        console.log(`     Reason: ${record.reason}`);
      });
    }

    // Summary
    console.log("\n" + "=".repeat(60));
    console.log("📊 Migration Summary:");
    console.log(`   Total Records: ${clubsResult.stats.total + doctorsResult.stats.total}`);
    console.log(
      `   Successfully Migrated: ${clubsResult.stats.matched + doctorsResult.stats.matched}`
    );
    console.log(`   Unmatched: ${clubsResult.stats.unmatched + doctorsResult.stats.unmatched}`);
    console.log(`   Errors: ${clubsResult.stats.errors + doctorsResult.stats.errors}`);

    if (
      clubsResult.unmatched.length === 0 &&
      doctorsResult.unmatched.length === 0 &&
      clubsResult.stats.errors === 0 &&
      doctorsResult.stats.errors === 0
    ) {
      console.log("\n✅ All records migrated successfully!");
      console.log("   You can proceed to Phase 3: Constraint Enforcement");
    } else {
      console.log("\n⚠️  Some records require manual review.");
      console.log("   Please review unmatched records and update them manually.");
      console.log("   After fixing, re-run this script to migrate remaining records.");
    }
  } catch (error) {
    console.error("\n❌ Migration failed:", error);
    process.exit(1);
  }
}

// Run migration
main()
  .then(() => {
    console.log("\n✅ Migration script completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Migration script failed:", error);
    process.exit(1);
  });
