/**
 * Lead Validation Schemas
 *
 * Zod schemas for lead-related validation.
 * All error messages are in Romanian.
 */

import { z } from "zod";
import { emailSchema, phoneSchema } from "./common";

/**
 * Create lead input schema
 * Used when parent submits interest in a club
 */
export const createLeadSchema = z.object({
  clubId: z.string().min(1, "ID-ul clubului este obligatoriu"),
  parentId: z.string().optional().nullable(),
  parentName: z
    .string({
      required_error: "Numele părinte este obligatoriu",
      invalid_type_error: "Numele trebuie să fie un text",
    })
    .min(2, "Numele trebuie să aibă cel puțin 2 caractere")
    .max(255, "Numele nu poate depăși 255 de caractere"),
  parentEmail: emailSchema,
  parentPhone: phoneSchema.optional().nullable(),
  childAge: z
    .number({
      required_error: "Vârsta copilului este obligatorie",
      invalid_type_error: "Vârsta trebuie să fie un număr",
    })
    .int("Vârsta trebuie să fie un număr întreg")
    .min(1, "Vârsta trebuie să fie cel puțin 1 an")
    .max(18, "Vârsta trebuie să fie cel mult 18 ani"),
  message: z.string().max(1000, "Mesajul nu poate depăși 1000 de caractere").optional().nullable(),
  sportType: z
    .string()
    .max(100, "Numele sportului nu poate depăși 100 de caractere")
    .optional()
    .nullable(),
  locationId: z.string().optional().nullable(),
  ipAddress: z.string().optional().nullable(),
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;

/**
 * Update lead status schema
 * Used when club updates lead status (accept, expire, etc.)
 */
export const updateLeadStatusSchema = z.object({
  leadId: z.string().min(1, "ID-ul cererii este obligatoriu"),
  status: z.enum(["nou", "in_asteptare", "acceptat", "expirat"], {
    errorMap: () => ({
      message: "Statusul trebuie să fie 'nou', 'in_asteptare', 'acceptat' sau 'expirat'",
    }),
  }),
});

export type UpdateLeadStatusInput = z.infer<typeof updateLeadStatusSchema>;

/**
 * Lead payment schema
 * Used when creating payment intent for pay-per-lead
 */
export const createLeadPaymentSchema = z.object({
  leadId: z.string().min(1, "ID-ul cererii este obligatoriu"),
  clubId: z.string().min(1, "ID-ul clubului este obligatoriu"),
  paymentMethod: z.enum(["pay_per_lead", "premium"], {
    errorMap: () => ({
      message: "Metoda de plată trebuie să fie 'pay_per_lead' sau 'premium'",
    }),
  }),
});

export type CreateLeadPaymentInput = z.infer<typeof createLeadPaymentSchema>;

/**
 * Premium club upgrade schema
 * Used when club upgrades to premium subscription
 */
export const premiumUpgradeSchema = z.object({
  clubId: z.string().min(1, "ID-ul clubului este obligatoriu"),
});

export type PremiumUpgradeInput = z.infer<typeof premiumUpgradeSchema>;
