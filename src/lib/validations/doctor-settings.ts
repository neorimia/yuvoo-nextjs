/**
 * Doctor Settings Validation Schemas
 *
 * Zod schemas for doctor settings validation.
 */

import { z } from "zod";
import { phoneSchema } from "./common";

/**
 * Email notification preferences schema for doctors
 */
export const doctorEmailNotificationPreferencesSchema = z.object({
  consultationCreated: z.boolean().default(true),
  consultationConfirmed: z.boolean().default(true),
  consultationCancelled: z.boolean().default(true),
  consultationReminder: z.boolean().default(true),
});

export type DoctorEmailNotificationPreferences = z.infer<
  typeof doctorEmailNotificationPreferencesSchema
>;

/**
 * Update doctor settings schema
 */
export const updateDoctorSettingsSchema = z.object({
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
  emailNotificationPreferences: doctorEmailNotificationPreferencesSchema.optional(),
});

export type UpdateDoctorSettingsInput = z.infer<typeof updateDoctorSettingsSchema>;
