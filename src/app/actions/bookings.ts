/**
 * Bookings Server Actions
 *
 * Server Actions for trial bookings and consultations.
 */

"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { requireAuth } from "@/modules/auth/auth.service";
import {
  createBooking,
  getBookingById,
  getBookingsByUserId,
  cancelBooking,
  confirmBooking,
  updateBookingStatus,
  cancelBookingByEntity,
} from "@/modules/bookings/bookings.service";
import { getClubByAdminUserId } from "@/modules/clubs/clubs.service";
import { createBookingSchema } from "@/lib/validations/booking";
import type { Booking } from "@/modules/bookings/bookings.types";
import type { AuthUser } from "@/modules/auth/auth.types";
import { trackEventServer } from "@/lib/analytics/tracking-server";
import { PostHogEvents, PostHogProperties } from "@/lib/analytics/events";
import { rateLimit, getClientIdentifierFromHeaders, RATE_LIMIT_CONFIGS } from "@/lib/rate-limit";
import { UserRoleEnum } from "@/modules/auth/auth.types";

/**
 * Create new booking
 */
export async function createBookingAction(
  input: unknown
): Promise<{ success: boolean; booking?: Booking; error?: string }> {
  try {
    const user = await requireAuth();

    // Rate limiting: prevent spam bookings
    try {
      const headersList = await headers();
      const identifier = getClientIdentifierFromHeaders(user.id, headersList);
      const rateLimitResult = await rateLimit(
        `create-booking:${identifier}`,
        RATE_LIMIT_CONFIGS.CREATE_BOOKING
      );

      if (!rateLimitResult.success) {
        return {
          success: false,
          error: `Prea multe rezervări create. Te rugăm să încerci din nou după ${rateLimitResult.resetTime}.`,
        };
      }
    } catch (rateLimitError) {
      // Don't block booking if rate limiting fails (log and continue)
      console.error("[RateLimit] Error checking rate limit for booking creation:", rateLimitError);
    }

    // Validate input with Zod schema
    const validatedInput = createBookingSchema.parse(input);

    const booking = await createBooking({
      ...validatedInput,
      userId: user.id,
    });

    // Track booking creation event
    try {
      const eventName =
        validatedInput.entityType === "club"
          ? PostHogEvents.CLUB_BOOKING_CREATED
          : PostHogEvents.DOCTOR_CONSULTATION_CREATED;
      await trackEventServer(eventName, {
        distinctId: user.id,
        [PostHogProperties.BOOKING_ID]: booking.id,
        [PostHogProperties.BOOKING_STATUS]: booking.status,
        ...(validatedInput.entityType === "club"
          ? { [PostHogProperties.CLUB_ID]: validatedInput.entityId }
          : { [PostHogProperties.DOCTOR_ID]: validatedInput.entityId }),
      });
    } catch (trackingError) {
      // Don't fail booking creation if tracking fails
      if (process.env.NODE_ENV === "development") {
        console.error("[PostHog] Error tracking booking creation:", trackingError);
      }
    }

    revalidatePath("/bookings");

    return { success: true, booking };
  } catch (error) {
    console.error("Error creating booking:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Eroare la crearea rezervării",
    };
  }
}

/**
 * Get booking by ID
 */
export async function getBookingAction(bookingId: string): Promise<Booking | null> {
  try {
    const user = await requireAuth();

    const booking = await getBookingById(bookingId);

    if (!booking || booking.userId !== user.id) {
      return null;
    }

    return booking;
  } catch (error) {
    console.error("Error getting booking:", error);
    return null;
  }
}

/**
 * Get all bookings for current user
 */
export async function getBookingsAction(): Promise<Booking[]> {
  try {
    const user = await requireAuth();
    return await getBookingsByUserId(user.id);
  } catch (error) {
    console.error("Error getting bookings:", error);
    return [];
  }
}

/**
 * Cancel booking
 */
export async function cancelBookingAction(
  bookingId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await requireAuth();

    // Get booking before cancelling to check entity type
    const booking = await getBookingById(bookingId);
    if (!booking || booking.userId !== user.id) {
      return {
        success: false,
        error: "Rezervarea nu a fost găsită sau nu îți aparține.",
      };
    }

    await cancelBooking(bookingId, user.id);

    // Track booking cancellation event
    try {
      const eventName =
        booking.entityType === "club"
          ? PostHogEvents.CLUB_BOOKING_CANCELLED
          : PostHogEvents.DOCTOR_CONSULTATION_CANCELLED;
      await trackEventServer(eventName, {
        distinctId: user.id,
        [PostHogProperties.BOOKING_ID]: bookingId,
        [PostHogProperties.BOOKING_STATUS]: "cancelled",
        ...(booking.entityType === "club"
          ? { [PostHogProperties.CLUB_ID]: booking.entityId }
          : { [PostHogProperties.DOCTOR_ID]: booking.entityId }),
      });
    } catch (trackingError) {
      // Don't fail cancellation if tracking fails
      if (process.env.NODE_ENV === "development") {
        console.error("[PostHog] Error tracking booking cancellation:", trackingError);
      }
    }

    revalidatePath("/bookings");
    revalidatePath(`/bookings/${bookingId}`);

    return { success: true };
  } catch (error) {
    console.error("Error cancelling booking:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Eroare la anularea rezervării",
    };
  }
}

