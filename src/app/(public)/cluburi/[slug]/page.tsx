"use cache";

import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import ClubDetailsMain from "@/components/features/clubs/ClubDetailsMain";
import ClubDetailsWidget from "@/components/features/clubs/ClubDetailsWidget";
import ClubDetailsWidgetTwo from "@/components/features/clubs/ClubDetailsWidgetTwo";
import ClubSchedule from "@/components/features/clubs/ClubSchedule";
import ClubGallery from "@/components/features/clubs/ClubGallery";
import ClubMap from "@/components/features/clubs/ClubMap";
import BookingFormSection from "@/components/features/clubs/BookingFormSection";
import { getClubBySlug } from "@/modules/clubs/clubs.service";
import { cacheTag } from "next/cache";
import type { Club } from "@/modules/clubs/clubs.types";

interface ClubDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Generate static params for SSG
 * Returns at least one value to satisfy Cache Components requirement.
 * TODO: When repository is implemented, fetch all club slugs here.
 */
export async function generateStaticParams() {
  // TODO: When repository is implemented, fetch all club slugs
  // const clubs = await clubsRepository.findAll();
  // return clubs.map((club) => ({ slug: club.slug }));

  // For now, return placeholder to satisfy Cache Components requirement
  return [{ slug: "example-club" }];
}

/**
 * Club Detail Page (SSG)
 *
 * Public page displaying details for a specific sports club.
 * Uses Next.js 16 Cache Components with "use cache" directive.
 * SEO-friendly route: /cluburi/[slug]
 */
export default async function ClubDetailPage({ params }: ClubDetailPageProps) {
  const { slug } = await params;

  // Fetch club data
  const club: Club | null = await getClubBySlug(slug);

  // If club not found, return 404
  if (!club) {
    notFound();
  }

  // Cache tag for revalidation
  cacheTag(`club-${club.id}`);
  cacheTag(`club-slug-${slug}`);

  return (
    <>
      <BreadcrumbOne title={club.name} subTitle="Cluburi" />
      <ClubDetailsMain club={club} />
      {club.images && club.images.length > 0 && (
        <ClubGallery images={club.images} clubName={club.name} />
      )}
      <ClubMap club={club} />
      <ClubDetailsWidget club={club} />
      <ClubSchedule club={club} />
      <ClubDetailsWidgetTwo club={club} />
      <BookingFormSection club={club} />
    </>
  );
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ params }: ClubDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  // Fetch club for metadata
  const club = await getClubBySlug(slug);

  if (!club) {
    return {
      title: "Club negăsit - Yuvoo",
      description: "Clubul sportiv căutat nu a fost găsit.",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro";

  return {
    title: `${club.name} - Cluburi Sportive Yuvoo`,
    description:
      club.description || `Informații despre clubul sportiv ${club.name} pe platforma Yuvoo.`,
    openGraph: {
      title: `${club.name} - Yuvoo`,
      description: club.description || `Club sportiv pentru copii în ${club.location.city}`,
      type: "website",
      images: club.images && club.images.length > 0 ? [club.images[0]] : [],
    },
    alternates: {
      canonical: `${baseUrl}/cluburi/${slug}`,
    },
  };
}
