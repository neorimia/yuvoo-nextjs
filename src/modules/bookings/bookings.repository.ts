/**
 * Bookings Repository
 *
 * Data access layer for bookings.
 * Handles database queries for booking data using Drizzle ORM.
 */

import { db } from "@/lib/db";
import { bookings } from "@/lib/db/schema";
import { eq, desc, and, sql } from "drizzle-orm";
import type { Booking, CreateBookingInput } from "./bookings.types";

/**
 * Map database booking record to Booking type
 *
 * @throws Error if booking data is invalid (missing both clubId and doctorId)
 */
function mapDbBookingToBooking(dbBooking: typeof bookings.$inferSelect): Booking {
  // Validate that at least one entity ID exists
  if (!dbBooking.clubId && !dbBooking.doctorId) {
    throw new Error(
      `Invalid booking data: Booking ${dbBooking.id} must have either clubId or doctorId`
    );
  }

  // Determine entityId and entityType
  const entityId = dbBooking.clubId || dbBooking.doctorId;
  const entityType: "club" | "doctor" = dbBooking.clubId ? "club" : "doctor";

  // Additional validation: ensure entityId is not null/empty
  if (!entityId) {
    throw new Error(`Invalid booking data: Booking ${dbBooking.id} has null or empty entityId`);
  }

  return {
    id: dbBooking.id,
    userId: dbBooking.parentId, // Map parentId to userId
    childId: dbBooking.childId || undefined,
    type: dbBooking.type as Booking["type"],
    status: dbBooking.status as Booking["status"],
    entityId,
    entityType,
    scheduledAt: dbBooking.scheduledAt || new Date(),
    notes: dbBooking.notes || undefined,
    createdAt: dbBooking.createdAt,
    updatedAt: dbBooking.updatedAt,
  };
}

/**
 * Create booking
 */
export async function create(input: CreateBookingInput): Promise<Booking> {
  const bookingId = crypto.randomUUID();

  // Determine clubId or doctorId based on entityType
  const clubId = input.entityType === "club" ? input.entityId : null;
  const doctorId = input.entityType === "doctor" ? input.entityId : null;

  const [dbBooking] = await db
    .insert(bookings)
    .values({
      id: bookingId,
      parentId: input.userId,
      childId: input.childId || null,
      clubId,
      doctorId,
      type: input.type,
      status: "pending",
      scheduledAt: input.scheduledAt,
      notes: input.notes || null,
    })
    .returning();

  return mapDbBookingToBooking(dbBooking);
}

/**
 * Find booking by ID
 */
export async function findById(bookingId: string): Promise<Booking | null> {
  const dbBooking = await db.query.bookings.findFirst({
    where: eq(bookings.id, bookingId),
  });

  if (!dbBooking) {
    return null;
  }

  return mapDbBookingToBooking(dbBooking);
}

/**
 * Find bookings by user ID
 */
export async function findByUserId(userId: string): Promise<Booking[]> {
  const dbBookings = await db.query.bookings.findMany({
    where: eq(bookings.parentId, userId),
    orderBy: [desc(bookings.scheduledAt), desc(bookings.createdAt)],
  });

  return dbBookings.map(mapDbBookingToBooking);
}

/**
 * Cancel booking
 */
export async function cancel(bookingId: string): Promise<Booking> {
  const [dbBooking] = await db
    .update(bookings)
    .set({
      status: "cancelled",
      updatedAt: new Date(),
    })
    .where(eq(bookings.id, bookingId))
    .returning();

  if (!dbBooking) {
    throw new Error("Booking not found");
  }

  return mapDbBookingToBooking(dbBooking);
}

/**
 * Update booking status
 */
export async function updateStatus(bookingId: string, status: Booking["status"]): Promise<Booking> {
  const [dbBooking] = await db
    .update(bookings)
    .set({
      status,
      updatedAt: new Date(),
    })
    .where(eq(bookings.id, bookingId))
    .returning();

  if (!dbBooking) {
    throw new Error("Booking not found");
  }

  return mapDbBookingToBooking(dbBooking);
}

/**
 * Find conflicting bookings for a given time slot
 *
 * Checks for bookings that:
 * - Are for the same club/doctor
 * - Are scheduled at the same time (within a time window)
 * - Are not cancelled
 *
 * @param entityId - Club ID or Doctor ID
 * @param entityType - "club" or "doctor"
 * @param scheduledAt - The scheduled date/time
 * @param timeWindowMinutes - Time window in minutes to check for conflicts (default: 30 minutes)
 * @returns Array of conflicting bookings
 */
