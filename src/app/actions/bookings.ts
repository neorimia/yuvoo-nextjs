/**
 * Bookings Server Actions
 *
 * Server Actions for trial bookings and consultations.
 */

"use server";

import { revalidatePath } from "next/cache";
import { requireAuth } from "@/modules/auth/auth.service";
import {
  createBooking,
  getBookingById,
  getBookingsByUserId,
  cancelBooking,
} from "@/modules/bookings/bookings.service";
import { createBookingSchema } from "@/lib/validations/booking";
import type { Booking } from "@/modules/bookings/bookings.types";

/**
 * Create new booking
 */
export async function createBookingAction(
  input: unknown
): Promise<{ success: boolean; booking?: Booking; error?: string }> {
  try {
    const user = await requireAuth();

    // Validate input with Zod schema
    const validatedInput = createBookingSchema.parse(input);

    const booking = await createBooking({
      ...validatedInput,
      userId: user.id,
    });

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

    await cancelBooking(bookingId, user.id);

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
