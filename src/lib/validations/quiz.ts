/**
 * Quiz Validation Schemas
 *
 * Zod validation schemas for AI Coach Quiz with Romanian error messages.
 *
 * All error messages follow CRITICAL requirement: Romanian language only.
 */

import { z } from "zod";

/**
 * Question 1: Age & Basic Info
 */
export const ageQuestionSchema = z.object({
  age: z
    .number({
      required_error: "Vârsta este obligatorie",
      invalid_type_error: "Vârsta trebuie să fie un număr",
    })
    .int("Vârsta trebuie să fie un număr întreg")
    .min(4, "Vârsta minimă acceptată este 4 ani")
    .max(14, "Vârsta maximă acceptată este 14 ani"),
  gender: z
    .enum(["male", "female", "other"], {
      errorMap: () => ({ message: "Selectează o opțiune validă pentru gen" }),
    })
    .optional(),
});

/**
 * Question 2: Energy Level
 */
export const energyQuestionSchema = z.object({
  energyLevel: z.enum(["low", "medium", "high", "very_high"], {
    required_error: "Selectează nivelul de energie al copilului",
    invalid_type_error: "Nivel de energie invalid",
  }),
});

/**
 * Question 3: Personality Traits
 */
export const personalityQuestionSchema = z.object({
  personality: z
    .array(z.string(), {
      required_error: "Selectează cel puțin o trăsătură de personalitate",
    })
    .min(1, "Selectează cel puțin o trăsătură de personalitate")
    .max(10, "Poți selecta maximum 10 trăsături de personalitate"),
});

/**
 * Question 4: Interests & Hobbies
 */
export const interestsQuestionSchema = z.object({
  interests: z
    .array(z.string(), {
      required_error: "Selectează cel puțin un interes sau hobby",
    })
    .min(1, "Selectează cel puțin un interes sau hobby")
    .max(15, "Poți selecta maximum 15 interese"),
  previousSports: z
    .array(z.string())
    .max(10, "Poți introduce maximum 10 sporturi anterioare")
    .default([]),
  whyStoppedSports: z.array(z.string()).max(10, "Poți selecta maximum 10 motive").optional(),
});

/**
 * Question 5: Physical Build, Coordination & Health
 */
export const physicalQuestionSchema = z.object({
  physicalBuild: z.enum(["slim", "average", "athletic"], {
    required_error: "Selectează constituția fizică a copilului",
    invalid_type_error: "Constituție fizică invalidă",
  }),
  coordinationLevel: z.enum(["excellent", "good", "developing", "challenges"], {
    required_error: "Selectează nivelul de coordonare al copilului",
    invalid_type_error: "Nivel de coordonare invalid",
  }),
  healthConditions: z
    .array(z.string())
    .max(10, "Poți selecta maximum 10 considerații medicale")
    .optional(),
  physicalConsiderations: z
    .string()
    .max(500, "Considerațiile fizice nu pot depăși 500 caractere")
    .optional(),
});

/**
 * Question 6: Preferences
 */
export const preferencesQuestionSchema = z.object({
  preferences: z
    .object(
      {
        indoor: z.boolean({
          invalid_type_error:
            "Preferința pentru activități interioare trebuie să fie true sau false",
        }),
        outdoor: z.boolean({
          invalid_type_error:
            "Preferința pentru activități exterioare trebuie să fie true sau false",
        }),
        team: z.boolean({
          invalid_type_error: "Preferința pentru sporturi de echipă trebuie să fie true sau false",
        }),
        individual: z.boolean({
          invalid_type_error:
            "Preferința pentru sporturi individuale trebuie să fie true sau false",
        }),
        timeAvailability: z
          .string()
          .max(200, "Disponibilitatea de timp nu poate depăși 200 caractere")
          .optional(),
        budgetConsiderations: z
          .string()
          .max(200, "Considerațiile de buget nu pot depăși 200 caractere")
          .optional(),
        parentInvolvement: z
          .enum(["transport-only", "attend", "participate", "minimal"], {
            errorMap: () => ({ message: "Selectează o opțiune validă pentru implicare" }),
          })
          .optional(),
      },
      {
        required_error: "Preferințele sunt obligatorii",
      }
    )
    .refine(
      (data) => data.indoor || data.outdoor,
      "Selectează cel puțin o preferință: interior sau exterior"
    )
    .refine(
      (data) => data.team || data.individual,
      "Selectează cel puțin o preferință: echipă sau individual"
    ),
});

