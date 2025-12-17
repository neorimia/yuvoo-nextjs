/**
 * Feedback Server Actions
 *
 * Server Actions for beta feedback form submissions.
 * All error messages are in Romanian as per project requirements.
 */

"use server";

import { feedbackFormSchema } from "@/lib/validations/feedback";
import { sendFeedbackSubmission } from "@/lib/integrations/brevo";
import type { FeedbackFormInput } from "@/lib/validations/feedback";

/**
 * Submit feedback form
 *
 * Validates feedback form input and sends email to Yuvoo team.
 *
 * @param input - Feedback form data
 * @returns Success response or error response
 */
export async function submitFeedback(
  input: unknown
): Promise<{ success: boolean; error?: string }> {
  try {
    // Validate input with Zod schema
    const validatedInput = feedbackFormSchema.parse(input) as FeedbackFormInput;

    // Send email to Yuvoo team (non-blocking)
    sendFeedbackSubmission({
      email: validatedInput.email || undefined,
      message: validatedInput.message,
      type: validatedInput.type || "general",
    }).catch((error) => {
      // Log error but don't fail the operation
      console.error("[Feedback Action] Error sending feedback submission email:", error);
    });

    return { success: true };
  } catch (error) {
    console.error("Error submitting feedback:", error);

    // Handle Zod validation errors
    if (error && typeof error === "object" && "errors" in error) {
      const zodError = error as { errors: Array<{ path: string[]; message: string }> };
      const firstError = zodError.errors[0];
      return {
        success: false,
        error: firstError?.message || "Eroare la validarea datelor formularului",
      };
    }

    // Handle other errors
    return {
      success: false,
      error: error instanceof Error ? error.message : "Eroare la trimiterea feedback-ului",
    };
  }
}
