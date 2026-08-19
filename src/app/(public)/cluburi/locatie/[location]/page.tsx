"use cache";

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import ClubsMain from "@/components/features/clubs/ClubsMain";
import ClubSearchFilters from "@/components/features/clubs/ClubSearchFilters";
import ItemListSchema from "@/components/SEO/ItemListSchema";
import LocationContentExpanded from "@/components/features/clubs/LocationContentExpanded";
import { searchClubs, getUniqueLocations } from "@/modules/clubs/clubs.service";
import { generateLocationExpandedContent } from "@/lib/content/location-expanded-content";
import { routes } from "@/lib/routes";
import SectionTitle from "@/components/shared/SectionTitle";
import type { Club, ClubSearchFilters as ClubSearchFiltersType } from "@/modules/clubs/clubs.types";
import {
  parseLocationSlug,
  generateLocationSlug,
  getLocationDisplayName,
} from "@/lib/utils/location";
import { getCityIdByName, getSectorIdByName } from "@/lib/db/location-helpers";
import { getSiteUrl } from "@/lib/seo/site-url";
import { cacheTag } from "next/cache";
import { PRE_LAUNCH_RESTRICTIONS_ENABLED } from "@/lib/config/pre-launch";
import PreLaunchPage from "@/components/features/early-access/PreLaunchPage";

interface LocationPageProps {
  params: Promise<{
    location: string;
  }>;
}

/**
 * Generate static params for location pages
 * Returns common Romanian cities for static generation during build
 * Dynamic locations will be handled at runtime via ISR
 */
export async function generateStaticParams() {
  // During production builds, skip database queries and use predefined locations
  // This prevents "Connection terminated unexpectedly" errors during build time
  // ISR will handle dynamic locations at runtime
  const isProductionBuild = process.env.NEXT_PHASE === "phase-production-build";

  if (isProductionBuild) {
    return [
      { location: "bucuresti" },
      { location: "cluj-napoca" },
      { location: "timisoara" },
      { location: "iasi" },
      { location: "constanta" },
      { location: "brasov" },
      { location: "craiova" },
      { location: "galati" },
      { location: "ploiesti" },
      { location: "oradea" },
    ];
  }

  // In development, try to fetch from database for testing
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

  // Fallback for development
  return [{ location: "bucuresti" }, { location: "cluj-napoca" }, { location: "timisoara" }];
}

/**
 * Generate metadata for location page
 */
export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { location } = await params;
  const { city, district } = parseLocationSlug(location);
  const locationDisplayName = getLocationDisplayName(city, district);

  const baseUrl = getSiteUrl();

  const title = district
    ? `Cluburi Sportive ${district}, ${city} - Yuvoo`
    : `Cluburi Sportive ${city} - Yuvoo`;

  const description = district
    ? `Găsește cluburi sportive pentru copii în ${district}, ${city}. Filtrează după sport și vârstă. Cluburile cu badge verificat au trecut procesul nostru de validare.`
    : `Găsește cluburi sportive pentru copii în ${city}. Filtrează după sport și vârstă. Cluburile cu badge verificat au trecut procesul nostru de validare.`;

  return {
    title,
    description,
    keywords: [
      `cluburi sport copii ${locationDisplayName}`,
      `activități sportive ${locationDisplayName}`,
      `sport copii ${locationDisplayName}`,
      district ? `cluburi ${district}` : undefined,
      `cluburi sportive ${city}`,
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
  if (PRE_LAUNCH_RESTRICTIONS_ENABLED) {
    return <PreLaunchPage routeType="club-portal" />;
  }

  const { location } = await params;
  const { city, district } = parseLocationSlug(location);

  // Check if we're in production build phase
  const isProductionBuild = process.env.NEXT_PHASE === "phase-production-build";

  // Convert city/district names to IDs for filtering
  const cityId = await getCityIdByName(city);
  let sectorId: string | undefined = undefined;

  // If district is provided and we have a cityId, try to get sectorId
  if (district && cityId) {
    const foundSectorId = await getSectorIdByName(district, cityId);
    sectorId = foundSectorId || undefined;
  }

  // Build filters for this location using IDs
  const filters: ClubSearchFiltersType = {
    cityId: cityId || undefined,
    sectorId,
    sortBy: "verified",
  };

  // During production builds, skip database queries and use empty array
  // At runtime, ISR will fetch actual clubs
  const clubs: Club[] = isProductionBuild ? [] : (await searchClubs(filters)).clubs;

  // Cache tag for revalidation (only at runtime)
  if (!isProductionBuild) {
    cacheTag(`clubs-location-${location}`);
    cacheTag(`clubs-city-${city.toLowerCase()}`);
    if (district) {
      cacheTag(`clubs-district-${district.toLowerCase()}`);
    }

    // If no clubs found, return 404 (only at runtime)
    if (clubs.length === 0) {
      notFound();
    }
  }

  const locationDisplayName = getLocationDisplayName(city, district);

  const allLocations = isProductionBuild ? [] : await getUniqueLocations();
  const siblingLocations = allLocations
    .filter((loc) => {
      const slug = generateLocationSlug(loc.city, loc.district);
      return slug !== location && loc.city.toLowerCase() === city.toLowerCase();
    })
    .map((loc) => ({
      slug: generateLocationSlug(loc.city, loc.district),
      displayName: getLocationDisplayName(loc.city, loc.district),
    }))
    .slice(0, 8);

  // Include parent city hub when viewing a district
  if (district && !isProductionBuild) {
    const citySlug = generateLocationSlug(city);
    if (citySlug !== location) {
      siblingLocations.unshift({
        slug: citySlug,
        displayName: getLocationDisplayName(city),
      });
    }
  }

  const expandedContent = generateLocationExpandedContent({
    city,
    district,
    locationDisplayName,
    clubs,
    siblingLocations,
  });

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
      <section className="bd-clubs-intro-area pt-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <SectionTitle
                title={`Cluburi Sportive în ${locationDisplayName}`}
                subtitle={
                  <>
                    Descoperă cluburi pentru copii în {locationDisplayName}. Filtrează după sport
                    sau vârstă pentru a găsi activități potrivite. Dacă nu ești sigur ce sport se
                    potrivește copilului tău, încearcă{" "}
                    <Link
                      href={routes.quiz.intro}
                      className="text-yuvoo-primary text-decoration-underline"
                    >
                      chestionarul AI
                    </Link>{" "}
                    pentru recomandări personalizate. Explorează și{" "}
                    <Link
                      href={routes.sports.list}
                      className="text-yuvoo-primary text-decoration-underline"
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
      <LocationContentExpanded
        content={expandedContent}
        locationDisplayName={locationDisplayName}
      />
      <ClubSearchFilters initialFilters={filters} />
      <ClubsMain clubs={clubs} />
    </>
  );
}
