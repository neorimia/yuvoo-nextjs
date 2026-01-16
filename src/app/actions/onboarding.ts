/**
 * Onboarding Server Actions
 *
 * Server-side actions for managing onboarding state, progress tracking,
 * and cross-session persistence.
 */

"use server";

import { requireAuth } from "@/modules/auth/auth.service";
import { db } from "@/lib/db";
import { users, onboardingProgress, children, clubs, doctors, locations } from "@/lib/db/schema";
import { eq, and, sql } from "drizzle-orm";
import { redirect } from "next/navigation";
import { routes } from "@/lib/routes";
import { generateSlug, normalizePhoneNumber } from "@/lib/utils";
import { z } from "zod";
import { startOnboardingSchema, updateOnboardingStepSchema } from "@/lib/validations/onboarding";
import { createChildSchema } from "@/lib/validations/child";
import { UserRoleEnum } from "@/modules/auth/auth.types";
import {
  clubBasicInfoSchema,
  clubContactScheduleSchema,
  clubPricingAgesSchema,
  clubPhotoSchema,
  clubVerificationSchema,
} from "@/lib/validations/club";
import { trackEventServer } from "@/lib/analytics/tracking-server";
import { PostHogEvents, PostHogProperties } from "@/lib/analytics/events";
import {
  doctorBasicInfoSchema,
  doctorBioExperienceSchema,
  doctorLocationContactSchema,
  doctorPhotoSchema,
  doctorVerificationSchema,
  doctorAvailabilitySchema,
} from "@/lib/validations/doctor";
import type { CreateChildInput } from "@/lib/validations/child";
import type {
  ClubBasicInfoInput,
  ClubContactScheduleInput,
  ClubPricingAgesInput,
  ClubPhotoInput,
  ClubVerificationInput,
} from "@/lib/validations/club";
import type {
  DoctorBasicInfoInput,
  DoctorBioExperienceInput,
  DoctorLocationContactInput,
  DoctorPhotoInput,
  DoctorVerificationInput,
  DoctorAvailabilityInput,
} from "@/lib/validations/doctor";

// Types
type OnboardingRole = "parent" | "club_admin" | "doctor";

type OnboardingResponse<T = void> = { success: true; data?: T } | { success: false; error: string };

