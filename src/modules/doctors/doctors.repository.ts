/**
 * Doctors Repository
 *
 * Data access layer for pediatric specialists.
 * Handles database queries for doctor data using Drizzle ORM.
 */

import { db } from "@/lib/db";
import { doctors } from "@/lib/db/schema";
import { eq, desc, asc, inArray } from "drizzle-orm";
import type { Doctor } from "./doctors.types";

/**
 * Generate slug from doctor name
 * Creates a URL-friendly slug from first and last name
 */
function generateSlug(firstName: string, lastName: string): string {
  const name = `${firstName}-${lastName}`.toLowerCase();
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

/**
 * Map database doctor record to Doctor type
 */
function mapDbDoctorToDoctor(dbDoctor: typeof doctors.$inferSelect): Doctor {
  // Use slug from database, or generate it if not present (backward compatibility)
  const slug = dbDoctor.slug || generateSlug(dbDoctor.firstName, dbDoctor.lastName);

  // Build location with coordinates (if available in future)
  const location: Doctor["location"] = {
    city: dbDoctor.city,
    district: dbDoctor.district || undefined,
    address: dbDoctor.address || undefined, // Optional in schema
    // TODO: Add coordinates when latitude/longitude fields are added to schema
    coordinates: undefined,
  };

  // Build contact info
  const contact: Doctor["contact"] = {
    phone: dbDoctor.phone || undefined,
    email: dbDoctor.email || undefined,
    website: dbDoctor.website || undefined,
  };

  // Map specialty (validate against DoctorSpecialty type)
  const specialtyMap: Record<string, Doctor["specialty"]> = {
    orthopedist: "orthopedist",
    nutritionist: "nutritionist",
    psychologist: "psychologist",
    general: "general",
  };
  const specialty =
    specialtyMap[dbDoctor.specialty.toLowerCase()] || ("general" as Doctor["specialty"]);

  // Parse schedule from JSONB
  let schedule: Array<{ day: string; startTime: string; endTime: string }> | undefined;
  if (
    dbDoctor.schedule &&
    typeof dbDoctor.schedule === "object" &&
    Array.isArray(dbDoctor.schedule)
  ) {
    schedule = dbDoctor.schedule.filter(
      (entry): entry is { day: string; startTime: string; endTime: string } =>
        entry !== null &&
        entry !== undefined &&
        typeof entry === "object" &&
        typeof entry.day === "string" &&
        typeof entry.startTime === "string" &&
        typeof entry.endTime === "string"
    );
  }

  // Build name from firstName, lastName, and title (for backward compatibility)
  const name = [dbDoctor.title, dbDoctor.firstName, dbDoctor.lastName].filter(Boolean).join(" ");

  return {
    id: dbDoctor.id,
    name, // Computed for backward compatibility
    firstName: dbDoctor.firstName,
    lastName: dbDoctor.lastName,
    title: dbDoctor.title || undefined,
    slug,
    specialty,
    secondarySpecialties: dbDoctor.secondarySpecialties || undefined,
    description: dbDoctor.bio || "",
    credentials: dbDoctor.credentials || [],
    yearsOfExperience: dbDoctor.yearsOfExperience || undefined,
    languages: dbDoctor.languages && dbDoctor.languages.length > 0 ? dbDoctor.languages : undefined,
    location,
    contact,
    image: dbDoctor.photoUrl || undefined,
    verified: dbDoctor.verified || false,
    acceptingNewPatients: dbDoctor.acceptingNewPatients ?? true,
    onlineConsultations: dbDoctor.onlineConsultations || false,
    schedule,
    verificationStatus: dbDoctor.verificationStatus || "pending",
    verificationDocuments: dbDoctor.verificationDocuments || [],
    profileComplete: dbDoctor.profileComplete ?? false,
    createdAt: dbDoctor.createdAt,
    updatedAt: dbDoctor.updatedAt,
  };
}

/**
 * Find doctor by slug
 */
export async function findBySlug(slug: string): Promise<Doctor | null> {
  const doctor = await db.query.doctors.findFirst({
    where: eq(doctors.slug, slug),
  });

  if (!doctor) {
    return null;
  }

  return mapDbDoctorToDoctor(doctor);
}

/**
 * Get doctor by ID
 */
export async function getDoctorById(id: string): Promise<Doctor | null> {
  const doctor = await db.query.doctors.findFirst({
    where: eq(doctors.id, id),
  });

  if (!doctor) {
    return null;
  }

  return mapDbDoctorToDoctor(doctor);
}

/**
 * Find doctors by specialty
 */
export async function findBySpecialty(specialty: string): Promise<Doctor[]> {
  const results = await db.query.doctors.findMany({
    where: eq(doctors.specialty, specialty),
    orderBy: [desc(doctors.verified), asc(doctors.firstName), asc(doctors.lastName)],
  });

  return results.map(mapDbDoctorToDoctor);
}

/**
 * Find all doctors
 */
export async function findAll(): Promise<Doctor[]> {
  const results = await db.query.doctors.findMany({
    orderBy: [desc(doctors.verified), asc(doctors.firstName), asc(doctors.lastName)],
  });

  return results.map(mapDbDoctorToDoctor);
}

/**
 * Get doctors by verification status
 */
export async function getDoctorsByVerificationStatus(
  status: "pending" | "in_review" | "approved" | "rejected"
): Promise<Doctor[]> {
  const results = await db.query.doctors.findMany({
    where: eq(doctors.verificationStatus, status),
    orderBy: [asc(doctors.createdAt)], // Oldest first (FIFO for review queue)
  });

  return results.map(mapDbDoctorToDoctor);
}

/**
 * Get doctors pending verification (pending or in_review)
 */
export async function getDoctorsPendingVerification(): Promise<Doctor[]> {
  const results = await db.query.doctors.findMany({
    where: inArray(doctors.verificationStatus, ["pending", "in_review"]),
    orderBy: [asc(doctors.createdAt)], // Oldest first
  });

  return results.map(mapDbDoctorToDoctor);
}

/**
 * Find doctor by user ID
 */
export async function findByUserId(userId: string): Promise<Doctor | null> {
  const doctor = await db.query.doctors.findFirst({
    where: eq(doctors.userId, userId),
  });

  if (!doctor) {
    return null;
  }

  return mapDbDoctorToDoctor(doctor);
}

export const doctorsRepository = {
  findBySlug,
  getDoctorById,
  findByUserId,
  findBySpecialty,
  findAll,
  getDoctorsByVerificationStatus,
  getDoctorsPendingVerification,
  mapDbDoctorToDoctor, // Export for use in search service
};
