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
import { verifyStripePayment as verifyLeadPayment } from "@/modules/payments/lead-payment.service";
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

    // Check if this is a lead payment (has leadId or clubId in metadata, or paymentMethod)
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const isLeadPayment =
      !!paymentIntent.metadata?.leadId ||
      (!!paymentIntent.metadata?.clubId &&
        (paymentIntent.metadata?.paymentMethod === "pay_per_lead" ||
          paymentIntent.metadata?.paymentMethod === "premium"));

    let payment = null;
    let reportAccess = null;

    if (isLeadPayment) {
      // Handle lead payment webhook
      if (event.type === "payment_intent.succeeded") {
        try {
          // Verify and process lead payment
          const leadPayment = await verifyLeadPayment(paymentIntent.id);

          // Revalidate cache for lead/premium pages
          const { revalidatePath, revalidateTag } = await import("next/cache");
          if (leadPayment.paymentMethod === "pay_per_lead" && leadPayment.leadId) {
            revalidatePath(`/club/dashboard/leaduri/${leadPayment.leadId}`);
          } else if (leadPayment.paymentMethod === "premium") {
            revalidatePath("/club/dashboard");
            revalidatePath("/club/dashboard/leaduri");
            revalidatePath("/club/dashboard/premium");
          }
          revalidateTag(`club-dashboard-${leadPayment.clubId}`, "max");

          // Track payment completion
          const { trackEventServer } = await import("@/lib/analytics/tracking-server");
          const { PostHogEvents, PostHogProperties } = await import("@/lib/analytics/events");

          await trackEventServer(
            leadPayment.paymentMethod === "pay_per_lead"
              ? PostHogEvents.LEAD_PAYMENT_COMPLETED
              : PostHogEvents.PREMIUM_UPGRADE_COMPLETED,
            {
              distinctId: "webhook",
              [PostHogProperties.LEAD_ID]: leadPayment.leadId || undefined,
              [PostHogProperties.CLUB_ID]: leadPayment.clubId,
              [PostHogProperties.LEAD_PAYMENT_METHOD]: leadPayment.paymentMethod,
              [PostHogProperties.PAYMENT_AMOUNT]: leadPayment.amount,
            }
          );
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

      // Return success for lead payments (no email sending needed)
      return NextResponse.json({ received: true, type: "lead_payment" });
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
