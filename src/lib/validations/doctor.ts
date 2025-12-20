/**
 * Doctor Profile Validation Schemas
 *
 * Zod schemas for validating doctor profile data during doctor onboarding.
 */

import { z } from "zod";
import { zodRomanianErrors } from "./common";

/**
 * Doctor Basic Info Schema (Doctor Onboarding - Step 2)
 */
export const doctorBasicInfoSchema = z.object({
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

  title: z.string().max(50, "Titlul este prea lung").optional(),

  specialty: z.enum(["orthopedist", "nutritionist", "psychologist", "sports_medicine"], {
    errorMap: () => ({ message: "Selectează specializarea" }),
  }),

  secondarySpecialties: z.array(z.string().min(1).max(200)).optional().default([]),

  credentials: z
    .array(z.string().min(1).max(200))
    .min(1, "Adaugă cel puțin o credențială (ex: MD, Specialist, etc.)"),
});

/**
 * Doctor Bio & Experience Schema (Doctor Onboarding - Step 3)
 */
export const doctorBioExperienceSchema = z.object({
  bio: z
    .string(zodRomanianErrors)
    .min(
      100,
      "Bio-ul trebuie să conțină cel puțin 100 caractere. Descrie experiența ta profesională, abordarea ta și de ce ești pasionat de medicina sportivă pediatrică."
    )
    .max(2000, "Bio-ul este prea lung (maxim 2000 caractere). Te rugăm să scurti textul.")
    .trim(),

  yearsOfExperience: z
    .number({ required_error: "Anii de experiență sunt obligatorii" })
    .int("Trebuie să fie un număr întreg (ex: 5, 10, 15)")
    .min(1, "Minim 1 an de experiență este necesar")
    .max(50, "Valoarea introdusă este prea mare. Te rugăm să verifici numărul introdus."),

  languages: z.array(z.string()).min(1, "Selectează cel puțin o limbă vorbită"),
});

/**
 * Doctor Location & Contact Schema (Doctor Onboarding - Step 4)
 */
export const doctorLocationContactSchema = z.object({
  city: z.string(zodRomanianErrors).min(1, "Orașul este obligatoriu"),

  district: z.string().optional(),

  address: z
    .string(zodRomanianErrors)
    .min(
      10,
      "Adresa completă este obligatorie (minim 10 caractere). Include strada, număr, bloc, scara, etaj, apartament."
    )
    .max(300, "Adresa este prea lungă (maxim 300 caractere). Te rugăm să scurti textul.")
    .trim(),

  phone: z
    .string(zodRomanianErrors)
    .regex(
      /^\+40[0-9]{9}$/,
      "Format telefon invalid. Te rugăm să introduci numărul în format internațional: +40XXXXXXXXX (ex: +40721234567)"
    ),

  email: z.string(zodRomanianErrors).email("Adresa de email este invalidă").toLowerCase(),

  website: z.string().url("URL-ul website-ului este invalid").optional().or(z.literal("")),
});

/**
 * Doctor Photo Upload Schema (Doctor Onboarding - Step 5)
 */
export const doctorPhotoSchema = z.object({
  photoUrl: z.string().url("URL fotografie invalid").optional().or(z.literal("")), // Optional step
});

/**
 * Doctor Verification Documents Schema (Doctor Onboarding - Step 6)
 */
export const doctorVerificationSchema = z.object({
  verificationDocuments: z
    .array(z.string().url("URL document invalid"))
    .min(
      4,
      "Încarcă cel puțin 4 documente obligatorii (diplomă, certificat specialist, licență, certificat CMR)"
    )
    .max(10, "Maxim 10 documente"),
});

/**
 * Doctor Availability Schema (Doctor Onboarding - Step 7)
 */
export const doctorAvailabilitySchema = z.object({
  acceptingNewPatients: z.boolean().default(true),

  onlineConsultations: z.boolean().default(false),

  schedule: z
    .array(
      z.object({
        day: z.string().min(1, "Ziua este obligatorie"),
        startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Format orar invalid (HH:MM)"),
        endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Format orar invalid (HH:MM)"),
      })
    )
    .optional(),
});

