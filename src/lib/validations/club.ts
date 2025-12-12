/**
 * Club Profile Validation Schemas
 *
 * Zod schemas for validating club profile data during club admin onboarding.
 */

import { z } from "zod";
import { zodRomanianErrors } from "./common";

/**
 * Club Basic Info Schema (Club Onboarding - Step 2)
 */
export const clubBasicInfoSchema = z.object({
  name: z
    .string(zodRomanianErrors)
    .min(3, "Numele clubului este prea scurt")
    .max(200, "Numele clubului este prea lung")
    .trim(),

  sportType: z.string(zodRomanianErrors).min(1, "Selectează sportul principal"),

  description: z
    .string(zodRomanianErrors)
    .min(50, "Descrierea trebuie să conțină cel puțin 50 caractere")
    .max(1000, "Descrierea este prea lungă (maxim 1000 caractere)")
    .trim(),

  city: z.string(zodRomanianErrors).min(1, "Orașul este obligatoriu"),

  district: z.string().optional(),

  address: z
    .string(zodRomanianErrors)
    .min(10, "Adresa completă este obligatorie (minim 10 caractere)")
    .max(300, "Adresa este prea lungă")
    .trim(),
});

/**
 * Club Contact & Schedule Schema (Club Onboarding - Step 3)
 */
export const clubContactScheduleSchema = z.object({
  phone: z
    .string(zodRomanianErrors)
    .regex(/^\+40[0-9]{9}$/, "Format telefon invalid (ex: +40721234567)"),

  email: z.string(zodRomanianErrors).email("Adresa de email este invalidă").toLowerCase(),

  website: z.string().url("URL-ul website-ului este invalid").optional().or(z.literal("")),

  schedule: z
    .array(
      z.object({
        day: z.string().min(1, "Ziua este obligatorie"),
        time: z.string().min(1, "Intervalul orar este obligatoriu"),
      })
    )
    .min(1, "Adaugă cel puțin un interval de antrenament"),
});

/**
 * Club Pricing & Age Groups Schema (Club Onboarding - Step 4)
 */
export const clubPricingAgesSchema = z.object({
  pricing: z
    .array(
      z.object({
        type: z.enum(["monthly", "per_class", "per_semester"], {
          errorMap: () => ({ message: "Tip abonament invalid" }),
        }),
        amount: z
          .number({ required_error: "Prețul este obligatoriu" })
          .min(0, "Prețul trebuie să fie pozitiv")
          .max(10000, "Prețul este prea mare"),
      })
    )
    .min(1, "Adaugă cel puțin un tip de abonament"),

  ageGroups: z.array(z.number().min(4).max(14)).min(1, "Selectează cel puțin o grupă de vârstă"),

  experienceLevels: z
    .array(z.enum(["beginner", "intermediate", "advanced"]))
    .min(1, "Selectează cel puțin un nivel de experiență"),
});

/**
 * Club Photo Upload Schema (Club Onboarding - Step 5)
 */
export const clubPhotoSchema = z.object({
  logoUrl: z.string(zodRomanianErrors).url("URL logo invalid").min(1, "Logo-ul este obligatoriu"),

  galleryUrls: z
    .array(z.string().url("URL imagine invalid"))
    .min(3, "Încarcă cel puțin 3 fotografii în galerie")
    .max(10, "Maxim 10 fotografii în galerie"),
});

/**
 * Club Verification Documents Schema (Club Onboarding - Step 6)
 */
export const clubVerificationSchema = z.object({
  verificationDocuments: z
    .array(z.string().url("URL document invalid"))
    .min(2, "Încarcă cel puțin 2 documente (certificat înregistrare + asigurare)")
    .max(5, "Maxim 5 documente"),
});

// Combined types
export type ClubBasicInfoInput = z.infer<typeof clubBasicInfoSchema>;
export type ClubContactScheduleInput = z.infer<typeof clubContactScheduleSchema>;
export type ClubPricingAgesInput = z.infer<typeof clubPricingAgesSchema>;
export type ClubPhotoInput = z.infer<typeof clubPhotoSchema>;
export type ClubVerificationInput = z.infer<typeof clubVerificationSchema>;
