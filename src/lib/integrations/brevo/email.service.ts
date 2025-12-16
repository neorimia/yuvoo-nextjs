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
  quizResultsTemplate,
  welcomeEmailTemplate,
  clubVerificationStatusTemplate,
  doctorVerificationStatusTemplate,
} from "./templates";
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

    // Generate email template
    const { html, text } = quizResultsTemplate(quizResult, child, user || undefined);

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
