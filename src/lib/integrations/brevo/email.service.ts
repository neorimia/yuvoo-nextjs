/**
 * Brevo Email Service
 *
 * High-level email service for sending transactional emails.
 * Integrates templates with Brevo client and provides type-safe functions.
 */

import { sendEmail, isValidEmail } from "./client";
import {
  bookingConfirmationTemplate,
  bookingCancellationTemplate,
  bookingReminderTemplate,
  // quizResultsTemplate, // Legacy template - kept for backward compatibility, now using React Email
  welcomeEmailTemplate,
  clubVerificationStatusTemplate,
  doctorVerificationStatusTemplate,
  contactFormTemplate,
  contactFormConfirmationTemplate,
} from "./templates";

// Simple feedback email template (inline for simplicity)
function feedbackEmailTemplate(data: { email?: string; message: string; type: string }): {
  html: string;
  text: string;
} {
  const typeLabels: Record<string, string> = {
    general: "Feedback general",
    bug: "Raportare problemă",
    suggestion: "Sugestie îmbunătățire",
  };

  const html = `
<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Feedback nou - Yuvoo Beta</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .email-header {
      background: linear-gradient(135deg, #00BBAE 0%, #FF9B24 100%);
      padding: 30px 20px;
      text-align: center;
    }
    .email-header h1 {
      color: #ffffff;
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    .email-body {
      padding: 30px 20px;
    }
    .feedback-type {
      background-color: #EBFFFE;
      border-left: 4px solid #00BBAE;
      padding: 15px;
      margin: 20px 0;
      font-weight: 600;
      color: #00BBAE;
    }
    .message-box {
      background-color: #f9f9f9;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
      white-space: pre-wrap;
    }
    .email-footer {
      background-color: #f9f9f9;
      padding: 20px;
      text-align: center;
      font-size: 14px;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>Feedback nou - Yuvoo Beta</h1>
    </div>
    <div class="email-body">
      <p>Ai primit un nou feedback de la un utilizator beta:</p>
      
      <div class="feedback-type">
        Tip: ${typeLabels[data.type] || data.type}
      </div>
      
      ${data.email ? `<p><strong>Email:</strong> ${data.email}</p>` : "<p><strong>Email:</strong> Nu a fost furnizat</p>"}
      
      <div class="message-box">
        ${data.message}
      </div>
    </div>
    <div class="email-footer">
      <p>Acest email a fost generat automat de platforma Yuvoo.</p>
    </div>
  </div>
</body>
</html>
  `;

  const text = `
Feedback nou - Yuvoo Beta

Tip: ${typeLabels[data.type] || data.type}
${data.email ? `Email: ${data.email}` : "Email: Nu a fost furnizat"}

Mesaj:
${data.message}
  `;

  return { html, text };
}
import type { Booking } from "@/modules/bookings/bookings.types";
import type { Club } from "@/modules/clubs/clubs.types";
import type { Doctor } from "@/modules/doctors/doctors.types";
import type { QuizResult } from "@/modules/quiz/quiz.types";
import type { Child } from "@/modules/children/children.types";
import type { AuthUser } from "@/modules/auth/auth.types";

/**
 * Send booking confirmation email
 *
 * @param booking - Booking details
 * @param user - User who made the booking
 * @param entity - Club or Doctor entity
 * @param child - Optional child for the booking
 * @returns Promise that resolves when email is sent (or fails silently)
 */
export async function sendBookingConfirmation(
  booking: Booking,
  user: AuthUser,
  entity: Club | Doctor,
  child?: Child
): Promise<void> {
  try {
    // Validate user email
    if (!isValidEmail(user.email)) {
      console.error("[Email Service] Invalid user email for booking confirmation:", user.email);
      return;
    }

    // Generate email template
    const { html, text } = bookingConfirmationTemplate(booking, user, entity, child);

    // Determine subject based on booking type
    const entityName = entity.name;
    const subject =
      booking.type === "club_trial"
        ? `Confirmare rezervare - ${entityName}`
        : `Confirmare consultație - ${entityName}`;

    // Send email
    const result = await sendEmail({
      to: user.email,
      subject,
      htmlContent: html,
      textContent: text,
      tags: ["booking", "confirmation", booking.type],
    });

    if (!result.success) {
      console.error("[Email Service] Failed to send booking confirmation:", result.error);
    }
  } catch (error) {
    // Don't throw - email failures shouldn't block booking operations
    console.error("[Email Service] Error sending booking confirmation email:", error);
  }
}

/**
 * Send booking cancellation email
 *
 * @param booking - Cancelled booking details
 * @param user - User who cancelled the booking
 * @param entity - Club or Doctor entity
 * @param child - Optional child for the booking
 * @returns Promise that resolves when email is sent (or fails silently)
 */
