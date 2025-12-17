/**
 * Contact Form Validation Schemas
 *
 * Zod schemas for contact form validation.
 */

import { z } from "zod";

/**
 * Contact form input schema
 */
export const contactFormSchema = z.object({
  firstName: z
    .string()
    .min(2, "Numele trebuie să aibă cel puțin 2 caractere")
    .max(100, "Numele nu poate depăși 100 de caractere"),
  email: z
    .string()
    .min(1, "Adresa de email este obligatorie")
    .email("Adresa de email nu este validă")
    .max(255, "Adresa de email nu poate depăși 255 de caractere"),
  phone: z
    .string()
    .min(1, "Numărul de telefon este obligatoriu")
    .regex(
      /^(\+40|0)[0-9]{9}$/,
      "Numărul de telefon nu este valid (ex: +40700000000 sau 0700000000)"
    ),
  subject: z
    .string()
    .min(3, "Subiectul trebuie să aibă cel puțin 3 caractere")
    .max(200, "Subiectul nu poate depăși 200 de caractere"),
  message: z
    .string()
    .min(10, "Mesajul trebuie să aibă cel puțin 10 caractere")
    .max(2000, "Mesajul nu poate depăși 2000 de caractere"),
  privacy: z.boolean().refine((val) => val === true, {
    message: "Trebuie să accepți politica de confidențialitate",
  }),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
