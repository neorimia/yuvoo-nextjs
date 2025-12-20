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
  secondarySpecialties?: DoctorSpecialty[];
  description: string;
  credentials: string[]; // e.g., ["MD", "Pediatric Orthopedist"]
  location: {
    city: string;
    district?: string;
    address: string;
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
  verificationStatus?: "pending" | "in_review" | "approved" | "rejected";
  verificationDocuments?: string[];
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
