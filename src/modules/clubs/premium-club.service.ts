/**
 * Premium Club Service
 *
 * Business logic for premium club management.
 * Handles premium status checks, upgrades, and expiration.
 */

import { premiumClubRepository } from "./premium-club.repository";
import type { PremiumClubStatus } from "@/types/leads";

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
 * Calculate premium end date (1 year from start)
 */
function calculatePremiumEndDate(startDate: Date): Date {
  const endDate = new Date(startDate);
  endDate.setFullYear(endDate.getFullYear() + 1);
  return endDate;
}

/**
 * Upgrade club to premium
 * Processes premium upgrade (199 lei/year)
 */
export async function upgradeToPremium(
  clubId: string,
  data: {
    stripeSubscriptionId?: string | null;
    stripeCustomerId?: string | null;
  }
): Promise<PremiumClubStatus> {
  const now = new Date();
  const endDate = calculatePremiumEndDate(now);

  const premiumStatus = await premiumClubRepository.upsert(clubId, {
    isPremium: true,
    premiumStartDate: now,
    premiumEndDate: endDate,
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