/**
 * Complete Quiz Answers Schema
 *
 * Combines all question schemas into a complete quiz submission schema.
 */
export const quizAnswersSchema = z.object({
  // Question 1: Age & Basic Info
  age: ageQuestionSchema.shape.age,
  gender: ageQuestionSchema.shape.gender,

  // Question 2: Energy Level
  energyLevel: energyQuestionSchema.shape.energyLevel,

  // Question 3: Personality Traits
  personality: personalityQuestionSchema.shape.personality,

  // Question 4: Interests & Hobbies
  interests: interestsQuestionSchema.shape.interests,
  previousSports: interestsQuestionSchema.shape.previousSports,
  whyStoppedSports: interestsQuestionSchema.shape.whyStoppedSports,

  // Question 5: Physical Build, Coordination & Health
  physicalBuild: physicalQuestionSchema.shape.physicalBuild,
  coordinationLevel: physicalQuestionSchema.shape.coordinationLevel,
  healthConditions: physicalQuestionSchema.shape.healthConditions,
  physicalConsiderations: physicalQuestionSchema.shape.physicalConsiderations,

  // Question 6: Preferences
  preferences: preferencesQuestionSchema.shape.preferences,
});

/**
 * Create Quiz Input Schema
 *
 * Validates the complete quiz submission with child ID.
 */
export const createQuizInputSchema = z.object({
  childId: z
    .string({
      required_error: "ID-ul copilului este obligatoriu",
      invalid_type_error: "ID-ul copilului trebuie să fie un text",
    })
    .uuid("ID-ul copilului trebuie să fie un UUID valid"),
  answers: quizAnswersSchema,
});

/**
 * Sport Recommendation Schema
 *
 * Validates AI-generated sport recommendations.
 */
export const sportRecommendationSchema = z.object({
  sportId: z.string({
    required_error: "ID-ul sportului este obligatoriu",
  }),
  sportName: z.string({
    required_error: "Numele sportului este obligatoriu",
  }),
  matchScore: z
    .number({
      required_error: "Scorul de potrivire este obligatoriu",
      invalid_type_error: "Scorul de potrivire trebuie să fie un număr",
    })
    .int("Scorul de potrivire trebuie să fie un număr întreg")
    .min(0, "Scorul de potrivire trebuie să fie între 0 și 100")
    .max(100, "Scorul de potrivire trebuie să fie între 0 și 100"),
  reasoning: z
    .string({
      required_error: "Raționamentul este obligatoriu",
    })
    .min(50, "Raționamentul trebuie să aibă cel puțin 50 caractere")
    .max(1000, "Raționamentul nu poate depăși 1000 caractere"),
  benefits: z
    .array(z.string())
    .min(1, "Trebuie să existe cel puțin un beneficiu")
    .max(10, "Maximum 10 beneficii permise"),
  considerations: z.array(z.string()).max(10, "Maximum 10 considerente permise").default([]),
});

/**
 * Quiz Result Schema
 *
 * Validates complete quiz results with recommendations.
 */
export const quizResultSchema = z.object({
  id: z.string().uuid("ID-ul rezultatului trebuie să fie un UUID valid"),
  childId: z.string().uuid("ID-ul copilului trebuie să fie un UUID valid"),
  recommendations: z
    .array(sportRecommendationSchema)
    .min(1, "Trebuie să existe cel puțin o recomandare")
    .max(5, "Maximum 5 recomandări permise"),
  createdAt: z.date({
    invalid_type_error: "Data creării trebuie să fie o dată validă",
  }),
});

/**
 * Type inference from schemas for use in components
 */
export type AgeQuestionInput = z.infer<typeof ageQuestionSchema>;
export type EnergyQuestionInput = z.infer<typeof energyQuestionSchema>;
export type PersonalityQuestionInput = z.infer<typeof personalityQuestionSchema>;
export type InterestsQuestionInput = z.infer<typeof interestsQuestionSchema>;
export type PhysicalQuestionInput = z.infer<typeof physicalQuestionSchema>;
export type PreferencesQuestionInput = z.infer<typeof preferencesQuestionSchema>;
export type QuizAnswersInput = z.infer<typeof quizAnswersSchema>;
export type CreateQuizInput = z.infer<typeof createQuizInputSchema>;
export type SportRecommendationInput = z.infer<typeof sportRecommendationSchema>;
export type QuizResultInput = z.infer<typeof quizResultSchema>;