type OnboardingProgressData = {
  id: string;
  userId: string;
  role: string;
  currentStep: number;
  totalSteps: number;
  completedSteps: number[];
  stepData: Record<string, unknown>;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

// ============================================================================
// ONBOARDING STATE MANAGEMENT
// ============================================================================

/**
 * Start Onboarding Flow
 */
export async function startOnboarding(
  role: OnboardingRole
): Promise<OnboardingResponse<OnboardingProgressData>> {
  try {
    const user = await requireAuth();
    const validated = startOnboardingSchema.parse({ role });

    const totalStepsMap: Record<OnboardingRole, number> = {
      parent: 5,
      club_admin: 7,
      doctor: 8,
    };
    const totalSteps = totalStepsMap[validated.role];

    const existing = await db
      .select()
      .from(onboardingProgress)
      .where(eq(onboardingProgress.userId, user.id))
      .limit(1);

    if (existing.length > 0) {
      return {
        success: true,
        data: {
          id: existing[0].id,
          userId: existing[0].userId,
          role: existing[0].role as OnboardingRole,
          currentStep: existing[0].currentStep,
          totalSteps: existing[0].totalSteps,
          completedSteps: existing[0].completedSteps.map(Number),
          stepData: existing[0].stepData as Record<string, unknown>,
          isCompleted: existing[0].isCompleted,
          createdAt: existing[0].createdAt,
          updatedAt: existing[0].updatedAt,
        },
      };
    }

    const [progress] = await db
      .insert(onboardingProgress)
      .values({
        id: crypto.randomUUID(),
        userId: user.id,
        role: validated.role,
        currentStep: 1,
        totalSteps,
        completedSteps: [],
        stepData: {},
        isCompleted: false,
      })
      .returning();

    return {
      success: true,
      data: {
        id: progress.id,
        userId: progress.userId,
        role: progress.role as OnboardingRole,
        currentStep: progress.currentStep,
        totalSteps: progress.totalSteps,
        completedSteps: progress.completedSteps.map(Number),
        stepData: progress.stepData as Record<string, unknown>,
        isCompleted: progress.isCompleted,
        createdAt: progress.createdAt,
        updatedAt: progress.updatedAt,
      },
    };
  } catch (error) {
    console.error("Error starting onboarding:", error);
    return {
      success: false,
      error: "A apărut o eroare la inițializarea procesului de onboarding.",
    };
  }
}

/**
 * Get Onboarding Progress
 *
 * Automatically initializes onboarding progress if it doesn't exist.
 * Determines the role from the user's database record.
 */
export async function getOnboardingProgress(): Promise<OnboardingResponse<OnboardingProgressData>> {
  try {
    const user = await requireAuth();

    // Get user's role from database
    const [dbUser] = await db.select().from(users).where(eq(users.id, user.id)).limit(1);

    if (!dbUser) {
      return {
        success: false,
        error: "Utilizatorul nu a fost găsit.",
      };
    }

    // Determine onboarding role from user role
    const onboardingRole: OnboardingRole =
      dbUser.role === UserRoleEnum.CLUB_ADMIN
        ? "club_admin"
        : dbUser.role === UserRoleEnum.DOCTOR
          ? "doctor"
          : "parent";

    // Check if progress exists
    const progress = await db
      .select()
      .from(onboardingProgress)
      .where(eq(onboardingProgress.userId, user.id))
      .limit(1);

    // If no progress exists, create it automatically
    if (progress.length === 0) {
      const totalStepsMap: Record<OnboardingRole, number> = {
        parent: 5,
        club_admin: 7,
        doctor: 8,
      };
      const totalSteps = totalStepsMap[onboardingRole];

      const [newProgress] = await db
        .insert(onboardingProgress)
        .values({
          id: crypto.randomUUID(),
          userId: user.id,
          role: onboardingRole,
          currentStep: 1,
          totalSteps,
          completedSteps: [],
          stepData: {},
          isCompleted: false,
        })
        .returning();

      return {
        success: true,
        data: {
          id: newProgress.id,
          userId: newProgress.userId,
          role: newProgress.role,
          currentStep: newProgress.currentStep,
          totalSteps: newProgress.totalSteps,
          completedSteps: newProgress.completedSteps.map(Number),
          stepData: newProgress.stepData as Record<string, unknown>,
          isCompleted: newProgress.isCompleted,
          createdAt: newProgress.createdAt,
          updatedAt: newProgress.updatedAt,
        },
      };
    }

    return {
      success: true,
      data: {
        id: progress[0].id,
        userId: progress[0].userId,
        role: progress[0].role,
        currentStep: progress[0].currentStep,
        totalSteps: progress[0].totalSteps,
        completedSteps: progress[0].completedSteps.map(Number),
        stepData: progress[0].stepData as Record<string, unknown>,
        isCompleted: progress[0].isCompleted,
        createdAt: progress[0].createdAt,
        updatedAt: progress[0].updatedAt,
      },
    };
  } catch (error) {
    console.error("Error getting onboarding progress:", error);
    return {
      success: false,
      error: "A apărut o eroare la obținerea progresului.",
    };
  }
}

/**
 * Update Onboarding Step
 */
export async function updateOnboardingStep(
  stepNumber: number,
  stepData?: Record<string, unknown>
): Promise<OnboardingResponse> {
  try {
    const user = await requireAuth();
    const validated = updateOnboardingStepSchema.parse({ stepNumber, stepData });

    await db
      .update(onboardingProgress)
      .set({
        currentStep: validated.stepNumber,
        stepData: validated.stepData ?? {},
        updatedAt: new Date(),
      })
      .where(eq(onboardingProgress.userId, user.id));

    return { success: true };
  } catch (error) {
    console.error("Error updating onboarding step:", error);
    return {
      success: false,
      error: "A apărut o eroare la salvarea progresului.",
    };
  }
}

/**
 * Mark Step as Complete
 */
export async function markStepComplete(stepNumber: number): Promise<OnboardingResponse> {
  try {
    const user = await requireAuth();

    await db
      .update(onboardingProgress)
      .set({
        completedSteps: sql`array_append(completed_steps, ${stepNumber.toString()})`,
        updatedAt: new Date(),
      })
      .where(eq(onboardingProgress.userId, user.id));

    return { success: true };
  } catch (error) {
    console.error("Error marking step complete:", error);
    return {
      success: false,
      error: "A apărut o eroare la marcarea pasului ca finalizat.",
    };
  }
}

/**
 * Save Step Data (JSONB)
 *
 * Security: Validates key to prevent SQL injection.
 * Only allows alphanumeric characters, underscores, and hyphens.
 * Uses parameterized queries - Drizzle automatically parameterizes values in sql template literals.
 */
export async function saveStepData(key: string, value: unknown): Promise<OnboardingResponse> {
  try {
    const user = await requireAuth();

    // Validate key to prevent SQL injection
    // Only allow alphanumeric characters, underscores, and hyphens
    if (!/^[a-zA-Z0-9_-]+$/.test(key)) {
      return {
        success: false,
        error:
          "Cheia de date este invalidă. Doar caractere alfanumerice, liniuțe și underscore sunt permise.",
      };
    }

    // Construct JSON path safely (key is validated above)
    // Drizzle automatically parameterizes variables when using ${variable} in sql template literals
    // For jsonb_set, the path must be a text array format: '{key}'
    // Since key is validated (alphanumeric, underscore, hyphen only), constructing path is safe
    const jsonPath = `{${key}}`;
    const jsonValue = JSON.stringify(value);

    // Both jsonPath and jsonValue are parameterized by Drizzle when using ${variable}
    await db
      .update(onboardingProgress)
      .set({
        stepData: sql`jsonb_set(step_data, ${jsonPath}::text[], ${jsonValue}::jsonb)`,
        updatedAt: new Date(),
      })
      .where(eq(onboardingProgress.userId, user.id));

    return { success: true };
  } catch (error) {
    console.error("Error saving step data:", error);
    return {
      success: false,
      error: "A apărut o eroare la salvarea datelor.",
    };
  }
}

// ============================================================================
// PARENT ONBOARDING ACTIONS
// ============================================================================

/**
 * Add Child During Onboarding (Parent - Step 2)
 */
export async function addChildOnboarding(
  data: CreateChildInput
): Promise<OnboardingResponse<{ childId: string }>> {
  try {
    const user = await requireAuth();
    const validated = createChildSchema.parse(data);

    const [child] = await db
      .insert(children)
      .values({
        id: crypto.randomUUID(),
        parentId: user.id,
        firstName: validated.firstName,
        lastName: validated.lastName,
        dateOfBirth: validated.dateOfBirth,
        gender: validated.gender,
      })
      .returning();

    await saveStepData("child_id", child.id);
    await markStepComplete(2);
    await updateOnboardingStep(3);

    return { success: true, data: { childId: child.id } };
  } catch (error) {
    console.error("Error adding child during onboarding:", error);
    return {
      success: false,
      error: "A apărut o eroare la adăugarea profilului copilului.",
    };
  }
}

/**
 * Complete Parent Onboarding
 */
export async function completeParentOnboarding(action: "quiz" | "dashboard"): Promise<never> {
  try {
    const user = await requireAuth();

    await db
      .update(users)
      .set({
        onboardingCompleted: true,
        profileCompletionPercentage: 100,
        updatedAt: new Date(),
      })
      .where(eq(users.id, user.id));

    await db
      .update(onboardingProgress)
      .set({
        currentStep: 5,
        isCompleted: true,
        updatedAt: new Date(),
      })
      .where(eq(onboardingProgress.userId, user.id));

    await markStepComplete(5);

    // Track onboarding completion with person properties
    try {
      await trackEventServer(PostHogEvents.ONBOARDING_COMPLETED, {
        distinctId: user.id,
        [PostHogProperties.ONBOARDING_ROLE]: user.role,
        // Person properties: mark onboarding as complete
        $set: {
          onboardingCompleted: true,
        },
        $set_once: {
          onboardingCompletedDate: new Date().toISOString(),
          onboardingRole: user.role,
        },
      });
    } catch (trackingError) {
      // Don't fail onboarding completion if tracking fails
      if (process.env.NODE_ENV === "development") {
        console.error("[PostHog] Error tracking onboarding completion:", trackingError);
      }
    }

    if (action === "quiz") {
      redirect(routes.quiz?.intro || "/chestionar");
    } else {
      redirect(routes.parent?.dashboard || "/parent/dashboard");
    }
  } catch (error) {
    console.error("Error completing parent onboarding:", error);
    throw new Error("A apărut o eroare la finalizarea onboarding-ului.");
  }
}

// ============================================================================
// CLUB ADMIN ONBOARDING ACTIONS
// ============================================================================

/**
 * Get club ID for current user with fallback logic
 * First tries to get from onboarding progress stepData
 * If not found, queries database by adminUserId
 * Saves club_id to stepData if found via fallback
 */
async function getClubIdForUser(): Promise<string | null> {
  const user = await requireAuth();

  // Try to get from onboarding progress
  const progressData = await getOnboardingProgress();
  if (progressData.success && progressData.data) {
    const clubId = progressData.data.stepData?.club_id as string | undefined;
    if (clubId) {
      return clubId;
    }
  }

  // Fallback: query database by adminUserId
  const userClub = await db.query.clubs.findFirst({
    where: eq(clubs.adminUserId, user.id),
    columns: { id: true },
  });

  if (userClub) {
    // Save club_id to stepData for future steps
    await saveStepData("club_id", userClub.id);
    return userClub.id;
  }

  return null;
}

/**
 * Create Club During Onboarding (Club Admin - Step 2)
 */
export async function createClubOnboarding(
  data: ClubBasicInfoInput
): Promise<OnboardingResponse<{ clubId: string }>> {
  try {
    // Verify user is authenticated and has club_admin role
    const user = await requireAuth();

    if (user.role !== UserRoleEnum.CLUB_ADMIN) {
      return {
        success: false,
        error: "Doar administratorii de cluburi pot crea profiluri de club.",
      };
    }

    // Log input data for debugging (development only)
    if (process.env.NODE_ENV === "development") {
      console.log("[createClubOnboarding] Input data:", JSON.stringify(data, null, 2));
    }

    // Validate input data
    let validated: ClubBasicInfoInput;
    try {
      validated = clubBasicInfoSchema.parse(data);
    } catch (validationError) {
      console.error("[createClubOnboarding] Validation error:", validationError);
      if (validationError instanceof z.ZodError) {
        const firstError = validationError.errors[0];
        return {
          success: false,
          error: firstError?.message || "Datele introduse nu sunt valide.",
        };
      }
      throw validationError;
    }

    // Phase 6: Use location IDs instead of text fields
    // validated.cityId is required (enforced by validation schema)
    if (!validated.cityId) {
      return {
        success: false,
        error: "Orașul este obligatoriu. Te rugăm să selectezi un oraș.",
      };
    }

    // Get countyId from cityId (required for clubs)
    const cityLocation = await db.query.locations.findFirst({
      where: eq(locations.id, validated.cityId),
      columns: { parentId: true },
    });

    if (!cityLocation?.parentId) {
      return {
        success: false,
        error: "Eroare la determinarea județului. Te rugăm să încerci din nou.",
      };
    }

    // Generate SEO-friendly slug from club name
    const slug = generateSlug(validated.name);

    // Check if slug already exists (unique constraint)
    const existingClub = await db.query.clubs.findFirst({
      where: eq(clubs.slug, slug),
      columns: { id: true },
    });

    let finalSlug = slug;
    if (existingClub) {
      // Append a random suffix if slug exists
      finalSlug = `${slug}-${Math.random().toString(36).substring(2, 8)}`;
    }

    const [club] = await db
      .insert(clubs)
      .values({
        id: crypto.randomUUID(),
        adminUserId: user.id,
        name: validated.name.trim(),
        slug: finalSlug,
        sportType: validated.sportType,
        description: validated.description.trim(),
        cityId: validated.cityId, // Phase 6: Use cityId instead of city
        sectorId: validated.sectorId || null, // Phase 6: Use sectorId instead of district
        countyId: cityLocation.parentId, // Required - derived from cityId
        address: validated.address.trim(),
        profileComplete: false,
        verificationStatus: "pending",
      })
      .returning();

    if (!club) {
      return {
        success: false,
        error: "Nu s-a putut crea clubul. Te rugăm să încerci din nou.",
      };
    }

    await saveStepData("club_id", club.id);
    await markStepComplete(2);
    await updateOnboardingStep(3);

    return { success: true, data: { clubId: club.id } };
  } catch (error) {
    console.error("Error creating club during onboarding:", error);
    console.error("Error details:", {
      name: error instanceof Error ? error.name : "Unknown",
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });

    // Handle authentication errors
    if (error instanceof Error && error.message.includes("Unauthorized")) {
      return {
        success: false,
        error: "Nu ești autentificat. Te rugăm să te autentifici din nou.",
      };
    }

    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0];
      console.error("Validation error:", error.errors);
      return {
        success: false,
        error: firstError?.message || "Datele introduse nu sunt valide.",
      };
    }

    // Handle database constraint errors
    if (error instanceof Error) {
      // Check for unique constraint violation (slug)
      if (
        error.message.includes("unique") ||
        error.message.includes("duplicate") ||
        error.message.includes("violates unique constraint")
      ) {
        return {
          success: false,
          error: "Un club cu acest nume există deja. Te rugăm să alegi un alt nume.",
        };
      }

      // Check for foreign key constraint (adminUserId)
      if (
        error.message.includes("foreign key") ||
        error.message.includes("admin_user_id") ||
        error.message.includes("violates foreign key constraint")
      ) {
        return {
          success: false,
          error: "Eroare de autentificare. Te rugăm să te autentifici din nou.",
        };
      }

      // Check for not null constraint violations
      if (
        error.message.includes("not null") ||
        error.message.includes("null value") ||
        error.message.includes("violates not-null constraint")
      ) {
        return {
          success: false,
          error: "Toate câmpurile obligatorii trebuie completate.",
        };
      }

      // Return the error message if it's informative (in development)
      if (process.env.NODE_ENV === "development") {
        return {
          success: false,
          error: `Eroare: ${error.message}. Verifică consola pentru detalii.`,
        };
      }
    }

    return {
      success: false,
      error: "A apărut o eroare la crearea profilului clubului. Verifică consola pentru detalii.",
    };
  }
}

