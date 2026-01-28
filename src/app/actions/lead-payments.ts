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
  createPremiumUpgradeCheckoutSession,
  PREMIUM_MONTHLY_AMOUNT_BANI,
  PREMIUM_YEARLY_AMOUNT_BANI,
} from "@/modules/payments/lead-payment.service";
import { SubscriptionType } from "@/types/leads";
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
 * Create premium upgrade checkout session
 * Creates Stripe Checkout Session for premium subscription (99 lei/month or 990 lei/year)
 * Uses Stripe Subscriptions for automatic renewals
 * @param subscriptionType - MONTHLY (99 lei) or YEARLY (990 lei), defaults to MONTHLY
 */
export async function createPremiumUpgradeCheckoutAction(
  subscriptionType: SubscriptionType = SubscriptionType.MONTHLY
): Promise<{
  success: boolean;
  checkoutUrl?: string;
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

    // Validate subscription type
    if (
      subscriptionType !== SubscriptionType.MONTHLY &&
      subscriptionType !== SubscriptionType.YEARLY
    ) {
      return {
        success: false,
        error: "Tip de abonament invalid",
      };
    }

    // Build success and cancel URLs
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const successUrl = `${baseUrl}/club/dashboard/premium?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${baseUrl}/club/dashboard/premium?canceled=true`;

    // Create checkout session
    const { url } = await createPremiumUpgradeCheckoutSession(
      club.id,
      subscriptionType,
      successUrl,
      cancelUrl
    );

    // Calculate amount based on subscription type
    const amount =
      subscriptionType === SubscriptionType.MONTHLY
        ? PREMIUM_MONTHLY_AMOUNT_BANI
        : PREMIUM_YEARLY_AMOUNT_BANI;

    // Track premium upgrade initiation
    await trackEventServer(PostHogEvents.PREMIUM_UPGRADE_INITIATED, {
      distinctId: user.id,
      [PostHogProperties.CLUB_ID]: club.id,
      [PostHogProperties.PAYMENT_AMOUNT]: amount,
      subscriptionType, // Track subscription type
    });

    return {
      success: true,
      checkoutUrl: url,
    };
  } catch (error) {
    console.error("Error creating premium upgrade checkout:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Eroare la crearea plății",
    };
  }
}

/**
 * Create premium upgrade payment intent (DEPRECATED - use createPremiumUpgradeCheckoutAction)
 * Kept for backward compatibility during migration
 * @deprecated Use createPremiumUpgradeCheckoutAction instead
 */
export async function createPremiumUpgradePaymentAction(
  subscriptionType: SubscriptionType = SubscriptionType.MONTHLY
): Promise<{
  success: boolean;
  clientSecret?: string;
  error?: string;
}> {
  // Redirect to checkout session action
  const result = await createPremiumUpgradeCheckoutAction(subscriptionType);
  if (result.success && result.checkoutUrl) {
    // For backward compatibility, return error suggesting to use checkout
    return {
      success: false,
      error: "Please use checkout session instead of payment intent",
    };
  }
  return result;
}
