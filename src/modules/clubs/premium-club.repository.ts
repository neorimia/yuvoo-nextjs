/**
 * Premium Club Repository
 *
 * Data access layer for premium club status.
 * Handles database queries for premium club data using Drizzle ORM.
 */

import { db } from "@/lib/db";
import { premiumClubStatus } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import type { PremiumClubStatus, SubscriptionType } from "@/types/leads";

/**
 * Map database premium club status record to PremiumClubStatus type
 */
function mapDbPremiumToPremium(
  dbPremium: typeof premiumClubStatus.$inferSelect
): PremiumClubStatus {
  return {
    id: dbPremium.id,
    clubId: dbPremium.clubId,
    isPremium: dbPremium.isPremium,
    premiumStartDate: dbPremium.premiumStartDate || null,
    premiumEndDate: dbPremium.premiumEndDate || null,
    subscriptionType: dbPremium.subscriptionType as SubscriptionType | null,
    billingPeriod: dbPremium.billingPeriod || null,
    nextBillingDate: dbPremium.nextBillingDate || null,
    billingAmount: dbPremium.billingAmount || null,
    stripeSubscriptionId: dbPremium.stripeSubscriptionId || null,
    stripeCustomerId: dbPremium.stripeCustomerId || null,
    createdAt: dbPremium.createdAt,
    updatedAt: dbPremium.updatedAt,
  };
}

/**
 * Get premium status for club
 */
export async function findByClubId(clubId: string): Promise<PremiumClubStatus | null> {
  const dbPremium = await db.query.premiumClubStatus.findFirst({
    where: eq(premiumClubStatus.clubId, clubId),
  });

  if (!dbPremium) {
    return null;
  }

  return mapDbPremiumToPremium(dbPremium);
}

/**
 * Create or update premium status
 */
export async function upsert(
  clubId: string,
  data: {
    isPremium: boolean;
    premiumStartDate?: Date | null;
    premiumEndDate?: Date | null;
    subscriptionType?: "MONTHLY" | "YEARLY" | null;
    billingPeriod?: number | null;
    nextBillingDate?: Date | null;
    billingAmount?: number | null;
    stripeSubscriptionId?: string | null;
    stripeCustomerId?: string | null;
  }
): Promise<PremiumClubStatus> {
  const [dbPremium] = await db
    .insert(premiumClubStatus)
    .values({
      clubId,
      isPremium: data.isPremium,
      premiumStartDate: data.premiumStartDate || null,
      premiumEndDate: data.premiumEndDate || null,
      subscriptionType: data.subscriptionType || null,
      billingPeriod: data.billingPeriod || null,
      nextBillingDate: data.nextBillingDate || null,
      billingAmount: data.billingAmount || null,
      stripeSubscriptionId: data.stripeSubscriptionId || null,
      stripeCustomerId: data.stripeCustomerId || null,
    })
    .onConflictDoUpdate({
      target: premiumClubStatus.clubId,
      set: {
        isPremium: data.isPremium,
        premiumStartDate: data.premiumStartDate || null,
        premiumEndDate: data.premiumEndDate || null,
        subscriptionType: data.subscriptionType || null,
        billingPeriod: data.billingPeriod || null,
        nextBillingDate: data.nextBillingDate || null,
        billingAmount: data.billingAmount || null,
        stripeSubscriptionId: data.stripeSubscriptionId || null,
        stripeCustomerId: data.stripeCustomerId || null,
        updatedAt: new Date(),
      },
    })
    .returning();

  return mapDbPremiumToPremium(dbPremium);
}

/**
 * Get all premium clubs
 */
export async function findAllPremium(): Promise<PremiumClubStatus[]> {
  const dbPremiums = await db.query.premiumClubStatus.findMany({
    where: eq(premiumClubStatus.isPremium, true),
  });

  return dbPremiums.map(mapDbPremiumToPremium);
}

/**
 * Update premium status
 */
export async function update(
  clubId: string,
  data: Partial<{
    isPremium: boolean;
    premiumStartDate: Date | null;
    premiumEndDate: Date | null;
    subscriptionType: "MONTHLY" | "YEARLY" | null;
    billingPeriod: number | null;
    nextBillingDate: Date | null;
    billingAmount: number | null;
    stripeSubscriptionId: string | null;
    stripeCustomerId: string | null;
  }>
): Promise<PremiumClubStatus> {
  const [dbPremium] = await db
    .update(premiumClubStatus)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(premiumClubStatus.clubId, clubId))
    .returning();

  if (!dbPremium) {
    throw new Error("Premium club status not found");
  }

  return mapDbPremiumToPremium(dbPremium);
}

export const premiumClubRepository = {
  findByClubId,
  upsert,
  findAllPremium,
  update,
};
