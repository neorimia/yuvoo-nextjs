/**
 * Doctor Profile Server Actions
 *
 * Server Actions for doctor profile management.
 */

"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { requireAuth } from "@/modules/auth/auth.service";
import { getDoctorByUserId, updateDoctor } from "@/modules/doctors/doctors.service";
import { doctorProfileUpdateSchema, type DoctorProfileUpdateInput } from "@/lib/validations/doctor";
import { normalizePhoneNumber } from "@/lib/utils";
import { routes } from "@/lib/routes";
import type { Doctor } from "@/modules/doctors/doctors.types";
import { db } from "@/lib/db";
import { locations } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

/**
 * Update doctor profile (for doctor - automatically gets doctor ID)
 */
export async function updateDoctorProfileAction(
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
    let validatedInput: DoctorProfileUpdateInput;
    try {
      validatedInput = doctorProfileUpdateSchema.parse(input);
    } catch (parseError) {
      // Log detailed error for debugging
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

    if (validatedInput.firstName !== undefined) {
      updates.firstName = validatedInput.firstName;
    }
    if (validatedInput.lastName !== undefined) {
      updates.lastName = validatedInput.lastName;
    }
    if (validatedInput.title !== undefined) {
      updates.title = validatedInput.title || null;
    }
    if (validatedInput.specialty !== undefined) {
      updates.specialty = validatedInput.specialty;
    }
    if (validatedInput.secondarySpecialties !== undefined) {
      updates.secondarySpecialties = validatedInput.secondarySpecialties;
    }
    if (validatedInput.credentials !== undefined) {
      updates.credentials = validatedInput.credentials;
    }
    if (validatedInput.bio !== undefined) {
      updates.bio = validatedInput.bio || null;
    }
    if (validatedInput.yearsOfExperience !== undefined) {
      updates.yearsOfExperience = validatedInput.yearsOfExperience || null;
    }
    if (validatedInput.languages !== undefined) {
      updates.languages = validatedInput.languages;
    }
    // Phase 6: Use location IDs instead of text fields
    if (validatedInput.cityId !== undefined) {
      updates.cityId = validatedInput.cityId;
      // Also update countyId when cityId changes
      if (validatedInput.cityId) {
        const cityLocation = await db.query.locations.findFirst({
          where: eq(locations.id, validatedInput.cityId),
          columns: { parentId: true },
        });
        if (cityLocation?.parentId) {
          updates.countyId = cityLocation.parentId;
        }
      }
    }
    if (validatedInput.sectorId !== undefined) {
      updates.sectorId = validatedInput.sectorId || null;
    }
    if (validatedInput.address !== undefined) {
      updates.address = validatedInput.address || null;
    }
    if (validatedInput.phone !== undefined) {
      updates.phone = validatedInput.phone ? normalizePhoneNumber(validatedInput.phone) : null;
    }
    if (validatedInput.email !== undefined) {
      updates.email = validatedInput.email || null;
    }
    if (validatedInput.website !== undefined) {
      updates.website = validatedInput.website || null;
    }
    if (validatedInput.acceptingNewPatients !== undefined) {
      updates.acceptingNewPatients = validatedInput.acceptingNewPatients;
    }
    if (validatedInput.onlineConsultations !== undefined) {
      updates.onlineConsultations = validatedInput.onlineConsultations;
    }
    if (validatedInput.schedule !== undefined) {
      updates.schedule = validatedInput.schedule as unknown;
    }
    if (validatedInput.photoUrl !== undefined) {
      updates.photoUrl = validatedInput.photoUrl || null;
    }

    // Update doctor
    const updatedDoctor = await updateDoctor(doctor.id, user.id, updates);

    // Revalidate cache
    revalidatePath(routes.doctor.profile);
    revalidatePath(routes.doctor.dashboard);
    if (updatedDoctor.slug) {
      revalidatePath(`/doctori/${updatedDoctor.slug}`);
      // Revalidate cache tags
      revalidateTag(`doctor-${updatedDoctor.id}`, "max");
      revalidateTag(`doctor-slug-${updatedDoctor.slug}`, "max");
      revalidateTag("doctors-list", "max");
    }
    // Revalidate user-specific cache
    revalidateTag(`user-${user.id}`, "max");
    revalidateTag(`doctor-dashboard-${user.id}`, "max");

    return { success: true, doctor: updatedDoctor };
  } catch (error) {
    console.error("Error updating doctor profile:", error);
    if (error instanceof Error && error.message.includes("permisiunea")) {
      return {
        success: false,
        error: error.message,
      };
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : "Eroare la actualizarea profilului de doctor",
    };
  }
}

/**
 * Upload doctor photo (for doctor - automatically gets doctor ID)
 */
export async function uploadDoctorPhotoAction(
  photoUrl: string
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

    // Validate photo URL
    if (!photoUrl || typeof photoUrl !== "string" || !photoUrl.startsWith("http")) {
      return {
        success: false,
        error: "URL-ul fotografiei este invalid",
      };
    }

    // Update doctor photo
    const updatedDoctor = await updateDoctor(doctor.id, user.id, {
      photoUrl,
    });

    // Revalidate cache
    revalidatePath(routes.doctor.profile);
    revalidatePath(routes.doctor.dashboard);
    if (updatedDoctor.slug) {
      revalidatePath(`/doctori/${updatedDoctor.slug}`);
      revalidateTag(`doctor-${updatedDoctor.id}`, "max");
      revalidateTag(`doctor-slug-${updatedDoctor.slug}`, "max");
    }
    revalidateTag(`user-${user.id}`, "max");
    revalidateTag(`doctor-dashboard-${user.id}`, "max");

    return { success: true, doctor: updatedDoctor };
  } catch (error) {
    console.error("Error uploading doctor photo:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Eroare la încărcarea fotografiei",
    };
  }
}
