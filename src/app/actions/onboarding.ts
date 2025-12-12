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
import { startOnboardingSchema, updateOnboardingStepSchema } from "@/lib/validations/onboarding";
import { createChildSchema } from "@/lib/validations/child";
import type { CreateChildInput } from "@/lib/validations/child";
import type { ClubBasicInfoInput } from "@/lib/validations/club";
import type { DoctorBasicInfoInput } from "@/lib/validations/doctor";

// Types
type OnboardingRole = "parent" | "club_admin" | "doctor";

type OnboardingResponse<T = void> = { success: true; data?: T } | { success: false; error: string };

// ============================================================================
// ONBOARDING STATE MANAGEMENT
// ============================================================================

/**
 * Start Onboarding Flow
 */
export async function startOnboarding(role: OnboardingRole): Promise<OnboardingResponse> {
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
      return { success: true, data: existing[0] };
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

    return { success: true, data: progress };
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
export async function getOnboardingProgress(): Promise<
  OnboardingResponse<{
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
  }>
> {
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

    return { success: true, data: progress[0] };
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
      redirect(routes.quiz?.start || "/chestionar");
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

    const [club] = await db
      .insert(clubs)
      .values({
        id: crypto.randomUUID(),
        adminUserId: session.dbUser.id,
        name: data.name,
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
 */
export async function completeClubOnboarding(): Promise<never> {
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
        currentStep: 7,
        isCompleted: true,
        updatedAt: new Date(),
      })
      .where(eq(onboardingProgress.userId, session.dbUser.id));

    const progressData = await getOnboardingProgress();
    if (progressData.success && progressData.data.stepData?.club_id) {
      await db
        .update(clubs)
        .set({ profileComplete: true, updatedAt: new Date() })
        .where(eq(clubs.id, progressData.data.stepData.club_id));
    }

    redirect(routes.club?.dashboard || "/club/dashboard");
  } catch (error) {
    console.error("Error completing club onboarding:", error);
    throw new Error("A apărut o eroare la finalizarea onboarding-ului.");
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
    if (progressData.success && progressData.data.stepData?.doctor_id) {
      await db
        .update(doctors)
        .set({ profileComplete: true, updatedAt: new Date() })
        .where(eq(doctors.id, progressData.data.stepData.doctor_id));
    }

    redirect(routes.doctor?.dashboard || "/doctor/dashboard");
  } catch (error) {
    console.error("Error completing doctor onboarding:", error);
    throw new Error("A apărut o eroare la finalizarea onboarding-ului.");
  }
}
