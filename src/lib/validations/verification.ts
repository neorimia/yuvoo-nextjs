/**
 * Verification Validation Schemas
 *
 * Zod schemas for verification-related validation.
 * All error messages are in Romanian as per project requirements.
 */

import { z } from "zod";

/**
 * Update Verification Status Schema
 */
export const updateVerificationStatusSchema = z.object({
  type: z.enum(["club", "doctor"], {
    errorMap: () => ({ message: "Tipul trebuie să fie 'club' sau 'doctor'" }),
  }),
  id: z.string().uuid("ID-ul trebuie să fie un UUID valid"),
  status: z.enum(["approved", "rejected", "in_review"], {
    errorMap: () => ({ message: "Statusul trebuie să fie: approved, rejected sau in_review" }),
  }),
  reason: z.string().max(1000, "Motivul nu poate depăși 1000 de caractere").optional(), // Optional rejection reason
});

export type UpdateVerificationStatusInput = z.infer<typeof updateVerificationStatusSchema>;
