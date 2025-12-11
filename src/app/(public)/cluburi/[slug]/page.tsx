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

/**
 * Club Detail Page
 *
 * Public page displaying details for a specific sports club.
 * SEO-friendly route: /cluburi/[slug]
 */
export default async function ClubDetailPage({ params }: ClubDetailPageProps) {
  const { slug } = await params;

  // TODO: Fetch club data by slug
  // const club = await getClubBySlug(slug);
  // if (!club) notFound();

  // Placeholder club data for now
  // TODO: Fetch club data by slug
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
    images: [],
    ageGroups: [],
    levels: [],
    contact: {
      email: "contact@club.ro",
      phone: "+40700000000",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return (
    <>
      <BreadcrumbOne title={club.name} subTitle="Cluburi" />
      <ClubDetailsMain club={club} />
    </>
  );
}

export async function generateMetadata({ params }: ClubDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: `${slug} - Cluburi Yuvoo`,
    description: `Informații despre clubul sportiv ${slug} pe platforma Yuvoo.`,
  };
}
