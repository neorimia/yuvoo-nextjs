/**
 * Data Migration: Update existing premium subscriptions to YEARLY
 *
 * This script updates existing premium club subscriptions that were created
 * with the old pricing model (199 lei/year) to use the new subscription_type
 * fields with YEARLY subscription type for backward compatibility.
 *
 * Run with: npx tsx src/lib/db/migrations/migrate-existing-premium-subscriptions.ts
 */

import { db } from "../index";
import { premiumClubStatus } from "../schema";
import { eq, and, isNull } from "drizzle-orm";

async function migrateExistingPremiumSubscriptions() {
  console.log("🔄 Starting data migration for existing premium subscriptions...");

  try {
    // Update existing premium subscriptions to YEARLY (backward compatibility)
    // Existing subscriptions were created with old pricing (199 lei/year), so set them as YEARLY
    const result = await db
      .update(premiumClubStatus)
      .set({
        subscriptionType: "YEARLY",
        billingPeriod: 12,
        billingAmount: 19900, // Old yearly price: 199 lei = 19900 bani
      })
      .where(and(eq(premiumClubStatus.isPremium, true), isNull(premiumClubStatus.subscriptionType)))
      .returning({
        clubId: premiumClubStatus.clubId,
        subscriptionType: premiumClubStatus.subscriptionType,
        billingPeriod: premiumClubStatus.billingPeriod,
        billingAmount: premiumClubStatus.billingAmount,
      });

    console.log(`✅ Successfully migrated ${result.length} premium subscription(s):`);
    result.forEach((sub) => {
      console.log(
        `   - Club ID: ${sub.clubId}, Type: ${sub.subscriptionType}, Period: ${sub.billingPeriod} months, Amount: ${sub.billingAmount} bani`
      );
    });

    if (result.length === 0) {
      console.log("ℹ️  No existing premium subscriptions found to migrate.");
    }

    console.log("✨ Data migration completed successfully!");
  } catch (error) {
    console.error("❌ Error during data migration:", error);
    throw error;
  }
}

// Run migration
migrateExistingPremiumSubscriptions()
  .then(() => {
    console.log("🎉 Migration script completed!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Migration script failed:", error);
    process.exit(1);
  });
