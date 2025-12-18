import React from "react";
import { headers } from "next/headers";
import Link from "next/link";
import type { Metadata } from "next";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import ClubsMain from "@/components/features/clubs/ClubsMain";
import ClubSearchFilters from "@/components/features/clubs/ClubSearchFilters";
import { searchClubs } from "@/modules/clubs/clubs.service";
import { routes } from "@/lib/routes";
import SectionTitle from "@/components/shared/SectionTitle";
import type { Club, ClubSearchFilters as ClubSearchFiltersType } from "@/modules/clubs/clubs.types";
import ItemListSchema from "@/components/SEO/ItemListSchema";

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
  // Make page dynamic to avoid Sentry crypto.randomUUID() issue during build
  await headers();
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
      <ItemListSchema items={clubs} type="Club" listName="Cluburi Sportive Verificate" />
      <BreadcrumbOne
        title="Cluburi Sportive"
        subTitle="Cluburi"
        items={[
          { name: "Yuvoo", url: routes.home },
          { name: "Cluburi", url: routes.clubs.list }, // Current page
        ]}
      />
      <section className="bd-clubs-intro-area pt-120 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <SectionTitle
                title="Cluburi Sportive Verificate"
                subtitle={
                  <>
                    Descoperă cluburi sportive verificate pentru copii. Filtrează după sport,
                    locație sau vârstă. Dacă nu ești sigur ce sport se potrivește copilului tău,
                    încearcă{" "}
                    <Link
                      href={routes.quiz.intro}
                      className="text-primary text-decoration-underline"
                    >
                      chestionarul AI
                    </Link>{" "}
                    pentru recomandări personalizate. Explorează și{" "}
                    <Link
                      href={routes.sports.list}
                      className="text-primary text-decoration-underline"
                    >
                      toate sporturile disponibile
                    </Link>{" "}
                    pentru a înțelege mai bine opțiunile.
                  </>
                }
                className="text-center mb-50"
                animationDelay=".2s"
              />
            </div>
          </div>
        </div>
      </section>
      <ClubSearchFilters initialFilters={filters} />
      <ClubsMain
        clubs={clubs}
        recommendedSportIds={isQuizContext === "true" ? recommendedSportIds : undefined}
        isQuizContext={isQuizContext === "true"}
      />
    </>
  );
}
