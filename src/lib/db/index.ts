/**
 * Database Connection
 *
 * Drizzle ORM setup with Neon serverless Postgres.
 */

import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import * as dotenv from "dotenv";
import * as schema from "./schema";

// Load environment variables (for standalone scripts)
// In Next.js, env vars are loaded automatically, but this ensures they're loaded in test scripts
if (typeof window === "undefined") {
  dotenv.config({ path: ".env.local" });
}

// Configure WebSocket for Neon (required for serverless)
neonConfig.webSocketConstructor = ws;

// Get connection string
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set. Please set it in .env.local");
}

// Create connection pool
const pool = new Pool({
  connectionString,
});

// Initialize Drizzle with schema
export const db = drizzle(pool, { schema });

// Export schema for use in other files
export * from "./schema";
