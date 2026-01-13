/**
 * Payment Validation Schemas
 *
 * Zod validation schemas for payment operations with Romanian error messages.
 *
 * All error messages follow CRITICAL requirement: Romanian language only.
 */

import { z } from "zod";

/**
 * Create Payment Input Schema
 */
export const createPaymentSchema = z.object({
  quizId: z
    .string({
      required_error: "ID-ul chestionarului este obligatoriu",
      invalid_type_error: "ID-ul chestionarului trebuie să fie un text",
    })
    .uuid("ID-ul chestionarului trebuie să fie un UUID valid"),
  userId: z.string().uuid("ID-ul utilizatorului trebuie să fie un UUID valid").optional(),
});

/**
 * Verify Payment Input Schema
 */
export const verifyPaymentSchema = z.object({
  paymentId: z
    .string({
      required_error: "ID-ul plății este obligatoriu",
      invalid_type_error: "ID-ul plății trebuie să fie un text",
    })
    .uuid("ID-ul plății trebuie să fie un UUID valid"),
});

/**
 * Report Access Token Schema
 */
export const reportAccessTokenSchema = z.object({
  accessToken: z
    .string({
      required_error: "Token-ul de acces este obligatoriu",
      invalid_type_error: "Token-ul de acces trebuie să fie un text",
    })
    .uuid("Token-ul de acces trebuie să fie un UUID valid"),
});

/**
 * Type inference from schemas
 */
export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;
export type VerifyPaymentInput = z.infer<typeof verifyPaymentSchema>;
export type ReportAccessTokenInput = z.infer<typeof reportAccessTokenSchema>;
