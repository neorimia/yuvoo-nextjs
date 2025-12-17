#!/usr/bin/env tsx

/**
 * Development Environment Verification Script
 *
 * Verifies that all required environment variables and services are configured.
 * Run this after setting up your development environment.
 */

import { config } from "dotenv";
import { resolve } from "path";

// Load environment variables
config({ path: resolve(process.cwd(), ".env.local") });

interface ServiceStatus {
  name: string;
  configured: boolean;
  testable: boolean;
  message: string;
}

const services: ServiceStatus[] = [];

// Check Database (Neon)
const databaseUrl = process.env.DATABASE_URL;
services.push({
  name: "Database (Neon Postgres)",
  configured: !!databaseUrl && databaseUrl.includes("postgresql://"),
  testable: true,
  message: databaseUrl ? "✅ DATABASE_URL is configured" : "❌ DATABASE_URL is missing",
});

// Check Stack Auth
const stackProjectId = process.env.NEXT_PUBLIC_STACK_PROJECT_ID;
const stackPublishableKey = process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY;
const stackSecretKey = process.env.STACK_SECRET_SERVER_KEY;
services.push({
  name: "Stack Auth",
  configured: !!(stackProjectId && stackPublishableKey && stackSecretKey),
  testable: true,
  message:
    stackProjectId && stackPublishableKey && stackSecretKey
      ? "✅ All Stack Auth keys are configured"
      : "❌ Missing Stack Auth configuration (check NEXT_PUBLIC_STACK_PROJECT_ID, NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY, STACK_SECRET_SERVER_KEY)",
});

// Check OpenAI
const openaiKey = process.env.OPENAI_API_KEY;
services.push({
  name: "OpenAI API",
  configured: !!openaiKey && openaiKey.startsWith("sk-"),
  testable: false,
  message: openaiKey ? "✅ OPENAI_API_KEY is configured" : "❌ OPENAI_API_KEY is missing",
});

// Check Cloudinary
const cloudinaryCloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;
const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET;
services.push({
  name: "Cloudinary",
  configured: !!(cloudinaryCloudName && cloudinaryApiKey && cloudinaryApiSecret),
  testable: false,
  message:
    cloudinaryCloudName && cloudinaryApiKey && cloudinaryApiSecret
      ? "✅ All Cloudinary credentials are configured"
      : "❌ Missing Cloudinary configuration (check NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET)",
});

// Check Brevo
const brevoApiKey = process.env.BREVO_API_KEY;
const brevoSenderEmail = process.env.BREVO_SENDER_EMAIL;
const brevoSenderName = process.env.BREVO_SENDER_NAME;
services.push({
  name: "Brevo (Email)",
  configured: !!(brevoApiKey && brevoSenderEmail && brevoSenderName),
  testable: false,
  message:
    brevoApiKey && brevoSenderEmail && brevoSenderName
      ? "✅ All Brevo credentials are configured"
      : "❌ Missing Brevo configuration (check BREVO_API_KEY, BREVO_SENDER_EMAIL, BREVO_SENDER_NAME)",
});

// Check App URL
const appUrl = process.env.NEXT_PUBLIC_APP_URL;
services.push({
  name: "App URL",
  configured: !!appUrl,
  testable: false,
  message: appUrl
    ? `✅ NEXT_PUBLIC_APP_URL is configured: ${appUrl}`
    : "❌ NEXT_PUBLIC_APP_URL is missing",
});

// Print results
console.log("\n🔍 Development Environment Verification\n");
console.log("=".repeat(50));
console.log("");

let allConfigured = true;

for (const service of services) {
  const status = service.configured ? "✅" : "❌";
  console.log(`${status} ${service.name}`);
  console.log(`   ${service.message}`);
  if (service.testable && service.configured) {
    console.log(`   💡 Run test: See docs/DEVELOPMENT_SETUP_GUIDE.md`);
  }
  console.log("");

  if (!service.configured) {
    allConfigured = false;
  }
}

console.log("=".repeat(50));
console.log("");

if (allConfigured) {
  console.log("✅ All services are configured!");
  console.log("");
  console.log("Next steps:");
  console.log("  1. Test database: npx tsx src/lib/db/test-connection.ts");
  console.log("  2. Test Stack Auth: npx tsx src/lib/auth/test-auth.ts");
  console.log("  3. Initialize database: npm run db:push");
  console.log("  4. Start dev server: npm run dev");
  process.exit(0);
} else {
  console.log("❌ Some services are not configured.");
  console.log("");
  console.log("Please:");
  console.log("  1. Edit .env.local with your credentials");
  console.log("  2. See docs/DEVELOPMENT_SETUP_GUIDE.md for detailed instructions");
  console.log("  3. Run this script again to verify");
  process.exit(1);
}
