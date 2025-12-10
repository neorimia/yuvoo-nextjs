/**
 * Database Connection
 *
 * Drizzle ORM setup with Neon serverless Postgres.
 */

import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import * as schema from "./schema";

// Configure WebSocket for Neon (required for serverless)
neonConfig.webSocketConstructor = ws;

// Create connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Initialize Drizzle with schema
export const db = drizzle(pool, { schema });

// Export schema for use in other files
export * from "./schema";
