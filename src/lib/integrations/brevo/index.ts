/**
 * Brevo Email Integration
 *
 * Central export file for Brevo email functionality.
 */

// Client and utilities
export { sendEmail, getSenderInfo, isValidEmail } from "./client";
export type { EmailParams, EmailResult, RetryConfig } from "./types";

// Email service (high-level functions)
export {
  sendBookingConfirmation,
  sendBookingCancellation,
  sendBookingReminder,
  sendQuizResults,
  sendWelcomeEmail,
  sendClubVerificationStatus,
  sendDoctorVerificationStatus,
} from "./email.service";

// Templates (for advanced usage)
export {
  bookingConfirmationTemplate,
  bookingCancellationTemplate,
  bookingReminderTemplate,
  quizResultsTemplate,
  welcomeEmailTemplate,
  clubVerificationStatusTemplate,
  doctorVerificationStatusTemplate,
} from "./templates";
