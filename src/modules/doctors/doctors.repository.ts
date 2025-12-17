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
  // Build name from firstName, lastName, and title
  const name = [dbDoctor.title, dbDoctor.firstName, dbDoctor.lastName].filter(Boolean).join(" ");

  // Use slug from database, or generate it if not present (backward compatibility)
  const slug = dbDoctor.slug || generateSlug(dbDoctor.firstName, dbDoctor.lastName);

  // Build location with coordinates (if available in future)
  const location: Doctor["location"] = {
    city: dbDoctor.city,
    district: dbDoctor.district || undefined,
    address: dbDoctor.address || "",
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

  return {
    id: dbDoctor.id,
    name,
    slug,
    specialty,
    description: dbDoctor.bio || "",
    credentials: dbDoctor.credentials || [],
    location,
    contact,
    image: dbDoctor.photoUrl || undefined,
    verified: dbDoctor.verified || false,
    acceptingNewPatients: dbDoctor.acceptingNewPatients ?? true,
    onlineConsultations: dbDoctor.onlineConsultations || false,
    verificationStatus: dbDoctor.verificationStatus,
    verificationDocuments: dbDoctor.verificationDocuments || [],
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

export const doctorsRepository = {
  findBySlug,
  getDoctorById,
  findBySpecialty,
  findAll,
  getDoctorsByVerificationStatus,
  getDoctorsPendingVerification,
  mapDbDoctorToDoctor, // Export for use in search service
};
