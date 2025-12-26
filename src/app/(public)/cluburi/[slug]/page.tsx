"use cache";

import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import LocalBusinessSchema from "@/components/SEO/LocalBusinessSchema";
import ClubDetailsMain from "@/components/features/clubs/ClubDetailsMain";
import ClubDetailsWidget from "@/components/features/clubs/ClubDetailsWidget";
import ClubDetailsWidgetTwo from "@/components/features/clubs/ClubDetailsWidgetTwo";
import ClubSchedule from "@/components/features/clubs/ClubSchedule";
import ClubGallery from "@/components/features/clubs/ClubGallery";
import ClubMap from "@/components/features/clubs/ClubMap";
import BookingFormSection from "@/components/features/clubs/BookingFormSection";
import ClubContentExpanded from "@/components/features/clubs/ClubContentExpanded";
import { getClubBySlug } from "@/modules/clubs/clubs.service";
import { routes } from "@/lib/routes";
import { cacheLife, cacheTag } from "next/cache";
import type { Club } from "@/modules/clubs/clubs.types";
import { generateClubExpandedContent } from "@/lib/content/club-expanded-content";
import { generateClubMetadata } from "@/lib/seo/club-metadata";
import PostHogViewTracking from "@/components/analytics/PostHogViewTracking";
import { PostHogEvents } from "@/lib/analytics/events";
import { PRE_LAUNCH_RESTRICTIONS_ENABLED } from "@/lib/config/pre-launch";
import PreLaunchPage from "@/components/features/early-access/PreLaunchPage";

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
  if (PRE_LAUNCH_RESTRICTIONS_ENABLED) {
    return <PreLaunchPage routeType="club-portal" />;
  }

  const { slug } = await params;

  // Check if we're in production build phase
  const isProductionBuild = process.env.NEXT_PHASE === "phase-production-build";

  // During production builds, skip database queries and use mock club
  // At runtime, ISR will fetch actual club
  const club: Club | null = isProductionBuild ? null : await getClubBySlug(slug);

  // If club not found, return 404 (only at runtime)
  if (!isProductionBuild && !club) {
    notFound();
  }

  // During build, render placeholder
  if (isProductionBuild) {
    return (
      <>
        <BreadcrumbOne
          title="Club Placeholder"
          subTitle="Cluburi"
          items={[
            { name: "Yuvoo", url: routes.home },
            { name: "Cluburi", url: routes.clubs.list },
            { name: "Club Placeholder", url: routes.clubs.detail(slug) },
          ]}
        />
        <section className="bd-club-details-area pt-120 pb-70">
          <div className="container">
            <h1>Club Placeholder</h1>
            <p>Build placeholder</p>
          </div>
        </section>
      </>
    );
  }

  // Cache configuration (only at runtime)
  // Cache for 1 hour - club details change infrequently
  cacheLife("hours");
  // Cache tags for revalidation
  cacheTag(`club-${club!.id}`);
  cacheTag(`club-slug-${slug}`);
  cacheTag("clubs-list");

  // Generate expanded content for SEO (600-900 words)
  const expandedContent = generateClubExpandedContent(club!);

  return (
    <>
      <PostHogViewTracking
        eventName={PostHogEvents.CLUB_VIEWED}
        entityId={club!.id}
        entityType="club"
        entitySlug={slug}
      />
      <LocalBusinessSchema club={club!} />
      <BreadcrumbOne
        title={club!.name}
        subTitle="Cluburi"
        items={[
          { name: "Yuvoo", url: routes.home },
          { name: "Cluburi", url: routes.clubs.list },
          { name: club!.name, url: routes.clubs.detail(slug) }, // Current page
        ]}
      />
      <ClubDetailsMain club={club!} />
      {club!.images && club!.images.length > 0 && (
        <ClubGallery images={club!.images} clubName={club!.name} />
      )}
      <ClubMap club={club!} />
      <ClubDetailsWidget club={club!} />
      <ClubSchedule club={club!} />
      <ClubDetailsWidgetTwo club={club!} />
      {/* Expanded Content Section for SEO (600-900 words) */}
      <ClubContentExpanded content={expandedContent} />
      <BookingFormSection club={club!} />
    </>
  );
}

/**
 * Generate metadata for SEO with location keywords
 */
export async function generateMetadata({ params }: ClubDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  // Check if we're in production build phase
  const isProductionBuild = process.env.NEXT_PHASE === "phase-production-build";

  // During build, return generic metadata
  if (isProductionBuild) {
    return {
      title: "Club Sportiv pentru Copii - Yuvoo",
      description:
        "Cluburi sportive verificate pentru copii. Găsește activități sportive potrivite.",
    };
  }

  // Fetch club for metadata (only at runtime)
  const club = await getClubBySlug(slug);

  if (!club) {
    return {
      title: "Club negăsit - Yuvoo",
      description: "Clubul sportiv căutat nu a fost găsit.",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro";

  // Use enhanced metadata with location keywords
  return generateClubMetadata(club, baseUrl);
}