/**
 * Update Club Contact & Schedule During Onboarding (Club Admin - Step 3)
 */
export async function updateClubContactSchedule(
  data: ClubContactScheduleInput
): Promise<OnboardingResponse<{ clubId: string }>> {
  try {
    const user = await requireAuth();

    // Get club ID with fallback logic
    const clubId = await getClubIdForUser();
    if (!clubId) {
      return {
        success: false,
        error: "Nu s-a găsit profilul clubului. Te rugăm să revii la pasul anterior.",
      };
    }

    // Validate the input
    const validated = clubContactScheduleSchema.parse(data);

    // Update club with contact and schedule information
    await db
      .update(clubs)
      .set({
        phone: validated.phone,
        email: validated.email,
        website: validated.website || null,
        schedule: validated.schedule,
        updatedAt: new Date(),
      })
      .where(and(eq(clubs.id, clubId), eq(clubs.adminUserId, user.id)));

    await saveStepData("contact_schedule", validated);
    await markStepComplete(3);
    await updateOnboardingStep(4);

    return { success: true, data: { clubId } };
  } catch (error) {
    console.error("Error updating club contact and schedule:", error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0]?.message || "Datele introduse nu sunt valide.",
      };
    }
    return {
      success: false,
      error: "A apărut o eroare la actualizarea informațiilor de contact și program.",
    };
  }
}

