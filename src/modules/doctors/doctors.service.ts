/**
 * Doctors Service
 *
 * Business logic for pediatric specialist operations.
 * Handles doctor discovery, search, and details.
 */

import { db } from "@/lib/db";
import { doctors } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { doctorsRepository } from "./doctors.repository";
import { doctorsSearch } from "./doctors.search";
import type { Doctor, DoctorSearchFilters, DoctorSearchResult } from "./doctors.types";

/**
 * Get doctor by slug
 */
export async function getDoctorBySlug(slug: string): Promise<Doctor | null> {
  return doctorsRepository.findBySlug(slug);
}

/**
 * Search doctors with filters
 */
export async function searchDoctors(filters: DoctorSearchFilters): Promise<DoctorSearchResult> {
  return doctorsSearch.search(filters);
}

/**
 * Get doctors by specialty
 */
export async function getDoctorsBySpecialty(specialty: string): Promise<Doctor[]> {
  return doctorsRepository.findBySpecialty(specialty);
}

/**
 * Get all doctors
 * Used for sitemap generation and bulk operations
 */
export async function getAllDoctors(): Promise<Doctor[]> {
  return doctorsRepository.findAll();
}

/**
 * Verify doctor ownership
 * Throws error if doctor doesn't exist or user doesn't own it
 */
export async function verifyDoctorOwnership(doctorId: string, userId: string): Promise<Doctor> {
  const doctor = await doctorsRepository.getDoctorById(doctorId);
  if (!doctor) {
    throw new Error("Doctorul nu a fost găsit");
  }

  // Check ownership via userId
  const dbDoctor = await db.query.doctors.findFirst({
    where: eq(doctors.id, doctorId),
    columns: { userId: true },
  });

  if (!dbDoctor || dbDoctor.userId !== userId) {
    throw new Error("Nu ai permisiunea de a gestiona acest profil de doctor");
  }

  return doctor;
}

/**
 * Update doctor profile (with ownership verification)
 */
export async function updateDoctor(
  doctorId: string,
  userId: string,
  updates: Partial<{
    firstName: string;
    lastName: string;
    title: string | null;
    specialty: string;
    bio: string | null;
    yearsOfExperience: number | null;
    secondarySpecialties: string[];
    credentials: string[];
    languages: string[];
    city: string;
    district: string | null;
    address: string | null;
    phone: string | null;
    email: string | null;
    website: string | null;
    acceptingNewPatients: boolean;
    onlineConsultations: boolean;
    schedule: unknown;
    photoUrl: string | null;
  }>
): Promise<Doctor> {
  // Verify ownership first
  await verifyDoctorOwnership(doctorId, userId);

  // Update doctor
  const [updatedDoctor] = await db
    .update(doctors)
    .set({
      ...updates,
      updatedAt: new Date(),
    })
    .where(and(eq(doctors.id, doctorId), eq(doctors.userId, userId)))
    .returning();

  if (!updatedDoctor) {
    throw new Error("Eroare la actualizarea profilului de doctor");
  }

  return doctorsRepository.mapDbDoctorToDoctor(updatedDoctor);
}

/**
 * Delete doctor profile (with ownership verification)
 */
export async function deleteDoctor(doctorId: string, userId: string): Promise<void> {
  // Verify ownership first
  await verifyDoctorOwnership(doctorId, userId);

  // Delete doctor
  await db.delete(doctors).where(and(eq(doctors.id, doctorId), eq(doctors.userId, userId)));
}
