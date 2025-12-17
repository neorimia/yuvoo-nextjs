/**
 * Contact Server Actions
 *
 * Server Actions for contact form submissions.
 * All error messages are in Romanian as per project requirements.
 */

"use server";

import { contactFormSchema } from "@/lib/validations/contact";
import { sendContactFormSubmission, sendContactFormConfirmation } from "@/lib/integrations/brevo";
import type { ContactFormInput } from "@/lib/validations/contact";

/**
 * Submit contact form
 *
 * Validates contact form input and sends emails to both Yuvoo team and user.
 *
 * @param input - Contact form data
 * @returns Success response or error response
 */
export async function submitContactForm(
  input: unknown
): Promise<{ success: boolean; error?: string }> {
  try {
    // Validate input with Zod schema
    const validatedInput = contactFormSchema.parse(input) as ContactFormInput;

    // Send email to Yuvoo team (non-blocking)
    sendContactFormSubmission({
      firstName: validatedInput.firstName,
      email: validatedInput.email,
      phone: validatedInput.phone,
      subject: validatedInput.subject,
      message: validatedInput.message,
    }).catch((error) => {
      // Log error but don't fail the operation
      console.error("[Contact Action] Error sending contact form submission email:", error);
    });

    // Send confirmation email to user (non-blocking)
    sendContactFormConfirmation({
      firstName: validatedInput.firstName,
      email: validatedInput.email,
      subject: validatedInput.subject,
    }).catch((error) => {
      // Log error but don't fail the operation
      console.error("[Contact Action] Error sending contact form confirmation email:", error);
    });

    return { success: true };
  } catch (error) {
    console.error("Error submitting contact form:", error);

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
      error: error instanceof Error ? error.message : "Eroare la trimiterea mesajului",
    };
  }
}
