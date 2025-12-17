"use cache";

import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import SportDetailsMain from "@/components/features/sports/SportDetailsMain";
import { getSportBySlug } from "@/modules/sports/sports.service";
import { SPORTS_DATA } from "@/lib/db/seed-data/sports";
import { routes } from "@/lib/routes";
import { cacheTag } from "next/cache";
import { generateSportMetadata as generateEnhancedMetadata } from "@/lib/seo/sport-metadata";
import ArticleSchema from "@/components/SEO/ArticleSchema";
import { getExpandedContentBySportId } from "@/data/sport-expanded-content";

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

  // Get expanded content for Article schema
  const expandedContent = getExpandedContentBySportId(sport.id);

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro";

  return (
    <>
      <ArticleSchema sport={sport} expandedContent={expandedContent} baseUrl={baseUrl} />
      <BreadcrumbOne
        title={sport.name}
        subTitle="Sporturi"
        items={[
          { name: "Yuvoo", url: routes.home },
          { name: "Sporturi", url: routes.sports.list },
          { name: sport.name, url: routes.sports.detail(slug) }, // Current page
        ]}
      />
      <SportDetailsMain sport={sport} />
    </>
  );
}

/**
 * Generate metadata for SEO
 * Enhanced metadata for top 5 sports with rich descriptions and keywords
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

  // Use enhanced metadata for top 5 sports, fallback for others
  const enhancedMetadata = generateEnhancedMetadata(sport, baseUrl);

  return {
    title: enhancedMetadata.title,
    description: enhancedMetadata.description,
    keywords: enhancedMetadata.keywords,
    openGraph: enhancedMetadata.openGraph,
    alternates: enhancedMetadata.alternates,
  };
}
