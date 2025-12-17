/**
 * Child Profile Validation Schemas
 *
 * Zod schemas for validating child profile data during parent onboarding.
 */

import { z } from "zod";
import { zodRomanianErrors } from "./common";

/**
 * Create Child Schema (Parent Onboarding - Step 2)
 *
 * Validates child profile creation with Romanian error messages.
 * Age restriction: 4-14 years (Yuvoo target demographic)
 */
export const createChildSchema = z.object({
  firstName: z
    .string(zodRomanianErrors)
    .min(1, "Prenumele este obligatoriu")
    .max(100, "Prenumele este prea lung")
    .trim(),

  lastName: z
    .string(zodRomanianErrors)
    .min(1, "Numele este obligatoriu")
    .max(100, "Numele este prea lung")
    .trim(),

  dateOfBirth: z
    .date({
      required_error: "Data nașterii este obligatorie",
      invalid_type_error: "Data nașterii este invalidă",
    })
    .refine((date) => {
      const age = Math.floor(
        (new Date().getTime() - date.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
      );
      return age >= 4 && age <= 14;
    }, "Vârsta copilului trebuie să fie între 4 și 14 ani")
    .refine((date) => date <= new Date(), "Data nașterii nu poate fi în viitor"),

  gender: z
    .enum(["male", "female", "other"], {
      errorMap: () => ({ message: "Gen invalid" }),
    })
    .optional(),
});

export type CreateChildInput = z.infer<typeof createChildSchema>;

/**
 * Update Child Schema
 */
export const updateChildSchema = z.object({
  firstName: z
    .string()
    .min(1, "Prenumele este obligatoriu")
    .max(100, "Prenumele este prea lung")
    .trim()
    .optional(),
  lastName: z
    .string()
    .min(1, "Numele este obligatoriu")
    .max(100, "Numele este prea lung")
    .trim()
    .optional(),
  dateOfBirth: z
    .date({
      required_error: "Data nașterii este obligatorie",
      invalid_type_error: "Data nașterii este invalidă",
    })
    .refine((date) => {
      const age = Math.floor(
        (new Date().getTime() - date.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
      );
      return age >= 4 && age <= 14;
    }, "Vârsta copilului trebuie să fie între 4 și 14 ani")
    .refine((date) => date <= new Date(), "Data nașterii nu poate fi în viitor")
    .optional(),
  gender: z
    .enum(["male", "female", "other"], {
      errorMap: () => ({ message: "Gen invalid" }),
    })
    .optional(),
});

export type UpdateChildInput = z.infer<typeof updateChildSchema>;
