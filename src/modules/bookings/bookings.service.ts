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
 * Validate booking input
 */
function validateBookingInput(input: CreateBookingInput): void {
  // Validate required fields
  if (!input.userId) {
    throw new Error("ID-ul utilizatorului este obligatoriu");
  }

  if (!input.entityId) {
    throw new Error("ID-ul entității (club sau doctor) este obligatoriu");
  }

  if (!input.entityType || !["club", "doctor"].includes(input.entityType)) {
    throw new Error("Tipul entității trebuie să fie 'club' sau 'doctor'");
  }

  if (!input.type || !["club_trial", "doctor_consultation"].includes(input.type)) {
    throw new Error("Tipul rezervării trebuie să fie 'club_trial' sau 'doctor_consultation'");
  }

  // Validate scheduled date is in the future
  if (!input.scheduledAt) {
    throw new Error("Data și ora programării sunt obligatorii");
  }

  const scheduledDate = new Date(input.scheduledAt);
  const now = new Date();

  if (scheduledDate <= now) {
    throw new Error("Data și ora programării trebuie să fie în viitor");
  }

  // Validate that scheduled date is not too far in the future (e.g., max 1 year)
  const oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

  if (scheduledDate > oneYearFromNow) {
    throw new Error("Data programării nu poate fi mai mult de un an în viitor");
  }

  // Validate childId for club_trial (required)
  if (input.type === "club_trial" && !input.childId) {
    throw new Error("Selectarea unui copil este obligatorie pentru rezervarea unei probe la club");
  }
}

/**
 * Check booking availability
 *
 * Validates that:
 * 1. No conflicting bookings exist for the same entity (club/doctor) at the same time
 * 2. The same child doesn't have another booking at the same time
 * 3. For club bookings, optionally validates against club schedule
 */
async function checkAvailability(input: CreateBookingInput): Promise<void> {
  const timeWindowMinutes = 30; // Consider bookings within 30 minutes as conflicting

  // Check for conflicting bookings at the same entity (club/doctor)
  const conflictingBookings = await bookingsRepository.findConflictingBookings(
    input.entityId,
    input.entityType,
    input.scheduledAt,
    timeWindowMinutes
  );

  if (conflictingBookings.length > 0) {
    const entityTypeLabel = input.entityType === "club" ? "club" : "doctor";
    throw new Error(
      `Acest interval de timp este deja rezervat pentru acest ${entityTypeLabel}. Te rugăm să alegi alt interval.`
    );
  }

  // Check if the same child has another booking at the same time
  if (input.childId) {
    const childConflict = await bookingsRepository.findChildConflictingBooking(
      input.childId,
      input.scheduledAt,
      timeWindowMinutes
    );

    if (childConflict) {
      throw new Error(
        "Copilul are deja o rezervare în acest interval de timp. Te rugăm să alegi alt interval."
      );
    }
  }

  // TODO: For club bookings, optionally validate against club schedule
  // This would check if the scheduled time matches the club's available hours
  // For now, we allow flexible booking times
}

/**
 * Create new booking
 */
export async function createBooking(input: CreateBookingInput): Promise<Booking> {
  // Validate input
  validateBookingInput(input);

  // Check availability
  await checkAvailability(input);

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

/**
 * Confirm booking (for club/doctor admins)
 */
export async function confirmBooking(bookingId: string, entityId: string): Promise<Booking> {
  const booking = await bookingsRepository.findById(bookingId);
  if (!booking || booking.entityId !== entityId) {
    throw new Error("Booking not found or access denied");
  }

  if (booking.status !== "pending") {
    throw new Error("Only pending bookings can be confirmed");
  }

  const confirmed = await bookingsRepository.updateStatus(bookingId, "confirmed");

  // Send confirmation notification (status change)
  await bookingsNotifications.sendConfirmation(confirmed);

  return confirmed;
}

/**
 * Update booking status (for club/doctor admins)
 */
export async function updateBookingStatus(
  bookingId: string,
  entityId: string,
  status: Booking["status"]
): Promise<Booking> {
  const booking = await bookingsRepository.findById(bookingId);
  if (!booking || booking.entityId !== entityId) {
    throw new Error("Booking not found or access denied");
  }

  const updated = await bookingsRepository.updateStatus(bookingId, status);

  // Send appropriate notification based on status
  if (status === "confirmed") {
    await bookingsNotifications.sendConfirmation(updated);
  } else if (status === "cancelled") {
    await bookingsNotifications.sendCancellation(updated);
  }
  // Note: "completed" status doesn't trigger email (booking is already done)

  return updated;
}

/**
 * Cancel booking by club/doctor admin
 */
export async function cancelBookingByEntity(bookingId: string, entityId: string): Promise<Booking> {
  const booking = await bookingsRepository.findById(bookingId);
  if (!booking || booking.entityId !== entityId) {
    throw new Error("Booking not found or access denied");
  }

  const cancelled = await bookingsRepository.cancel(bookingId);

  // Send cancellation notification
  await bookingsNotifications.sendCancellation(cancelled);

  return cancelled;
}
