"use cache";

import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import SportDetailsMain from "@/components/features/sports/SportDetailsMain";
import { getSportBySlug } from "@/modules/sports/sports.service";
import { SPORTS_DATA } from "@/lib/db/seed-data/sports";
import { routes } from "@/lib/routes";
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
 * Sports data is static (from SPORTS_DATA), no caching needed.
 * SEO-friendly route: /sporturi/[slug]
 */
export default async function SportDetailPage({ params }: SportDetailPageProps) {
  const { slug } = await params;
  const isProductionBuild = process.env.NEXT_PHASE === "phase-production-build";

  // During production builds, use static sport data without database queries
  const sport = isProductionBuild
    ? SPORTS_DATA.find((s) => s.slug === slug) || null
    : await getSportBySlug(slug);

  // If sport not found, return 404 (only at runtime)
  if (!isProductionBuild && !sport) {
    notFound();
  }

  // During build, render placeholder for unknown slugs
  if (isProductionBuild && !sport) {
    return (
      <>
        <BreadcrumbOne
          title="Sport Placeholder"
          subTitle="Sporturi"
          items={[
            { name: "Yuvoo", url: routes.home },
            { name: "Sporturi", url: routes.sports.list },
            { name: "Sport Placeholder", url: routes.sports.detail(slug) },
          ]}
        />
        <section className="bd-sport-details-area pt-120 pb-70">
          <div className="container">
            <h1>Sport Placeholder</h1>
            <p>Build placeholder</p>
          </div>
        </section>
      </>
    );
  }

  // Get expanded content for Article schema
  const expandedContent = getExpandedContentBySportId(sport!.id);
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro";

  return (
    <>
      <ArticleSchema sport={sport!} expandedContent={expandedContent} baseUrl={baseUrl} />
      <BreadcrumbOne
        title={sport!.name}
        subTitle="Sporturi"
        items={[
          { name: "Yuvoo", url: routes.home },
          { name: "Sporturi", url: routes.sports.list },
          { name: sport!.name, url: routes.sports.detail(slug) },
        ]}
      />
      <SportDetailsMain sport={sport!} />
    </>
  );
}

/**
 * Generate metadata for SEO
 * Enhanced metadata for top 5 sports with rich descriptions and keywords
 */
export async function generateMetadata({ params }: SportDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const isProductionBuild = process.env.NEXT_PHASE === "phase-production-build";

  // During build, use static sport data without database queries
  const sport = isProductionBuild
    ? SPORTS_DATA.find((s) => s.slug === slug) || null
    : await getSportBySlug(slug);

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
