/**
 * Club Settings Validation Schemas
 *
 * Zod schemas for club admin settings validation.
 */

import { z } from "zod";
import { phoneSchema } from "./common";

/**
 * Email notification preferences schema
 */
export const emailNotificationPreferencesSchema = z.object({
  bookingCreated: z.boolean().default(true),
  bookingConfirmed: z.boolean().default(true),
  bookingCancelled: z.boolean().default(true),
  bookingCompleted: z.boolean().default(true),
  bookingReminder: z.boolean().default(true),
});

export type EmailNotificationPreferences = z.infer<typeof emailNotificationPreferencesSchema>;

/**
 * Update club settings schema
 */
export const updateClubSettingsSchema = z.object({
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
  emailNotificationPreferences: emailNotificationPreferencesSchema.optional(),
});

export type UpdateClubSettingsInput = z.infer<typeof updateClubSettingsSchema>;
