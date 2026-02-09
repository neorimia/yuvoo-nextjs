/**
 * Lead Payment Service
 *
 * Business logic for lead payment processing.
 * Handles pay-per-lead payments (3€) and premium upgrades (99.99 RON/month or 999.99 RON/year).
 */

import { stripe } from "@/lib/integrations/stripe/client";
import { leadPaymentRepository } from "./lead-payment.repository";
import { acceptLead } from "@/modules/leads/leads.service";
import { upgradeToPremium } from "@/modules/clubs/premium-club.service";
import type { LeadPayment } from "@/types/leads";
import {
  LeadPaymentMethod as PaymentMethodEnum,
  LeadPaymentStatus as PaymentStatusEnum,
  SubscriptionType,
} from "@/types/leads";

/**
 * Payment amount configuration
 */
export const PAY_PER_LEAD_AMOUNT_EUR = 3; // 3€ per lead
export const PAY_PER_LEAD_AMOUNT_CENTS = PAY_PER_LEAD_AMOUNT_EUR * 100; // 300 cents

// Premium subscription pricing
export const PREMIUM_MONTHLY_AMOUNT_LEI = 99.99; // 99.99 RON/month
export const PREMIUM_MONTHLY_AMOUNT_BANI = 9999; // 99.99 RON in bani

export const PREMIUM_YEARLY_AMOUNT_LEI = 999.99; // 999.99 RON/year (discounted yearly plan)
export const PREMIUM_YEARLY_AMOUNT_BANI = 99999; // 999.99 RON in bani

// Legacy constant for backward compatibility (deprecated - use PREMIUM_YEARLY_AMOUNT_LEI)
export const PREMIUM_AMOUNT_LEI = PREMIUM_YEARLY_AMOUNT_LEI;
export const PREMIUM_AMOUNT_BANI = PREMIUM_YEARLY_AMOUNT_BANI;

/**
 * Create pay-per-lead payment intent
 * Creates Stripe payment intent for 3€ to unlock a single lead
 */
export async function createPayPerLeadPaymentIntent(
  leadId: string,
  clubId: string
): Promise<{ payment: LeadPayment; clientSecret: string }> {
  // Step 1: Create Stripe payment intent first
  const paymentIntent = await stripe.paymentIntents.create({
    amount: PAY_PER_LEAD_AMOUNT_CENTS,
    currency: "eur", // Stripe uses lowercase currency codes
    metadata: {
      leadId,
      clubId,
      paymentMethod: "pay_per_lead",
    },
    automatic_payment_methods: {
      enabled: true,
    },
  });

  if (!paymentIntent.client_secret) {
    throw new Error("Eroare la crearea intenției de plată.");
  }

  // Step 2: Create payment record in database with Stripe payment intent ID
  const payment = await leadPaymentRepository.create({
    leadId,
    clubId,
    amount: PAY_PER_LEAD_AMOUNT_CENTS,
    currency: "EUR",
    paymentMethod: PaymentMethodEnum.PAY_PER_LEAD,
    stripePaymentIntentId: paymentIntent.id,
    status: PaymentStatusEnum.PENDING,
  });

  return {
    payment,
    clientSecret: paymentIntent.client_secret,
  };
}

/**
 * Create guest lead payment intent
 * Creates Stripe payment intent for 3€ for clubs without user accounts
 * @param leadId - Lead ID to unlock
 * @param clubId - Club ID
 * @param guestEmail - Email address of the guest (club representative)
 * @returns Payment record and client secret
 */