/**
 * Update Club Pricing & Age Groups During Onboarding (Club Admin - Step 4)
 */
export async function updateClubPricingAges(
  data: ClubPricingAgesInput
): Promise<OnboardingResponse<{ clubId: string }>> {
  try {
    const user = await requireAuth();

    // Get club ID with fallback logic
    const clubId = await getClubIdForUser();
    if (!clubId) {
      return {
        success: false,
        error: "Nu s-a găsit profilul clubului. Te rugăm să revii la pasul anterior.",
      };
    }

    // Validate the input
    const validated = clubPricingAgesSchema.parse(data);

    // Update club with pricing, age groups, and experience levels
    await db
      .update(clubs)
      .set({
        pricing: validated.pricing,
        ageGroups: validated.ageGroups,
        experienceLevels: validated.experienceLevels,
        updatedAt: new Date(),
      })
      .where(and(eq(clubs.id, clubId), eq(clubs.adminUserId, user.id)));

    await saveStepData("pricing_ages", validated);
    await markStepComplete(4);
    await updateOnboardingStep(5);

    return { success: true, data: { clubId } };
  } catch (error) {
    console.error("Error updating club pricing and age groups:", error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0]?.message || "Datele introduse nu sunt valide.",
      };
    }
    return {
      success: false,
      error: "A apărut o eroare la actualizarea prețurilor și grupelor de vârstă.",
    };
  }
}

