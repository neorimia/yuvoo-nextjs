/**
 * Bookings Service
 *
 * Business logic for trial bookings and consultations.
 * Handles booking creation, cancellation, and notifications.
 */

import { bookingsRepository } from "./bookings.repository";
import { bookingsNotifications } from "./bookings.notifications";
import type { Booking, CreateBookingInput } from "./bookings.types";

/**
 * Create new booking
 */
export async function createBooking(input: CreateBookingInput): Promise<Booking> {
  // TODO: Add validation
  // TODO: Check availability
  const booking = await bookingsRepository.create(input);

  // Send confirmation notification
  await bookingsNotifications.sendConfirmation(booking);

  return booking;
}

/**
 * Get booking by ID
 */
export async function getBookingById(bookingId: string): Promise<Booking | null> {
  return bookingsRepository.findById(bookingId);
}

/**
 * Get bookings for user
 */
export async function getBookingsByUserId(userId: string): Promise<Booking[]> {
  return bookingsRepository.findByUserId(userId);
}

/**
 * Cancel booking
 */
export async function cancelBooking(bookingId: string, userId: string): Promise<Booking> {
  const booking = await bookingsRepository.findById(bookingId);
  if (!booking || booking.userId !== userId) {
    throw new Error("Booking not found or access denied");
  }

  const cancelled = await bookingsRepository.cancel(bookingId);

  // Send cancellation notification
  await bookingsNotifications.sendCancellation(cancelled);

  return cancelled;
}
