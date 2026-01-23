/**
 * Lead Payment Service
 *
 * Business logic for lead payment processing.
 * Handles pay-per-lead payments (3€) and premium upgrades (199 lei/year).
 */

import { stripe } from "@/lib/integrations/stripe/client";
import { leadPaymentRepository } from "./lead-payment.repository";
import { acceptLead } from "@/modules/leads/leads.service";
import { upgradeToPremium } from "@/modules/clubs/premium-club.service";
import type { LeadPayment } from "@/types/leads";
import {
  LeadPaymentMethod as PaymentMethodEnum,
  LeadPaymentStatus as PaymentStatusEnum,
} from "@/types/leads";

/**
 * Payment amount configuration
 */
export const PAY_PER_LEAD_AMOUNT_EUR = 3; // 3€ per lead
export const PAY_PER_LEAD_AMOUNT_CENTS = PAY_PER_LEAD_AMOUNT_EUR * 100; // 300 cents

export const PREMIUM_AMOUNT_LEI = 199; // 199 lei/year
export const PREMIUM_AMOUNT_BANI = PREMIUM_AMOUNT_LEI * 100; // 19900 bani

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
 * Create premium upgrade payment intent
 * Creates Stripe payment intent for 199 lei/year for premium subscription
 */
export async function createPremiumUpgradePaymentIntent(
  clubId: string
): Promise<{ payment: LeadPayment; clientSecret: string }> {
  // For premium, we create a dummy lead payment record to track the payment
  // The actual premium status is managed separately
  const dummyLeadId = crypto.randomUUID(); // Temporary ID, not used for premium

  // Step 1: Create Stripe payment intent first
  const paymentIntent = await stripe.paymentIntents.create({
    amount: PREMIUM_AMOUNT_BANI,
    currency: "ron", // Stripe uses lowercase currency codes
    metadata: {
      clubId,
      paymentMethod: "premium",
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
    amount: PREMIUM_AMOUNT_BANI,
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

  // Upgrade club to premium
  await upgradeToPremium(payment.clubId, {
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

export const leadPaymentService = {
  createPayPerLeadPaymentIntent,
  createPremiumUpgradePaymentIntent,
  processPayPerLeadPayment,
  processPremiumUpgradePayment,
  handlePaymentFailure,
  verifyStripePayment,
};
