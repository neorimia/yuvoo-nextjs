/**
 * Get Report Server Action
 *
 * Verifies access token and returns quiz result for report display.
 * Only accessible if payment is completed.
 */

"use server";

import { verifyReportAccess } from "@/modules/payments/payments.service";
import { getQuizResult } from "@/modules/quiz/quiz.service";
import { quizRepository } from "@/modules/quiz/quiz.repository";
import { reportAccessTokenSchema } from "@/lib/validations/payments";
import { routes } from "@/lib/routes";
import { trackEventServer } from "@/lib/analytics/tracking-server";
import { PostHogEvents, PostHogProperties } from "@/lib/analytics/events";
import type { Payment, ReportAccess } from "@/modules/payments/payments.types";
import type { QuizResult, QuizAnswers } from "@/modules/quiz/quiz.types";

/**
 * Check if error is a NEXT_REDIRECT error
 */
function isRedirectError(error: unknown): boolean {
  return (
    error !== null &&
    typeof error === "object" &&
    "digest" in error &&
    typeof error.digest === "string" &&
    error.digest.startsWith("NEXT_REDIRECT")
  );
}

/**
 * Get report data by access token
 *
 * Verifies access token, checks payment status, and returns quiz result.
 * Returns error states instead of redirecting to prevent hooks errors in Suspense boundaries.
 */
export async function getReportAction(accessToken: string): Promise<{
  success: boolean;
  quizResult?: QuizResult;
  quizAnswers?: QuizAnswers;
  payment?: Payment;
  access?: ReportAccess;
  error?: "INVALID_TOKEN" | "ACCESS_DENIED" | "QUIZ_NOT_FOUND" | "UNKNOWN_ERROR";
  redirectTo?: string;
}> {
  try {
    // Step 1: Validate access token
    const validationResult = reportAccessTokenSchema.safeParse(accessToken);
    if (!validationResult.success) {
      console.error("[Report Action] Invalid token format:", {
        token: accessToken,
        errors: validationResult.error.errors,
      });
      return {
        success: false,
        error: "INVALID_TOKEN",
        redirectTo: routes.quiz.intro,
      };
    }

    // Step 2: Verify access token and payment
    const { access, payment } = await verifyReportAccess(accessToken);

    if (!access || !payment) {
      // Access denied - return error with redirect info
      // Only generate paywall URL if we have a quizId
      const paywallUrl = access?.quizId ? routes.quiz.paywall(access.quizId) : routes.quiz.intro;
      console.error("[Report Action] Access denied:", {
        token: accessToken,
        hasAccess: !!access,
        hasPayment: !!payment,
        paymentStatus: payment?.status,
        quizId: access?.quizId,
      });
      return {
        success: false,
        error: "ACCESS_DENIED",
        redirectTo: paywallUrl,
      };
    }

    // Step 3 & 4: Get quiz result and answers in parallel for better performance
    const [quizResult, quizAnswers] = await Promise.all([
      getQuizResult(access.quizId),
      quizRepository.getQuizAnswers(access.quizId),
    ]);

    if (!quizResult) {
      return {
        success: false,
        error: "QUIZ_NOT_FOUND",
        redirectTo: routes.quiz.intro,
      };
    }

    // Step 5: Track report access
    try {
      await trackEventServer(PostHogEvents.REPORT_ACCESSED, {
        distinctId: payment.userId || "anonymous",
        [PostHogProperties.QUIZ_ID]: access.quizId,
        [PostHogProperties.PAYMENT_ID]: payment.id,
        [PostHogProperties.ACCESS_TOKEN]: accessToken,
      });
    } catch (trackingError) {
      // Don't fail if tracking fails
      console.error("[Report Action] Error tracking event:", trackingError);
    }

    return {
      success: true,
      quizResult,
      quizAnswers: quizAnswers || undefined,
      payment,
      access,
    };
  } catch (error) {
    // Re-throw redirect errors so Next.js can handle them (for backwards compatibility)
    if (isRedirectError(error)) {
      throw error;
    }

    console.error("[Report Action] Error getting report:", error);
    return {
      success: false,
      error: "UNKNOWN_ERROR",
      redirectTo: routes.quiz.intro,
    };
  }
}