export async function createGuestLeadPaymentIntent(
  leadId: string,
  clubId: string,
  guestEmail: string
): Promise<{ payment: LeadPayment; clientSecret: string }> {
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(guestEmail)) {
    throw new Error("Adresa de email nu este validă.");
  }

  // Step 1: Create Stripe payment intent with guest metadata
  const paymentIntent = await stripe.paymentIntents.create({
    amount: PAY_PER_LEAD_AMOUNT_CENTS,
    currency: "eur", // Stripe uses lowercase currency codes
    metadata: {
      leadId,
      clubId,
      paymentMethod: "pay_per_lead",
      isGuestPayment: "true",
      guestEmail,
    },
    automatic_payment_methods: {
      enabled: true,
    },
  });

  if (!paymentIntent.client_secret) {
    throw new Error("Eroare la crearea intenției de plată.");
  }

  // Step 2: Create payment record in database with guest payment flag
  const payment = await leadPaymentRepository.create({
    leadId,
    clubId,
    amount: PAY_PER_LEAD_AMOUNT_CENTS,
    currency: "EUR",
    paymentMethod: PaymentMethodEnum.PAY_PER_LEAD,
    stripePaymentIntentId: paymentIntent.id,
    status: PaymentStatusEnum.PENDING,
    isGuestPayment: true,
    guestEmail,
  });

  return {
    payment,
    clientSecret: paymentIntent.client_secret,
  };
}

/**
 * Create premium upgrade subscription checkout session
 * Creates Stripe Checkout Session for premium subscription (monthly or yearly)
 * Uses Stripe Subscriptions for automatic renewals
 * @param clubId - Club ID
 * @param subscriptionType - Subscription type: MONTHLY (99.99 RON) or YEARLY (999.99 RON)
 * @param successUrl - URL to redirect after successful payment
 * @param cancelUrl - URL to redirect if payment is cancelled
 */
export async function createPremiumUpgradeCheckoutSession(
  clubId: string,
  subscriptionType: SubscriptionType = SubscriptionType.MONTHLY,
  successUrl: string,
  cancelUrl: string
): Promise<{ checkoutSessionId: string; url: string }> {
  // Calculate amount and interval based on subscription type
  const amount =
    subscriptionType === SubscriptionType.MONTHLY
      ? PREMIUM_MONTHLY_AMOUNT_BANI
      : PREMIUM_YEARLY_AMOUNT_BANI;
  const interval = subscriptionType === SubscriptionType.MONTHLY ? "month" : "year";

  // Create Stripe Checkout Session with subscription
  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "ron",
          product_data: {
            name: `Yuvoo Premium - ${subscriptionType === SubscriptionType.MONTHLY ? "Plan Lunar" : "Plan Anual"}`,
            description:
              subscriptionType === SubscriptionType.MONTHLY
                ? "Abonament Premium lunar - Acces nelimitat la cereri"
                : "Abonament Premium anual - Acces nelimitat la cereri (Plătești pentru 10 luni, primești 12)",
          },
          unit_amount: amount,
          recurring: {
            interval,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      clubId,
      paymentMethod: "premium",
      subscriptionType,
    },
    success_url: successUrl,
    cancel_url: cancelUrl,
    subscription_data: {
      metadata: {
        clubId,
        subscriptionType,
      },
    },
  });

  if (!checkoutSession.url) {
    throw new Error("Eroare la crearea sesiunii de checkout.");
  }

  return {
    checkoutSessionId: checkoutSession.id,
    url: checkoutSession.url,
  };
}

/**
 * Create premium upgrade payment intent (DEPRECATED - use createPremiumUpgradeCheckoutSession)
 * Kept for backward compatibility during migration
 * @deprecated Use createPremiumUpgradeCheckoutSession instead
 */
