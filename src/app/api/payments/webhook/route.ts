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

    // Handle webhook event
    const { payment, reportAccess } = await handleStripeWebhook(event);

    // Send email notification if payment succeeded
    if (event.type === "payment_intent.succeeded" && payment && reportAccess) {
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
