/**
 * Feedback Form Validation Schemas
 *
 * Zod schemas for beta feedback form validation.
 */

import { z } from "zod";

/**
 * Feedback form input schema
 */
export const feedbackFormSchema = z.object({
  email: z
    .string()
    .email("Adresa de email nu este validă")
    .max(255, "Adresa de email nu poate depăși 255 de caractere")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .min(10, "Mesajul trebuie să aibă cel puțin 10 caractere")
    .max(2000, "Mesajul nu poate depăși 2000 de caractere"),
  type: z.enum(["general", "bug", "suggestion"]).default("general"),
});

export type FeedbackFormInput = z.infer<typeof feedbackFormSchema>;
