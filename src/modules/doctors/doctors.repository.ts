/**
 * Doctors Repository
 *
 * Data access layer for pediatric specialists.
 * Handles database queries for doctor data using Drizzle ORM.
 */

import { db } from "@/lib/db";
import { doctors } from "@/lib/db/schema";
import { eq, desc, asc, inArray } from "drizzle-orm";
import { getLocationNamesByIds } from "@/lib/db/location-helpers";
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
/**
 * Map database doctor record to Doctor type
 * Maps all fields from schema to Doctor interface, handling optional fields and defaults.
 * Phase 5: Now populates location names from foreign keys when available.
 */
async function mapDbDoctorToDoctor(dbDoctor: typeof doctors.$inferSelect): Promise<Doctor> {
  // Use slug from database, or generate it if not present (backward compatibility)
  // Schema: slug (unique, optional)
  const slug = dbDoctor.slug || generateSlug(dbDoctor.firstName, dbDoctor.lastName);

  // Build location with coordinates (if available in future)
  // Phase 5: Populate location names from foreign keys when available, fallback to text fields
  // Schema: city (notNull), district (optional), address (optional)
  // Schema: cityId (notNull), sectorId (optional), countyId (notNull) - Phase 3
  const locationIds = [dbDoctor.cityId, dbDoctor.sectorId, dbDoctor.countyId].filter(
    (id): id is string => !!id
  );
  const locationNames = await getLocationNamesByIds(locationIds);

  const location: Doctor["location"] = {
    // Phase 6: Location names are now always fetched from foreign keys (no text fallback)
    city: locationNames.get(dbDoctor.cityId || "") || "", // Required - must have cityId
    district: dbDoctor.sectorId ? locationNames.get(dbDoctor.sectorId) || undefined : undefined, // Optional
    address: dbDoctor.address || undefined, // Schema: optional
    // TODO: Add coordinates when latitude/longitude fields are added to schema
    coordinates: undefined,
    // Phase 5: Include location IDs for filtering and joins
    cityId: dbDoctor.cityId || undefined,
    sectorId: dbDoctor.sectorId || undefined,
    countyId: dbDoctor.countyId || undefined,
  };

  // Build contact info
  // Schema: phone (optional), email (optional), website (optional)
  const contact: Doctor["contact"] = {
    phone: dbDoctor.phone || undefined, // Schema: optional
    email: dbDoctor.email || undefined, // Schema: optional
    website: dbDoctor.website || undefined, // Schema: optional
  };

  // Map specialty (validate against DoctorSpecialty type)
  // Schema: specialty (notNull)
  const specialtyMap: Record<string, Doctor["specialty"]> = {
    orthopedist: "orthopedist",
    nutritionist: "nutritionist",
    psychologist: "psychologist",
    general: "general",
  };
  const specialty =
    specialtyMap[dbDoctor.specialty.toLowerCase()] || ("general" as Doctor["specialty"]);

  // Parse schedule from JSONB
  // Schema: schedule (JSONB, default '[]')
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

  // Build name from firstName, lastName, and "Dr." prefix (for backward compatibility)
  // Schema: firstName (notNull), lastName (notNull), title (optional)
  const name = ["Dr.", dbDoctor.firstName, dbDoctor.lastName].filter(Boolean).join(" ");

  return {
    id: dbDoctor.id, // Schema: primaryKey
    name, // Computed for backward compatibility
    firstName: dbDoctor.firstName, // Schema: first_name (notNull)
    lastName: dbDoctor.lastName, // Schema: last_name (notNull)
    title: dbDoctor.title || undefined, // Schema: title (optional)
    slug,
    specialty, // Schema: specialty (notNull)
    secondarySpecialties: dbDoctor.secondarySpecialties || undefined, // Schema: text array, default '{}'
    description: dbDoctor.bio || "", // Schema: bio (optional, mapped to description)
    credentials: dbDoctor.credentials || [], // Schema: text array, default '{}'
    yearsOfExperience: dbDoctor.yearsOfExperience || undefined, // Schema: integer (optional)
    languages: dbDoctor.languages && dbDoctor.languages.length > 0 ? dbDoctor.languages : undefined, // Schema: text array, default '{}'
    location,
    contact,
    image: dbDoctor.photoUrl || undefined, // Schema: photo_url (optional, mapped to image)
    verified: dbDoctor.verified || false, // Schema: boolean, default false, notNull
    rating: dbDoctor.rating || 0, // Schema: integer, default 0
    acceptingNewPatients: dbDoctor.acceptingNewPatients ?? true, // Schema: boolean, default true, notNull
    onlineConsultations: dbDoctor.onlineConsultations || false, // Schema: boolean, default false, notNull
    schedule, // Schema: JSONB, default '[]'
    verificationStatus: dbDoctor.verificationStatus || "pending", // Schema: notNull, default "pending"
    verificationDocuments: dbDoctor.verificationDocuments || [], // Schema: text array, default '{}'
    profileComplete: dbDoctor.profileComplete ?? false, // Schema: notNull, default false
    createdAt: dbDoctor.createdAt, // Schema: notNull, defaultNow
    updatedAt: dbDoctor.updatedAt, // Schema: notNull, defaultNow
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

  return await mapDbDoctorToDoctor(doctor);
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

  return await mapDbDoctorToDoctor(doctor);
}

/**
 * Find doctors by specialty
 */
export async function findBySpecialty(specialty: string): Promise<Doctor[]> {
  const results = await db.query.doctors.findMany({
    where: eq(doctors.specialty, specialty),
    orderBy: [desc(doctors.verified), asc(doctors.firstName), asc(doctors.lastName)],
  });

  return Promise.all(results.map(mapDbDoctorToDoctor));
}

/**
 * Find all doctors
 */
export async function findAll(): Promise<Doctor[]> {
  const results = await db.query.doctors.findMany({
    orderBy: [desc(doctors.verified), asc(doctors.firstName), asc(doctors.lastName)],
  });

  return Promise.all(results.map(mapDbDoctorToDoctor));
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

  return Promise.all(results.map(mapDbDoctorToDoctor));
}

/**
 * Get doctors pending verification (pending or in_review)
 */
export async function getDoctorsPendingVerification(): Promise<Doctor[]> {
  const results = await db.query.doctors.findMany({
    where: inArray(doctors.verificationStatus, ["pending", "in_review"]),
    orderBy: [asc(doctors.createdAt)], // Oldest first
  });

  return Promise.all(results.map(mapDbDoctorToDoctor));
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

  return await mapDbDoctorToDoctor(doctor);
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
