/**
 * Consultations Server Actions
 *
 * Server Actions for doctor consultations.
 * Similar to bookings actions but specifically for doctor consultations.
 */

"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { requireAuth } from "@/modules/auth/auth.service";
import {
  confirmBooking,
  cancelBookingByEntity,
  updateBookingStatus,
} from "@/modules/bookings/bookings.service";
import { getDoctorByUserId } from "@/modules/doctors/doctors.service";
import { bookingsRepository } from "@/modules/bookings/bookings.repository";
import type { Booking } from "@/modules/bookings/bookings.types";
import type { AuthUser } from "@/modules/auth/auth.types";
import { trackEventServer } from "@/lib/analytics/tracking-server";
import { PostHogEvents, PostHogProperties } from "@/lib/analytics/events";
import { UserRoleEnum } from "@/modules/auth/auth.types";

/**
 * Get consultations for doctor (for doctor)
 */
export async function getDoctorConsultationsAction(): Promise<Booking[]> {
  try {
    const user = await requireAuth();

    if (user.role !== UserRoleEnum.DOCTOR) {
      throw new Error("Access denied");
    }

    // Get doctor for this user
    const doctor = await getDoctorByUserId(user.id);
    if (!doctor) {
      return [];
    }

    // Get consultations for this doctor
    return await bookingsRepository.findByDoctorId(doctor.id);
  } catch (error) {
    console.error("Error getting doctor consultations:", error);
    return [];
  }
}

/**
 * Confirm consultation (for doctor)
 */
export async function confirmConsultationAction(
  consultationId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await requireAuth();

    if (user.role !== UserRoleEnum.DOCTOR) {
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

    await confirmBooking(consultationId, doctor.id);

    // Track consultation confirmation event
    try {
      await trackEventServer(PostHogEvents.DOCTOR_CONSULTATION_CONFIRMED, {
        distinctId: user.id,
        [PostHogProperties.BOOKING_ID]: consultationId,
        [PostHogProperties.DOCTOR_ID]: doctor.id,
      });
    } catch (trackingError) {
      if (process.env.NODE_ENV === "development") {
        console.error("[PostHog] Error tracking consultation confirmation:", trackingError);
      }
    }

    // Revalidate cache
    revalidatePath("/doctor/bookings");
    revalidatePath("/doctor/dashboard");
    revalidateTag(`doctor-dashboard-${user.id}`, "max");
    revalidateTag(`user-${user.id}`, "max");

    return { success: true };
  } catch (error) {
    console.error("Error confirming consultation:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Eroare la confirmarea consultației",
    };
  }
}

/**
 * Cancel consultation by doctor
 */
export async function cancelConsultationAction(
  consultationId: string,
  _reason?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await requireAuth();

    if (user.role !== UserRoleEnum.DOCTOR) {
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

    await cancelBookingByEntity(consultationId, doctor.id);

    // Track consultation cancellation event
    try {
      await trackEventServer(PostHogEvents.DOCTOR_CONSULTATION_CANCELLED, {
        distinctId: user.id,
        [PostHogProperties.BOOKING_ID]: consultationId,
        [PostHogProperties.DOCTOR_ID]: doctor.id,
      });
    } catch (trackingError) {
      if (process.env.NODE_ENV === "development") {
        console.error("[PostHog] Error tracking consultation cancellation:", trackingError);
      }
    }

    // Revalidate cache
    revalidatePath("/doctor/bookings");
    revalidatePath("/doctor/dashboard");
    revalidateTag(`doctor-dashboard-${user.id}`, "max");
    revalidateTag(`user-${user.id}`, "max");

    return { success: true };
  } catch (error) {
    console.error("Error cancelling consultation:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Eroare la anularea consultației",
    };
  }
}

/**
 * Complete consultation (for doctor)
 */
export async function completeConsultationAction(
  consultationId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await requireAuth();

    if (user.role !== UserRoleEnum.DOCTOR) {
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

    await updateBookingStatus(consultationId, doctor.id, "completed");

    // Track consultation completion event
    try {
      await trackEventServer(PostHogEvents.DOCTOR_CONSULTATION_COMPLETED, {
        distinctId: user.id,
        [PostHogProperties.BOOKING_ID]: consultationId,
        [PostHogProperties.DOCTOR_ID]: doctor.id,
      });
    } catch (trackingError) {
      if (process.env.NODE_ENV === "development") {
        console.error("[PostHog] Error tracking consultation completion:", trackingError);
      }
    }

    // Revalidate cache
    revalidatePath("/doctor/bookings");
    revalidatePath("/doctor/dashboard");
    revalidateTag(`doctor-dashboard-${user.id}`, "max");
    revalidateTag(`user-${user.id}`, "max");

    return { success: true };
  } catch (error) {
    console.error("Error completing consultation:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Eroare la finalizarea consultației",
    };
  }
}

/**
 * Get parent user by ID (for doctor to view consultation details)
 */
export async function getParentUserForConsultationAction(userId: string): Promise<AuthUser | null> {
  try {
    const user = await requireAuth();

    if (user.role !== UserRoleEnum.DOCTOR) {
      return null;
    }

    const { getUserById } = await import("@/modules/auth/auth.repository");
    return await getUserById(userId);
  } catch (error) {
    console.error("Error getting parent user:", error);
    return null;
  }
}
