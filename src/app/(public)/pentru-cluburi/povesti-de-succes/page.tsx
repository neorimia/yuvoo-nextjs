"use cache";

import React from "react";
import type { Metadata } from "next";
import { cacheTag } from "next/cache";
import CaseStudiesHero from "@/components/features/clubs/CaseStudiesHero";
import CaseStudiesMetrics from "@/components/features/clubs/CaseStudiesMetrics";
import CaseStudiesList from "@/components/features/clubs/CaseStudiesList";
import CaseStudiesFAQ from "@/components/features/clubs/CaseStudiesFAQ";
import CaseStudiesCTA from "@/components/features/clubs/CaseStudiesCTA";
import { routes } from "@/lib/routes";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro";
const canonicalUrl = `${baseUrl}${routes.clubs.caseStudies}`;

export const metadata: Metadata = {
  title: "Povești de Succes - Yuvoo | Cluburi care au crescut cu Yuvoo",
  description:
    "Descoperă cum cluburi similare au obținut rezultate concrete cu Yuvoo: mai multe lead-uri calificate, mai puțin timp pierdut, mai multe înscrieri. Case studies reale cu metrici.",
  keywords: [
    "povești de succes cluburi sportive",
    "case studies cluburi",
    "rezultate Yuvoo",
    "cluburi sportive succes",
    "testimoniale cluburi",
  ],
  openGraph: {
    title: "Povești de Succes - Yuvoo | Cluburi care au crescut cu Yuvoo",
    description:
      "Descoperă cum cluburi similare au obținut rezultate concrete cu Yuvoo: mai multe lead-uri calificate, mai puțin timp pierdut, mai multe înscrieri.",
    url: canonicalUrl,
    siteName: "Yuvoo",
    type: "website",
    locale: "ro_RO",
  },
  twitter: {
    card: "summary_large_image",
    title: "Povești de Succes - Yuvoo",
    description: "Case studies reale de la cluburi care au crescut cu Yuvoo",
  },
  alternates: {
    canonical: canonicalUrl,
  },
};

export default async function CaseStudiesPage() {
  cacheTag("clubs-case-studies");

  return (
    <>
      <CaseStudiesHero />
      <CaseStudiesMetrics />
      <CaseStudiesList />
      <CaseStudiesFAQ />
      <CaseStudiesCTA />
    </>
  );
}