export async function createPremiumUpgradePaymentIntent(
  clubId: string,
  subscriptionType: SubscriptionType = SubscriptionType.MONTHLY
): Promise<{ payment: LeadPayment; clientSecret: string }> {
  // For premium, we create a dummy lead payment record to track the payment
  // The actual premium status is managed separately
  const dummyLeadId = crypto.randomUUID(); // Temporary ID, not used for premium

  // Calculate amount based on subscription type
  const amount =
    subscriptionType === SubscriptionType.MONTHLY
      ? PREMIUM_MONTHLY_AMOUNT_BANI
      : PREMIUM_YEARLY_AMOUNT_BANI;

  // Step 1: Create Stripe payment intent first
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "ron", // Stripe uses lowercase currency codes
    metadata: {
      clubId,
      paymentMethod: "premium",
      subscriptionType, // Store subscription type in metadata
    },
    automatic_payment_methods: {
      enabled: true,
    },
  });

  if (!paymentIntent.client_secret) {
    throw new Error("Eroare la crearea intenției de plată.");
  }

  // Step 2: Create payment record in database with Stripe payment intent ID
  const payment = await leadPaymentRepository.create({
    leadId: dummyLeadId,
    clubId,
    amount,
    currency: "RON",
    paymentMethod: PaymentMethodEnum.PREMIUM,
    stripePaymentIntentId: paymentIntent.id,
    status: PaymentStatusEnum.PENDING,
  });

  return {
    payment,
    clientSecret: paymentIntent.client_secret,
  };
}

/**
 * Process pay-per-lead payment completion
 * Called when Stripe webhook confirms payment success
 */
export async function processPayPerLeadPayment(paymentId: string): Promise<LeadPayment> {
  const payment = await leadPaymentRepository.findById(paymentId);

  if (!payment) {
    throw new Error("Plata nu a fost găsită.");
  }

  if (payment.status === PaymentStatusEnum.SUCCEEDED) {
    // Already processed
    return payment;
  }

  // Update payment status
  const updatedPayment = await leadPaymentRepository.updateStatus(
    paymentId,
    PaymentStatusEnum.SUCCEEDED,
    new Date()
  );

  // Unlock lead (accept lead with payment info)
  await acceptLead(payment.leadId, payment.clubId, payment.id, payment.paymentMethod);

  return updatedPayment;
}

/**
 * Process guest lead payment completion
 * Called when Stripe webhook confirms guest payment success
 * Sends email with parent information to guest email address
 */
export async function processGuestLeadPayment(paymentId: string): Promise<LeadPayment> {
  const payment = await leadPaymentRepository.findById(paymentId);

  if (!payment) {
    throw new Error("Plata nu a fost găsită.");
  }

  if (!payment.isGuestPayment || !payment.guestEmail) {
    throw new Error("Această plată nu este o plată pentru oaspeți.");
  }

  if (payment.status === PaymentStatusEnum.SUCCEEDED) {
    // Already processed
    return payment;
  }

  // Update payment status
  const updatedPayment = await leadPaymentRepository.updateStatus(
    paymentId,
    PaymentStatusEnum.SUCCEEDED,
    new Date()
  );

  // Unlock lead (accept lead with payment info)
  await acceptLead(payment.leadId, payment.clubId, payment.id, payment.paymentMethod);

  // Send email with parent information to guest email
  try {
    const { sendGuestPaymentSuccessEmail } = await import("@/modules/emails/lead-emails.service");
    const { leadsRepository } = await import("@/modules/leads/leads.repository");
    const { clubsRepository } = await import("@/modules/clubs/clubs.repository");

    // Fetch lead and club information
    const lead = await leadsRepository.findById(payment.leadId);
    const club = await clubsRepository.getClubById(payment.clubId);

    if (!lead) {
      throw new Error("Cererea nu a fost găsită.");
    }

    if (!club) {
      throw new Error("Clubul nu a fost găsit.");
    }

    // Send email with parent information
    await sendGuestPaymentSuccessEmail({
      guestEmail: payment.guestEmail,
      leadId: lead.id,
      parentName: lead.parentName,
      parentEmail: lead.parentEmail,
      parentPhone: lead.parentPhone,
      childAge: lead.childAge,
      message: lead.message,
      sportType: lead.sportType || club.sportName,
      clubName: club.name,
    });
  } catch (error) {
    // Log error but don't throw - payment is already processed
    console.error("[Guest Payment] Error sending guest payment success email:", error);
  }

  return updatedPayment;
}

/**
 * Process premium upgrade payment completion
 * Called when Stripe webhook confirms payment success
 */
