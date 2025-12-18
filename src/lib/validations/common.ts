/**
 * Common Validation Utilities
 *
 * Shared Zod schemas and validation helpers.
 */

import { z } from "zod";

// Common field validations
export const emailSchema = z
  .string({
    required_error: "Adresa de email este obligatorie",
    invalid_type_error: "Email-ul trebuie să fie un text",
  })
  .min(1, "Adresa de email este obligatorie")
  .email("Adresa de email nu este validă");
export const phoneSchema = z.string().regex(/^[0-9+\-\s()]+$/, "Număr de telefon invalid");
export const dateOfBirthSchema = z.date().max(new Date(), "Data nașterii nu poate fi în viitor");

// Romanian language validation messages helper
export const zodRomanianErrors = {
  required_error: "Câmp obligatoriu",
  invalid_type_error: "Tip invalid",
};
