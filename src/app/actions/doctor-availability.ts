/**
 * Doctor Availability Server Actions
 *
 * Server Actions for managing doctor availability schedule.
 */

"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { requireAuth } from "@/modules/auth/auth.service";
import { getDoctorByUserId, updateDoctor } from "@/modules/doctors/doctors.service";
import { doctorAvailabilitySchema, type DoctorAvailabilityInput } from "@/lib/validations/doctor";
import { routes } from "@/lib/routes";
import type { Doctor } from "@/modules/doctors/doctors.types";

/**
 * Update doctor availability (for doctor - automatically gets doctor ID)
 */
export async function updateAvailabilityAction(
  input: unknown
): Promise<{ success: boolean; doctor?: Doctor; error?: string }> {
  try {
    const user = await requireAuth();

    if (user.role !== "doctor") {
      return {
        success: false,
        error: "Access denied",
      };
    }

    // Get doctor for this user
    const doctor = await getDoctorByUserId(user.id);

    if (!doctor) {
      return {
        success: false,
        error: "Profilul de doctor nu a fost găsit",
      };
    }

    // Validate input with Zod schema
    let validatedInput: DoctorAvailabilityInput;
    try {
      validatedInput = doctorAvailabilitySchema.parse(input);
    } catch (parseError) {
      console.error("Validation error:", parseError);
      if (parseError && typeof parseError === "object" && "issues" in parseError) {
        const zodError = parseError as {
          issues: Array<{ message: string; path?: Array<string | number> }>;
        };
        const firstError = zodError.issues[0];
        const fieldPath = firstError?.path ? firstError.path.join(".") : "";
        throw new Error(
          `${firstError?.message || "Date invalide"}${fieldPath ? ` (${fieldPath})` : ""}`
        );
      }
      throw parseError;
    }

    // Transform validated input to match service layer expectations
    const updates: Parameters<typeof updateDoctor>[2] = {};

    if (validatedInput.schedule !== undefined) {
      updates.schedule = validatedInput.schedule as unknown;
    }
    if (validatedInput.acceptingNewPatients !== undefined) {
      updates.acceptingNewPatients = validatedInput.acceptingNewPatients;
    }
    if (validatedInput.onlineConsultations !== undefined) {
      updates.onlineConsultations = validatedInput.onlineConsultations;
    }

    // Update doctor
    const updatedDoctor = await updateDoctor(doctor.id, user.id, updates);

    // Revalidate cache
    revalidatePath(routes.doctor.availability);
    revalidatePath(routes.doctor.profile);
    revalidatePath(routes.doctor.dashboard);
    if (updatedDoctor.slug) {
      revalidatePath(`/doctori/${updatedDoctor.slug}`);
      revalidateTag(`doctor-${updatedDoctor.id}`, "max");
      revalidateTag(`doctor-slug-${updatedDoctor.slug}`, "max");
    }
    revalidateTag(`user-${user.id}`, "max");
    revalidateTag(`doctor-dashboard-${user.id}`, "max");
    revalidateTag(`doctor-availability-${user.id}`, "max");

    return { success: true, doctor: updatedDoctor };
  } catch (error) {
    console.error("Error updating doctor availability:", error);
    if (error instanceof Error && error.message.includes("permisiunea")) {
      return {
        success: false,
        error: error.message,
      };
    }
    // Handle Zod validation errors
    if (error && typeof error === "object" && "issues" in error) {
      const zodError = error as {
        issues: Array<{ message: string; path?: Array<string | number> }>;
      };
      const firstError = zodError.issues[0];
      const fieldPath = firstError?.path ? firstError.path.join(".") : "";
      return {
        success: false,
        error: firstError?.message
          ? `${firstError.message}${fieldPath ? ` (${fieldPath})` : ""}`
          : "Date invalide",
      };
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : "Eroare la actualizarea disponibilității",
    };
  }
}
