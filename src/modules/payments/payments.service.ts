/**
 * Payment Service
 *
 * Business logic for payment processing.
 * Handles payment creation, verification, and report access management.
 */

import { stripe } from "@/lib/integrations/stripe/client";
import {
  createPayment,
  getPaymentById,
  getPaymentByQuizId,
  updatePayment,
  createReportAccess,
  getReportAccessByToken,
  updateLastAccessed,
} from "./payments.repository";
import { getQuizResult } from "../quiz/quiz.service";
import type { Payment, ReportAccess, CreatePaymentInput } from "./payments.types";
import type Stripe from "stripe";

/**
 * Payment amount configuration
 * 9.99 lei (one-time payment)
 */
export const PAYMENT_AMOUNT_LEI = 9.99;
export const PAYMENT_AMOUNT_BANI = 999; // 9.99 lei in bani (smallest currency unit)

/**
 * Create payment intent with Stripe
 *
 * Creates a payment record in database and a payment intent in Stripe.
 * Returns client secret for frontend payment processing.
 */
export async function createStripePaymentIntent(
  input: CreatePaymentInput
): Promise<{ payment: Payment; clientSecret: string }> {
  // Step 1: Verify quiz exists
  const quizResult = await getQuizResult(input.quizId);
  if (!quizResult) {
    throw new Error("Chestionarul nu a fost găsit.");
  }

  // Step 2: Check if payment already exists for this quiz
  const existingPayment = await getPaymentByQuizId(input.quizId);
  if (existingPayment && existingPayment.status === "completed") {
    throw new Error("Plata pentru acest chestionar a fost deja finalizată.");
  }

  // Step 3: Create payment record in database
  const payment = await createPayment({
    ...input,
    amount: PAYMENT_AMOUNT_BANI,
    currency: "RON",
    paymentProvider: "stripe",
  });

  // Step 4: Create Stripe payment intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: PAYMENT_AMOUNT_BANI,
    currency: "ron", // Stripe uses lowercase currency codes
    metadata: {
      paymentId: payment.id,
      quizId: input.quizId,
      userId: input.userId || "anonymous",
    },
    automatic_payment_methods: {
      enabled: true,
    },
  });

  // Step 5: Update payment with Stripe payment intent ID
  await updatePayment(payment.id, {
    paymentProviderId: paymentIntent.id,
    paymentProviderMetadata: {
      clientSecret: paymentIntent.client_secret,
    },
  });

  if (!paymentIntent.client_secret) {
    throw new Error("Eroare la crearea intenției de plată.");
  }

  return {
    payment,
    clientSecret: paymentIntent.client_secret,
  };
}

/**
 * Verify payment status with Stripe
 *
 * Checks payment status with Stripe and updates database accordingly.
 */
export async function verifyStripePayment(paymentId: string): Promise<Payment> {
  const payment = await getPaymentById(paymentId);
  if (!payment) {
    throw new Error("Plata nu a fost găsită.");
  }

  if (payment.paymentProvider !== "stripe" || !payment.paymentProviderId) {
    throw new Error("Plata nu este procesată prin Stripe.");
  }

  // Retrieve payment intent from Stripe
  const paymentIntent = await stripe.paymentIntents.retrieve(payment.paymentProviderId);

  // Map Stripe status to our payment status
  let status: Payment["status"] = "pending";
  if (paymentIntent.status === "succeeded") {
    status = "completed";
  } else if (paymentIntent.status === "canceled") {
    status = "failed";
  }
  // Note: Payment failures are handled via webhook events, not status checks
  // Status remains "pending" for other states (requires_payment_method, processing, etc.)

  // Update payment status
  const updatedPayment = await updatePayment(paymentId, {
    status,
    paymentProviderMetadata: {
      ...((payment.paymentProviderMetadata as Record<string, unknown>) || {}),
      stripeStatus: paymentIntent.status,
      lastVerified: new Date().toISOString(),
    },
    completedAt: status === "completed" ? new Date() : undefined,
  });

  // If payment completed, create report access
  if (status === "completed" && !payment.completedAt) {
    await createReportAccess({
      quizId: payment.quizId,
      paymentId: payment.id,
    });
  }

  return updatedPayment;
}

/**
 * Handle Stripe webhook event
 *
 * Processes Stripe webhook events and updates payment status.
 */
export async function handleStripeWebhook(
  event: Stripe.Event
): Promise<{ payment: Payment | null; reportAccess: ReportAccess | null }> {
  let payment: Payment | null = null;
  let reportAccess: ReportAccess | null = null;

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const paymentId = paymentIntent.metadata?.paymentId;

    if (!paymentId) {
      console.error("[Stripe Webhook] Payment ID not found in metadata");
      return { payment: null, reportAccess: null };
    }

    // Update payment status
    payment = await updatePayment(paymentId, {
      status: "completed",
      paymentProviderMetadata: {
        stripeStatus: paymentIntent.status,
        webhookReceivedAt: new Date().toISOString(),
      },
      completedAt: new Date(),
    });

    // Create report access
    reportAccess = await createReportAccess({
      quizId: payment.quizId,
      paymentId: payment.id,
    });
  } else if (event.type === "payment_intent.payment_failed") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const paymentId = paymentIntent.metadata?.paymentId;

    if (!paymentId) {
      console.error("[Stripe Webhook] Payment ID not found in metadata");
      return { payment: null, reportAccess: null };
    }

    // Update payment status
    payment = await updatePayment(paymentId, {
      status: "failed",
      paymentProviderMetadata: {
        stripeStatus: paymentIntent.status,
        webhookReceivedAt: new Date().toISOString(),
      },
    });
  }

  return { payment, reportAccess };
}

/**
 * Get payment status for quiz
 *
 * Returns payment status for a given quiz ID.
 */
export async function getPaymentStatus(quizId: string): Promise<Payment | null> {
  return await getPaymentByQuizId(quizId);
}

/**
 * Verify report access token
 *
 * Verifies access token and updates last accessed timestamp.
 * Optimized: Combines access verification and payment check in single query where possible.
 */
export async function verifyReportAccess(token: string): Promise<{
  access: ReportAccess | null;
  payment: Payment | null;
}> {
  const access = await getReportAccessByToken(token);
  if (!access) {
    return { access: null, payment: null };
  }

  // Get payment to verify it's completed (parallel with update for better performance)
  const [payment] = await Promise.all([
    getPaymentById(access.paymentId),
    updateLastAccessed(token), // Update timestamp asynchronously
  ]);

  if (!payment || payment.status !== "completed") {
    return { access: null, payment: null };
  }

  return { access, payment };
}
