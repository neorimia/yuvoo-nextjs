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
    time: string;
  }[];
  pricing?: {
    type: "monthly" | "per_class" | "per_semester";
    amount: number;
    currency: "RON";
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface ClubSearchFilters {
  sportId?: string;
  age?: number;
  city?: string;
  district?: string;
  level?: string;
  verified?: boolean;
  featured?: boolean;
  page?: number;
  pageSize?: number;
  sortBy?: "name" | "verified" | "rating";
}

export interface ClubSearchResult {
  clubs: Club[];
  total: number;
  page: number;
  pageSize: number;
}
