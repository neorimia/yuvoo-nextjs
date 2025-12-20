/**
 * Clubs Types
 *
 * TypeScript types for sports club domain.
 */

export interface Club {
  id: string;
  name: string;
  slug: string;
  description: string;
  sportId: string;
  sportName: string;
  location: {
    city: string;
    district?: string;
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  ageGroups: number[]; // e.g., [4, 5, 6, 7, 8]
  levels: string[]; // e.g., ["beginner", "intermediate", "advanced"]
  verified: boolean;
  featured: boolean;
  images: string[];
  contact: {
    phone?: string;
    email?: string;
    website?: string;
  };
  schedule?: {
    day: string;
    // New format (preferred)
    startTime?: string;
    endTime?: string;
    // Old format (backward compatibility)
    time?: string;
  }[];
  pricing?: {
    type: "monthly" | "per_class" | "per_semester";
    amount: number;
    currency: "RON";
  }[];
  verificationStatus: "pending" | "in_review" | "approved" | "rejected"; // From schema: verification_status (notNull, default "pending")
  verificationDocuments?: string[]; // From schema: verification_documents (text array, default '{}')
  profileComplete: boolean; // From schema: profile_complete (notNull, default false)
  rating: number; // From schema: rating (integer, default 0)
  createdAt: Date; // From schema: created_at (notNull, defaultNow)
  updatedAt: Date; // From schema: updated_at (notNull, defaultNow)
}

export interface ClubSearchFilters {
  sportId?: string;
  age?: number;
  city?: string;
  district?: string;
  level?: string;
  verified?: boolean;
  featured?: boolean;
  // Location-based search
  latitude?: number;
  longitude?: number;
  radiusKm?: number; // Search radius in kilometers
  page?: number;
  pageSize?: number;
  sortBy?: "name" | "verified" | "rating" | "distance";
}

export interface ClubSearchResult {
  clubs: Club[];
  total: number;
  page: number;
  pageSize: number;
  // Distance in kilometers (if location-based search was used)
  distances?: Map<string, number>;
}
