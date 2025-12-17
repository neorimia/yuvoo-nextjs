/**
 * Brevo Email Types
 *
 * TypeScript types for Brevo email integration.
 */

/**
 * Email parameters for sending emails
 */
export interface EmailParams {
  to: string | string[]; // Recipient email(s)
  subject: string; // Email subject
  htmlContent: string; // HTML email content
  textContent?: string; // Plain text fallback (optional)
  replyTo?: string; // Reply-to email address
  tags?: string[]; // Email tags for tracking
}

/**
 * Email sending result
 */
export interface EmailResult {
  success: boolean;
  messageId?: string; // Brevo message ID
  error?: string; // Error message if failed
}

/**
 * Retry configuration
 */
export interface RetryConfig {
  maxRetries: number; // Maximum number of retry attempts
  retryDelay: number; // Delay between retries in milliseconds
}
