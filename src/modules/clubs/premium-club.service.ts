/**
 * Premium Club Service
 *
 * Business logic for premium club management.
 * Handles premium status checks, upgrades, and expiration.
 */

import { premiumClubRepository } from "./premium-club.repository";
import type { PremiumClubStatus } from "@/types/leads";
import { SubscriptionType } from "@/types/leads";

/**
 * Check if club is premium (with date validation)
 * Returns true if premium is active and not expired
 */
export async function checkIsPremium(clubId: string): Promise<boolean> {
  const premiumStatus = await premiumClubRepository.findByClubId(clubId);

  if (!premiumStatus || !premiumStatus.isPremium) {
    return false;
  }

  // Check if premium has expired
  if (premiumStatus.premiumEndDate) {
    const now = new Date();
    if (now > premiumStatus.premiumEndDate) {
      // Premium expired, update status
      await premiumClubRepository.update(clubId, {
        isPremium: false,
      });
      return false;
    }
  }

  return true;
}

/**
 * Add months to a date (native implementation)
 * @param date - Start date
 * @param months - Number of months to add
 */
function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

/**
 * Calculate premium end date based on subscription type
 * @param startDate - Start date
 * @param subscriptionType - MONTHLY (1 month) or YEARLY (12 months)
 */
function calculatePremiumEndDate(startDate: Date, subscriptionType: SubscriptionType): Date {
  const billingPeriod = subscriptionType === SubscriptionType.MONTHLY ? 1 : 12;
  return addMonths(startDate, billingPeriod);
}

/**
 * Calculate next billing date based on subscription type
 * @param startDate - Start date
 * @param subscriptionType - MONTHLY (1 month) or YEARLY (12 months)
 */
function calculateNextBillingDate(startDate: Date, subscriptionType: SubscriptionType): Date {
  const billingPeriod = subscriptionType === SubscriptionType.MONTHLY ? 1 : 12;
  return addMonths(startDate, billingPeriod);
}

/**
 * Get billing amount in bani based on subscription type
 * @param subscriptionType - MONTHLY or YEARLY
 */
function getBillingAmount(subscriptionType: SubscriptionType): number {
  return subscriptionType === SubscriptionType.MONTHLY ? 9999 : 99999; // 99.99 RON or 999.99 RON in bani
}

/**
 * Upgrade club to premium
 * Processes premium upgrade (99.99 RON/month or 999.99 RON/year)
 * @param clubId - Club ID
 * @param data - Upgrade data including subscription type
 */
export async function upgradeToPremium(
  clubId: string,
  data: {
    subscriptionType: SubscriptionType;
    stripeSubscriptionId?: string | null;
    stripeCustomerId?: string | null;
  }
): Promise<PremiumClubStatus> {
  const now = new Date();
  const endDate = calculatePremiumEndDate(now, data.subscriptionType);
  const nextBillingDate = calculateNextBillingDate(now, data.subscriptionType);
  const billingPeriod = data.subscriptionType === SubscriptionType.MONTHLY ? 1 : 12;
  const billingAmount = getBillingAmount(data.subscriptionType);

  const premiumStatus = await premiumClubRepository.upsert(clubId, {
    isPremium: true,
    premiumStartDate: now,
    premiumEndDate: endDate,
    subscriptionType: data.subscriptionType,
    billingPeriod,
    nextBillingDate,
    billingAmount,
    stripeSubscriptionId: data.stripeSubscriptionId || null,
    stripeCustomerId: data.stripeCustomerId || null,
  });

  return premiumStatus;
}

/**
 * Get premium benefits description
 */
export function getPremiumBenefits(): {
  badge: string;
  unlimitedLeads: string;
  priorityListing: string;
  visibleContact: string;
  instantNotifications: string;
} {
  return {
    badge: "Badge „Verificat Yuvoo”",
    unlimitedLeads: "Acces nelimitat la cereri",
    priorityListing: "Afișare prioritară în listări",
    visibleContact: "Date de contact vizibile pentru părinți",
    instantNotifications: "Notificări instant pentru cereri noi",
  };
}

/**
 * Handle premium expiration (for cron job)
 * Called periodically to check and expire premium subscriptions
 */
export async function handlePremiumExpiration(): Promise<{
  expired: number;
  updated: PremiumClubStatus[];
}> {
  const premiumClubs = await premiumClubRepository.findAllPremium();
  const now = new Date();
  const expired: PremiumClubStatus[] = [];

  for (const premium of premiumClubs) {
    if (premium.premiumEndDate && now > premium.premiumEndDate) {
      // Premium expired
      await premiumClubRepository.update(premium.clubId, {
        isPremium: false,
      });
      expired.push(premium);
    }
  }

  return {
    expired: expired.length,
    updated: expired,
  };
}

/**
 * Get premium status for club
 */
export async function getPremiumStatus(clubId: string): Promise<PremiumClubStatus | null> {
  return premiumClubRepository.findByClubId(clubId);
}

export const premiumClubService = {
  checkIsPremium,
  upgradeToPremium,
  getPremiumBenefits,
  handlePremiumExpiration,
  getPremiumStatus,
};