/**
 * Update Club Photos During Onboarding (Club Admin - Step 5)
 */
export async function updateClubPhotos(
  data: ClubPhotoInput
): Promise<OnboardingResponse<{ clubId: string }>> {
  try {
    const user = await requireAuth();

    // Get club ID with fallback logic
    const clubId = await getClubIdForUser();
    if (!clubId) {
      return {
        success: false,
        error: "Nu s-a găsit profilul clubului. Te rugăm să revii la pasul anterior.",
      };
    }

    // Validate the input
    const validated = clubPhotoSchema.parse(data);

    // Update club with logo and gallery URLs
    await db
      .update(clubs)
      .set({
        logoUrl: validated.logoUrl,
        galleryUrls: validated.galleryUrls,
        updatedAt: new Date(),
      })
      .where(and(eq(clubs.id, clubId), eq(clubs.adminUserId, user.id)));

    await saveStepData("photos", validated);
    await markStepComplete(5);
    await updateOnboardingStep(6);

    return { success: true, data: { clubId } };
  } catch (error) {
    console.error("Error updating club photos:", error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0]?.message || "Datele introduse nu sunt valide.",
      };
    }
    return {
      success: false,
      error: "A apărut o eroare la actualizarea fotografiilor.",
    };
  }
}

/**
 * Update Club Verification Documents During Onboarding (Club Admin - Step 6)
 */
export async function updateClubVerification(
  data: ClubVerificationInput
): Promise<OnboardingResponse<{ clubId: string }>> {
  try {
    const user = await requireAuth();

    // Get club ID with fallback logic
    const clubId = await getClubIdForUser();
    if (!clubId) {
      return {
        success: false,
        error: "Nu s-a găsit profilul clubului. Te rugăm să revii la pasul anterior.",
      };
    }

    // Validate the input
    const validated = clubVerificationSchema.parse(data);

    // Update club with verification documents
    await db
      .update(clubs)
      .set({
        verificationDocuments: validated.verificationDocuments,
        updatedAt: new Date(),
      })
      .where(and(eq(clubs.id, clubId), eq(clubs.adminUserId, user.id)));

    await saveStepData("verification", validated);
    await markStepComplete(6);
    await updateOnboardingStep(7);

    return { success: true, data: { clubId } };
  } catch (error) {
    console.error("Error updating club verification documents:", error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0]?.message || "Datele introduse nu sunt valide.",
      };
    }
    return {
      success: false,
      error: "A apărut o eroare la actualizarea documentelor de verificare.",
    };
  }
}

/**
 * Submit Club for Verification
 */
export async function submitClubForVerification(
  clubId: string,
  documents: string[]
): Promise<OnboardingResponse> {
  try {
    const user = await requireAuth();

    await db
      .update(clubs)
      .set({
        verificationDocuments: documents,
        verificationStatus: "in_review",
        updatedAt: new Date(),
      })
      .where(and(eq(clubs.id, clubId), eq(clubs.adminUserId, user.id)));

    return { success: true };
  } catch (error) {
    console.error("Error submitting club for verification:", error);
    return {
      success: false,
      error: "A apărut o eroare la trimiterea spre verificare.",
    };
  }
}

