import React from "react";
import type { Metadata } from "next";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import ClubsMain from "@/components/features/clubs/ClubsMain";
import { searchClubs } from "@/modules/clubs/clubs.service";
import type { Club } from "@/modules/clubs/clubs.types";

export const metadata: Metadata = {
  title: "Cluburi Sportive - Yuvoo",
  description:
    "Descoperă cluburi sportive verificate pentru copii. Găsește activități sportive potrivite în orașul tău.",
};

interface ClubsPageProps {
  searchParams: Promise<{
    sport?: string;
    quiz?: string;
    city?: string;
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
  const { sport: sportId, quiz: isQuizContext, city } = params;

  // Fetch clubs with filters
  let clubs: Club[] = [];
  let recommendedSportIds: string[] = [];

  if (sportId) {
    // Filter by specific sport (from quiz recommendation)
    const result = await searchClubs({
      sportId,
      city: city || undefined,
      verified: true, // Prefer verified clubs
      sortBy: "verified",
    });
    clubs = result.clubs;
    recommendedSportIds = [sportId];
  } else {
    // Fetch all clubs (or with city filter)
    const result = await searchClubs({
      city: city || undefined,
      verified: true,
      sortBy: "verified",
    });
    clubs = result.clubs;
  }

  return (
    <>
      <BreadcrumbOne title="Cluburi Sportive" subTitle="Cluburi" />
      <ClubsMain
        clubs={clubs}
        recommendedSportIds={isQuizContext === "true" ? recommendedSportIds : undefined}
        isQuizContext={isQuizContext === "true"}
      />
    </>
  );
}
