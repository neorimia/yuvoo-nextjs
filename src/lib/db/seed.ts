/**
 * Database Seed Script
 *
 * Populates the database with sample data for development and testing.
 * Run with: npm run db:seed or npx tsx src/lib/db/seed.ts
 *
 * This script creates:
 * - Sports reference data (for future sports table)
 * - Sample clubs (60+ sports clubs in Romania with all fields)
 * - Sample doctors (18 pediatric specialists with all fields)
 * - Test users (parent accounts)
 *
 * The script is idempotent - running it multiple times won't create duplicates.
 */

import * as dotenv from "dotenv";
import { db } from "./index";
import { clubs, doctors, users } from "./schema";
import { CLUBS_SEED_DATA } from "./seed-data/clubs";
import { DOCTORS_SEED_DATA } from "./seed-data/doctors";

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
async function seedUsers() {
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
async function seedClubs() {
  console.log("\n🏃 Seeding clubs...");
  let clubsCreated = 0;
  let clubsSkipped = 0;

  for (const club of CLUBS_SEED_DATA) {
    try {
      await db.insert(clubs).values({
        id: crypto.randomUUID(),
        ...club,
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
 * Seed Doctors
 */
async function seedDoctors() {
  console.log("\n👨‍⚕️ Seeding doctors...");
  let doctorsCreated = 0;
  let doctorsSkipped = 0;

  for (const doctor of DOCTORS_SEED_DATA) {
    try {
      await db.insert(doctors).values({
        id: crypto.randomUUID(),
        ...doctor,
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
    console.log(`   - Clubs: ${CLUBS_SEED_DATA.length}`);
    console.log(`   - Doctors: ${DOCTORS_SEED_DATA.length}`);
    console.log(`   - Test Users: ${testUsers.length}\n`);

    // Seed Users
    const usersResult = await seedUsers();

    // Seed Clubs
    const clubsResult = await seedClubs();

    // Seed Doctors
    const doctorsResult = await seedDoctors();

    // Summary
    console.log("\n✅ Database seed completed successfully!");
    console.log("\n📊 Final Summary:");
    console.log(`   - Users: ${usersResult.created} created, ${usersResult.skipped} skipped`);
    console.log(`   - Clubs: ${clubsResult.created} created, ${clubsResult.skipped} skipped`);
    console.log(`   - Doctors: ${doctorsResult.created} created, ${doctorsResult.skipped} skipped`);

    // Sports coverage
    const uniqueSports = new Set(CLUBS_SEED_DATA.map((c) => c.sportType));
    console.log(`   - Sports covered: ${uniqueSports.size} different sports`);
    console.log(
      `   - Cities covered: ${new Set(CLUBS_SEED_DATA.map((c) => c.city)).size} different cities`
    );

    // Verification status breakdown
    const verifiedClubs = CLUBS_SEED_DATA.filter((c) => c.verified).length;
    const pendingClubs = CLUBS_SEED_DATA.filter((c) => c.verificationStatus === "pending").length;
    const inReviewClubs = CLUBS_SEED_DATA.filter(
      (c) => c.verificationStatus === "in_review"
    ).length;
    const approvedClubs = CLUBS_SEED_DATA.filter((c) => c.verificationStatus === "approved").length;

    console.log("\n📈 Club Verification Status:");
    console.log(`   - Verified: ${verifiedClubs} clubs`);
    console.log(`   - Approved: ${approvedClubs} clubs`);
    console.log(`   - Pending: ${pendingClubs} clubs`);
    console.log(`   - In Review: ${inReviewClubs} clubs`);

    const featuredClubs = CLUBS_SEED_DATA.filter((c) => c.featured).length;
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
