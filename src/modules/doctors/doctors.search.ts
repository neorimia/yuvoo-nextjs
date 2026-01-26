/**
 * Doctors Search
 *
 * Search and filtering logic for pediatric specialists.
 * Handles complex queries with multiple filters, sorting, and pagination.
 */

import { db } from "@/lib/db";
import { doctors } from "@/lib/db/schema";
import { eq, and, desc, asc, sql } from "drizzle-orm";
import { doctorsRepository } from "./doctors.repository";
import type { DoctorSearchFilters, DoctorSearchResult } from "./doctors.types";

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
  const page = filters.page || 1;
  const pageSize = filters.pageSize || 20;
  const offset = (page - 1) * pageSize;

  // Build where conditions
  const conditions = [];

  // Specialty filter
  if (filters.specialty) {
    conditions.push(eq(doctors.specialty, filters.specialty));
  }

  // Phase 6: Location filters - only ID-based (text columns removed)
  if (filters.cityId) {
    conditions.push(eq(doctors.cityId, filters.cityId));
  }

  if (filters.sectorId) {
    conditions.push(eq(doctors.sectorId, filters.sectorId));
  }

  // County filter (Phase 5: new filter option)
  if (filters.countyId) {
    conditions.push(eq(doctors.countyId, filters.countyId));
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
  // Phase 5: mapDbDoctorToDoctor is now async, use Promise.all
  const doctorsList = await Promise.all(results.map(doctorsRepository.mapDbDoctorToDoctor));

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
