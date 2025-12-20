/**
 * Doctors Types
 *
 * TypeScript types for pediatric specialist domain.
 */

export type DoctorSpecialty = "orthopedist" | "nutritionist" | "psychologist" | "general";

export interface Doctor {
  id: string;
  name: string;
  slug: string;
  specialty: DoctorSpecialty;
  secondarySpecialties?: string[]; // Array of secondary specialty strings (not enum)
  description: string;
  credentials: string[]; // e.g., ["MD", "Pediatric Orthopedist"]
  yearsOfExperience?: number; // Years of professional experience
  languages?: string[]; // Languages spoken, e.g., ["Română", "Engleză"]
  location: {
    city: string;
    district?: string;
    address?: string; // Optional in schema (text field, no .notNull())
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  contact: {
    phone?: string;
    email?: string;
    website?: string;
  };
  image?: string;
  verified: boolean;
  acceptingNewPatients?: boolean; // Whether doctor is accepting new patients
  onlineConsultations?: boolean; // Whether doctor offers online consultations
  schedule?: Array<{ day: string; startTime: string; endTime: string }>; // Weekly schedule
  verificationStatus?: "pending" | "in_review" | "approved" | "rejected";
  verificationDocuments?: string[];
  profileComplete?: boolean; // Whether profile is complete
  createdAt: Date;
  updatedAt: Date;
}

export interface DoctorSearchFilters {
  specialty?: DoctorSpecialty;
  city?: string;
  district?: string;
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