export async function sendBookingCancellation(
  booking: Booking,
  user: AuthUser,
  entity: Club | Doctor,
  child?: Child
): Promise<void> {
  try {
    // Validate user email
    if (!isValidEmail(user.email)) {
      console.error("[Email Service] Invalid user email for booking cancellation:", user.email);
      return;
    }

    // Generate email template
    const { html, text } = bookingCancellationTemplate(booking, user, entity, child);

    // Determine subject based on booking type
    const entityName = entity.name;
    const subject =
      booking.type === "club_trial"
        ? `Anulare rezervare - ${entityName}`
        : `Anulare consultație - ${entityName}`;

    // Send email
    const result = await sendEmail({
      to: user.email,
      subject,
      htmlContent: html,
      textContent: text,
      tags: ["booking", "cancellation", booking.type],
    });

    if (!result.success) {
      console.error("[Email Service] Failed to send booking cancellation:", result.error);
    }
  } catch (error) {
    // Don't throw - email failures shouldn't block booking operations
    console.error("[Email Service] Error sending booking cancellation email:", error);
  }
}

/**
 * Send booking reminder email
 *
 * @param booking - Booking to remind about
 * @param user - User who made the booking
 * @param entity - Club or Doctor entity
 * @param child - Optional child for the booking
 * @returns Promise that resolves when email is sent (or fails silently)
 */
export async function sendBookingReminder(
  booking: Booking,
  user: AuthUser,
  entity: Club | Doctor,
  child?: Child
): Promise<void> {
  try {
    // Validate user email
    if (!isValidEmail(user.email)) {
      console.error("[Email Service] Invalid user email for booking reminder:", user.email);
      return;
    }

    // Generate email template
    const { html, text } = bookingReminderTemplate(booking, user, entity, child);

    // Determine subject based on booking type
    const entityName = entity.name;
    const subject =
      booking.type === "club_trial"
        ? `Reamintire rezervare - ${entityName}`
        : `Reamintire consultație - ${entityName}`;

    // Send email
    const result = await sendEmail({
      to: user.email,
      subject,
      htmlContent: html,
      textContent: text,
      tags: ["booking", "reminder", booking.type],
    });

    if (!result.success) {
      console.error("[Email Service] Failed to send booking reminder:", result.error);
    }
  } catch (error) {
    // Don't throw - email failures shouldn't block booking operations
    console.error("[Email Service] Error sending booking reminder email:", error);
  }
}

/**
 * Send quiz results email
 *
 * @param quizResult - Quiz result with recommendations
 * @param child - Child who took the quiz
 * @param userEmail - Email address to send to (can be from user or provided during quiz)
 * @param user - Optional authenticated user
 * @returns Promise that resolves when email is sent (or fails silently)
 */
export async function sendQuizResults(
  quizResult: QuizResult,
  child: Child,
  userEmail: string,
  user?: AuthUser
): Promise<void> {
  try {
    // Validate email
    if (!isValidEmail(userEmail)) {
      console.error("[Email Service] Invalid email for quiz results:", userEmail);
      return;
    }

    // Validate child data - strict validation before proceeding
    if (!child) {
      console.error("[Email Service] Child is null or undefined for quiz results");
      return;
    }

    if (!child.firstName || !child.lastName) {
      console.error("[Email Service] Invalid child data for quiz results:", {
        childId: child.id,
        hasFirstName: !!child.firstName,
        hasLastName: !!child.lastName,
        firstName: child.firstName,
        lastName: child.lastName,
      });
      return;
    }

    // Validate quiz result has recommendations
    if (!quizResult.recommendations || quizResult.recommendations.length === 0) {
      console.error("[Email Service] Quiz result has no recommendations:", {
        quizResultId: quizResult.id,
      });
      return;
    }

    // Generate unsubscribe token for one-click unsubscribe
    const { generateEmailToken } = await import("@/lib/utils/email-tokens");
    const unsubscribeToken = generateEmailToken(userEmail);

    // Render React Email component - child is guaranteed to be valid at this point
    const React = await import("react");
    const { QuizResultsEmail } = await import("../../../../emails/quiz-results-email");
    const { renderEmail } = await import("../../../../emails/utils/render-email");

    // Double-check child is still valid before creating component
    if (!child || !child.firstName || !child.lastName) {
      console.error("[Email Service] Child data became invalid before rendering");
      return;
    }

    // Final validation - ensure child is still valid before rendering
    if (!child || !child.firstName || !child.lastName) {
      console.error("[Email Service] Child data invalid at render time:", {
        childId: child?.id,
        hasFirstName: !!child?.firstName,
        hasLastName: !!child?.lastName,
      });
      return;
    }

    const emailComponent = React.createElement(QuizResultsEmail, {
      quizResult,
      child,
      userEmail,
      user,
      unsubscribeToken,
    });

    // Render email with error handling
    let html: string;
    let text: string;
    try {
      const rendered = await renderEmail(emailComponent);
      html = rendered.html;
      text = rendered.text;
    } catch (renderError) {
      // If rendering fails due to invalid data, log and return early
      console.error("[Email Service] Error rendering email component:", renderError);
      if (
        renderError instanceof Error &&
        (renderError.message.includes("Child data is required") ||
          renderError.message.includes("must have at least one recommendation"))
      ) {
        console.error("[Email Service] Email rendering failed due to invalid data - skipping send");
        return;
      }
      // Re-throw other errors to be caught by outer try-catch
      throw renderError;
    }

    // Send email
    const result = await sendEmail({
      to: userEmail,
      subject: "Rezultatele chestionarului AI - Recomandări personalizate",
      htmlContent: html,
      textContent: text,
      tags: ["quiz", "results"],
    });

    if (!result.success) {
      console.error("[Email Service] Failed to send quiz results:", result.error);
    }
  } catch (error) {
    // Don't throw - email failures shouldn't block quiz operations
    console.error("[Email Service] Error sending quiz results email:", error);
  }
}

