/**
 * Authentication Validation Schemas
 *
 * Zod schemas for authentication-related validation.
 * All error messages are in Romanian as per project requirements.
 */

import { z } from "zod";
import { emailSchema } from "./common";

/**
 * Sign In Schema
 */
export const signInSchema = z.object({
  email: emailSchema,
  password: z
    .string({
      required_error: "Parola este obligatorie",
      invalid_type_error: "Parola trebuie să fie un text",
    })
    .min(1, "Parola este obligatorie"),
});

export type SignInInput = z.infer<typeof signInSchema>;

/**
 * Sign Up Schema
 */
export const signUpSchema = z
  .object({
    email: emailSchema,
    password: z
      .string({
        required_error: "Parola este obligatorie",
        invalid_type_error: "Parola trebuie să fie un text",
      })
      .min(6, "Parola trebuie să aibă cel puțin 6 caractere")
      .max(100, "Parola nu poate depăși 100 de caractere"),
    passwordConfirmation: z.string({
      required_error: "Confirmarea parolei este obligatorie",
      invalid_type_error: "Confirmarea parolei trebuie să fie un text",
    }),
    role: z.enum(["parent", "club_admin", "doctor"], {
      required_error: "Tipul de cont este obligatoriu",
      errorMap: () => ({ message: "Tipul de cont selectat nu este valid" }),
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Parolele nu se potrivesc",
    path: ["passwordConfirmation"],
  });

export type SignUpInput = z.infer<typeof signUpSchema>;

/**
 * Forgot Password Schema
 */
export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

/**
 * Reset Password Schema
 */
export const resetPasswordSchema = z
  .object({
    token: z.string({
      required_error: "Link-ul de resetare este invalid sau lipsește",
      invalid_type_error: "Token-ul trebuie să fie un text",
    }),
    password: z
      .string({
        required_error: "Parola este obligatorie",
        invalid_type_error: "Parola trebuie să fie un text",
      })
      .min(6, "Parola trebuie să aibă cel puțin 6 caractere")
      .max(100, "Parola nu poate depăși 100 de caractere"),
    passwordConfirmation: z.string({
      required_error: "Confirmarea parolei este obligatorie",
      invalid_type_error: "Confirmarea parolei trebuie să fie un text",
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Parolele nu se potrivesc",
    path: ["passwordConfirmation"],
  });

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

/**
 * Verify Email Schema
 */
export const verifyEmailSchema = z.object({
  token: z.string({
    required_error: "Link-ul de verificare este invalid sau lipsește",
    invalid_type_error: "Token-ul trebuie să fie un text",
  }),
});

export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;
