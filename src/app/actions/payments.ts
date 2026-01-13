/**
 * Payment Server Actions
 *
 * Server Actions for payment processing.
 * All error messages are in Romanian as per project requirements.
 */

"use server";

import { getSession } from "@/lib/auth/session";
import { getCurrentUser } from "@/modules/auth/auth.service";
import {
  createStripePaymentIntent,
  verifyStripePayment,
  getPaymentStatus,
  verifyReportAccess,
} from "@/modules/payments/payments.service";
import {
  createPaymentSchema,
  verifyPaymentSchema,
  reportAccessTokenSchema,
} from "@/lib/validations/payments";
import { revalidatePath } from "next/cache";
import { trackEventServer } from "@/lib/analytics/tracking-server";
import { PostHogEvents, PostHogProperties } from "@/lib/analytics/events";
import type { Payment, ReportAccess } from "@/modules/payments/payments.types";

/**
 * Create payment intent
 *
 * Creates a payment record and Stripe payment intent.
 * Returns client secret for frontend payment processing.
 */
export async function createPaymentAction(
  input: unknown
): Promise<{ success: boolean; payment?: Payment; clientSecret?: string; error?: string }> {
  try {
    // Step 1: Validate input
    const validationResult = createPaymentSchema.safeParse(input);
    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0];
      return {
        success: false,
        error: firstError?.message || "Date invalide. Te rugăm să verifici inputul.",
      };
    }

    const { quizId, userId: providedUserId } = validationResult.data;

    // Step 2: Get user (if authenticated)
    const session = await getSession();
    let userId: string | undefined = providedUserId;

    if (session) {
      const user = await getCurrentUser();
      if (user) {
        userId = user.id; // Use authenticated user ID
      }
    }

    // Step 3: Create payment intent
    // Note: Amount, currency, and paymentProvider are set automatically by createStripePaymentIntent
    const { payment, clientSecret } = await createStripePaymentIntent({
      quizId,
      userId,
      amount: 3900, // Will be overridden by service (PAYMENT_AMOUNT_BANI), but required by type
      currency: "RON", // Will be overridden by service, but required by type
      paymentProvider: "stripe", // Will be overridden by service, but required by type
    });

    // Step 4: Track payment creation event
    try {
      await trackEventServer(PostHogEvents.PAYMENT_CREATED, {
        distinctId: userId || "anonymous",
        [PostHogProperties.QUIZ_ID]: quizId,
        [PostHogProperties.PAYMENT_ID]: payment.id,
        [PostHogProperties.PAYMENT_AMOUNT]: payment.amount,
        [PostHogProperties.PAYMENT_PROVIDER]: payment.paymentProvider,
      });
    } catch (trackingError) {
      // Don't fail payment creation if tracking fails
      console.error("[PostHog] Error tracking payment creation:", trackingError);
    }

    // Step 5: Revalidate cache
    revalidatePath(`/chestionar/paywall/${quizId}`);
    revalidatePath(`/chestionar/payment/success/${quizId}`);

    return {
      success: true,
      payment,
      clientSecret,
    };
  } catch (error) {
    console.error("[Payment Action] Error creating payment:", error);

    // Handle specific errors
    if (error instanceof Error) {
      // Check if error message is already in Romanian
      const isRomanianError =
        error.message.includes("Chestionarul") ||
        error.message.includes("Plata") ||
        error.message.includes("Eroare") ||
        error.message.includes("Te rugăm");

      return {
        success: false,
        error: isRomanianError
          ? error.message
          : "Eroare la crearea plății. Te rugăm să încerci din nou.",
      };
    }

    return {
      success: false,
      error: "Eroare necunoscută la crearea plății. Te rugăm să încerci din nou.",
    };
  }
}

/**
 * Verify payment status
 *
 * Verifies payment status with payment provider and updates database.
 */
export async function verifyPaymentAction(
  input: unknown
): Promise<{ success: boolean; payment?: Payment; error?: string }> {
  try {
    // Step 1: Validate input
    const validationResult = verifyPaymentSchema.safeParse(input);
    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0];
      return {
        success: false,
        error: firstError?.message || "Date invalide. Te rugăm să verifici inputul.",
      };
    }

    const { paymentId } = validationResult.data;

    // Step 2: Verify payment
    const payment = await verifyStripePayment(paymentId);

    // Step 3: Track payment verification event
    try {
      await trackEventServer(PostHogEvents.PAYMENT_VERIFIED, {
        distinctId: payment.userId || "anonymous",
        [PostHogProperties.PAYMENT_ID]: payment.id,
        [PostHogProperties.QUIZ_ID]: payment.quizId,
        [PostHogProperties.PAYMENT_STATUS]: payment.status,
      });
    } catch (trackingError) {
      console.error("[PostHog] Error tracking payment verification:", trackingError);
    }

    // Step 4: Revalidate cache
    revalidatePath(`/chestionar/payment/success/${payment.quizId}`);
    revalidatePath(`/chestionar/raport`);

    return {
      success: true,
      payment,
    };
  } catch (error) {
    console.error("[Payment Action] Error verifying payment:", error);

    if (error instanceof Error) {
      const isRomanianError =
        error.message.includes("Plata") ||
        error.message.includes("Eroare") ||
        error.message.includes("Te rugăm");

      return {
        success: false,
        error: isRomanianError
          ? error.message
          : "Eroare la verificarea plății. Te rugăm să încerci din nou.",
      };
    }

    return {
      success: false,
      error: "Eroare necunoscută la verificarea plății. Te rugăm să încerci din nou.",
    };
  }
}

/**
 * Get payment status for quiz
 *
 * Returns payment status for a given quiz ID.
 */
export async function getPaymentStatusAction(
  quizId: string
): Promise<{ success: boolean; payment?: Payment | null; error?: string }> {
  try {
    // Validate quizId
    if (!quizId || typeof quizId !== "string" || quizId.length !== 36) {
      return {
        success: false,
        error: "ID-ul chestionarului este invalid.",
      };
    }

    const payment = await getPaymentStatus(quizId);

    return {
      success: true,
      payment,
    };
  } catch (error) {
    console.error("[Payment Action] Error getting payment status:", error);

    return {
      success: false,
      error: "Eroare la obținerea statusului plății. Te rugăm să încerci din nou.",
    };
  }
}

/**
 * Verify report access token
 *
 * Verifies access token and returns access information.
 */
export async function verifyReportAccessAction(
  input: unknown
): Promise<{ success: boolean; access?: ReportAccess; payment?: Payment; error?: string }> {
  try {
    // Step 1: Validate input
    const validationResult = reportAccessTokenSchema.safeParse(input);
    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0];
      return {
        success: false,
        error: firstError?.message || "Token-ul de acces este invalid.",
      };
    }

    const { accessToken } = validationResult.data;

    // Step 2: Verify access
    const { access, payment } = await verifyReportAccess(accessToken);

    if (!access || !payment) {
      return {
        success: false,
        error: "Token-ul de acces este invalid sau a expirat.",
      };
    }

    return {
      success: true,
      access,
      payment,
    };
  } catch (error) {
    console.error("[Payment Action] Error verifying report access:", error);

    return {
      success: false,
      error: "Eroare la verificarea accesului. Te rugăm să încerci din nou.",
    };
  }
}
