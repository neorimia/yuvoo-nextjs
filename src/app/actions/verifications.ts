"use server";

/**
 * Verification Server Actions
 *
 * Server actions for admin verification workflow.
 * Handles approval/rejection of club and doctor verification requests.
 */

import { requireRole } from "@/modules/auth/auth.service";
import { authRepository } from "@/modules/auth/auth.repository";
import { db } from "@/lib/db";
import { clubs, doctors } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { sendClubVerificationStatus, sendDoctorVerificationStatus } from "@/lib/integrations/brevo";
import { revalidatePath } from "next/cache";
import { routes } from "@/lib/routes";
import { z } from "zod";
import { updateVerificationStatusSchema } from "@/lib/validations/verification";
import { logVerificationStatusChange } from "@/modules/audit/audit.service";

/**
 * Update club verification status
 */
export async function updateClubVerificationStatusAction(formData: FormData) {
  try {
    // Require admin role
    const admin = await requireRole("admin");

    // Parse and validate input
    const data = {
      type: "club" as const,
      id: formData.get("id") as string,
      status: formData.get("status") as "approved" | "rejected" | "in_review",
      reason: formData.get("reason") as string | undefined,
    };

    const validated = updateVerificationStatusSchema.parse(data);

    // Get current club status for audit log
    const currentClub = await db.query.clubs.findFirst({
      where: eq(clubs.id, validated.id),
      columns: { verificationStatus: true },
    });

    const oldStatus = currentClub?.verificationStatus || "pending";

    // Update club verification status
    const [updatedClub] = await db
      .update(clubs)
      .set({
        verificationStatus: validated.status,
        verified: validated.status === "approved", // Also update legacy verified field
        updatedAt: new Date(),
      })
      .where(eq(clubs.id, validated.id))
      .returning();

    if (!updatedClub) {
      return {
        success: false,
        error: "Club-ul nu a fost găsit",
      };
    }

    // Log audit trail (non-blocking)
    logVerificationStatusChange(
      admin.id,
      "club",
      validated.id,
      oldStatus as "pending" | "in_review" | "approved" | "rejected",
      validated.status,
      validated.reason
    ).catch((error) => {
      console.error("[Audit] Failed to log club verification change:", error);
    });

    // Get club admin user for email notification
    if (updatedClub.adminUserId) {
      const adminUser = await authRepository.getUserById(updatedClub.adminUserId);
      if (adminUser) {
        // Send email notification (non-blocking)
        sendClubVerificationStatus(
          updatedClub.name,
          validated.status,
          adminUser,
          validated.reason
        ).catch((error) => {
          console.error("[Verification] Failed to send email notification:", error);
        });
      }
    }

    // Revalidate admin verifications page
    revalidatePath(routes.admin.verifications);

    return {
      success: true,
      message: `Statusul de verificare a fost actualizat la: ${validated.status}`,
    };
  } catch (error) {
    console.error("[Verification] Error updating club verification status:", error);

    if (error instanceof z.ZodError) {
      const firstError = error.errors[0];
      return {
        success: false,
        error: firstError?.message || "Date invalide",
      };
    }

    if (error instanceof Error && error.message.includes("Role")) {
      return {
        success: false,
        error: "Nu ai permisiunea de a efectua această acțiune",
      };
    }

    return {
      success: false,
      error: "A apărut o eroare la actualizarea statusului de verificare",
    };
  }
}

/**
 * Update doctor verification status
 */
export async function updateDoctorVerificationStatusAction(formData: FormData) {
  try {
    // Require admin role
    const admin = await requireRole("admin");

    // Parse and validate input
    const data = {
      type: "doctor" as const,
      id: formData.get("id") as string,
      status: formData.get("status") as "approved" | "rejected" | "in_review",
      reason: formData.get("reason") as string | undefined,
    };

    const validated = updateVerificationStatusSchema.parse(data);

    // Get current doctor status for audit log
    const currentDoctor = await db.query.doctors.findFirst({
      where: eq(doctors.id, validated.id),
      columns: { verificationStatus: true },
    });

    const oldStatus = currentDoctor?.verificationStatus || "pending";

    // Update doctor verification status
    const [updatedDoctor] = await db
      .update(doctors)
      .set({
        verificationStatus: validated.status,
        verified: validated.status === "approved", // Also update legacy verified field
        updatedAt: new Date(),
      })
      .where(eq(doctors.id, validated.id))
      .returning();

    if (!updatedDoctor) {
      return {
        success: false,
        error: "Doctorul nu a fost găsit",
      };
    }

    // Log audit trail (non-blocking)
    logVerificationStatusChange(
      admin.id,
      "doctor",
      validated.id,
      oldStatus as "pending" | "in_review" | "approved" | "rejected",
      validated.status,
      validated.reason
    ).catch((error) => {
      console.error("[Audit] Failed to log doctor verification change:", error);
    });

    // Get doctor user for email notification
    if (updatedDoctor.userId) {
      const doctorUser = await authRepository.getUserById(updatedDoctor.userId);
      if (doctorUser) {
        // Send email notification (non-blocking)
        sendDoctorVerificationStatus(
          `${updatedDoctor.firstName} ${updatedDoctor.lastName}`,
          validated.status,
          doctorUser,
          validated.reason
        ).catch((error) => {
          console.error("[Verification] Failed to send email notification:", error);
        });
      }
    }

    // Revalidate admin verifications page
    revalidatePath(routes.admin.verifications);

    return {
      success: true,
      message: `Statusul de verificare a fost actualizat la: ${validated.status}`,
    };
  } catch (error) {
    console.error("[Verification] Error updating doctor verification status:", error);

    if (error instanceof z.ZodError) {
      const firstError = error.errors[0];
      return {
        success: false,
        error: firstError?.message || "Date invalide",
      };
    }

    if (error instanceof Error && error.message.includes("Role")) {
      return {
        success: false,
        error: "Nu ai permisiunea de a efectua această acțiune",
      };
    }

    return {
      success: false,
      error: "A apărut o eroare la actualizarea statusului de verificare",
    };
  }
}