/**
 * Complete Club Admin Onboarding
 *
 * Marks onboarding as complete in the database. Does NOT redirect (let the page handle it).
 */
export async function completeClubOnboarding(): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await requireAuth();

    // Update user onboarding status
    await db
      .update(users)
      .set({
        onboardingCompleted: true,
        profileCompletionPercentage: 100,
        updatedAt: new Date(),
      })
      .where(eq(users.id, user.id));

    // Update onboarding progress
    await db
      .update(onboardingProgress)
      .set({
        currentStep: 7,
        isCompleted: true,
        updatedAt: new Date(),
      })
      .where(eq(onboardingProgress.userId, user.id));

    // Mark club profile as complete
    const progressData = await getOnboardingProgress();
    if (progressData.success && progressData.data && progressData.data?.stepData?.club_id) {
      await db
        .update(clubs)
        .set({ profileComplete: true, updatedAt: new Date() })
        .where(eq(clubs.id, progressData.data?.stepData?.club_id as string));
    }

    // Track onboarding completion with person properties
    try {
      await trackEventServer(PostHogEvents.ONBOARDING_COMPLETED, {
        distinctId: user.id,
        [PostHogProperties.ONBOARDING_ROLE]: user.role,
        // Person properties: mark onboarding as complete
        $set: {
          onboardingCompleted: true,
        },
        $set_once: {
          onboardingCompletedDate: new Date().toISOString(),
          onboardingRole: user.role,
        },
      });
    } catch (trackingError) {
      // Don't fail onboarding completion if tracking fails
      if (process.env.NODE_ENV === "development") {
        console.error("[PostHog] Error tracking onboarding completion:", trackingError);
      }
    }

    return { success: true };
  } catch (error) {
    console.error("Error completing club onboarding:", error);
    return {
      success: false,
      error: "A apărut o eroare la finalizarea onboarding-ului.",
    };
  }
}

// ============================================================================
// DOCTOR ONBOARDING ACTIONS
// ============================================================================

/**
 * Create Doctor Profile During Onboarding (Doctor - Step 2)
 */
export async function createDoctorOnboarding(
  data: DoctorBasicInfoInput
): Promise<OnboardingResponse<{ doctorId: string }>> {
  try {
    const user = await requireAuth();

    // Validate the input
    const validated = doctorBasicInfoSchema.parse(data);

    // Phase 6: Get default location (Bucharest) as placeholder
    // Location will be updated properly in step 4 (updateDoctorLocationContact)
    const defaultCity = await db.query.locations.findFirst({
      where: and(eq(locations.type, "city"), eq(locations.name, "București")),
      columns: { id: true, parentId: true },
    });

    if (!defaultCity || !defaultCity.parentId) {
      return {
        success: false,
        error: "Eroare la inițializarea locației. Te rugăm să încerci din nou.",
      };
    }

    const [doctor] = await db
      .insert(doctors)
      .values({
        id: crypto.randomUUID(),
        userId: user.id,
        firstName: validated.firstName,
        lastName: validated.lastName,
        title: validated.title || null,
        specialty: validated.specialty,
        secondarySpecialties: validated.secondarySpecialties || [],
        credentials: validated.credentials,
        // Phase 6: Use location IDs (placeholder - will be updated in step 4)
        cityId: defaultCity.id,
        countyId: defaultCity.parentId,
        sectorId: null, // Will be set in step 4 if needed
        profileComplete: false,
        verificationStatus: "pending",
      })
      .returning();

    await saveStepData("doctor_id", doctor.id);
    await saveStepData("basic_info", validated);
    await markStepComplete(2);
    await updateOnboardingStep(3);

    return { success: true, data: { doctorId: doctor.id } };
  } catch (error) {
    console.error("Error creating doctor during onboarding:", error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0]?.message || "Datele introduse nu sunt valide.",
      };
    }
    return {
      success: false,
      error: "A apărut o eroare la crearea profilului profesional.",
    };
  }
}

/**
 * Get doctor ID for current user with fallback logic
 * First tries to get from onboarding progress stepData
 * If not found, queries database by userId
 * Saves doctor_id to stepData if found via fallback
 */
async function getDoctorIdForUser(): Promise<string | null> {
  const user = await requireAuth();

  // Try to get from onboarding progress
  const progressData = await getOnboardingProgress();
  if (progressData.success && progressData.data) {
    const doctorId = progressData.data.stepData?.doctor_id as string | undefined;
    if (doctorId) {
      return doctorId;
    }
  }

  // Fallback: query database by userId
  const userDoctor = await db.query.doctors.findFirst({
    where: eq(doctors.userId, user.id),
    columns: { id: true },
  });

  if (userDoctor) {
    // Save doctor_id to stepData for future steps
    await saveStepData("doctor_id", userDoctor.id);
    return userDoctor.id;
  }

  return null;
}

/**
 * Update Doctor Bio & Experience During Onboarding (Doctor - Step 3)
 */
