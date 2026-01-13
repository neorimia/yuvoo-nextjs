/**
 * Payment Email Service
 *
 * Sends email notifications for payment events.
 * Uses Brevo for email delivery with React Email templates.
 */

import * as React from "react";
import { sendEmail } from "@/lib/integrations/brevo";
import { routes } from "@/lib/routes";
import { renderEmail } from "../../../emails/utils/render-email";
import PaymentSuccessEmail from "../../../emails/payment-success-email";

/**
 * Send payment success email
 *
 * Sends email with report access link after successful payment.
 */
export async function sendPaymentSuccessEmail(input: {
  email: string;
  quizId: string;
  accessToken: string;
}): Promise<void> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const reportUrl = `${appUrl}${routes.quiz.report(input.accessToken)}`;

  try {
    // Render React Email component to HTML
    const emailComponent = React.createElement(PaymentSuccessEmail, {
      reportUrl,
      accessToken: input.accessToken,
    });
    const { html, text } = await renderEmail(emailComponent);

    // Send email via Brevo
    const result = await sendEmail({
      to: input.email,
      subject: "Plata confirmată - Accesează raportul complet",
      htmlContent: html,
      textContent: text,
      tags: ["payment-success", "quiz-report"],
    });

    if (!result.success) {
      throw new Error(result.error || "Failed to send email");
    }

    console.log(`[Payment Email] Payment success email sent to ${input.email}`);
  } catch (error) {
    console.error("[Payment Email] Error sending payment success email:", error);
    throw error;
  }
}
