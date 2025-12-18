"use cache";

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import ClubsMain from "@/components/features/clubs/ClubsMain";
import ClubSearchFilters from "@/components/features/clubs/ClubSearchFilters";
import ItemListSchema from "@/components/SEO/ItemListSchema";
import { searchClubs, getUniqueLocations } from "@/modules/clubs/clubs.service";
import { routes } from "@/lib/routes";
import SectionTitle from "@/components/shared/SectionTitle";
import type { Club, ClubSearchFilters as ClubSearchFiltersType } from "@/modules/clubs/clubs.types";
import {
  parseLocationSlug,
  generateLocationSlug,
  getLocationDisplayName,
} from "@/lib/utils/location";
import { cacheTag } from "next/cache";

interface LocationPageProps {
  params: Promise<{
    location: string;
  }>;
}

/**
 * Generate static params for location pages
 * Returns all unique city/district combinations from clubs
 * Falls back to common locations if database is unavailable during build
 */
export async function generateStaticParams() {
  try {
    const locations = await getUniqueLocations();
    if (locations && locations.length > 0) {
      return locations.map((loc) => ({
        location: generateLocationSlug(loc.city, loc.district),
      }));
    }
  } catch (error) {
    console.error("Error generating static params for location pages:", error);
  }
  // Return common locations as fallback to satisfy Cache Components requirement
  return [
    { location: "bucuresti" },
    { location: "cluj-napoca" },
    { location: "timisoara" },
    { location: "iasi" },
    { location: "constanta" },
  ];
}

/**
 * Generate metadata for location page
 */
export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { location } = await params;
  const { city, district } = parseLocationSlug(location);
  const locationDisplayName = getLocationDisplayName(city, district);

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro";

  const title = district
    ? `Cluburi Sportive ${district}, ${city} - Yuvoo`
    : `Cluburi Sportive ${city} - Yuvoo`;

  const description = district
    ? `Descoperă cluburi sportive verificate pentru copii în ${district}, ${city}. Găsește activități sportive potrivite, programe adaptate pe vârstă și probe gratuite. Toate cluburile sunt verificate de echipa Yuvoo.`
    : `Descoperă cluburi sportive verificate pentru copii în ${city}. Găsește activități sportive potrivite, programe adaptate pe vârstă și probe gratuite. Toate cluburile sunt verificate de echipa Yuvoo.`;

  return {
    title,
    description,
    keywords: [
      `cluburi sport copii ${locationDisplayName}`,
      `activități sportive ${locationDisplayName}`,
      `sport copii ${locationDisplayName}`,
      district ? `cluburi ${district}` : undefined,
      `cluburi verificate ${city}`,
    ].filter(Boolean) as string[],
    openGraph: {
      title,
      description,
      url: `${baseUrl}${routes.clubs.location(location)}`,
      siteName: "Yuvoo",
      type: "website",
      locale: "ro_RO",
    },
    alternates: {
      canonical: `${baseUrl}${routes.clubs.location(location)}`,
    },
  };
}

/**
 * Location-Specific Clubs Listing Page
 *
 * Public page displaying clubs filtered by location (city and/or district).
 * Uses Next.js 16 Cache Components with "use cache" directive.
 * SEO-friendly route: /cluburi/locatie/[location]
 *
 * Examples:
 * - /cluburi/locatie/bucuresti (all clubs in Bucharest)
 * - /cluburi/locatie/bucuresti-sector-1 (clubs in Sector 1, Bucharest)
 */
export default async function LocationClubsPage({ params }: LocationPageProps) {
  const { location } = await params;
  const { city, district } = parseLocationSlug(location);

  // Build filters for this location
  const filters: ClubSearchFiltersType = {
    city,
    district: district || undefined,
    sortBy: "verified",
  };

  // Fetch clubs with location filters
  const result = await searchClubs(filters);
  const clubs: Club[] = result.clubs;

  // Cache tag for revalidation
  cacheTag(`clubs-location-${location}`);
  cacheTag(`clubs-city-${city.toLowerCase()}`);
  if (district) {
    cacheTag(`clubs-district-${district.toLowerCase()}`);
  }

  // If no clubs found, return 404
  if (clubs.length === 0) {
    notFound();
  }

  const locationDisplayName = getLocationDisplayName(city, district);

  return (
    <>
      <ItemListSchema
        items={clubs}
        type="Club"
        listName={`Cluburi Sportive ${locationDisplayName}`}
      />
      <BreadcrumbOne
        title={`Cluburi ${locationDisplayName}`}
        subTitle="Cluburi"
        items={[
          { name: "Yuvoo", url: routes.home },
          { name: "Cluburi", url: routes.clubs.list },
          { name: locationDisplayName, url: routes.clubs.location(location) }, // Current page
        ]}
      />
      <section className="bd-clubs-intro-area pt-120 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <SectionTitle
                title={`Cluburi Sportive Verificate în ${locationDisplayName}`}
                subtitle={
                  <>
                    Descoperă cluburi sportive verificate pentru copii în {locationDisplayName}.
                    Filtrează după sport sau vârstă pentru a găsi activități potrivite. Dacă nu ești
                    sigur ce sport se potrivește copilului tău, încearcă{" "}
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
      <ClubsMain clubs={clubs} />
    </>
  );
}
