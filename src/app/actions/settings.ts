/**
 * Settings Server Actions
 *
 * Server Actions for user profile settings.
 */

"use server";

import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth/session";
import { authRepository } from "@/modules/auth/auth.repository";
import { updateUserProfileSchema } from "@/lib/validations/user";

/**
 * Update user profile
 */
export async function updateProfileAction(
  input: unknown
): Promise<{ success: boolean; error?: string }> {
  try {
    const session = await requireAuth();

    // Validate input with Zod schema
    const validatedInput = updateUserProfileSchema.parse(input);

    // Update user in database
    await authRepository.update(session.dbUser.id, {
      firstName: validatedInput.firstName,
      lastName: validatedInput.lastName,
      phone: validatedInput.phone || undefined,
    });

    revalidatePath("/parent/settings");
    revalidatePath("/parent/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Error updating profile:", error);
    if (error instanceof Error && error.name === "ZodError") {
      return {
        success: false,
        error: "Date invalide. Te rugăm să verifici câmpurile completate.",
      };
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : "Eroare la actualizarea profilului",
    };
  }
}

/**
 * Get current user profile
 */
export async function getProfileAction() {
  try {
    const session = await requireAuth();
    const user = await authRepository.getUserById(session.dbUser.id);

    if (!user) {
      return {
        success: false,
        error: "Utilizatorul nu a fost găsit",
      };
    }

    return {
      success: true,
      profile: {
        email: user.email,
        name: user.name,
        firstName: session.dbUser.firstName || "",
        lastName: session.dbUser.lastName || "",
        phone: session.dbUser.phone || "",
      },
    };
  } catch (error) {
    console.error("Error getting profile:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Eroare la încărcarea profilului",
    };
  }
}