/**
 * Send welcome email to new user
 *
 * @param user - Newly registered user
 * @returns Promise that resolves when email is sent (or fails silently)
 */
export async function sendWelcomeEmail(user: AuthUser): Promise<void> {
  try {
    // Validate user email
    if (!isValidEmail(user.email)) {
      console.error("[Email Service] Invalid user email for welcome email:", user.email);
      return;
    }

    // Generate email template
    const { html, text } = welcomeEmailTemplate(user);

    // Send email
    const result = await sendEmail({
      to: user.email,
      subject: "Bine ai venit la Yuvoo!",
      htmlContent: html,
      textContent: text,
      tags: ["welcome", "onboarding"],
    });

    if (!result.success) {
      console.error("[Email Service] Failed to send welcome email:", result.error);
    }
  } catch (error) {
    // Don't throw - email failures shouldn't block user registration
    console.error("[Email Service] Error sending welcome email:", error);
  }
}

/**
 * Send club verification status update email
 *
 * @param clubName - Name of the club
 * @param status - Verification status (approved, rejected, in_review)
 * @param user - Club admin user
 * @param rejectionReason - Optional reason for rejection
 * @returns Promise that resolves when email is sent (or fails silently)
 */
export async function sendClubVerificationStatus(
  clubName: string,
  status: "approved" | "rejected" | "pending" | "in_review",
  user: AuthUser,
  rejectionReason?: string
): Promise<void> {
  try {
    // Validate user email
    if (!isValidEmail(user.email)) {
      console.error("[Email Service] Invalid user email for club verification status:", user.email);
      return;
    }

    // Generate email template
    const { html, text } = clubVerificationStatusTemplate(clubName, status, user, rejectionReason);

    // Determine subject based on status
    const subject =
      status === "approved"
        ? `Club Verificat - ${clubName}`
        : status === "rejected"
          ? `Verificare Respinsă - ${clubName}`
          : status === "in_review"
            ? `Verificare în Curs - ${clubName}`
            : `Documente Trimise - ${clubName}`;

    // Send email
    const result = await sendEmail({
      to: user.email,
      subject,
      htmlContent: html,
      textContent: text,
      tags: ["verification", "club", status],
    });

    if (!result.success) {
      console.error("[Email Service] Failed to send club verification status:", result.error);
    }
  } catch (error) {
    // Don't throw - email failures shouldn't block verification updates
    console.error("[Email Service] Error sending club verification status email:", error);
  }
}

/**
 * Send doctor verification status update email
 *
 * @param doctorName - Name of the doctor
 * @param status - Verification status (approved, rejected, in_review)
 * @param user - Doctor user
 * @param rejectionReason - Optional reason for rejection
 * @returns Promise that resolves when email is sent (or fails silently)
 */
