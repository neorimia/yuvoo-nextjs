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
import { clubs, doctors, children, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import type { Booking } from "./bookings.types";
import type { Club } from "@/modules/clubs/clubs.types";
import type { Doctor } from "@/modules/doctors/doctors.types";
import type { Child } from "@/modules/children/children.types";
import type { AuthUser } from "@/modules/auth/auth.types";

/**
 * Map database club to Club type
 */
function mapDbClubToClub(dbClub: typeof clubs.$inferSelect): Club {
  const scheduleData = dbClub.schedule as unknown;
  const schedule =
    Array.isArray(scheduleData) && scheduleData.length > 0
      ? (scheduleData as { day: string; time: string }[])
      : undefined;

  const pricingData = dbClub.pricing as unknown;
  let pricing: Club["pricing"] = undefined;
  if (pricingData) {
    if (Array.isArray(pricingData) && pricingData.length > 0) {
      // If array, use directly
      pricing = pricingData as Club["pricing"];
    } else if (typeof pricingData === "object" && pricingData !== null) {
      // If single object, wrap in array for backward compatibility
      pricing = [
        pricingData as {
          type: "monthly" | "per_class" | "per_semester";
          amount: number;
          currency: "RON";
        },
      ];
    }
  }

  return {
    id: dbClub.id,
    name: dbClub.name,
    slug: dbClub.slug || dbClub.id,
    description: dbClub.description || "",
    sportId: dbClub.sportType,
    sportName: dbClub.sportType,
    location: {
      city: dbClub.city,
      district: dbClub.district || undefined,
      address: dbClub.address || "",
      coordinates:
        dbClub.latitude && dbClub.longitude
          ? {
              lat: parseFloat(dbClub.latitude),
              lng: parseFloat(dbClub.longitude),
            }
          : undefined,
    },
    ageGroups: dbClub.ageGroups || [],
    levels: dbClub.experienceLevels || [],
    verified: dbClub.verified || false,
    featured: dbClub.featured || false,
    images: dbClub.galleryUrls || [],
    contact: {
      phone: dbClub.phone || undefined,
      email: dbClub.email || undefined,
      website: dbClub.website || undefined,
    },
    schedule,
    pricing,
    createdAt: dbClub.createdAt,
    updatedAt: dbClub.updatedAt,
  };
}

/**
 * Map database doctor to Doctor type
 */
function mapDbDoctorToDoctor(dbDoctor: typeof doctors.$inferSelect): Doctor {
  const name = [dbDoctor.title, dbDoctor.firstName, dbDoctor.lastName].filter(Boolean).join(" ");

  const slug =
    dbDoctor.slug ||
    `${dbDoctor.firstName}-${dbDoctor.lastName}`
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const specialtyMap: Record<string, Doctor["specialty"]> = {
    orthopedist: "orthopedist",
    nutritionist: "nutritionist",
    psychologist: "psychologist",
    general: "general",
  };
  const specialty =
    specialtyMap[dbDoctor.specialty.toLowerCase()] || ("general" as Doctor["specialty"]);

  return {
    id: dbDoctor.id,
    name,
    slug,
    specialty,
    description: dbDoctor.bio || "",
    credentials: dbDoctor.credentials || [],
    location: {
      city: dbDoctor.city,
      district: dbDoctor.district || undefined,
      address: dbDoctor.address || "",
      coordinates: undefined,
    },
    contact: {
      phone: dbDoctor.phone || undefined,
      email: dbDoctor.email || undefined,
      website: dbDoctor.website || undefined,
    },
    image: dbDoctor.photoUrl || undefined,
    verified: dbDoctor.verified || false,
    acceptingNewPatients: dbDoctor.acceptingNewPatients ?? true,
    onlineConsultations: dbDoctor.onlineConsultations || false,
    createdAt: dbDoctor.createdAt,
    updatedAt: dbDoctor.updatedAt,
  };
}

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
 */
async function getClubById(clubId: string): Promise<Club | null> {
  try {
    const dbClub = await db.query.clubs.findFirst({
      where: eq(clubs.id, clubId),
    });

    if (!dbClub) {
      return null;
    }

    return mapDbClubToClub(dbClub);
  } catch (error) {
    console.error("[Bookings Notifications] Error fetching club:", error);
    return null;
  }
}

/**
 * Get doctor by ID
 */
async function getDoctorById(doctorId: string): Promise<Doctor | null> {
  try {
    const dbDoctor = await db.query.doctors.findFirst({
      where: eq(doctors.id, doctorId),
    });

    if (!dbDoctor) {
      return null;
    }

    return mapDbDoctorToDoctor(dbDoctor);
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
