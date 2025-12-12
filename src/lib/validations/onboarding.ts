/**
 * Onboarding Progress Validation Schemas
 *
 * Zod schemas for validating onboarding state management.
 */

import { z } from "zod";

/**
 * Start Onboarding Schema
 */
export const startOnboardingSchema = z.object({
  role: z.enum(["parent", "club_admin", "doctor"], {
    errorMap: () => ({ message: "Rol invalid" }),
  }),
});

/**
 * Update Onboarding Step Schema
 */
export const updateOnboardingStepSchema = z.object({
  stepNumber: z.number().int().min(1),
  stepData: z.record(z.any()).optional(), // JSONB data for the step
});

/**
 * Complete Onboarding Schema
 */
export const completeOnboardingSchema = z.object({
  role: z.enum(["parent", "club_admin", "doctor"]),
  action: z.enum(["quiz", "dashboard"]).optional(), // For parent flow
});

export type StartOnboardingInput = z.infer<typeof startOnboardingSchema>;
export type UpdateOnboardingStepInput = z.infer<typeof updateOnboardingStepSchema>;
export type CompleteOnboardingInput = z.infer<typeof completeOnboardingSchema>;