export async function sendDoctorVerificationStatus(
  doctorName: string,
  status: "approved" | "rejected" | "pending" | "in_review",
  user: AuthUser,
  rejectionReason?: string
): Promise<void> {
  try {
    // Validate user email
    if (!isValidEmail(user.email)) {
      console.error(
        "[Email Service] Invalid user email for doctor verification status:",
        user.email
      );
      return;
    }

    // Generate email template
    const { html, text } = doctorVerificationStatusTemplate(
      doctorName,
      status,
      user,
      rejectionReason
    );

    // Determine subject based on status
    const subject =
      status === "approved"
        ? `Profil Verificat - ${doctorName}`
        : status === "rejected"
          ? `Verificare Respinsă - ${doctorName}`
          : status === "in_review"
            ? `Verificare în Curs - ${doctorName}`
            : `Documente Trimise - ${doctorName}`;

    // Send email
    const result = await sendEmail({
      to: user.email,
      subject,
      htmlContent: html,
      textContent: text,
      tags: ["verification", "doctor", status],
    });

    if (!result.success) {
      console.error("[Email Service] Failed to send doctor verification status:", result.error);
    }
  } catch (error) {
    // Don't throw - email failures shouldn't block verification updates
    console.error("[Email Service] Error sending doctor verification status email:", error);
  }
}

/**
 * Send contact form submission email to Yuvoo team
 *
 * @param data - Contact form data
 * @returns Promise that resolves when email is sent (or fails silently)
 */
export async function sendContactFormSubmission(data: {
  firstName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}): Promise<void> {
  try {
    // Validate user email
    if (!isValidEmail(data.email)) {
      console.error("[Email Service] Invalid email for contact form:", data.email);
      return;
    }

    // Get contact email from environment or use default
    const contactEmail =
      process.env.CONTACT_EMAIL || process.env.BREVO_SENDER_EMAIL || "contact@yuvoo.ro";

    // Generate email template
    const { html, text } = contactFormTemplate(data);

    // Send email to Yuvoo team
    const result = await sendEmail({
      to: contactEmail,
      subject: `Mesaj nou de contact: ${data.subject}`,
      htmlContent: html,
      textContent: text,
      replyTo: data.email, // Allow replying directly to the user
      tags: ["contact", "contact-form"],
    });

    if (!result.success) {
      console.error("[Email Service] Failed to send contact form submission:", result.error);
    }
  } catch (error) {
    // Don't throw - email failures shouldn't block form submission
    console.error("[Email Service] Error sending contact form submission email:", error);
  }
}

/**
 * Send contact form confirmation email to user
 *
 * @param data - Contact form data (with firstName and subject)
 * @returns Promise that resolves when email is sent (or fails silently)
 */
export async function sendContactFormConfirmation(data: {
  firstName: string;
  email: string;
  subject: string;
}): Promise<void> {
  try {
    // Validate user email
    if (!isValidEmail(data.email)) {
      console.error("[Email Service] Invalid email for contact form confirmation:", data.email);
      return;
    }

    // Generate email template
    const { html, text } = contactFormConfirmationTemplate({
      firstName: data.firstName,
      subject: data.subject,
    });

    // Send confirmation email to user
    const result = await sendEmail({
      to: data.email,
      subject: "Confirmare mesaj - Yuvoo",
      htmlContent: html,
      textContent: text,
      tags: ["contact", "contact-form", "confirmation"],
    });

    if (!result.success) {
      console.error("[Email Service] Failed to send contact form confirmation:", result.error);
    }
  } catch (error) {
    // Don't throw - email failures shouldn't block form submission
    console.error("[Email Service] Error sending contact form confirmation email:", error);
  }
}

/**
 * Send feedback submission email to Yuvoo team
 *
 * @param data - Feedback form data
 * @returns Promise that resolves when email is sent (or fails silently)
 */
export async function sendFeedbackSubmission(data: {
  email?: string;
  message: string;
  type: string;
}): Promise<void> {
  try {
    // Get contact email from environment or use default
    const contactEmail =
      process.env.CONTACT_EMAIL || process.env.BREVO_SENDER_EMAIL || "contact@yuvoo.ro";

    // Generate email template
    const { html, text } = feedbackEmailTemplate(data);

    // Determine subject based on feedback type
    const typeLabels: Record<string, string> = {
      general: "Feedback general",
      bug: "Raportare problemă",
      suggestion: "Sugestie îmbunătățire",
    };
    const typeLabel = typeLabels[data.type] || data.type;

    // Send email to Yuvoo team
    const result = await sendEmail({
      to: contactEmail,
      subject: `[Beta Feedback] ${typeLabel}`,
      htmlContent: html,
      textContent: text,
      replyTo: data.email || undefined, // Allow replying directly to the user if email provided
      tags: ["feedback", "beta", data.type],
    });

    if (!result.success) {
      console.error("[Email Service] Failed to send feedback submission:", result.error);
    }
  } catch (error) {
    // Don't throw - email failures shouldn't block feedback submission
    console.error("[Email Service] Error sending feedback submission email:", error);
  }
}