/**
 * Doctor Profile Update Schema (for profile editing)
 * Combines all fields but makes most optional for partial updates
 */
export const doctorProfileUpdateSchema = z.object({
  // Basic info
  firstName: z
    .string(zodRomanianErrors)
    .min(1, "Prenumele este obligatoriu")
    .max(100, "Prenumele este prea lung")
    .trim()
    .optional(),

  lastName: z
    .string(zodRomanianErrors)
    .min(1, "Numele este obligatoriu")
    .max(100, "Numele este prea lung")
    .trim()
    .optional(),

  title: z.string().max(50, "Titlul este prea lung").optional().or(z.literal("")),

  specialty: z
    .enum(["orthopedist", "nutritionist", "psychologist", "sports_medicine"], {
      errorMap: () => ({ message: "Selectează specializarea" }),
    })
    .optional(),

  secondarySpecialties: z.array(z.string().min(1).max(200)).optional(),

  credentials: z.array(z.string().min(1).max(200)).optional(),

  // Bio & Experience
  bio: z
    .string(zodRomanianErrors)
    .min(100, "Bio-ul trebuie să conțină cel puțin 100 caractere")
    .max(2000, "Bio-ul este prea lung (maxim 2000 caractere)")
    .trim()
    .optional(),

  yearsOfExperience: z
    .number()
    .int("Trebuie să fie un număr întreg")
    .min(1, "Minim 1 an de experiență")
    .max(50, "Valoarea introdusă este prea mare")
    .optional(),

  languages: z.array(z.string()).optional(),

  // Location
  city: z.string(zodRomanianErrors).min(1, "Orașul este obligatoriu").optional(),

  district: z
    .string()
    .optional()
    .transform((val) => (val && val.trim() !== "" ? val.trim() : undefined)),

  address: z
    .string(zodRomanianErrors)
    .min(10, "Adresa completă este obligatorie (minim 10 caractere)")
    .max(300, "Adresa este prea lungă")
    .trim()
    .optional(),

  // Contact
  phone: z
    .string(zodRomanianErrors)
    .regex(/^\+40[0-9]{9}$/, "Format telefon invalid (ex: +40721234567)")
    .optional(),

  email: z
    .string(zodRomanianErrors)
    .email("Adresa de email este invalidă")
    .toLowerCase()
    .optional(),

  website: z.string().url("URL-ul website-ului este invalid").optional().or(z.literal("")),

  // Availability
  acceptingNewPatients: z.boolean().optional(),

  onlineConsultations: z.boolean().optional(),

  schedule: z
    .array(
      z.object({
        day: z.string().min(1, "Ziua este obligatorie"),
        startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Format orar invalid (HH:MM)"),
        endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Format orar invalid (HH:MM)"),
      })
    )
    .optional(),

  // Media
  photoUrl: z.string(zodRomanianErrors).url("URL fotografie invalid").optional().or(z.literal("")),

  // Consultation fee (optional, for future use)
  consultationFee: z
    .number()
    .min(0, "Tariful trebuie să fie pozitiv")
    .max(10000, "Tariful este prea mare")
    .optional(),
});

// Combined types
export type DoctorBasicInfoInput = z.infer<typeof doctorBasicInfoSchema>;
export type DoctorBioExperienceInput = z.infer<typeof doctorBioExperienceSchema>;
export type DoctorLocationContactInput = z.infer<typeof doctorLocationContactSchema>;
export type DoctorPhotoInput = z.infer<typeof doctorPhotoSchema>;
export type DoctorVerificationInput = z.infer<typeof doctorVerificationSchema>;
export type DoctorAvailabilityInput = z.infer<typeof doctorAvailabilitySchema>;
export type DoctorProfileUpdateInput = z.infer<typeof doctorProfileUpdateSchema>;