export async function findConflictingBookings(
  entityId: string,
  entityType: "club" | "doctor",
  scheduledAt: Date,
  timeWindowMinutes: number = 30
): Promise<Booking[]> {
  // Calculate time window boundaries
  const scheduledTime = new Date(scheduledAt);
  const windowStart = new Date(scheduledTime);
  windowStart.setMinutes(windowStart.getMinutes() - timeWindowMinutes);

  const windowEnd = new Date(scheduledTime);
  windowEnd.setMinutes(windowEnd.getMinutes() + timeWindowMinutes);

  // Build where conditions
  const conditions = [];

  // Match entity (club or doctor)
  if (entityType === "club") {
    conditions.push(eq(bookings.clubId, entityId));
  } else {
    conditions.push(eq(bookings.doctorId, entityId));
  }

  // Match time window (scheduled_at between windowStart and windowEnd)
  conditions.push(
    sql`${bookings.scheduledAt} >= ${windowStart} AND ${bookings.scheduledAt} <= ${windowEnd}`
  );

  // Exclude cancelled bookings
  conditions.push(sql`${bookings.status} != 'cancelled'`);

  const whereClause = and(...conditions);

  const dbBookings = await db.query.bookings.findMany({
    where: whereClause,
  });

  return dbBookings.map(mapDbBookingToBooking);
}

/**
 * Check if same child has booking at the same time
 *
 * @param childId - Child ID
 * @param scheduledAt - The scheduled date/time
 * @param timeWindowMinutes - Time window in minutes to check for conflicts (default: 30 minutes)
 * @returns Conflicting booking if found, null otherwise
 */
export async function findChildConflictingBooking(
  childId: string,
  scheduledAt: Date,
  timeWindowMinutes: number = 30
): Promise<Booking | null> {
  const scheduledTime = new Date(scheduledAt);
  const windowStart = new Date(scheduledTime);
  windowStart.setMinutes(windowStart.getMinutes() - timeWindowMinutes);

  const windowEnd = new Date(scheduledTime);
  windowEnd.setMinutes(windowEnd.getMinutes() + timeWindowMinutes);

  const dbBooking = await db.query.bookings.findFirst({
    where: and(
      eq(bookings.childId, childId),
      sql`${bookings.scheduledAt} >= ${windowStart} AND ${bookings.scheduledAt} <= ${windowEnd}`,
      sql`${bookings.status} != 'cancelled'`
    ),
  });

  if (!dbBooking) {
    return null;
  }

  return mapDbBookingToBooking(dbBooking);
}

/**
 * Find bookings by club ID
 */
export async function findByClubId(clubId: string): Promise<Booking[]> {
  const dbBookings = await db.query.bookings.findMany({
    where: eq(bookings.clubId, clubId),
    orderBy: [desc(bookings.scheduledAt), desc(bookings.createdAt)],
  });

  return dbBookings.map(mapDbBookingToBooking);
}

/**
 * Get booking statistics by club ID
 * Returns counts grouped by status
 */
export async function getBookingStatsByClubId(clubId: string): Promise<{
  total: number;
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
}> {
  const dbBookings = await db.query.bookings.findMany({
    where: eq(bookings.clubId, clubId),
    columns: {
      status: true,
    },
  });

  const stats = {
    total: dbBookings.length,
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
  };

  for (const booking of dbBookings) {
    switch (booking.status) {
      case "pending":
        stats.pending++;
        break;
      case "confirmed":
        stats.confirmed++;
        break;
      case "completed":
        stats.completed++;
        break;
      case "cancelled":
        stats.cancelled++;
        break;
    }
  }

  return stats;
}

/**
 * Find bookings by doctor ID
 */
export async function findByDoctorId(doctorId: string, limit?: number): Promise<Booking[]> {
  const dbBookings = await db.query.bookings.findMany({
    where: eq(bookings.doctorId, doctorId),
    orderBy: [desc(bookings.scheduledAt), desc(bookings.createdAt)],
    limit,
  });

  return dbBookings.map(mapDbBookingToBooking);
}

/**
 * Get consultation statistics by doctor ID
 * Returns counts grouped by status
 */
export async function getConsultationStatsByDoctorId(doctorId: string): Promise<{
  total: number;
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
}> {
  const dbBookings = await db.query.bookings.findMany({
    where: eq(bookings.doctorId, doctorId),
    columns: {
      status: true,
    },
  });

  const stats = {
    total: dbBookings.length,
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
  };

  for (const booking of dbBookings) {
    switch (booking.status) {
      case "pending":
        stats.pending++;
        break;
      case "confirmed":
        stats.confirmed++;
        break;
      case "completed":
        stats.completed++;
        break;
      case "cancelled":
        stats.cancelled++;
        break;
    }
  }

  return stats;
}

export const bookingsRepository = {
  create,
  findById,
  findByUserId,
  findByClubId,
  findByDoctorId,
  cancel,
  updateStatus,
  findConflictingBookings,
  findChildConflictingBooking,
  getBookingStatsByClubId,
  getConsultationStatsByDoctorId,
};
