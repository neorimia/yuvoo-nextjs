/**
 * Doctor Settings Server Actions
 *
 * Server Actions for doctor settings.
 */

"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { requireRole } from "@/modules/auth/auth.service";
import { authRepository } from "@/modules/auth/auth.repository";
import { updateDoctorSettingsSchema } from "@/lib/validations/doctor-settings";
import { routes } from "@/lib/routes";

/**
 * Get doctor settings
 */
export async function getDoctorSettingsAction() {
  try {
    const user = await requireRole("doctor");

    return {
      success: true,
      settings: {
        email: user.email,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
        emailNotificationPreferences: user.emailNotificationPreferences || {
          consultationCreated: true,
          consultationConfirmed: true,
          consultationCancelled: true,
          consultationReminder: true,
        },
      },
    };
  } catch (error) {
    console.error("Error getting doctor settings:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Eroare la încărcarea setărilor",
    };
  }
}

/**
 * Update doctor settings
 */
export async function updateDoctorSettingsAction(
  input: unknown
): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await requireRole("doctor");

    // Validate input with Zod schema
    const validatedInput = updateDoctorSettingsSchema.parse(input);

    // Prepare update data
    const updateData: Parameters<typeof authRepository.update>[1] = {};

    if (validatedInput.firstName !== undefined) {
      updateData.firstName = validatedInput.firstName;
    }
    if (validatedInput.lastName !== undefined) {
      updateData.lastName = validatedInput.lastName;
    }
    if (validatedInput.phone !== undefined) {
      updateData.phone = validatedInput.phone || undefined;
    }
    if (validatedInput.emailNotificationPreferences !== undefined) {
      updateData.emailNotificationPreferences = validatedInput.emailNotificationPreferences;
    }

    // Update user in database
    await authRepository.update(user.id, updateData);

    // Revalidate cache
    revalidatePath(routes.doctor.settings);
    revalidatePath(routes.doctor.dashboard);
    revalidateTag(`user-${user.id}`, "max");
    revalidateTag(`doctor-dashboard-${user.id}`, "max");

    return { success: true };
  } catch (error) {
    console.error("Error updating doctor settings:", error);
    if (error instanceof Error && error.name === "ZodError") {
      return {
        success: false,
        error: "Date invalide. Te rugăm să verifici câmpurile completate.",
      };
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : "Eroare la actualizarea setărilor",
    };
  }
}
