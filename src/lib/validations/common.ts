/**
 * Common Validation Utilities
 *
 * Shared Zod schemas and validation helpers.
 */

import { z } from "zod";

// Common field validations
export const emailSchema = z.string().email("Email invalid");
export const phoneSchema = z.string().regex(/^[0-9+\-\s()]+$/, "Număr de telefon invalid");
export const dateOfBirthSchema = z.date().max(new Date(), "Data nașterii nu poate fi în viitor");

// Romanian language validation messages helper
export const zodRomanianErrors = {
  required_error: "Câmp obligatoriu",
  invalid_type_error: "Tip invalid",
};
