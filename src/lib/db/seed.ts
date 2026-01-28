/**
 * Database Seed Script
 *
 * Populates the database with sample data for development and testing.
 * Run with: npm run db:seed or npx tsx src/lib/db/seed.ts
 *
 * This script creates:
 * - Sports reference data (for future sports table)
 * - Sample clubs (60+ sports clubs in Romania with all fields)
 * - Research clubs (705+ real clubs from Bucharest, Cluj-Napoca, Timișoara, Iași, Constanța, Brașov, Craiova, Galați, Ploiești, Oradea, Arad, Pitești, Sibiu, Bacău, Târgu Mureș, Baia Mare, Buzău, Satu Mare, Botoșani, Râmnicu Vâlcea, Drobeta-Turnu Severin, Suceava, Piatra Neamț, Târgoviște, Focșani, Târgu Jiu, Bistrița and Reșița)
 * - Sample doctors (18 pediatric specialists with all fields)
 * - Test users (parent accounts)
 *
 * The script is idempotent - running it multiple times won't create duplicates.
 */

import * as dotenv from "dotenv";
import { db } from "./index";
import { clubs, doctors, users } from "./schema";
import { CLUBS_SEED_DATA } from "./seed-data/clubs";
import { getCityLocationId, getSectorLocationId, getCountyLocationId } from "./seed-data/helpers";
import { DOCTORS_SEED_DATA } from "./seed-data/doctors";
import { CLUBS_RESEARCH_BUCHAREST } from "./seed-data/clubs-research-bucuresti";
import { CLUBS_RESEARCH_CLUJ_NAPOCA } from "./seed-data/clubs-research-cluj-napoca";
import { CLUBS_RESEARCH_TIMISOARA } from "./seed-data/clubs-research-timisoara";
import { CLUBS_RESEARCH_IASI } from "./seed-data/clubs-research-iasi";
import { CLUBS_RESEARCH_CONSTANTA } from "./seed-data/clubs-research-constanta";
import { CLUBS_RESEARCH_BRASOV } from "./seed-data/clubs-research-brasov";
import { CLUBS_RESEARCH_CRAIOVA } from "./seed-data/clubs-research-craiova";
import { CLUBS_RESEARCH_GALATI } from "./seed-data/clubs-research-galati";
import { CLUBS_RESEARCH_PLOIESTI } from "./seed-data/clubs-research-ploiesti";
import { CLUBS_RESEARCH_ORADEA } from "./seed-data/clubs-research-oradea";
import { CLUBS_RESEARCH_ARAD } from "./seed-data/clubs-research-arad";
import { CLUBS_RESEARCH_PITESTI } from "./seed-data/clubs-research-pitesti";
import { CLUBS_RESEARCH_SIBIU } from "./seed-data/clubs-research-sibiu";
import { CLUBS_RESEARCH_BACAU } from "./seed-data/clubs-research-bacau";
import { CLUBS_RESEARCH_TARGU_MURES } from "./seed-data/clubs-research-targu-mures";
import { CLUBS_RESEARCH_BAIA_MARE } from "./seed-data/clubs-research-baia-mare";
import { CLUBS_RESEARCH_BUZAU } from "./seed-data/clubs-research-buzau";
import { CLUBS_RESEARCH_SATU_MARE } from "./seed-data/clubs-research-satu-mare";
import { CLUBS_RESEARCH_BOTOSANI } from "./seed-data/clubs-research-botosani";
import { CLUBS_RESEARCH_RAMNICU_VALCEA } from "./seed-data/clubs-research-ramnicu-valcea";
import { CLUBS_RESEARCH_DROBETA_TURNU_SEVERIN } from "./seed-data/clubs-research-drobeta-turnu-severin";
import { CLUBS_RESEARCH_SUCEAVA } from "./seed-data/clubs-research-suceava";
import { CLUBS_RESEARCH_PIATRA_NEAMT } from "./seed-data/clubs-research-piatra-neamt";
import { CLUBS_RESEARCH_TARGOVISTE } from "./seed-data/clubs-research-targoviste";
import { CLUBS_RESEARCH_FOCSANI } from "./seed-data/clubs-research-focsani";
import { CLUBS_RESEARCH_TARGU_JIU } from "./seed-data/clubs-research-targu-jiu";
import { CLUBS_RESEARCH_BISTRITA } from "./seed-data/clubs-research-bistrita";
import { CLUBS_RESEARCH_RESITA } from "./seed-data/clubs-research-resita";

