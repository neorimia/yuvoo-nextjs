/**
 * Doctors Search
 *
 * Search and filtering logic for pediatric specialists.
 * Handles complex queries with multiple filters, sorting, and pagination.
 */

"use cache";

import { db } from "@/lib/db";
import { doctors } from "@/lib/db/schema";
import { eq, and, ilike, desc, asc, sql } from "drizzle-orm";
import { doctorsRepository } from "./doctors.repository";
import type { DoctorSearchFilters, DoctorSearchResult } from "./doctors.types";
import { cacheLife, cacheTag } from "next/cache";

/**
 * Search doctors with filters
 *
 * Supports filtering by:
 * - specialty: Filter by medical specialty
 * - city: Filter by city (case-insensitive)
 * - district: Filter by district/sector (case-insensitive)
 * - verified: Filter by verification status
 * - acceptingNewPatients: Filter by doctors accepting new patients
 * - onlineConsultations: Filter by doctors offering online consultations
 *
 * Supports sorting by:
 * - name: Alphabetical by name (firstName + lastName)
 * - specialty: Group by specialty, then by name
 * - verified: Verified doctors first, then by name
 *
 * Supports pagination with page and pageSize.
 */
export async function search(filters: DoctorSearchFilters): Promise<DoctorSearchResult> {
  // Cache strategy: Cache for 1 hour, revalidate on doctor updates
  cacheLife("hours");
  cacheTag("doctors-list");

  // Add specific cache tags based on filters for better granular revalidation
  if (filters.specialty) {
    cacheTag(`doctors-specialty-${filters.specialty}`);
  }
  if (filters.city) {
    cacheTag(`doctors-city-${filters.city.toLowerCase()}`);
  }
  if (filters.verified !== undefined) {
    cacheTag(`doctors-verified-${filters.verified}`);
  }

  const page = filters.page || 1;
  const pageSize = filters.pageSize || 20;
  const offset = (page - 1) * pageSize;

  // Build where conditions
  const conditions = [];

  // Specialty filter
  if (filters.specialty) {
    conditions.push(eq(doctors.specialty, filters.specialty));
  }

  // City filter (case-insensitive)
  if (filters.city) {
    conditions.push(ilike(doctors.city, filters.city));
  }

  // District filter (case-insensitive)
  if (filters.district) {
    conditions.push(ilike(doctors.district, filters.district));
  }

  // Verified filter
  if (filters.verified !== undefined) {
    conditions.push(eq(doctors.verified, filters.verified));
  }

  // Accepting new patients filter
  if (filters.acceptingNewPatients !== undefined) {
    conditions.push(eq(doctors.acceptingNewPatients, filters.acceptingNewPatients));
  }

  // Online consultations filter
  if (filters.onlineConsultations !== undefined) {
    conditions.push(eq(doctors.onlineConsultations, filters.onlineConsultations));
  }

  // Build where clause
  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  // Build order by clause
  let orderBy;
  switch (filters.sortBy) {
    case "name":
      orderBy = [asc(doctors.firstName), asc(doctors.lastName)];
      break;
    case "specialty":
      orderBy = [asc(doctors.specialty), asc(doctors.firstName), asc(doctors.lastName)];
      break;
    case "verified":
    default:
      orderBy = [desc(doctors.verified), asc(doctors.firstName), asc(doctors.lastName)];
      break;
  }

  // Get total count (for pagination metadata)
  const countResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(doctors)
    .where(whereClause);
  const total = Number(countResult[0]?.count || 0);

  // Get paginated results
  const results = await db.query.doctors.findMany({
    where: whereClause,
    orderBy,
    limit: pageSize,
    offset,
  });

  // Map database results to Doctor type
  const doctorsList = results.map(doctorsRepository.mapDbDoctorToDoctor);

  return {
    doctors: doctorsList,
    total,
    page,
    pageSize,
  };
}

export const doctorsSearch = {
  search,
};
