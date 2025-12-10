/**
 * Database Connection Test
 *
 * Simple script to test database connection.
 * Run with: npx tsx src/lib/db/test-connection.ts
 */

import * as dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

// Check if DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL environment variable is not set.");
  console.error("Please create .env.local and add your DATABASE_URL.");
  console.error(
    'Example: DATABASE_URL="postgresql://user:password@host:5432/dbname?sslmode=require"'
  );
  process.exit(1);
}

// Debug: Check DATABASE_URL (masked for security)
const dbUrl = process.env.DATABASE_URL;
if (dbUrl) {
  const maskedUrl = dbUrl.replace(/:[^:@]+@/, ":****@"); // Mask password
  console.log("📋 DATABASE_URL found:", maskedUrl.substring(0, 50) + "...");
} else {
  console.error("❌ DATABASE_URL is empty or undefined");
  process.exit(1);
}

import { db } from "./index";
import { sql } from "drizzle-orm";

async function testConnection() {
  try {
    console.log("Testing database connection...");

    // Simple query to test connection
    const result = await db.execute(sql`SELECT NOW() as current_time`);

    console.log("✅ Database connection successful!");
    console.log("Current database time:", result.rows[0]?.current_time);

    process.exit(0);
  } catch (error) {
    console.error("❌ Database connection failed:");
    console.error(error);
    process.exit(1);
  }
}

testConnection();
