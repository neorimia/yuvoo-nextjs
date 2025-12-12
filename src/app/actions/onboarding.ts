/**
 * Onboarding Server Actions
 *
 * Server-side actions for managing onboarding state, progress tracking,
 * and cross-session persistence.
 */

"use server";

import { requireAuth } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { users, onboardingProgress, children, clubs, doctors } from "@/lib/db/schema";
import { eq, and, sql } from "drizzle-orm";
import { redirect } from "next/navigation";
import { routes } from "@/lib/routes";
import { generateSlug } from "@/lib/utils";
import { z } from "zod";
import { startOnboardingSchema, updateOnboardingStepSchema } from "@/lib/validations/onboarding";
import { createChildSchema } from "@/lib/validations/child";
import {
  clubContactScheduleSchema,
  clubPricingAgesSchema,
  clubPhotoSchema,
  clubVerificationSchema,
} from "@/lib/validations/club";
import type { CreateChildInput } from "@/lib/validations/child";
import type {
  ClubBasicInfoInput,
  ClubContactScheduleInput,
  ClubPricingAgesInput,
  ClubPhotoInput,
  ClubVerificationInput,
} from "@/lib/validations/club";
import type { DoctorBasicInfoInput } from "@/lib/validations/doctor";

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
    const session = await requireAuth();
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
      .where(eq(onboardingProgress.userId, session.dbUser.id))
      .limit(1);

    if (existing.length > 0) {
      return {
        success: true,
        data: {
          id: existing[0].id,
          userId: existing[0].userId,
          role: existing[0].role,
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
        userId: session.dbUser.id,
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
        role: progress.role,
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
 */
export async function getOnboardingProgress(): Promise<OnboardingResponse<OnboardingProgressData>> {
  try {
    const session = await requireAuth();

    const progress = await db
      .select()
      .from(onboardingProgress)
      .where(eq(onboardingProgress.userId, session.dbUser.id))
      .limit(1);

    if (progress.length === 0) {
      return { success: false, error: "Nu există progres de onboarding." };
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
    const session = await requireAuth();
    const validated = updateOnboardingStepSchema.parse({ stepNumber, stepData });

    await db
      .update(onboardingProgress)
      .set({
        currentStep: validated.stepNumber,
        stepData: validated.stepData ?? {},
        updatedAt: new Date(),
      })
      .where(eq(onboardingProgress.userId, session.dbUser.id));

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
    const session = await requireAuth();

    await db
      .update(onboardingProgress)
      .set({
        completedSteps: sql`array_append(completed_steps, ${stepNumber.toString()})`,
        updatedAt: new Date(),
      })
      .where(eq(onboardingProgress.userId, session.dbUser.id));

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
 */
export async function saveStepData(key: string, value: unknown): Promise<OnboardingResponse> {
  try {
    const session = await requireAuth();

    await db
      .update(onboardingProgress)
      .set({
        stepData: sql`jsonb_set(step_data, '{${sql.raw(key)}}', ${JSON.stringify(value)}::jsonb)`,
        updatedAt: new Date(),
      })
      .where(eq(onboardingProgress.userId, session.dbUser.id));

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
    const session = await requireAuth();
    const validated = createChildSchema.parse(data);

    const [child] = await db
      .insert(children)
      .values({
        id: crypto.randomUUID(),
        parentId: session.dbUser.id,
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
    const session = await requireAuth();

    await db
      .update(users)
      .set({
        onboardingCompleted: true,
        profileCompletionPercentage: 100,
        updatedAt: new Date(),
      })
      .where(eq(users.id, session.dbUser.id));

    await db
      .update(onboardingProgress)
      .set({
        currentStep: 5,
        isCompleted: true,
        updatedAt: new Date(),
      })
      .where(eq(onboardingProgress.userId, session.dbUser.id));

    await markStepComplete(5);

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
 * Create Club During Onboarding (Club Admin - Step 2)
 */
export async function createClubOnboarding(
  data: ClubBasicInfoInput
): Promise<OnboardingResponse<{ clubId: string }>> {
  try {
    const session = await requireAuth();

    // Generate SEO-friendly slug from club name
    const slug = generateSlug(data.name);

    const [club] = await db
      .insert(clubs)
      .values({
        id: crypto.randomUUID(),
        adminUserId: session.dbUser.id,
        name: data.name,
        slug,
        sportType: data.sportType,
        description: data.description,
        city: data.city,
        district: data.district,
        address: data.address,
        profileComplete: false,
        verificationStatus: "pending",
      })
      .returning();

    await saveStepData("club_id", club.id);
    await markStepComplete(2);
    await updateOnboardingStep(3);

    return { success: true, data: { clubId: club.id } };
  } catch (error) {
    console.error("Error creating club during onboarding:", error);
    return {
      success: false,
      error: "A apărut o eroare la crearea profilului clubului.",
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
    const session = await requireAuth();

    // Get club ID from onboarding progress
    const progressData = await getOnboardingProgress();
    if (!progressData.success || !progressData.data) {
      return {
        success: false,
        error: "Nu s-a găsit progresul onboarding-ului. Te rugăm să începi din nou.",
      };
    }

    const clubId = progressData.data.stepData?.club_id as string | undefined;
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
      .where(and(eq(clubs.id, clubId), eq(clubs.adminUserId, session.dbUser.id)));

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
    const session = await requireAuth();

    // Get club ID from onboarding progress
    const progressData = await getOnboardingProgress();
    if (!progressData.success || !progressData.data) {
      return {
        success: false,
        error: "Nu s-a găsit progresul onboarding-ului. Te rugăm să începi din nou.",
      };
    }

    const clubId = progressData.data.stepData?.club_id as string | undefined;
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
      .where(and(eq(clubs.id, clubId), eq(clubs.adminUserId, session.dbUser.id)));

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
    const session = await requireAuth();

    // Get club ID from onboarding progress
    const progressData = await getOnboardingProgress();
    if (!progressData.success || !progressData.data) {
      return {
        success: false,
        error: "Nu s-a găsit progresul onboarding-ului. Te rugăm să începi din nou.",
      };
    }

    const clubId = progressData.data.stepData?.club_id as string | undefined;
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
      .where(and(eq(clubs.id, clubId), eq(clubs.adminUserId, session.dbUser.id)));

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
    const session = await requireAuth();

    // Get club ID from onboarding progress
    const progressData = await getOnboardingProgress();
    if (!progressData.success || !progressData.data) {
      return {
        success: false,
        error: "Nu s-a găsit progresul onboarding-ului. Te rugăm să începi din nou.",
      };
    }

    const clubId = progressData.data.stepData?.club_id as string | undefined;
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
      .where(and(eq(clubs.id, clubId), eq(clubs.adminUserId, session.dbUser.id)));

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
    const session = await requireAuth();

    await db
      .update(clubs)
      .set({
        verificationDocuments: documents,
        verificationStatus: "in_review",
        updatedAt: new Date(),
      })
      .where(and(eq(clubs.id, clubId), eq(clubs.adminUserId, session.dbUser.id)));

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
    const session = await requireAuth();

    // Update user onboarding status
    await db
      .update(users)
      .set({
        onboardingCompleted: true,
        profileCompletionPercentage: 100,
        updatedAt: new Date(),
      })
      .where(eq(users.id, session.dbUser.id));

    // Update onboarding progress
    await db
      .update(onboardingProgress)
      .set({
        currentStep: 7,
        isCompleted: true,
        updatedAt: new Date(),
      })
      .where(eq(onboardingProgress.userId, session.dbUser.id));

    // Mark club profile as complete
    const progressData = await getOnboardingProgress();
    if (progressData.success && progressData.data && progressData.data?.stepData?.club_id) {
      await db
        .update(clubs)
        .set({ profileComplete: true, updatedAt: new Date() })
        .where(eq(clubs.id, progressData.data?.stepData?.club_id as string));
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
 * Create Doctor Profile During Onboarding
 */
export async function createDoctorOnboarding(
  data: DoctorBasicInfoInput
): Promise<OnboardingResponse<{ doctorId: string }>> {
  try {
    const session = await requireAuth();

    const [doctor] = await db
      .insert(doctors)
      .values({
        id: crypto.randomUUID(),
        userId: session.dbUser.id,
        firstName: data.firstName,
        lastName: data.lastName,
        title: data.title,
        specialty: data.specialty,
        credentials: data.credentials,
        city: "",
        profileComplete: false,
        verificationStatus: "pending",
      })
      .returning();

    await saveStepData("doctor_id", doctor.id);

    return { success: true, data: { doctorId: doctor.id } };
  } catch (error) {
    console.error("Error creating doctor during onboarding:", error);
    return {
      success: false,
      error: "A apărut o eroare la crearea profilului profesional.",
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
    const session = await requireAuth();

    await db
      .update(doctors)
      .set({
        verificationDocuments: documents,
        verificationStatus: "in_review",
        updatedAt: new Date(),
      })
      .where(and(eq(doctors.id, doctorId), eq(doctors.userId, session.dbUser.id)));

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
export async function completeDoctorOnboarding(): Promise<never> {
  try {
    const session = await requireAuth();

    await db
      .update(users)
      .set({
        onboardingCompleted: true,
        profileCompletionPercentage: 100,
        updatedAt: new Date(),
      })
      .where(eq(users.id, session.dbUser.id));

    await db
      .update(onboardingProgress)
      .set({
        currentStep: 8,
        isCompleted: true,
        updatedAt: new Date(),
      })
      .where(eq(onboardingProgress.userId, session.dbUser.id));

    const progressData = await getOnboardingProgress();
    if (progressData.success && progressData.data?.stepData?.doctor_id) {
      await db
        .update(doctors)
        .set({ profileComplete: true, updatedAt: new Date() })
        .where(eq(doctors.id, progressData.data?.stepData?.doctor_id as string));
    }

    redirect(routes.doctor?.dashboard || "/doctor/dashboard");
  } catch (error) {
    console.error("Error completing doctor onboarding:", error);
    throw new Error("A apărut o eroare la finalizarea onboarding-ului.");
  }
}