export async function updateDoctorBioExperience(
  data: DoctorBioExperienceInput
): Promise<OnboardingResponse<{ doctorId: string }>> {
  try {
    const user = await requireAuth();

    // Get doctor ID with fallback
    const doctorId = await getDoctorIdForUser();
    if (!doctorId) {
      return {
        success: false,
        error: "Nu s-a găsit profilul profesional. Te rugăm să revii la pasul anterior.",
      };
    }

    // Validate the input
    const validated = doctorBioExperienceSchema.parse(data);

    // Update doctor with bio and experience information
    await db
      .update(doctors)
      .set({
        bio: validated.bio,
        yearsOfExperience: validated.yearsOfExperience,
        languages: validated.languages,
        updatedAt: new Date(),
      })
      .where(and(eq(doctors.id, doctorId), eq(doctors.userId, user.id)));

    await saveStepData("bio_experience", validated);
    await markStepComplete(3);
    await updateOnboardingStep(4);

    return { success: true, data: { doctorId } };
  } catch (error) {
    console.error("Error updating doctor bio and experience:", error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0]?.message || "Datele introduse nu sunt valide.",
      };
    }
    return {
      success: false,
      error: "A apărut o eroare la actualizarea biografiei și experienței.",
    };
  }
}

/**
 * Update Doctor Location & Contact During Onboarding (Doctor - Step 4)
 */
export async function updateDoctorLocationContact(
  data: DoctorLocationContactInput
): Promise<OnboardingResponse<{ doctorId: string }>> {
  try {
    const user = await requireAuth();

    // Get doctor ID with fallback
    const doctorId = await getDoctorIdForUser();
    if (!doctorId) {
      return {
        success: false,
        error: "Nu s-a găsit profilul profesional. Te rugăm să revii la pasul anterior.",
      };
    }

    // Validate the input
    const validated = doctorLocationContactSchema.parse(data);

    // Normalize phone number
    const normalizedPhone = normalizePhoneNumber(validated.phone);

    // Phase 6: Use location IDs instead of text fields
    // validated.cityId is required (enforced by validation schema)
    if (!validated.cityId) {
      return {
        success: false,
        error: "Orașul este obligatoriu. Te rugăm să selectezi un oraș.",
      };
    }

    // Get countyId from cityId (required for doctors)
    const cityLocation = await db.query.locations.findFirst({
      where: eq(locations.id, validated.cityId),
      columns: { parentId: true },
    });

    if (!cityLocation?.parentId) {
      return {
        success: false,
        error: "Eroare la determinarea județului. Te rugăm să încerci din nou.",
      };
    }

    // Update doctor with location and contact information
    await db
      .update(doctors)
      .set({
        cityId: validated.cityId, // Phase 6: Use cityId instead of city
        sectorId: validated.sectorId || null, // Phase 6: Use sectorId instead of district
        countyId: cityLocation.parentId, // Required - derived from cityId
        address: validated.address,
        phone: normalizedPhone,
        email: validated.email,
        website: validated.website || null,
        updatedAt: new Date(),
      })
      .where(and(eq(doctors.id, doctorId), eq(doctors.userId, user.id)));

    await saveStepData("location_contact", validated);
    await markStepComplete(4);
    await updateOnboardingStep(5);

    return { success: true, data: { doctorId } };
  } catch (error) {
    console.error("Error updating doctor location and contact:", error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0]?.message || "Datele introduse nu sunt valide.",
      };
    }
    return {
      success: false,
      error: "A apărut o eroare la actualizarea locației și contactului.",
    };
  }
}

/**
 * Update Doctor Photo During Onboarding (Doctor - Step 5)
 */
export async function updateDoctorPhoto(
  data: DoctorPhotoInput
): Promise<OnboardingResponse<{ doctorId: string }>> {
  try {
    const user = await requireAuth();

    // Get doctor ID with fallback
    const doctorId = await getDoctorIdForUser();
    if (!doctorId) {
      return {
        success: false,
        error: "Nu s-a găsit profilul profesional. Te rugăm să revii la pasul anterior.",
      };
    }

    // Validate the input (photo is optional)
    const validated = doctorPhotoSchema.parse(data);

    // Update doctor with photo URL (if provided)
    await db
      .update(doctors)
      .set({
        photoUrl: validated.photoUrl || null,
        updatedAt: new Date(),
      })
      .where(and(eq(doctors.id, doctorId), eq(doctors.userId, user.id)));

    await saveStepData("photo", validated);
    await markStepComplete(5);
    await updateOnboardingStep(6);

    return { success: true, data: { doctorId } };
  } catch (error) {
    console.error("Error updating doctor photo:", error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0]?.message || "Datele introduse nu sunt valide.",
      };
    }
    return {
      success: false,
      error: "A apărut o eroare la actualizarea fotografiei.",
    };
  }
}

/**
 * Update Doctor Verification Documents During Onboarding (Doctor - Step 6)
 */
