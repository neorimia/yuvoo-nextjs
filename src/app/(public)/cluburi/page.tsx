import React from "react";
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
import { PRE_LAUNCH_RESTRICTIONS_ENABLED } from "@/lib/config/pre-launch";
import PreLaunchPage from "@/components/features/early-access/PreLaunchPage";
import { normalizeSportName } from "@/lib/utils/sport-normalization";

/**
 * Generate metadata for clubs listing page
 * Uses base URL without query params as canonical URL
 *
 * Note: This route is dynamic due to searchParams usage in the page component.
 * Metadata is static and doesn't require dynamic APIs.
 */
export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro";

  return {
    title: "Cluburi Sportive - Yuvoo",
    description:
      "Descoperă cluburi sportive pentru copii. Găsește activități sportive potrivite în orașul tău.",
    alternates: {
      canonical: `${baseUrl}/cluburi`,
    },
  };
}

interface ClubsPageProps {
  searchParams: Promise<{
    sport?: string;
    quiz?: string;
    city?: string; // Legacy support
    cityId?: string; // Preferred: location ID
    sectorId?: string; // Sector ID (for Bucharest)
    district?: string; // Legacy support
    age?: string;
    level?: string;
    verified?: string;
    featured?: string;
    sortBy?: string;
    page?: string; // Pagination page number
  }>;
}

/**
 * Clubs Listing Page
 *
 * Public page displaying all sports clubs.
 * Supports filtering by sport (from quiz recommendations) and quiz context.
 * SEO-friendly route: /cluburi
 * Dynamic route due to searchParams
 */
export default async function ClubsPage({ searchParams }: ClubsPageProps) {
  // Access dynamic data sources first to mark route as dynamic
  // This prevents crypto.randomUUID() errors (e.g., from Sentry) during prerendering
  const params = await searchParams;

  if (PRE_LAUNCH_RESTRICTIONS_ENABLED) {
    return <PreLaunchPage routeType="club-portal" />;
  }
  const {
    sport: sportId,
    quiz: isQuizContext,
    cityId,
    sectorId,
    age,
    level,
    verified,
    featured,
    sortBy,
    page: pageParam,
  } = params;

  // Build filters object from search params
  // Prefer cityId over city (cityId is the new format)
  // Normalize sport ID to match database format (e.g., "înot" → "inot")
  const page = pageParam ? parseInt(pageParam) : 1;
  const pageSize = 9; // Default page size

  const filters: ClubSearchFiltersType = {
    sportId: sportId ? normalizeSportName(sportId) : undefined,
    cityId: cityId || undefined, // Use cityId if provided
    sectorId: sectorId || undefined,
    // Legacy support: if cityId not provided but city is, we'd need to convert
    // For now, cityId takes precedence
    age: age ? parseInt(age) : undefined,
    level: level || undefined,
    verified: verified === "true" ? true : undefined,
    featured: featured === "true" ? true : undefined,
    sortBy: (sortBy as "name" | "verified" | "rating") || "verified",
    page,
    pageSize,
  };

  // Fetch clubs with filters and pagination
  const result = await searchClubs(filters);
  const clubs: Club[] = result.clubs;
  // Normalize sport ID for recommended sports display
  const recommendedSportIds: string[] = filters.sportId ? [filters.sportId] : [];
  return (
    <>
      <ItemListSchema items={clubs} type="Club" listName="Cluburi Sportive" />
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
                title="Cluburi Sportive"
                subtitle={
                  <>
                    Descoperă cluburi sportive pentru copii. Filtrează după sport, locație sau
                    vârstă. Dacă nu ești sigur ce sport se potrivește copilului tău, încearcă{" "}
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
        pagination={{
          currentPage: result.page,
          totalPages: Math.ceil(result.total / result.pageSize),
          total: result.total,
          pageSize: result.pageSize,
        }}
      />
    </>
  );
}
