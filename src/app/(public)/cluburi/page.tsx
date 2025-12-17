import React from "react";
import type { Metadata } from "next";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import ClubsMain from "@/components/features/clubs/ClubsMain";
import ClubSearchFilters from "@/components/features/clubs/ClubSearchFilters";
import { searchClubs } from "@/modules/clubs/clubs.service";
import { routes } from "@/lib/routes";
import type { Club, ClubSearchFilters as ClubSearchFiltersType } from "@/modules/clubs/clubs.types";

/**
 * Generate metadata for clubs listing page
 * Uses base URL without query params as canonical URL
 */
export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro";

  return {
    title: "Cluburi Sportive - Yuvoo",
    description:
      "Descoperă cluburi sportive verificate pentru copii. Găsește activități sportive potrivite în orașul tău.",
    alternates: {
      canonical: `${baseUrl}/cluburi`,
    },
  };
}

interface ClubsPageProps {
  searchParams: Promise<{
    sport?: string;
    quiz?: string;
    city?: string;
    district?: string;
    age?: string;
    level?: string;
    verified?: string;
    featured?: string;
    sortBy?: string;
  }>;
}

/**
 * Clubs Listing Page
 *
 * Public page displaying all sports clubs.
 * Supports filtering by sport (from quiz recommendations) and quiz context.
 * SEO-friendly route: /cluburi
 */
export default async function ClubsPage({ searchParams }: ClubsPageProps) {
  const params = await searchParams;
  const {
    sport: sportId,
    quiz: isQuizContext,
    city,
    district,
    age,
    level,
    verified,
    featured,
    sortBy,
  } = params;

  // Build filters object from search params
  const filters: ClubSearchFiltersType = {
    sportId: sportId || undefined,
    city: city || undefined,
    district: district || undefined,
    age: age ? parseInt(age) : undefined,
    level: level || undefined,
    verified: verified === "true" ? true : undefined,
    featured: featured === "true" ? true : undefined,
    sortBy: (sortBy as "name" | "verified" | "rating") || "verified",
  };

  // Fetch clubs with filters
  const result = await searchClubs(filters);
  const clubs: Club[] = result.clubs;
  const recommendedSportIds: string[] = sportId ? [sportId] : [];

  return (
    <>
      <BreadcrumbOne
        title="Cluburi Sportive"
        subTitle="Cluburi"
        items={[
          { name: "Yuvoo", url: routes.home },
          { name: "Cluburi", url: routes.clubs.list }, // Current page
        ]}
      />
      <ClubSearchFilters initialFilters={filters} />
      <ClubsMain
        clubs={clubs}
        recommendedSportIds={isQuizContext === "true" ? recommendedSportIds : undefined}
        isQuizContext={isQuizContext === "true"}
      />
    </>
  );
}
