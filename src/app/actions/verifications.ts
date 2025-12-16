"use server";

/**
 * Verification Server Actions
 *
 * Server actions for admin verification workflow.
 * Handles approval/rejection of club and doctor verification requests.
 */

import { requireRole } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { clubs, doctors, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { sendClubVerificationStatus, sendDoctorVerificationStatus } from "@/lib/integrations/brevo";
import { revalidatePath } from "next/cache";
import { routes } from "@/lib/routes";
import { z } from "zod";

/**
 * Validation schema for verification status update
 */
const updateVerificationStatusSchema = z.object({
  type: z.enum(["club", "doctor"]),
  id: z.string().uuid("ID-ul trebuie să fie un UUID valid"),
  status: z.enum(["approved", "rejected", "in_review"], {
    errorMap: () => ({ message: "Statusul trebuie să fie: approved, rejected sau in_review" }),
  }),
  reason: z.string().optional(), // Optional rejection reason
});

/**
 * Update club verification status
 */
export async function updateClubVerificationStatusAction(formData: FormData) {
  try {
    // Require admin role
    await requireRole("admin");

    // Parse and validate input
    const data = {
      type: "club" as const,
      id: formData.get("id") as string,
      status: formData.get("status") as "approved" | "rejected" | "in_review",
      reason: formData.get("reason") as string | undefined,
    };

    const validated = updateVerificationStatusSchema.parse(data);

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

    // Get club admin user for email notification
    if (updatedClub.adminUserId) {
      const adminUser = await db.query.users.findFirst({
        where: eq(users.id, updatedClub.adminUserId),
      });
      if (adminUser) {
        // Send email notification (non-blocking)
        sendClubVerificationStatus(
          updatedClub.name,
          validated.status,
          {
            id: adminUser.id,
            email: adminUser.email,
            name: adminUser.firstName || null,
            role: adminUser.role as "parent" | "club_admin" | "doctor" | "admin",
            emailVerified: false,
            createdAt: adminUser.createdAt,
            updatedAt: adminUser.updatedAt,
          },
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
      return {
        success: false,
        error: error.errors[0]?.message || "Date invalide",
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
    await requireRole("admin");

    // Parse and validate input
    const data = {
      type: "doctor" as const,
      id: formData.get("id") as string,
      status: formData.get("status") as "approved" | "rejected" | "in_review",
      reason: formData.get("reason") as string | undefined,
    };

    const validated = updateVerificationStatusSchema.parse(data);

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

    // Get doctor user for email notification
    if (updatedDoctor.userId) {
      const doctorUser = await db.query.users.findFirst({
        where: eq(users.id, updatedDoctor.userId),
      });
      if (doctorUser) {
        // Send email notification (non-blocking)
        sendDoctorVerificationStatus(
          `${updatedDoctor.firstName} ${updatedDoctor.lastName}`,
          validated.status,
          {
            id: doctorUser.id,
            email: doctorUser.email,
            name: doctorUser.firstName || null,
            role: doctorUser.role as "parent" | "club_admin" | "doctor" | "admin",
            emailVerified: false,
            createdAt: doctorUser.createdAt,
            updatedAt: doctorUser.updatedAt,
          },
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
      return {
        success: false,
        error: error.errors[0]?.message || "Date invalide",
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
