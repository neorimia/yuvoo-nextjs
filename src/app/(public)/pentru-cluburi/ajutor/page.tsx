"use cache";

import React from "react";
import type { Metadata } from "next";
import { cacheTag } from "next/cache";
import HelpCenterHero from "@/components/features/clubs/HelpCenterHero";
// import HelpCenterCategories from "@/components/features/clubs/HelpCenterCategories";
import HelpCenterFAQ from "@/components/features/clubs/HelpCenterFAQ";
import HelpCenterContact from "@/components/features/clubs/HelpCenterContact";
import { routes } from "@/lib/routes";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro";
const canonicalUrl = `${baseUrl}${routes.clubs.helpCenter}`;

export const metadata: Metadata = {
  title: "Ajutor & Întrebări Frecvente - Yuvoo | Răspunsuri la toate întrebările",
  description:
    "Găsește răspunsuri la toate întrebările despre Yuvoo: procesul de verificare, prețuri, lead-uri, platformă și multe altele. Suport complet pentru cluburi sportive.",
  keywords: [
    "ajutor Yuvoo",
    "întrebări frecvente cluburi",
    "FAQ Yuvoo",
    "suport cluburi sportive",
    "ajutor platformă Yuvoo",
  ],
  openGraph: {
    title: "Ajutor & Întrebări Frecvente - Yuvoo",
    description:
      "Găsește răspunsuri la toate întrebările despre Yuvoo: procesul de verificare, prețuri, lead-uri, platformă.",
    url: canonicalUrl,
    siteName: "Yuvoo",
    type: "website",
    locale: "ro_RO",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ajutor & Întrebări Frecvente - Yuvoo",
    description: "Răspunsuri la toate întrebările despre Yuvoo pentru cluburi",
  },
  alternates: {
    canonical: canonicalUrl,
  },
};

export default async function HelpCenterPage() {
  cacheTag("clubs-help-center");

  return (
    <>
      <HelpCenterHero />
      {/* <HelpCenterCategories /> */}
      <HelpCenterFAQ />
      <HelpCenterContact />
    </>
  );
}
