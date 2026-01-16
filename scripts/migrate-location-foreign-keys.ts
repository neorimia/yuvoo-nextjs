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
 */
async function findLocationByName(
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
 */
async function getBucharestCityId(): Promise<string | null> {
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
 */
async function getCountyIdFromCityId(cityId: string | null): Promise<string | null> {
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
 */
async function migrateClubs(): Promise<{
  stats: MigrationStats;
  unmatched: UnmatchedRecord[];
}> {
  console.log("\n📊 Migrating clubs table...");

  const allClubs = await db.select().from(clubs);
  const stats: MigrationStats = {
    total: allClubs.length,
    matched: 0,
    unmatched: 0,
    errors: 0,
  };
  const unmatched: UnmatchedRecord[] = [];
  const bucharestCityId = await getBucharestCityId();

  for (const club of allClubs) {
    try {
      let cityId: string | null = null;
      let sectorId: string | null = null;
      let countyId: string | null = null;

      // Step 1: Match city
      if (club.city) {
        cityId = await findLocationByName(club.city, "city");
        if (!cityId) {
          unmatched.push({
            id: club.id,
            name: club.name,
            city: club.city,
            district: club.district || null,
            reason: `City "${club.city}" not found in locations table`,
          });
          stats.unmatched++;
          continue;
        }
      } else {
        unmatched.push({
          id: club.id,
          name: club.name,
          city: null,
          district: club.district || null,
          reason: "City field is empty",
        });
        stats.unmatched++;
        continue;
      }

      // Step 2: Match sector (only for Bucharest clubs)
      if (club.district && cityId === bucharestCityId) {
        sectorId = await findLocationByName(club.district, "sector", cityId);
        if (!sectorId) {
          console.warn(
            `⚠️  Club "${club.name}": Sector "${club.district}" not found, but continuing with cityId`
          );
        }
      }

      // Step 3: Derive countyId from cityId
      countyId = await getCountyIdFromCityId(cityId);
      if (!countyId) {
        console.warn(`⚠️  Club "${club.name}": Could not derive countyId from cityId "${cityId}"`);
      }

      // Step 4: Update club with new foreign keys
      await db
        .update(clubs)
        .set({
          cityId,
          sectorId,
          countyId, // Keep as null if not found (will be handled by validation)
        })
        .where(eq(clubs.id, club.id));

      stats.matched++;
    } catch (error) {
      console.error(`❌ Error migrating club "${club.name}":`, error);
      stats.errors++;
      unmatched.push({
        id: club.id,
        name: club.name,
        city: club.city || null,
        district: club.district || null,
        reason: `Error: ${error instanceof Error ? error.message : String(error)}`,
      });
    }
  }

  return { stats, unmatched };
}

/**
 * Migrate doctors table
 */
async function migrateDoctors(): Promise<{
  stats: MigrationStats;
  unmatched: UnmatchedRecord[];
}> {
  console.log("\n📊 Migrating doctors table...");

  const allDoctors = await db.select().from(doctors);
  const stats: MigrationStats = {
    total: allDoctors.length,
    matched: 0,
    unmatched: 0,
    errors: 0,
  };
  const unmatched: UnmatchedRecord[] = [];
  const bucharestCityId = await getBucharestCityId();

  for (const doctor of allDoctors) {
    try {
      let cityId: string | null = null;
      let sectorId: string | null = null;
      let countyId: string | null = null;

      // Step 1: Match city
      if (doctor.city) {
        cityId = await findLocationByName(doctor.city, "city");
        if (!cityId) {
          unmatched.push({
            id: doctor.id,
            name: `${doctor.firstName} ${doctor.lastName}`,
            city: doctor.city,
            district: doctor.district || null,
            reason: `City "${doctor.city}" not found in locations table`,
          });
          stats.unmatched++;
          continue;
        }
      } else {
        unmatched.push({
          id: doctor.id,
          name: `${doctor.firstName} ${doctor.lastName}`,
          city: null,
          district: doctor.district || null,
          reason: "City field is empty",
        });
        stats.unmatched++;
        continue;
      }

      // Step 2: Match sector (only for Bucharest doctors)
      if (doctor.district && cityId === bucharestCityId) {
        sectorId = await findLocationByName(doctor.district, "sector", cityId);
        if (!sectorId) {
          console.warn(
            `⚠️  Doctor "${doctor.firstName} ${doctor.lastName}": Sector "${doctor.district}" not found, but continuing with cityId`
          );
        }
      }

      // Step 3: Derive countyId from cityId
      countyId = await getCountyIdFromCityId(cityId);
      if (!countyId) {
        console.warn(
          `⚠️  Doctor "${doctor.firstName} ${doctor.lastName}": Could not derive countyId from cityId "${cityId}"`
        );
      }

      // Step 4: Update doctor with new foreign keys
      await db
        .update(doctors)
        .set({
          cityId,
          sectorId,
          countyId,
        })
        .where(eq(doctors.id, doctor.id));

      stats.matched++;
    } catch (error) {
      console.error(`❌ Error migrating doctor "${doctor.firstName} ${doctor.lastName}":`, error);
      stats.errors++;
      unmatched.push({
        id: doctor.id,
        name: `${doctor.firstName} ${doctor.lastName}`,
        city: doctor.city || null,
        district: doctor.district || null,
        reason: `Error: ${error instanceof Error ? error.message : String(error)}`,
      });
    }
  }

  return { stats, unmatched };
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