export async function processPremiumUpgradePayment(
  paymentId: string,
  stripeSubscriptionId?: string | null,
  stripeCustomerId?: string | null
): Promise<LeadPayment> {
  const payment = await leadPaymentRepository.findById(paymentId);

  if (!payment) {
    throw new Error("Plata nu a fost găsită.");
  }

  if (payment.status === PaymentStatusEnum.SUCCEEDED) {
    // Already processed
    return payment;
  }

  // Update payment status
  const updatedPayment = await leadPaymentRepository.updateStatus(
    paymentId,
    PaymentStatusEnum.SUCCEEDED,
    new Date()
  );

  // Extract subscription type from payment intent metadata
  const paymentIntent = await stripe.paymentIntents.retrieve(payment.stripePaymentIntentId);
  const subscriptionType =
    (paymentIntent.metadata.subscriptionType as SubscriptionType) || SubscriptionType.MONTHLY;

  // Upgrade club to premium
  await upgradeToPremium(payment.clubId, {
    subscriptionType,
    stripeSubscriptionId: stripeSubscriptionId || null,
    stripeCustomerId: stripeCustomerId || null,
  });

  return updatedPayment;
}

/**
 * Handle payment failure
 */
export async function handlePaymentFailure(paymentId: string): Promise<LeadPayment> {
  const payment = await leadPaymentRepository.findById(paymentId);

  if (!payment) {
    throw new Error("Plata nu a fost găsită.");
  }

  // Update payment status to failed
  const failedPayment = await leadPaymentRepository.updateStatus(
    paymentId,
    PaymentStatusEnum.FAILED,
    null
  );

  return failedPayment;
}

/**
 * Verify payment status with Stripe
 */
export async function verifyStripePayment(stripePaymentIntentId: string): Promise<LeadPayment> {
  const payment = await leadPaymentRepository.findByStripePaymentIntentId(stripePaymentIntentId);

  if (!payment) {
    throw new Error("Plata nu a fost găsită.");
  }

  // Retrieve payment intent from Stripe
  const paymentIntent = await stripe.paymentIntents.retrieve(stripePaymentIntentId);

  // Update payment status based on Stripe status
  if (paymentIntent.status === "succeeded") {
    if (payment.paymentMethod === PaymentMethodEnum.PAY_PER_LEAD) {
      return await processPayPerLeadPayment(payment.id);
    } else if (payment.paymentMethod === PaymentMethodEnum.PREMIUM) {
      return await processPremiumUpgradePayment(
        payment.id,
        paymentIntent.metadata.subscriptionId || null,
        paymentIntent.metadata.customerId || null
      );
    }
  } else if (
    paymentIntent.status === "requires_payment_method" ||
    paymentIntent.status === "canceled"
  ) {
    // Payment failed or was canceled
    return await handlePaymentFailure(payment.id);
  }

  return payment;
}

/**
 * Process premium subscription renewal
 * Called when Stripe webhook confirms subscription renewal payment
 */
export async function processPremiumSubscriptionRenewal(subscriptionId: string): Promise<void> {
  // Retrieve subscription from Stripe
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  // Extract club ID from subscription metadata
  const clubId = subscription.metadata.clubId;
  if (!clubId) {
    throw new Error("Club ID not found in subscription metadata");
  }

  // Extract subscription type from metadata
  const subscriptionType =
    (subscription.metadata.subscriptionType as SubscriptionType) || SubscriptionType.MONTHLY;

  // Update premium status with new period (upgradeToPremium calculates dates based on current period)
  await upgradeToPremium(clubId, {
    subscriptionType,
    stripeSubscriptionId: subscriptionId,
    stripeCustomerId: subscription.customer as string,
  });
}

export const leadPaymentService = {
  createPayPerLeadPaymentIntent,
  createGuestLeadPaymentIntent,
  createPremiumUpgradePaymentIntent, // Deprecated but kept for backward compatibility
  createPremiumUpgradeCheckoutSession,
  processPayPerLeadPayment,
  processGuestLeadPayment,
  processPremiumUpgradePayment,
  processPremiumSubscriptionRenewal,
  handlePaymentFailure,
  verifyStripePayment,
};
