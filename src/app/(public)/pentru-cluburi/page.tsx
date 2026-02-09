"use cache";

import React from "react";
import type { Metadata } from "next";
import { cacheTag } from "next/cache";
import ClubsLandingHero from "@/components/features/clubs/ClubsLandingHero";
import ClubsLandingProblem from "@/components/features/clubs/ClubsLandingProblem";
import ClubsLandingSolution from "@/components/features/clubs/ClubsLandingSolution";
import ClubsLandingBenefits from "@/components/features/clubs/ClubsLandingBenefits";
import ClubsLandingWhyNow from "@/components/features/clubs/ClubsLandingWhyNow";
import ClubsLandingPricing from "@/components/features/clubs/ClubsLandingPricing";
import ClubsLandingTestimonials from "@/components/features/clubs/ClubsLandingTestimonials";
import ClubsLandingFAQ from "@/components/features/clubs/ClubsLandingFAQ";
import ClubsLandingFinalCTA from "@/components/features/clubs/ClubsLandingFinalCTA";
import ClubsLandingTrust from "@/components/features/clubs/ClubsLandingTrust";
import ClubsLandingFooter from "@/components/features/clubs/ClubsLandingFooter";
import ClubsContactModal from "@/components/features/clubs/ClubsContactModal";
import ClubsLandingPageTracker from "@/components/features/clubs/ClubsLandingPageTracker";
import { CLUBS_CONTACT_MODAL_ID } from "@/lib/clubs-landing-modal";
import { routes } from "@/lib/routes";
import { countVerifiedClubs } from "@/modules/clubs/clubs.service";

/**
 * Metadata for clubs landing page
 * SEO-optimized for Romanian search engines
 * Static metadata export (no dynamic data needed)
 */
const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro";
const canonicalUrl = `${baseUrl}${routes.clubs.landing}`;

export const metadata: Metadata = {
  title: "Pentru Cluburi - Yuvoo | Devino Founding Club sau Upgrade la Premium",
  description:
    "Yuvoo conectează cluburi sportive pentru copii cu părinți pre-calificați. Primele 15 cluburi intră gratuit ca Founding Clubs. Sau upgrade la Premium (99,99 RON/lună sau 999,99 RON/an) pentru acces nelimitat la cereri și beneficii exclusive. Părinți pre-calificați, cluburi sportive, zero risc.",
  keywords: [
    "cluburi sportive copii",
    "founding club gratuit",
    "cluburi sportive",
    "părinți pre-calificați",
    "cluburi sportive bucurești",
    "program founding club",
    "cluburi pentru copii",
  ],
  openGraph: {
    title: "Pentru Cluburi - Yuvoo | Devino Founding Club sau Upgrade la Premium",
    description:
      "Yuvoo conectează cluburi sportive pentru copii cu părinți pre-calificați. Primele 15 cluburi intră gratuit ca Founding Clubs. Sau upgrade la Premium (99,99 RON/lună sau 999,99 RON/an) pentru acces nelimitat.",
    url: canonicalUrl,
    siteName: "Yuvoo",
    type: "website",
    locale: "ro_RO",
    images: [
      {
        url: `${baseUrl}/assets/img/logo/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Yuvoo - Pentru Cluburi | Devino Founding Club Gratuit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pentru Cluburi - Yuvoo | Devino Founding Club sau Upgrade la Premium",
    description:
      "Yuvoo conectează cluburi sportive pentru copii cu părinți pre-calificați. Primele 15 cluburi intră gratuit ca Founding Clubs. Sau upgrade la Premium (99,99 RON/lună sau 999,99 RON/an) pentru acces nelimitat.",
    images: [`${baseUrl}/assets/img/logo/og-image.jpg`],
  },
  alternates: {
    canonical: canonicalUrl,
  },
};

/**
 * Clubs Landing Page
 *
 * Public landing page for sports clubs to join Yuvoo as Founding Clubs.
 * Targets club administrators and explains the benefits of joining the platform.
 * SEO-friendly route: /pentru-cluburi
 */
export default async function ClubsLandingPage() {
  // Fetch verified clubs count from Bucharest
  const MAX_FOUNDING_CLUBS = 15;

  // Tag for cache revalidation when clubs are verified
  cacheTag("clubs-verified");

  const verifiedCount = await countVerifiedClubs();
  const remainingSpots = Math.max(0, MAX_FOUNDING_CLUBS - verifiedCount);

  return (
    <>
      {/* Page View Tracker */}
      <ClubsLandingPageTracker />

      {/* Hero Section */}
      <ClubsLandingHero verifiedCount={verifiedCount} remainingSpots={remainingSpots} />

      {/* Problem Section */}
      <ClubsLandingProblem />

      {/* Solution Section */}
      <ClubsLandingSolution />

      {/* Benefits Section */}
      <ClubsLandingBenefits />

      {/* Why Now Section */}
      <ClubsLandingWhyNow remainingSpots={remainingSpots} />

      {/* Pricing Section */}
      <ClubsLandingPricing />

      {/* Testimonials Section */}
      <ClubsLandingTestimonials />

      {/* FAQ Section */}
      <ClubsLandingFAQ />

      {/* Final CTA Section */}
      <ClubsLandingFinalCTA verifiedCount={verifiedCount} remainingSpots={remainingSpots} />

      {/* Trust Indicators Section */}
      <ClubsLandingTrust verifiedCount={verifiedCount} />

      {/* Footer Microcopy Section */}
      <ClubsLandingFooter />

      {/* Contact Modal - Shared across all sections */}
      <ClubsContactModal modalId={CLUBS_CONTACT_MODAL_ID} />
    </>
  );
}
