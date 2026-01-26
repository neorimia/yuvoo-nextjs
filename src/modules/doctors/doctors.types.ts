/**
 * Doctors Types
 *
 * TypeScript types for pediatric specialist domain.
 */

export type DoctorSpecialty = "orthopedist" | "nutritionist" | "psychologist" | "general";

export interface Doctor {
  id: string;
  name: string; // Computed from firstName + lastName + title (for backward compatibility)
  firstName: string; // From schema: first_name (notNull)
  lastName: string; // From schema: last_name (notNull)
  title?: string; // From schema: title (optional)
  slug: string; // From schema: slug (unique)
  specialty: DoctorSpecialty; // From schema: specialty (notNull)
  secondarySpecialties?: string[]; // From schema: secondary_specialties (text array, default '{}')
  description: string; // From schema: bio (mapped to description)
  credentials: string[]; // From schema: credentials (text array, default '{}')
  yearsOfExperience?: number; // From schema: years_of_experience (integer, optional)
  languages?: string[]; // From schema: languages (text array, default '{}')
  location: {
    city: string; // From schema: city (notNull)
    district?: string; // From schema: district (optional)
    address?: string; // From schema: address (optional)
    coordinates?: {
      lat: number;
      lng: number;
    };
    // Phase 5: Location foreign keys (for filtering and joins)
    cityId?: string;
    sectorId?: string;
    countyId?: string;
  };
  contact: {
    phone?: string; // From schema: phone (optional)
    email?: string; // From schema: email (optional)
    website?: string; // From schema: website (optional)
  };
  image?: string; // From schema: photo_url (mapped to image, optional)
  verified: boolean; // From schema: verified (notNull, default false)
  rating: number; // From schema: rating (integer, default 0)
  acceptingNewPatients: boolean; // From schema: accepting_new_patients (notNull, default true)
  onlineConsultations: boolean; // From schema: online_consultations (notNull, default false)
  schedule?: Array<{ day: string; startTime: string; endTime: string }>; // From schema: schedule (JSONB, default '[]')
  verificationStatus: "pending" | "in_review" | "approved" | "rejected"; // From schema: verification_status (notNull, default "pending")
  verificationDocuments?: string[]; // From schema: verification_documents (text array, default '{}')
  profileComplete: boolean; // From schema: profile_complete (notNull, default false)
  createdAt: Date; // From schema: created_at (notNull, defaultNow)
  updatedAt: Date; // From schema: updated_at (notNull, defaultNow)
}

export interface DoctorSearchFilters {
  specialty?: DoctorSpecialty;
  // Phase 6: Only ID-based filters (text columns removed)
  cityId?: string; // Location ID filter (required for city filtering)
  sectorId?: string; // Sector ID filter (for Bucharest)
  countyId?: string; // County ID filter (for county-wide searches)
  verified?: boolean;
  acceptingNewPatients?: boolean;
  onlineConsultations?: boolean;
  page?: number;
  pageSize?: number;
  sortBy?: "name" | "specialty" | "verified";
}

export interface DoctorSearchResult {
  doctors: Doctor[];
  total: number;
  page: number;
  pageSize: number;
}
