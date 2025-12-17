"use cache";

import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import SportDetailsMain from "@/components/features/sports/SportDetailsMain";
import { getSportBySlug } from "@/modules/sports/sports.service";
import { SPORTS_DATA } from "@/lib/db/seed-data/sports";
import { cacheTag } from "next/cache";

interface SportDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Generate static params for SSG
 * Returns all sport slugs to satisfy Cache Components requirement.
 */
export async function generateStaticParams() {
  // Return all sport slugs from sports data
  return SPORTS_DATA.map((sport) => ({
    slug: sport.slug,
  }));
}

/**
 * Sport Detail Page (SSG)
 *
 * Public page displaying details for a specific sport.
 * Uses Next.js 16 Cache Components with "use cache" directive.
 * SEO-friendly route: /sporturi/[slug]
 */
export default async function SportDetailPage({ params }: SportDetailPageProps) {
  const { slug } = await params;

  // Fetch sport data
  const sport = await getSportBySlug(slug);

  // If sport not found, return 404
  if (!sport) {
    notFound();
  }

  // Cache tag for revalidation
  cacheTag(`sport-${sport.id}`);
  cacheTag(`sport-slug-${slug}`);

  return (
    <>
      <BreadcrumbOne title={sport.name} subTitle="Sporturi" />
      <SportDetailsMain sport={sport} />
    </>
  );
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ params }: SportDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  // Fetch sport for metadata
  const sport = await getSportBySlug(slug);

  if (!sport) {
    return {
      title: "Sport negăsit - Yuvoo",
      description: "Sportul căutat nu a fost găsit.",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro";

  return {
    title: `${sport.name} - Sporturi Yuvoo`,
    description:
      sport.description || `Informații despre ${sport.name} pentru copii pe platforma Yuvoo.`,
    openGraph: {
      title: `${sport.name} - Yuvoo`,
      description: sport.description || `Sport pentru copii: ${sport.name}`,
      type: "website",
    },
    alternates: {
      canonical: `${baseUrl}/sporturi/${slug}`,
    },
  };
}
