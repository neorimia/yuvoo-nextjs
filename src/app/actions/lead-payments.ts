/**
 * Lead Payment Server Actions
 *
 * Server Actions for lead payment processing (pay-per-lead and premium upgrade).
 */

"use server";

import { requireRole } from "@/modules/auth/auth.service";
import { getClubByAdminUserId } from "@/modules/clubs/clubs.service";
import { getLeadForClub } from "@/modules/leads/leads.service";
import {
  createPayPerLeadPaymentIntent,
  createPremiumUpgradePaymentIntent,
} from "@/modules/payments/lead-payment.service";
import { trackEventServer } from "@/lib/analytics/tracking-server";
import { PostHogEvents, PostHogProperties } from "@/lib/analytics/events";

/**
 * Create pay-per-lead payment intent
 * Creates Stripe payment intent for 3€ to unlock a lead
 */
export async function createPayPerLeadPaymentAction(
  leadId: string
): Promise<{ success: boolean; clientSecret?: string; error?: string }> {
  try {
    // Require club admin role
    const user = await requireRole("club_admin");

    // Get club for this admin
    const club = await getClubByAdminUserId(user.id);
    if (!club) {
      return {
        success: false,
        error: "Clubul nu a fost găsit",
      };
    }

    // Get lead and verify ownership
    const lead = await getLeadForClub(leadId, club.id);
    if (!lead) {
      return {
        success: false,
        error: "Cererea nu a fost găsită",
      };
    }

    // Check if already paid/premium
    if (lead.paymentId) {
      return {
        success: false,
        error: "Această cerere a fost deja deblocată",
      };
    }

    // Create payment intent
    const { clientSecret } = await createPayPerLeadPaymentIntent(leadId, club.id);

    // Track payment initiation
    await trackEventServer(PostHogEvents.LEAD_PAYMENT_INITIATED, {
      distinctId: user.id,
      [PostHogProperties.LEAD_ID]: leadId,
      [PostHogProperties.CLUB_ID]: club.id,
      [PostHogProperties.LEAD_PAYMENT_METHOD]: "pay_per_lead",
      [PostHogProperties.PAYMENT_AMOUNT]: 300, // 3€ in cents
    });

    return {
      success: true,
      clientSecret,
    };
  } catch (error) {
    console.error("Error creating pay-per-lead payment:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Eroare la crearea plății",
    };
  }
}

/**
 * Create premium upgrade payment intent
 * Creates Stripe payment intent for 199 lei/year for premium subscription
 */
export async function createPremiumUpgradePaymentAction(): Promise<{
  success: boolean;
  clientSecret?: string;
  error?: string;
}> {
  try {
    // Require club admin role
    const user = await requireRole("club_admin");

    // Get club for this admin
    const club = await getClubByAdminUserId(user.id);
    if (!club) {
      return {
        success: false,
        error: "Clubul nu a fost găsit",
      };
    }

    // Create payment intent
    const { clientSecret } = await createPremiumUpgradePaymentIntent(club.id);

    // Track premium upgrade initiation
    await trackEventServer(PostHogEvents.PREMIUM_UPGRADE_INITIATED, {
      distinctId: user.id,
      [PostHogProperties.CLUB_ID]: club.id,
      [PostHogProperties.PAYMENT_AMOUNT]: 19900, // 199 lei in bani
    });

    return {
      success: true,
      clientSecret,
    };
  } catch (error) {
    console.error("Error creating premium upgrade payment:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Eroare la crearea plății",
    };
  }
}
