/**
 * Stripe Webhook Handler
 *
 * Handles Stripe webhook events for payment status updates.
 * Verifies webhook signature for security.
 */

import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/integrations/stripe/client";
import { handleStripeWebhook } from "@/modules/payments/payments.service";
import { sendPaymentSuccessEmail } from "@/modules/payments/payments.email";
import {
  verifyStripePayment as verifyLeadPayment,
  processPremiumSubscriptionRenewal,
} from "@/modules/payments/lead-payment.service";
import { premiumClubService } from "@/modules/clubs/premium-club.service";
import { SubscriptionType } from "@/types/leads";
import type Stripe from "stripe";

/**
 * Get Stripe webhook secret from environment
 */
function getWebhookSecret(): string {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    throw new Error("STRIPE_WEBHOOK_SECRET environment variable is not set");
  }
  return secret;
}

/**
 * POST /api/payments/webhook
 *
 * Handles Stripe webhook events.
 */
export async function POST(request: NextRequest) {
  try {
    // Get raw body for signature verification
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      console.error("[Stripe Webhook] Missing signature");
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, getWebhookSecret());
    } catch (err) {
      console.error("[Stripe Webhook] Signature verification failed:", err);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Handle subscription checkout completion (premium upgrades)
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.mode === "subscription" && session.metadata?.clubId) {
        // Premium subscription checkout completed
        try {
          const subscriptionId = session.subscription as string;
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);
          const clubId = session.metadata.clubId;
          const subscriptionType =
            (session.metadata.subscriptionType as SubscriptionType) || SubscriptionType.MONTHLY;

          // Upgrade club to premium
          await premiumClubService.upgradeToPremium(clubId, {
            subscriptionType,
            stripeSubscriptionId: subscriptionId,
            stripeCustomerId: subscription.customer as string,
          });

          // Revalidate cache
          const { revalidatePath, revalidateTag } = await import("next/cache");
          revalidatePath("/club/dashboard");
          revalidatePath("/club/dashboard/leaduri");
          revalidatePath("/club/dashboard/premium");
          revalidateTag(`club-dashboard-${clubId}`, "max");

          // Track subscription creation
          const { trackEventServer } = await import("@/lib/analytics/tracking-server");
          const { PostHogEvents, PostHogProperties } = await import("@/lib/analytics/events");

          await trackEventServer(PostHogEvents.PREMIUM_UPGRADE_COMPLETED, {
            distinctId: "webhook",
            [PostHogProperties.CLUB_ID]: clubId,
            [PostHogProperties.LEAD_PAYMENT_METHOD]: "premium",
            subscriptionType,
          });
        } catch (error) {
          console.error("[Stripe Webhook] Error processing subscription checkout:", error);
        }
      }
      // Continue to handle other checkout sessions (quiz payments, etc.)
    }

    // Handle subscription renewal (invoice.payment_succeeded for subscriptions)
    if (event.type === "invoice.payment_succeeded") {
      const invoice = event.data.object as Stripe.Invoice;
      // Access subscription ID from invoice
      // Note: Stripe Invoice type includes subscription field, but TypeScript types may not expose it

      const invoiceWithSubscription = invoice as Stripe.Invoice & {
        subscription?: string | { id: string };
      };
      const subscriptionId =
        typeof invoiceWithSubscription.subscription === "string"
          ? invoiceWithSubscription.subscription
          : invoiceWithSubscription.subscription?.id;
      if (subscriptionId && invoice.billing_reason === "subscription_cycle") {
        // Subscription renewal payment succeeded
        try {
          await processPremiumSubscriptionRenewal(subscriptionId);

          // Revalidate cache
          const { revalidatePath, revalidateTag } = await import("next/cache");
          // Get club ID from subscription metadata
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);
          if (subscription.metadata?.clubId) {
            revalidatePath("/club/dashboard");
            revalidatePath("/club/dashboard/premium");
            revalidateTag(`club-dashboard-${subscription.metadata.clubId}`, "max");
          }
        } catch (error) {
          console.error("[Stripe Webhook] Error processing subscription renewal:", error);
        }
      }
    }

    // Handle subscription updates (e.g., cancellation, plan changes)
    if (event.type === "customer.subscription.updated") {
      const subscription = event.data.object as Stripe.Subscription;
      if (subscription.metadata?.clubId) {
        try {
          const clubId = subscription.metadata.clubId;
          const subscriptionType =
            (subscription.metadata.subscriptionType as SubscriptionType) ||
            SubscriptionType.MONTHLY;

          // Update premium status based on subscription status
          if (subscription.status === "active" || subscription.status === "trialing") {
            // Subscription is active - update dates
            await premiumClubService.upgradeToPremium(clubId, {
              subscriptionType,
              stripeSubscriptionId: subscription.id,
              stripeCustomerId: subscription.customer as string,
            });
          } else if (
            subscription.status === "canceled" ||
            subscription.status === "unpaid" ||
            subscription.status === "past_due"
          ) {
            // Subscription canceled or unpaid - mark premium as inactive
            const { premiumClubRepository } =
              await import("@/modules/clubs/premium-club.repository");
            await premiumClubRepository.update(clubId, {
              isPremium: false,
            });
          }

          // Revalidate cache
          const { revalidatePath, revalidateTag } = await import("next/cache");
          revalidatePath("/club/dashboard");
          revalidatePath("/club/dashboard/premium");
          revalidateTag(`club-dashboard-${clubId}`, "max");
        } catch (error) {
          console.error("[Stripe Webhook] Error processing subscription update:", error);
        }
      }
    }

    // Handle subscription deletion (cancellation)
    if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object as Stripe.Subscription;
      if (subscription.metadata?.clubId) {
        try {
          const clubId = subscription.metadata.clubId;
          const { premiumClubRepository } = await import("@/modules/clubs/premium-club.repository");
          await premiumClubRepository.update(clubId, {
            isPremium: false,
          });

          // Revalidate cache
          const { revalidatePath, revalidateTag } = await import("next/cache");
          revalidatePath("/club/dashboard");
          revalidatePath("/club/dashboard/premium");
          revalidateTag(`club-dashboard-${clubId}`, "max");
        } catch (error) {
          console.error("[Stripe Webhook] Error processing subscription deletion:", error);
        }
      }
    }

    // Handle pay-per-lead payment intents (one-time payments)
    let payment = null;
    let reportAccess = null;
    let isLeadPayment = false;

    if (
      event.type === "payment_intent.succeeded" ||
      event.type === "payment_intent.payment_failed"
    ) {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      isLeadPayment =
        !!paymentIntent.metadata?.leadId ||
        (!!paymentIntent.metadata?.clubId &&
          (paymentIntent.metadata?.paymentMethod === "pay_per_lead" ||
            paymentIntent.metadata?.paymentMethod === "premium"));
    }

    if (
      isLeadPayment &&
      (event.type === "payment_intent.succeeded" || event.type === "payment_intent.payment_failed")
    ) {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      // Handle pay-per-lead payment webhook
      if (event.type === "payment_intent.succeeded") {
        try {
          // Check if this is a guest payment
          const isGuestPayment = paymentIntent.metadata?.isGuestPayment === "true";

          let leadPayment;
          if (isGuestPayment) {
            // Process guest payment (sends email with parent info)
            const { processGuestLeadPayment } =
              await import("@/modules/payments/lead-payment.service");
            const { leadPaymentRepository } =
              await import("@/modules/payments/lead-payment.repository");
            const payment = await leadPaymentRepository.findByStripePaymentIntentId(
              paymentIntent.id
            );
            if (!payment) {
              throw new Error("Payment not found");
            }
            leadPayment = await processGuestLeadPayment(payment.id);
          } else {
            // Process regular authenticated payment
            leadPayment = await verifyLeadPayment(paymentIntent.id);
          }

          // Revalidate cache for lead/premium pages
          const { revalidatePath, revalidateTag } = await import("next/cache");
          if (leadPayment.paymentMethod === "pay_per_lead" && leadPayment.leadId) {
            revalidatePath(`/club/dashboard/leaduri/${leadPayment.leadId}`);
          }
          revalidateTag(`club-dashboard-${leadPayment.clubId}`, "max");

          // Track payment completion
          const { trackEventServer } = await import("@/lib/analytics/tracking-server");
          const { PostHogEvents, PostHogProperties } = await import("@/lib/analytics/events");

          await trackEventServer(PostHogEvents.LEAD_PAYMENT_COMPLETED, {
            distinctId: "webhook",
            [PostHogProperties.LEAD_ID]: leadPayment.leadId || undefined,
            [PostHogProperties.CLUB_ID]: leadPayment.clubId,
            [PostHogProperties.LEAD_PAYMENT_METHOD]: leadPayment.paymentMethod,
            [PostHogProperties.PAYMENT_AMOUNT]: leadPayment.amount,
            isGuestPayment: isGuestPayment || false,
          });
        } catch (error) {
          console.error("[Stripe Webhook] Error processing lead payment:", error);
          // Don't throw - let webhook return success to prevent retries
        }
      } else if (event.type === "payment_intent.payment_failed") {
        // Handle payment failure for lead payments
        try {
          const { leadPaymentRepository } =
            await import("@/modules/payments/lead-payment.repository");
          const { LeadPaymentStatus } = await import("@/types/leads");
          const payment = await leadPaymentRepository.findByStripePaymentIntentId(paymentIntent.id);
          if (payment) {
            await leadPaymentRepository.updateStatus(payment.id, LeadPaymentStatus.FAILED, null);
          }
        } catch (error) {
          console.error("[Stripe Webhook] Error handling lead payment failure:", error);
        }
      }

      // Return success for pay-per-lead payments
      return NextResponse.json({ received: true, type: "pay_per_lead" });
    } else {
      // Handle quiz payment webhook (existing logic)
      const result = await handleStripeWebhook(event);
      payment = result.payment;
      reportAccess = result.reportAccess;
    }

    // Send email notification if payment succeeded (only for quiz payments)
    if (event.type === "payment_intent.succeeded" && payment && reportAccess && !isLeadPayment) {
      try {
        // Get email from quiz or user
        let email: string | null = null;

        // First, try to get email from quiz
        const { db } = await import("@/lib/db");
        const { quizzes } = await import("@/lib/db/schema");
        const { eq } = await import("drizzle-orm");

        const [quiz] = await db
          .select({ email: quizzes.email })
          .from(quizzes)
          .where(eq(quizzes.id, payment.quizId))
          .limit(1);

        email = quiz?.email || null;

        // If no email in quiz, try to get from user
        if (!email && payment.userId) {
          email = await getUserEmail(payment.userId);
        }

        if (email) {
          await sendPaymentSuccessEmail({
            email,
            quizId: payment.quizId,
            accessToken: reportAccess.accessToken,
          });
        } else {
          console.warn(`[Stripe Webhook] No email found for payment ${payment.id}`);
        }
      } catch (emailError) {
        // Don't fail webhook if email fails, but log the error
        console.error("[Stripe Webhook] Error sending payment success email:", emailError);

        // Log email error details for debugging
        if (emailError instanceof Error) {
          console.error("[Stripe Webhook] Email error details:", {
            message: emailError.message,
            stack: emailError.stack,
            paymentId: payment?.id,
            quizId: payment?.quizId,
          });
        }

        // TODO: Consider adding email to retry queue for failed email sends
      }
    }

    // Return success
    return NextResponse.json({ received: true, paymentId: payment?.id });
  } catch (error) {
    console.error("[Stripe Webhook] Error processing webhook:", error);

    // Log detailed error information for debugging
    if (error instanceof Error) {
      console.error("[Stripe Webhook] Error details:", {
        message: error.message,
        stack: error.stack,
        name: error.name,
      });
    }

    // Return error response (Stripe will retry)
    return NextResponse.json(
      {
        error: "Webhook processing failed",
        // Include error message in development only
        ...(process.env.NODE_ENV === "development" && error instanceof Error
          ? { details: error.message }
          : {}),
      },
      { status: 500 }
    );
  }
}

/**
 * Helper function to get user email
 */
async function getUserEmail(userId: string): Promise<string | null> {
  try {
    const { db } = await import("@/lib/db");
    const { users } = await import("@/lib/db/schema");
    const { eq } = await import("drizzle-orm");

    const [user] = await db
      .select({ email: users.email })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    return user?.email || null;
  } catch (error) {
    console.error("[Stripe Webhook] Error getting user email:", error);
    return null;
  }
}