export async function updateDoctorVerification(
  data: DoctorVerificationInput
): Promise<OnboardingResponse<{ doctorId: string }>> {
  try {
    const user = await requireAuth();

    // Get doctor ID with fallback
    const doctorId = await getDoctorIdForUser();
    if (!doctorId) {
      return {
        success: false,
        error: "Nu s-a găsit profilul profesional. Te rugăm să revii la pasul anterior.",
      };
    }

    // Validate the input
    const validated = doctorVerificationSchema.parse(data);

    // Update doctor with verification documents
    await db
      .update(doctors)
      .set({
        verificationDocuments: validated.verificationDocuments,
        verificationStatus: "in_review",
        updatedAt: new Date(),
      })
      .where(and(eq(doctors.id, doctorId), eq(doctors.userId, user.id)));

    await saveStepData("verification", validated);
    await markStepComplete(6);
    await updateOnboardingStep(7);

    return { success: true, data: { doctorId } };
  } catch (error) {
    console.error("Error updating doctor verification documents:", error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0]?.message || "Datele introduse nu sunt valide.",
      };
    }
    return {
      success: false,
      error: "A apărut o eroare la actualizarea documentelor de verificare.",
    };
  }
}

/**
 * Update Doctor Availability During Onboarding (Doctor - Step 7)
 */
export async function updateDoctorAvailability(
  data: DoctorAvailabilityInput
): Promise<OnboardingResponse<{ doctorId: string }>> {
  try {
    const user = await requireAuth();

    // Get doctor ID with fallback
    const doctorId = await getDoctorIdForUser();
    if (!doctorId) {
      return {
        success: false,
        error: "Nu s-a găsit profilul profesional. Te rugăm să revii la pasul anterior.",
      };
    }

    // Validate the input
    const validated = doctorAvailabilitySchema.parse(data);

    // Update doctor with availability settings
    await db
      .update(doctors)
      .set({
        acceptingNewPatients: validated.acceptingNewPatients,
        onlineConsultations: validated.onlineConsultations,
        schedule: validated.schedule && validated.schedule.length > 0 ? validated.schedule : [],
        updatedAt: new Date(),
      })
      .where(and(eq(doctors.id, doctorId), eq(doctors.userId, user.id)));

    await saveStepData("availability", validated);
    await markStepComplete(7);
    await updateOnboardingStep(8);

    return { success: true, data: { doctorId } };
  } catch (error) {
    console.error("Error updating doctor availability:", error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0]?.message || "Datele introduse nu sunt valide.",
      };
    }
    return {
      success: false,
      error: "A apărut o eroare la actualizarea disponibilității.",
    };
  }
}

/**
 * Submit Doctor for Verification
 */
export async function submitDoctorForVerification(
  doctorId: string,
  documents: string[]
): Promise<OnboardingResponse> {
  try {
    const user = await requireAuth();

    await db
      .update(doctors)
      .set({
        verificationDocuments: documents,
        verificationStatus: "in_review",
        updatedAt: new Date(),
      })
      .where(and(eq(doctors.id, doctorId), eq(doctors.userId, user.id)));

    return { success: true };
  } catch (error) {
    console.error("Error submitting doctor for verification:", error);
    return {
      success: false,
      error: "A apărut o eroare la trimiterea spre verificare.",
    };
  }
}

/**
 * Complete Doctor Onboarding
 */
export async function completeDoctorOnboarding(): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await requireAuth();

    // Update user onboarding status
    await db
      .update(users)
      .set({
        onboardingCompleted: true,
        profileCompletionPercentage: 100,
        updatedAt: new Date(),
      })
      .where(eq(users.id, user.id));

    // Update onboarding progress
    await db
      .update(onboardingProgress)
      .set({
        currentStep: 8,
        isCompleted: true,
        updatedAt: new Date(),
      })
      .where(eq(onboardingProgress.userId, user.id));

    // Mark doctor profile as complete
    const progressData = await getOnboardingProgress();
    if (progressData.success && progressData.data?.stepData?.doctor_id) {
      await db
        .update(doctors)
        .set({ profileComplete: true, updatedAt: new Date() })
        .where(eq(doctors.id, progressData.data?.stepData?.doctor_id as string));
    }

    // Track onboarding completion with person properties
    try {
      await trackEventServer(PostHogEvents.ONBOARDING_COMPLETED, {
        distinctId: user.id,
        [PostHogProperties.ONBOARDING_ROLE]: user.role,
        // Person properties: mark onboarding as complete
        $set: {
          onboardingCompleted: true,
        },
        $set_once: {
          onboardingCompletedDate: new Date().toISOString(),
          onboardingRole: user.role,
        },
      });
    } catch (trackingError) {
      // Don't fail onboarding completion if tracking fails
      if (process.env.NODE_ENV === "development") {
        console.error("[PostHog] Error tracking onboarding completion:", trackingError);
      }
    }

    return { success: true };
  } catch (error) {
    console.error("Error completing doctor onboarding:", error);
    return {
      success: false,
      error: "A apărut o eroare la finalizarea onboarding-ului.",
    };
  }
}
