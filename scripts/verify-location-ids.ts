/**
 * Verify that location foreign keys are populated in clubs table
 */

import { db } from "@/lib/db";
import { clubs } from "@/lib/db/schema";
import { sql } from "drizzle-orm";

async function verify() {
  const stats = await db
    .select({
      total: sql<number>`count(*)`,
      withCityId: sql<number>`count(city_id) FILTER (WHERE city_id IS NOT NULL)`,
      withSectorId: sql<number>`count(sector_id) FILTER (WHERE sector_id IS NOT NULL)`,
      withCountyId: sql<number>`count(county_id) FILTER (WHERE county_id IS NOT NULL)`,
      withoutCityId: sql<number>`count(*) FILTER (WHERE city_id IS NULL)`,
    })
    .from(clubs);

  console.log("📊 Location Foreign Keys Status:");
  console.log(`   Total clubs: ${stats[0].total}`);
  console.log(`   With cityId: ${stats[0].withCityId}`);
  console.log(`   With sectorId: ${stats[0].withSectorId}`);
  console.log(`   With countyId: ${stats[0].withCountyId}`);
  console.log(`   Without cityId: ${stats[0].withoutCityId}`);

  // Sample a few clubs to verify
  const sample = await db
    .select({
      name: clubs.name,
      cityId: clubs.cityId,
      sectorId: clubs.sectorId,
      countyId: clubs.countyId,
    })
    .from(clubs)
    .limit(10);

  console.log("\n📋 Sample clubs:");
  sample.forEach((c) => {
    console.log(`   - ${c.name}`);
    console.log(
      `     cityId: ${c.cityId || "NULL"}, sectorId: ${c.sectorId || "NULL"}, countyId: ${c.countyId || "NULL"}`
    );
  });

  // Check Bucharest clubs specifically (should have sectorId)
  // Note: We need to check by cityId pointing to Bucharest location
  const bucharestClubs = await db
    .select({
      name: clubs.name,
      sectorId: clubs.sectorId,
      cityId: clubs.cityId,
    })
    .from(clubs)
    .where(sql`city_id IN (SELECT id FROM locations WHERE name = 'București' AND type = 'city')`)
    .limit(5);

  console.log("\n🏛️  Bucharest clubs (should have sectorId):");
  bucharestClubs.forEach((c) => {
    console.log(`   - ${c.name}: cityId=${c.cityId || "NULL"}, sectorId=${c.sectorId || "NULL"}`);
  });

  // Check for clubs missing cityId
  const missingCityId = await db
    .select({
      name: clubs.name,
      cityId: clubs.cityId,
      sectorId: clubs.sectorId,
      countyId: clubs.countyId,
    })
    .from(clubs)
    .where(sql`city_id IS NULL`)
    .limit(5);

  if (missingCityId.length > 0) {
    console.log("\n⚠️  Clubs missing cityId:");
    missingCityId.forEach((c) => {
      console.log(`   - ${c.name}`);
      console.log(
        `     cityId: ${c.cityId || "NULL"}, sectorId: ${c.sectorId || "NULL"}, countyId: ${c.countyId || "NULL"}`
      );
    });
  } else {
    console.log("\n✅ All clubs have cityId!");
  }

  process.exit(0);
}

verify().catch((error) => {
  console.error("❌ Error:", error);
  process.exit(1);
});
