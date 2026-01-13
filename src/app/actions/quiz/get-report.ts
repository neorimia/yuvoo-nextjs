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
import { redirect } from "next/navigation";
import { routes } from "@/lib/routes";
import { trackEventServer } from "@/lib/analytics/tracking-server";
import { PostHogEvents, PostHogProperties } from "@/lib/analytics/events";

/**
 * Get report data by access token
 *
 * Verifies access token, checks payment status, and returns quiz result.
 * Redirects to paywall if access is denied.
 */
export async function getReportAction(accessToken: string) {
  try {
    // Step 1: Validate access token
    const validationResult = reportAccessTokenSchema.safeParse(accessToken);
    if (!validationResult.success) {
      redirect(routes.quiz.intro);
    }

    // Step 2: Verify access token and payment
    const { access, payment } = await verifyReportAccess(accessToken);

    if (!access || !payment) {
      // Access denied - redirect to paywall
      redirect(routes.quiz.paywall(access?.quizId || ""));
    }

    // Step 3 & 4: Get quiz result and answers in parallel for better performance
    const [quizResult, quizAnswers] = await Promise.all([
      getQuizResult(access.quizId),
      quizRepository.getQuizAnswers(access.quizId),
    ]);

    if (!quizResult) {
      redirect(routes.quiz.intro);
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
      quizAnswers,
      payment,
      access,
    };
  } catch (error) {
    console.error("[Report Action] Error getting report:", error);
    redirect(routes.quiz.intro);
  }
}