// Load environment variables
dotenv.config({ path: ".env.local" });

/**
 * Test Users Data
 */
const testUsers = [
  {
    stackUserId: "test-user-1",
    email: "parent1@test.yuvoo.ro",
    role: "parent" as const,
    firstName: "Ion",
    lastName: "Părinte",
    phone: "+40 700 000 001",
  },
  {
    stackUserId: "test-user-2",
    email: "parent2@test.yuvoo.ro",
    role: "parent" as const,
    firstName: "Maria",
    lastName: "Mamă",
    phone: "+40 700 000 002",
  },
  {
    stackUserId: "test-user-3",
    email: "parent3@test.yuvoo.ro",
    role: "parent" as const,
    firstName: "Alexandru",
    lastName: "Tată",
    phone: "+40 700 000 003",
  },
];

/**
 * Seed Users
 */
async function _seedUsers() {
  console.log("📝 Seeding test users...");
  let usersCreated = 0;
  let usersSkipped = 0;

  for (const user of testUsers) {
    try {
      await db.insert(users).values({
        id: crypto.randomUUID(),
        ...user,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      usersCreated++;
      console.log(`   ✅ Created user: ${user.email}`);
    } catch (error: unknown) {
      // Check if it's a unique constraint violation
      const err = error as { code?: string; message?: string };
      if (err?.code === "23505" || err?.message?.includes("unique")) {
        usersSkipped++;
        console.log(`   ⚠️  User ${user.email} already exists, skipping...`);
      } else {
        console.error(`   ❌ Error creating user ${user.email}:`, error);
        throw error;
      }
    }
  }

  console.log(`   📊 Users: ${usersCreated} created, ${usersSkipped} skipped`);
  return { created: usersCreated, skipped: usersSkipped };
}

/**
 * Seed Clubs
 */
async function _seedClubs() {
  console.log("\n🏃 Seeding clubs...");
  let clubsCreated = 0;
  let clubsSkipped = 0;

  for (const club of CLUBS_SEED_DATA) {
    try {
      // Convert city/district to location IDs (if not already present)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const clubWithIds = club as any;
      const cityId = clubWithIds.cityId || getCityLocationId(club.city);
      const sectorId =
        clubWithIds.sectorId || (club.district ? getSectorLocationId(club.district) : undefined);
      const countyId = clubWithIds.countyId || (cityId ? getCountyLocationId(cityId) : undefined);

      // Remove city and district fields (they don't exist in schema anymore)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { city: _city, district: _district, ...clubWithoutCityDistrict } = club as any;

      await db.insert(clubs).values({
        id: crypto.randomUUID(),
        ...clubWithoutCityDistrict,
        cityId: cityId!,
        sectorId,
        countyId: countyId!,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      clubsCreated++;
      console.log(`   ✅ Created club: ${club.name} (${club.sportType})`);
    } catch (error: unknown) {
      // Check if it's a unique constraint violation (slug or other unique field)
      const err = error as { code?: string; message?: string };
      if (err?.code === "23505" || err?.message?.includes("unique")) {
        clubsSkipped++;
        console.log(`   ⚠️  Club ${club.name} already exists (slug: ${club.slug}), skipping...`);
      } else {
        console.error(`   ❌ Error creating club ${club.name}:`, error);
        throw error;
      }
    }
  }

  console.log(`   📊 Clubs: ${clubsCreated} created, ${clubsSkipped} skipped`);
  return { created: clubsCreated, skipped: clubsSkipped };
}

/**
 * Seed Research Clubs (București, Cluj-Napoca, Timișoara, Iași, Constanța, Brașov, Craiova, Galați, Ploiești, Oradea, Arad, Pitești, Sibiu, Bacău, Târgu Mureș, Baia Mare, Buzău, Satu Mare, Botoșani, Râmnicu Vâlcea, Drobeta-Turnu Severin, Suceava, Piatra Neamț, Târgoviște, Focșani, Târgu Jiu, Bistrița & Reșița)
 */
async function seedResearchClubs() {
  console.log(
    "\n🔍 Seeding research clubs (București, Cluj-Napoca, Timișoara, Iași, Constanța, Brașov, Craiova, Galați, Ploiești, Oradea, Arad, Pitești, Sibiu, Bacău, Târgu Mureș, Baia Mare, Buzău, Satu Mare, Botoșani, Râmnicu Vâlcea, Drobeta-Turnu Severin, Suceava, Piatra Neamț, Târgoviște, Focșani, Târgu Jiu, Bistrița & Reșița)..."
  );
  let clubsCreated = 0;
  let clubsSkipped = 0;

  // Combine research data from all cities
  const allResearchClubs = [
    ...CLUBS_RESEARCH_BUCHAREST,
    ...CLUBS_RESEARCH_CLUJ_NAPOCA,
    ...CLUBS_RESEARCH_TIMISOARA,
    ...CLUBS_RESEARCH_IASI,
    ...CLUBS_RESEARCH_CONSTANTA,
    ...CLUBS_RESEARCH_BRASOV,
    ...CLUBS_RESEARCH_CRAIOVA,
    ...CLUBS_RESEARCH_GALATI,
    ...CLUBS_RESEARCH_PLOIESTI,
    ...CLUBS_RESEARCH_ORADEA,
    ...CLUBS_RESEARCH_ARAD,
    ...CLUBS_RESEARCH_PITESTI,
    ...CLUBS_RESEARCH_SIBIU,
    ...CLUBS_RESEARCH_BACAU,
    ...CLUBS_RESEARCH_TARGU_MURES,
    ...CLUBS_RESEARCH_BAIA_MARE,
    ...CLUBS_RESEARCH_BUZAU,
    ...CLUBS_RESEARCH_SATU_MARE,
    ...CLUBS_RESEARCH_BOTOSANI,
    ...CLUBS_RESEARCH_RAMNICU_VALCEA,
    ...CLUBS_RESEARCH_DROBETA_TURNU_SEVERIN,
    ...CLUBS_RESEARCH_SUCEAVA,
    ...CLUBS_RESEARCH_PIATRA_NEAMT,
    ...CLUBS_RESEARCH_TARGOVISTE,
    ...CLUBS_RESEARCH_FOCSANI,
    ...CLUBS_RESEARCH_TARGU_JIU,
    ...CLUBS_RESEARCH_BISTRITA,
    ...CLUBS_RESEARCH_RESITA,
  ];

  for (const club of allResearchClubs) {
    try {
      // Research clubs already have cityId, sectorId, countyId from createClubFromResearch
      // But we need to ensure they're present and remove city/district if they exist
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { city: _city, district: _district, ...clubWithoutCityDistrict } = club as any;
      const cityId = club.cityId || getCityLocationId(club.city);
      const sectorId =
        club.sectorId || (club.district ? getSectorLocationId(club.district) : undefined);
      const countyId = club.countyId || (cityId ? getCountyLocationId(cityId) : undefined);

      await db.insert(clubs).values({
        id: crypto.randomUUID(),
        ...clubWithoutCityDistrict,
        cityId: cityId!,
        sectorId,
        countyId: countyId!,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      clubsCreated++;
      console.log(`   ✅ Created research club: ${club.name} (${club.sportType}, ${club.city})`);
    } catch (error: unknown) {
      // Check if it's a unique constraint violation (slug or other unique field)
      const err = error as { code?: string; message?: string };
      if (err?.code === "23505" || err?.message?.includes("unique")) {
        clubsSkipped++;
        console.log(
          `   ⚠️  Research club ${club.name} already exists (slug: ${club.slug}), skipping...`
        );
      } else {
        console.error(`   ❌ Error creating research club ${club.name}:`, error);
        throw error;
      }
    }
  }

  console.log(`   📊 Research Clubs: ${clubsCreated} created, ${clubsSkipped} skipped`);
  console.log(`      - București: ${CLUBS_RESEARCH_BUCHAREST.length} clubs`);
  console.log(`      - Cluj-Napoca: ${CLUBS_RESEARCH_CLUJ_NAPOCA.length} clubs`);
  console.log(`      - Timișoara: ${CLUBS_RESEARCH_TIMISOARA.length} clubs`);
  console.log(`      - Iași: ${CLUBS_RESEARCH_IASI.length} clubs`);
  console.log(`      - Constanța: ${CLUBS_RESEARCH_CONSTANTA.length} clubs`);
  console.log(`      - Brașov: ${CLUBS_RESEARCH_BRASOV.length} clubs`);
  console.log(`      - Craiova: ${CLUBS_RESEARCH_CRAIOVA.length} clubs`);
  console.log(`      - Galați: ${CLUBS_RESEARCH_GALATI.length} clubs`);
  console.log(`      - Ploiești: ${CLUBS_RESEARCH_PLOIESTI.length} clubs`);
  console.log(`      - Oradea: ${CLUBS_RESEARCH_ORADEA.length} clubs`);
  console.log(`      - Arad: ${CLUBS_RESEARCH_ARAD.length} clubs`);
  console.log(`      - Pitești: ${CLUBS_RESEARCH_PITESTI.length} clubs`);
  console.log(`      - Sibiu: ${CLUBS_RESEARCH_SIBIU.length} clubs`);
  console.log(`      - Bacău: ${CLUBS_RESEARCH_BACAU.length} clubs`);
  console.log(`      - Târgu Mureș: ${CLUBS_RESEARCH_TARGU_MURES.length} clubs`);
  console.log(`      - Baia Mare: ${CLUBS_RESEARCH_BAIA_MARE.length} clubs`);
  console.log(`      - Buzău: ${CLUBS_RESEARCH_BUZAU.length} clubs`);
  console.log(`      - Satu Mare: ${CLUBS_RESEARCH_SATU_MARE.length} clubs`);
  console.log(`      - Botoșani: ${CLUBS_RESEARCH_BOTOSANI.length} clubs`);
  console.log(`      - Râmnicu Vâlcea: ${CLUBS_RESEARCH_RAMNICU_VALCEA.length} clubs`);
  console.log(
    `      - Drobeta-Turnu Severin: ${CLUBS_RESEARCH_DROBETA_TURNU_SEVERIN.length} clubs`
  );
  console.log(`      - Suceava: ${CLUBS_RESEARCH_SUCEAVA.length} clubs`);
  console.log(`      - Piatra Neamț: ${CLUBS_RESEARCH_PIATRA_NEAMT.length} clubs`);
  console.log(`      - Târgoviște: ${CLUBS_RESEARCH_TARGOVISTE.length} clubs`);
  console.log(`      - Focșani: ${CLUBS_RESEARCH_FOCSANI.length} clubs`);
  console.log(`      - Târgu Jiu: ${CLUBS_RESEARCH_TARGU_JIU.length} clubs`);
  console.log(`      - Bistrița: ${CLUBS_RESEARCH_BISTRITA.length} clubs`);
  console.log(`      - Reșița: ${CLUBS_RESEARCH_RESITA.length} clubs`);
  return { created: clubsCreated, skipped: clubsSkipped };
}

/**
 * Seed Doctors
 */
async function _seedDoctors() {
  console.log("\n👨‍⚕️ Seeding doctors...");
  let doctorsCreated = 0;
  let doctorsSkipped = 0;

  for (const doctor of DOCTORS_SEED_DATA) {
    try {
      // Convert city/district to location IDs (if not already present)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const doctorWithIds = doctor as any;
      const cityId = doctorWithIds.cityId || getCityLocationId(doctor.city);
      const sectorId =
        doctorWithIds.sectorId ||
        (doctor.district ? getSectorLocationId(doctor.district) : undefined);
      const countyId = doctorWithIds.countyId || (cityId ? getCountyLocationId(cityId) : undefined);

      // Remove city and district fields (they don't exist in schema anymore)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { city: _city, district: _district, ...doctorWithoutCityDistrict } = doctor as any;

      await db.insert(doctors).values({
        id: crypto.randomUUID(),
        ...doctorWithoutCityDistrict,
        cityId: cityId!,
        sectorId,
        countyId: countyId!,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      doctorsCreated++;
      console.log(
        `   ✅ Created doctor: ${doctor.title || ""} ${doctor.firstName} ${doctor.lastName} (${doctor.specialty})`
      );
    } catch (error: unknown) {
      // Check if it's a unique constraint violation
      const err = error as { code?: string; message?: string };
      if (err?.code === "23505" || err?.message?.includes("unique")) {
        doctorsSkipped++;
        console.log(
          `   ⚠️  Doctor ${doctor.firstName} ${doctor.lastName} already exists (slug: ${doctor.slug}), skipping...`
        );
      } else {
        console.error(`   ❌ Error creating doctor ${doctor.firstName} ${doctor.lastName}:`, error);
        throw error;
      }
    }
  }

  console.log(`   📊 Doctors: ${doctorsCreated} created, ${doctorsSkipped} skipped`);
  return { created: doctorsCreated, skipped: doctorsSkipped };
}

/**
 * Main seed function
 */
async function seed() {
  try {
    console.log("🌱 Starting database seed...\n");
    console.log("📋 Seed data summary:");
    // console.log(`   - Clubs: ${CLUBS_SEED_DATA.length}`);
    console.log(`   - Research Clubs (București): ${CLUBS_RESEARCH_BUCHAREST.length}`);
    console.log(`   - Research Clubs (Cluj-Napoca): ${CLUBS_RESEARCH_CLUJ_NAPOCA.length}`);
    console.log(`   - Research Clubs (Timișoara): ${CLUBS_RESEARCH_TIMISOARA.length}`);
    console.log(`   - Research Clubs (Iași): ${CLUBS_RESEARCH_IASI.length}`);
    console.log(`   - Research Clubs (Constanța): ${CLUBS_RESEARCH_CONSTANTA.length}`);
    console.log(`   - Research Clubs (Brașov): ${CLUBS_RESEARCH_BRASOV.length}`);
    console.log(`   - Research Clubs (Craiova): ${CLUBS_RESEARCH_CRAIOVA.length}`);
    console.log(`   - Research Clubs (Galați): ${CLUBS_RESEARCH_GALATI.length}`);
    console.log(`   - Research Clubs (Ploiești): ${CLUBS_RESEARCH_PLOIESTI.length}`);
    console.log(`   - Research Clubs (Oradea): ${CLUBS_RESEARCH_ORADEA.length}`);
    console.log(`   - Research Clubs (Arad): ${CLUBS_RESEARCH_ARAD.length}`);
    console.log(`   - Research Clubs (Pitești): ${CLUBS_RESEARCH_PITESTI.length}`);
    console.log(`   - Research Clubs (Sibiu): ${CLUBS_RESEARCH_SIBIU.length}`);
    console.log(`   - Research Clubs (Bacău): ${CLUBS_RESEARCH_BACAU.length}`);
    console.log(`   - Research Clubs (Târgu Mureș): ${CLUBS_RESEARCH_TARGU_MURES.length}`);
    console.log(`   - Research Clubs (Baia Mare): ${CLUBS_RESEARCH_BAIA_MARE.length}`);
    console.log(`   - Research Clubs (Buzău): ${CLUBS_RESEARCH_BUZAU.length}`);
    console.log(`   - Research Clubs (Satu Mare): ${CLUBS_RESEARCH_SATU_MARE.length}`);
    console.log(`   - Research Clubs (Botoșani): ${CLUBS_RESEARCH_BOTOSANI.length}`);
    console.log(`   - Research Clubs (Râmnicu Vâlcea): ${CLUBS_RESEARCH_RAMNICU_VALCEA.length}`);
    console.log(
      `   - Research Clubs (Drobeta-Turnu Severin): ${CLUBS_RESEARCH_DROBETA_TURNU_SEVERIN.length}`
    );
    console.log(`   - Research Clubs (Suceava): ${CLUBS_RESEARCH_SUCEAVA.length}`);
    console.log(`   - Research Clubs (Piatra Neamț): ${CLUBS_RESEARCH_PIATRA_NEAMT.length}`);
    console.log(`   - Research Clubs (Târgoviște): ${CLUBS_RESEARCH_TARGOVISTE.length}`);
    console.log(`   - Research Clubs (Focșani): ${CLUBS_RESEARCH_FOCSANI.length}`);
    console.log(`   - Research Clubs (Târgu Jiu): ${CLUBS_RESEARCH_TARGU_JIU.length}`);
    console.log(`   - Research Clubs (Bistrița): ${CLUBS_RESEARCH_BISTRITA.length}`);
    console.log(`   - Research Clubs (Reșița): ${CLUBS_RESEARCH_RESITA.length}`);
    // console.log(`   - Doctors: ${DOCTORS_SEED_DATA.length}`);
    // console.log(`   - Test Users: ${testUsers.length}\n`);

    // Seed Users
    // const usersResult = await seedUsers();

    // Seed Clubs (sample data)
    // const clubsResult = await seedClubs();

    // Seed Research Clubs (real data from research)
    const researchClubsResult = await seedResearchClubs();

    // Seed Doctors
    // const doctorsResult = await seedDoctors();

    // Summary
    console.log("\n✅ Database seed completed successfully!");
    console.log("\n📊 Final Summary:");
    // console.log(`   - Users: ${usersResult.created} created, ${usersResult.skipped} skipped`);
    // console.log(
    //   `   - Clubs (sample): ${clubsResult.created} created, ${clubsResult.skipped} skipped`
    // );
    console.log(
      `   - Research Clubs: ${researchClubsResult.created} created, ${researchClubsResult.skipped} skipped`
    );
    // console.log(`   - Doctors: ${doctorsResult.created} created, ${doctorsResult.skipped} skipped`);

    // Sports coverage (combine sample and research clubs)
    const allClubs = [
      ...CLUBS_SEED_DATA,
      ...CLUBS_RESEARCH_BUCHAREST,
      ...CLUBS_RESEARCH_CLUJ_NAPOCA,
      ...CLUBS_RESEARCH_TIMISOARA,
      ...CLUBS_RESEARCH_IASI,
      ...CLUBS_RESEARCH_CONSTANTA,
      ...CLUBS_RESEARCH_BRASOV,
      ...CLUBS_RESEARCH_CRAIOVA,
      ...CLUBS_RESEARCH_GALATI,
      ...CLUBS_RESEARCH_PLOIESTI,
      ...CLUBS_RESEARCH_ORADEA,
      ...CLUBS_RESEARCH_ARAD,
      ...CLUBS_RESEARCH_PITESTI,
      ...CLUBS_RESEARCH_SIBIU,
      ...CLUBS_RESEARCH_BACAU,
      ...CLUBS_RESEARCH_TARGU_MURES,
      ...CLUBS_RESEARCH_BAIA_MARE,
      ...CLUBS_RESEARCH_BUZAU,
      ...CLUBS_RESEARCH_SATU_MARE,
      ...CLUBS_RESEARCH_BOTOSANI,
      ...CLUBS_RESEARCH_RAMNICU_VALCEA,
      ...CLUBS_RESEARCH_DROBETA_TURNU_SEVERIN,
      ...CLUBS_RESEARCH_SUCEAVA,
      ...CLUBS_RESEARCH_PIATRA_NEAMT,
      ...CLUBS_RESEARCH_TARGOVISTE,
      ...CLUBS_RESEARCH_FOCSANI,
      ...CLUBS_RESEARCH_TARGU_JIU,
      ...CLUBS_RESEARCH_BISTRITA,
      ...CLUBS_RESEARCH_RESITA,
    ];
    const uniqueSports = new Set(allClubs.map((c) => c.sportType));
    console.log(`   - Sports covered: ${uniqueSports.size} different sports`);
    console.log(
      `   - Cities covered: ${new Set(allClubs.map((c) => c.city)).size} different cities`
    );

    // Verification status breakdown (combine sample and research clubs)
    const verifiedClubs = allClubs.filter((c) => c.verified).length;
    const pendingClubs = allClubs.filter((c) => c.verificationStatus === "pending").length;
    const inReviewClubs = allClubs.filter((c) => c.verificationStatus === "in_review").length;
    const approvedClubs = allClubs.filter((c) => c.verificationStatus === "approved").length;

    console.log("\n📈 Club Verification Status (all clubs):");
    console.log(`   - Verified: ${verifiedClubs} clubs`);
    console.log(`   - Approved: ${approvedClubs} clubs`);
    console.log(`   - Pending: ${pendingClubs} clubs`);
    console.log(`   - In Review: ${inReviewClubs} clubs`);

    const featuredClubs = allClubs.filter((c) => c.featured).length;
    console.log(`   - Featured: ${featuredClubs} clubs`);

    // Doctor specialties breakdown
    const uniqueSpecialties = new Set(DOCTORS_SEED_DATA.map((d) => d.specialty));
    console.log(`\n👨‍⚕️ Doctor Specialties: ${uniqueSpecialties.size} different specialties`);
    uniqueSpecialties.forEach((specialty) => {
      const count = DOCTORS_SEED_DATA.filter((d) => d.specialty === specialty).length;
      console.log(`   - ${specialty}: ${count} doctors`);
    });
  } catch (error) {
    console.error("\n❌ Error seeding database:", error);
    process.exit(1);
  }
}

// Run seed if called directly
if (require.main === module) {
  seed()
    .then(() => {
      console.log("\n✨ Seed process finished!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Seed process failed:", error);
      process.exit(1);
    });
}

export { seed };
