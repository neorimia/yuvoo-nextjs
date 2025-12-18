/**
 * Club Settings Server Actions
 *
 * Server Actions for club admin settings.
 */

"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { requireRole } from "@/modules/auth/auth.service";
import { authRepository } from "@/modules/auth/auth.repository";
import { updateClubSettingsSchema } from "@/lib/validations/club-settings";
import { routes } from "@/lib/routes";

/**
 * Get club admin settings
 */
export async function getClubSettingsAction() {
  try {
    const user = await requireRole("club_admin");

    return {
      success: true,
      settings: {
        email: user.email,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
        emailNotificationPreferences: user.emailNotificationPreferences || {
          bookingCreated: true,
          bookingConfirmed: true,
          bookingCancelled: true,
          bookingCompleted: true,
          bookingReminder: true,
        },
      },
    };
  } catch (error) {
    console.error("Error getting club settings:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Eroare la încărcarea setărilor",
    };
  }
}

/**
 * Update club admin settings
 */
export async function updateClubSettingsAction(
  input: unknown
): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await requireRole("club_admin");

    // Validate input with Zod schema
    const validatedInput = updateClubSettingsSchema.parse(input);

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
    revalidatePath(routes.club.settings);
    revalidatePath(routes.club.dashboard);
    revalidateTag(`user-${user.id}`, "max");
    revalidateTag(`club-dashboard-${user.id}`, "max");

    return { success: true };
  } catch (error) {
    console.error("Error updating club settings:", error);
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
