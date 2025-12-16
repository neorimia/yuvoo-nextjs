/**
 * User Validation Schemas
 *
 * Zod schemas for user profile validation.
 */

import { z } from "zod";
import { phoneSchema } from "./common";

/**
 * Update user profile schema
 */
export const updateUserProfileSchema = z.object({
  firstName: z
    .string()
    .min(1, "Prenumele este obligatoriu")
    .max(50, "Prenumele este prea lung")
    .optional(),
  lastName: z
    .string()
    .min(1, "Numele este obligatoriu")
    .max(50, "Numele este prea lung")
    .optional(),
  phone: phoneSchema.optional().or(z.literal("")),
});

export type UpdateUserProfileInput = z.infer<typeof updateUserProfileSchema>;
