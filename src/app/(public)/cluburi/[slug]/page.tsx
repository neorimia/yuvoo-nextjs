import React from "react";
import type { Metadata } from "next";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import ClubDetailsMain from "@/components/features/clubs/ClubDetailsMain";
import type { Club } from "@/modules/clubs/clubs.types";

interface ClubDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// TODO: Implement proper generateStaticParams when real data fetching is added
// For now, returning a dummy value to satisfy Cache Components requirement
export async function generateStaticParams() {
  return [{ slug: "example-club" }];
}

/**
 * Club Detail Page
 *
 * Public page displaying details for a specific sports club.
 * SEO-friendly route: /cluburi/[slug]
 */
export default async function ClubDetailPage({ params }: ClubDetailPageProps) {
  // DYNAMIC: Page uses dynamic params - will be rendered on-demand
  // TODO: Add generateStaticParams and "use cache" when implementing real data fetching
  const { slug } = await params;

  // TODO: Fetch club data by slug
  // const club = await getClubBySlug(slug);
  // if (!club) notFound();

  // Placeholder club data for now
  // TODO: Fetch club data by slug
  // NOTE: Using static dates for placeholder - will be replaced with real data fetching
  const club: Club = {
    id: "1",
    name: "Club Sportiv",
    slug: slug,
    description: "Descriere club",
    sportId: "fotbal",
    sportName: "Fotbal",
    location: {
      city: "București",
      district: "Sector 1",
      address: "Str. Exemplu 1",
    },
    verified: true,
    featured: false,
    images: [],
    ageGroups: [],
    levels: [],
    contact: {
      email: "contact@club.ro",
      phone: "+40700000000",
    },
    createdAt: new Date("2024-01-01"), // Static date for placeholder
    updatedAt: new Date("2024-01-01"), // Static date for placeholder
  };

  return (
    <>
      <BreadcrumbOne title={club.name} subTitle="Cluburi" />
      <ClubDetailsMain club={club} />
    </>
  );
}

export async function generateMetadata({ params }: ClubDetailPageProps): Promise<Metadata> {
  // MIGRATED: generateMetadata uses async params, but page doesn't use dynamic APIs
  // Adding "use cache" to page component to make it cacheable
  const { slug } = await params;

  return {
    title: `${slug} - Cluburi Yuvoo`,
    description: `Informații despre clubul sportiv ${slug} pe platforma Yuvoo.`,
  };
}