/**
 * Get parent user by ID (for club admin to view booking details)
 */
export async function getParentUserAction(userId: string): Promise<AuthUser | null> {
  try {
    const user = await requireAuth();

    if (user.role !== UserRoleEnum.CLUB_ADMIN) {
      return null;
    }

    const { getUserById } = await import("@/modules/auth/auth.repository");
    return await getUserById(userId);
  } catch (error) {
    console.error("Error getting parent user:", error);
    return null;
  }
}

/**
 * Get bookings for club (for club admin)
 */
export async function getClubBookingsAction(): Promise<Booking[]> {
  try {
    const user = await requireAuth();

    if (user.role !== UserRoleEnum.CLUB_ADMIN) {
      throw new Error("Access denied");
    }

    // Get club for this admin
    const club = await getClubByAdminUserId(user.id);
    if (!club) {
      return [];
    }

    // Get bookings for this club
    const { bookingsRepository } = await import("@/modules/bookings/bookings.repository");
    return await bookingsRepository.findByClubId(club.id);
  } catch (error) {
    console.error("Error getting club bookings:", error);
    return [];
  }
}

/**
 * Confirm booking (for club admin)
 */
export async function confirmBookingAction(
  bookingId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await requireAuth();

    if (user.role !== UserRoleEnum.CLUB_ADMIN) {
      return {
        success: false,
        error: "Access denied",
      };
    }

    // Get club for this admin
    const club = await getClubByAdminUserId(user.id);
    if (!club) {
      return {
        success: false,
        error: "Club not found",
      };
    }

    await confirmBooking(bookingId, club.id);

    // Track booking confirmation event
    try {
      await trackEventServer(PostHogEvents.CLUB_BOOKING_CONFIRMED, {
        distinctId: user.id,
        [PostHogProperties.BOOKING_ID]: bookingId,
        [PostHogProperties.CLUB_ID]: club.id,
      });
    } catch (trackingError) {
      if (process.env.NODE_ENV === "development") {
        console.error("[PostHog] Error tracking booking confirmation:", trackingError);
      }
    }

    revalidatePath("/club/bookings");
    revalidatePath("/club/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Error confirming booking:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Eroare la confirmarea rezervării",
    };
  }
}

/**
 * Cancel booking by club admin
 */
export async function cancelBookingByClubAction(
  bookingId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await requireAuth();

    if (user.role !== UserRoleEnum.CLUB_ADMIN) {
      return {
        success: false,
        error: "Access denied",
      };
    }

    // Get club for this admin
    const club = await getClubByAdminUserId(user.id);
    if (!club) {
      return {
        success: false,
        error: "Club not found",
      };
    }

    await cancelBookingByEntity(bookingId, club.id);

    // Track booking cancellation event
    try {
      await trackEventServer(PostHogEvents.CLUB_BOOKING_CANCELLED, {
        distinctId: user.id,
        [PostHogProperties.BOOKING_ID]: bookingId,
        [PostHogProperties.CLUB_ID]: club.id,
      });
    } catch (trackingError) {
      if (process.env.NODE_ENV === "development") {
        console.error("[PostHog] Error tracking booking cancellation:", trackingError);
      }
    }

    revalidatePath("/club/bookings");
    revalidatePath("/club/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Error cancelling booking:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Eroare la anularea rezervării",
    };
  }
}

/**
 * Update booking status (for club admin)
 */
export async function updateBookingStatusAction(
  bookingId: string,
  status: Booking["status"]
): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await requireAuth();

    if (user.role !== UserRoleEnum.CLUB_ADMIN) {
      return {
        success: false,
        error: "Access denied",
      };
    }

    // Get club for this admin
    const club = await getClubByAdminUserId(user.id);
    if (!club) {
      return {
        success: false,
        error: "Club not found",
      };
    }

    await updateBookingStatus(bookingId, club.id, status);

    revalidatePath("/club/bookings");
    revalidatePath("/club/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Error updating booking status:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Eroare la actualizarea rezervării",
    };
  }
}
