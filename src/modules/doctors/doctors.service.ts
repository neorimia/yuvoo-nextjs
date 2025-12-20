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
 * Get doctor by user ID
 */
export async function getDoctorByUserId(userId: string): Promise<Doctor | null> {
  return doctorsRepository.findByUserId(userId);
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

/**
 * Calculate profile completeness for a doctor
 * Returns percentage, completed fields count, total fields, and missing fields list
 */
export function calculateProfileCompleteness(doctor: Doctor): {
  percentage: number;
  completedFields: number;
  totalFields: number;
  missingFields: string[];
} {
  const requiredFields = [
    { key: "name", label: "Nume" },
    { key: "specialty", label: "Specialitate" },
    { key: "description", label: "Descriere" },
    { key: "credentials", label: "Calificări" },
    { key: "location.city", label: "Oraș" },
    { key: "location.address", label: "Adresă" },
    { key: "contact.phone", label: "Telefon" },
    { key: "contact.email", label: "Email" },
    { key: "image", label: "Fotografie profil" },
  ];

  let completedFields = 0;
  const missingFields: string[] = [];

  for (const field of requiredFields) {
    let isComplete = false;

    switch (field.key) {
      case "name":
        isComplete = !!doctor.name && doctor.name.trim().length > 0;
        break;
      case "specialty":
        isComplete = !!doctor.specialty && doctor.specialty.trim().length > 0;
        break;
      case "description":
        isComplete = !!doctor.description && doctor.description.trim().length > 0;
        break;
      case "credentials":
        isComplete =
          !!doctor.credentials &&
          Array.isArray(doctor.credentials) &&
          doctor.credentials.length > 0;
        break;
      case "location.city":
        isComplete = !!doctor.location?.city && doctor.location.city.trim().length > 0;
        break;
      case "location.address":
        isComplete = !!doctor.location?.address && doctor.location.address.trim().length > 0;
        break;
      case "contact.phone":
        isComplete = !!doctor.contact?.phone && doctor.contact.phone.trim().length > 0;
        break;
      case "contact.email":
        isComplete = !!doctor.contact?.email && doctor.contact.email.trim().length > 0;
        break;
      case "image":
        isComplete = !!doctor.image && doctor.image.trim().length > 0;
        break;
    }

    if (isComplete) {
      completedFields++;
    } else {
      missingFields.push(field.label);
    }
  }

  const totalFields = requiredFields.length;
  const percentage = Math.round((completedFields / totalFields) * 100);

  return {
    percentage,
    completedFields,
    totalFields,
    missingFields,
  };
}
