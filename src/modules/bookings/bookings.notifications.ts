/**
 * Bookings Notifications
 *
 * Email and SMS notifications for bookings.
 * Handles confirmation, cancellation, and reminder notifications.
 */

import {
  sendBookingConfirmation,
  sendBookingCancellation,
  sendBookingReminder,
} from "@/lib/integrations/brevo";
import { db } from "@/lib/db";
import { children, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import type { Booking } from "./bookings.types";
import type { Club } from "@/modules/clubs/clubs.types";
import type { Doctor } from "@/modules/doctors/doctors.types";
import type { Child } from "@/modules/children/children.types";
import type { AuthUser } from "@/modules/auth/auth.types";

// Phase 5: Use repository mapping functions instead of local duplicates
// These functions are now async and handle location name fetching from IDs
import { clubsRepository } from "@/modules/clubs/clubs.repository";
import { doctorsRepository } from "@/modules/doctors/doctors.repository";

// Phase 5: Removed duplicate mapping functions - use repository functions instead
// mapDbClubToClub -> clubsRepository.mapDbClubToClub()
// mapDbDoctorToDoctor -> doctorsRepository.mapDbDoctorToDoctor()

/**
 * Map database child to Child type
 */
function mapDbChildToChild(dbChild: typeof children.$inferSelect): Child {
  // Calculate age from dateOfBirth
  const today = new Date();
  const birthDate = new Date(dbChild.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return {
    id: dbChild.id,
    parentId: dbChild.parentId,
    firstName: dbChild.firstName,
    lastName: dbChild.lastName,
    dateOfBirth: dbChild.dateOfBirth,
    gender: dbChild.gender as Child["gender"],
    age,
    createdAt: dbChild.createdAt,
    updatedAt: dbChild.updatedAt,
  };
}

/**
 * Get user by ID (from Stack Auth or database)
 */
async function getUserById(userId: string): Promise<AuthUser | null> {
  try {
    // First, try to get from local database
    const dbUser = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    // Create user from database (we already have all necessary data)
    if (dbUser) {
      return {
        id: dbUser.id,
        email: dbUser.email || "",
        name: dbUser.firstName && dbUser.lastName ? `${dbUser.firstName} ${dbUser.lastName}` : null,
        firstName: dbUser.firstName || null,
        lastName: dbUser.lastName || null,
        phone: dbUser.phone || null,
        role: dbUser.role as AuthUser["role"],
        emailVerified: false,
        emailNotificationPreferences:
          (dbUser.emailNotificationPreferences as
            | AuthUser["emailNotificationPreferences"]
            | null) || null,
        createdAt: dbUser.createdAt,
        updatedAt: dbUser.updatedAt,
      };
    }

    return null;
  } catch (error) {
    console.error("[Bookings Notifications] Error fetching user:", error);
    return null;
  }
}

/**
 * Get club by ID
 * Phase 5: Use repository function (handles location IDs)
 */
async function getClubById(clubId: string): Promise<Club | null> {
  try {
    return await clubsRepository.getClubById(clubId);
  } catch (error) {
    console.error("[Bookings Notifications] Error fetching club:", error);
    return null;
  }
}

/**
 * Get doctor by ID
 * Phase 5: Use repository function (handles location IDs)
 */
async function getDoctorById(doctorId: string): Promise<Doctor | null> {
  try {
    return await doctorsRepository.getDoctorById(doctorId);
  } catch (error) {
    console.error("[Bookings Notifications] Error fetching doctor:", error);
    return null;
  }
}

/**
 * Get child by ID
 */
async function getChildById(childId: string): Promise<Child | null> {
  try {
    const dbChild = await db.query.children.findFirst({
      where: eq(children.id, childId),
    });

    if (!dbChild) {
      return null;
    }

    return mapDbChildToChild(dbChild);
  } catch (error) {
    console.error("[Bookings Notifications] Error fetching child:", error);
    return null;
  }
}

/**
 * Send booking confirmation email
 */
export async function sendConfirmation(booking: Booking): Promise<void> {
  try {
    // Fetch required data
    const [user, entity, child] = await Promise.all([
      getUserById(booking.userId),
      booking.entityType === "club"
        ? getClubById(booking.entityId)
        : getDoctorById(booking.entityId),
      booking.childId ? getChildById(booking.childId) : Promise.resolve(null),
    ]);

    // Validate required data
    if (!user) {
      console.error(
        "[Bookings Notifications] User not found for booking confirmation:",
        booking.userId
      );
      return;
    }

    if (!entity) {
      console.error(
        "[Bookings Notifications] Entity not found for booking confirmation:",
        booking.entityId
      );
      return;
    }

    // Send email
    await sendBookingConfirmation(booking, user, entity, child || undefined);
  } catch (error) {
    // Don't throw - email failures shouldn't block booking operations
    console.error("[Bookings Notifications] Error sending confirmation email:", error);
  }
}

/**
 * Send booking cancellation email
 */
export async function sendCancellation(booking: Booking): Promise<void> {
  try {
    // Fetch required data
    const [user, entity, child] = await Promise.all([
      getUserById(booking.userId),
      booking.entityType === "club"
        ? getClubById(booking.entityId)
        : getDoctorById(booking.entityId),
      booking.childId ? getChildById(booking.childId) : Promise.resolve(null),
    ]);

    // Validate required data
    if (!user) {
      console.error(
        "[Bookings Notifications] User not found for booking cancellation:",
        booking.userId
      );
      return;
    }

    if (!entity) {
      console.error(
        "[Bookings Notifications] Entity not found for booking cancellation:",
        booking.entityId
      );
      return;
    }

    // Send email
    await sendBookingCancellation(booking, user, entity, child || undefined);
  } catch (error) {
    // Don't throw - email failures shouldn't block booking operations
    console.error("[Bookings Notifications] Error sending cancellation email:", error);
  }
}

/**
 * Send booking reminder email
 */
export async function sendReminder(booking: Booking): Promise<void> {
  try {
    // Fetch required data
    const [user, entity, child] = await Promise.all([
      getUserById(booking.userId),
      booking.entityType === "club"
        ? getClubById(booking.entityId)
        : getDoctorById(booking.entityId),
      booking.childId ? getChildById(booking.childId) : Promise.resolve(null),
    ]);

    // Validate required data
    if (!user) {
      console.error(
        "[Bookings Notifications] User not found for booking reminder:",
        booking.userId
      );
      return;
    }

    if (!entity) {
      console.error(
        "[Bookings Notifications] Entity not found for booking reminder:",
        booking.entityId
      );
      return;
    }

    // Send email
    await sendBookingReminder(booking, user, entity, child || undefined);
  } catch (error) {
    // Don't throw - email failures shouldn't block booking operations
    console.error("[Bookings Notifications] Error sending reminder email:", error);
  }
}

export const bookingsNotifications = {
  sendConfirmation,
  sendCancellation,
  sendReminder,
};
