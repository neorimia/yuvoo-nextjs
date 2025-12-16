/**
 * Brevo (Email) Client Configuration
 *
 * Enhanced Brevo API client for transactional emails with error handling,
 * retry logic, rate limiting, and logging.
 */

import * as brevo from "@getbrevo/brevo";
import type { EmailParams, EmailResult, RetryConfig } from "./types";

// Validate environment variables
if (!process.env.BREVO_API_KEY) {
  throw new Error("BREVO_API_KEY environment variable is required");
}

if (!process.env.BREVO_SENDER_EMAIL) {
  throw new Error("BREVO_SENDER_EMAIL environment variable is required");
}

if (!process.env.BREVO_SENDER_NAME) {
  throw new Error("BREVO_SENDER_NAME environment variable is required");
}

// Initialize Brevo client
const brevoClient = new brevo.TransactionalEmailsApi();
brevoClient.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

// Default retry configuration
const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  retryDelay: 1000, // 1 second
};

/**
 * Check if error is retryable
 */
function isRetryableError(error: unknown): boolean {
  // Retry on network errors, timeouts, and 5xx server errors
  if (!error || typeof error !== "object" || !("response" in error)) {
    return true; // Network error, retry
  }

  const errorWithResponse = error as { response?: { status?: number; statusCode?: number } };
  const response = errorWithResponse.response;
  const status = response?.status || response?.statusCode;
  return status ? status >= 500 || status === 429 : false; // Server error or rate limit
}

/**
 * Sleep for specified milliseconds
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Send email via Brevo API with retry logic
 *
 * @param params - Email parameters
 * @param retryConfig - Retry configuration (optional)
 * @returns Email result with success status and message ID
 */
export async function sendEmail(
  params: EmailParams,
  retryConfig: RetryConfig = DEFAULT_RETRY_CONFIG
): Promise<EmailResult> {
  const { to, subject, htmlContent, textContent, replyTo, tags } = params;
  const { maxRetries, retryDelay } = retryConfig;

  // Normalize recipient to array
  const recipients = Array.isArray(to) ? to : [to];

  // Validate recipients
  if (recipients.length === 0) {
    return {
      success: false,
      error: "At least one recipient email is required",
    };
  }

  // Validate email format (basic check)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  for (const email of recipients) {
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: `Invalid email address: ${email}`,
      };
    }
  }

  // Prepare Brevo email object
  const sendSmtpEmail = new brevo.SendSmtpEmail();
  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = htmlContent;
  sendSmtpEmail.textContent = textContent || htmlContent.replace(/<[^>]*>/g, ""); // Strip HTML for text fallback
  sendSmtpEmail.sender = {
    name: process.env.BREVO_SENDER_NAME!,
    email: process.env.BREVO_SENDER_EMAIL!,
  };
  sendSmtpEmail.to = recipients.map((email) => ({ email }));

  if (replyTo) {
    sendSmtpEmail.replyTo = { email: replyTo };
  }

  if (tags && tags.length > 0) {
    sendSmtpEmail.tags = tags;
  }

  // Retry logic
  let lastError: unknown = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      // Log attempt (only in development)
      if (process.env.NODE_ENV === "development" && attempt > 0) {
        console.log(`[Brevo] Retry attempt ${attempt + 1}/${maxRetries + 1} for email: ${subject}`);
      }

      // Send email
      const result = await brevoClient.sendTransacEmail(sendSmtpEmail);

      // Success
      const messageId = result.body?.messageId;

      // Log success (only in development)
      if (process.env.NODE_ENV === "development") {
        console.log(
          `[Brevo] Email sent successfully: ${subject} → ${recipients.join(", ")} (Message ID: ${messageId})`
        );
      }

      return {
        success: true,
        messageId: messageId || undefined,
      };
    } catch (error: unknown) {
      lastError = error;

      // Check if error is retryable
      if (attempt < maxRetries && isRetryableError(error)) {
        // Wait before retry (exponential backoff)
        const delay = retryDelay * Math.pow(2, attempt);
        await sleep(delay);
        continue;
      }

      // Non-retryable error or max retries reached
      break;
    }
  }

  // All retries failed
  const errorMessage =
    lastError?.response?.body?.message || lastError?.message || "Unknown error occurred";

  // Log error
  console.error("[Brevo] Failed to send email:", {
    subject,
    recipients,
    error: errorMessage,
    attempts: maxRetries + 1,
  });

  return {
    success: false,
    error: errorMessage,
  };
}

/**
 * Get default sender information
 */
export function getSenderInfo(): { name: string; email: string } {
  return {
    name: process.env.BREVO_SENDER_NAME!,
    email: process.env.BREVO_SENDER_EMAIL!,
  };
}

/**
 * Validate email address format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Export client for advanced usage (if needed)
export { brevoClient };
