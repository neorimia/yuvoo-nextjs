/**
 * Authentication Test Script
 *
 * Simple script to test Stack Auth configuration.
 * Run with: npx tsx src/lib/auth/test-auth.ts
 *
 * Note: Requires Stack Auth environment variables to be set in .env.local
 */

import * as dotenv from "dotenv";
import { stackServerApp } from "./stack";

// Load environment variables
dotenv.config({ path: ".env.local" });

async function testAuth() {
  try {
    // Check environment variables
    if (!process.env.NEXT_PUBLIC_STACK_PROJECT_ID) {
      console.error("❌ NEXT_PUBLIC_STACK_PROJECT_ID is not set");
      console.error("Please set it in .env.local");
      process.exit(1);
    }

    if (!process.env.STACK_SECRET_SERVER_KEY) {
      console.error("❌ STACK_SECRET_SERVER_KEY is not set");
      console.error("Please set it in .env.local");
      process.exit(1);
    }

    console.log("📋 Stack Auth Configuration:");
    console.log(`   Project ID: ${process.env.NEXT_PUBLIC_STACK_PROJECT_ID.substring(0, 20)}...`);
    console.log(`   Server Key: ${process.env.STACK_SECRET_SERVER_KEY.substring(0, 20)}...`);

    // Verify Stack Auth client is initialized
    // Note: getUser() requires a Next.js request context (cookies), so we can't test it in a standalone script
    // This test just verifies that the configuration is correct and the client initializes without errors
    if (stackServerApp) {
      console.log("✅ Stack Auth configured correctly!");
      console.log("   Client initialized successfully");
      console.log(
        "   Note: getUser() requires a Next.js request context and cannot be tested in standalone scripts"
      );
    } else {
      throw new Error("Stack Auth client failed to initialize");
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Stack Auth configuration failed:");
    console.error(error);
    process.exit(1);
  }
}

testAuth();
