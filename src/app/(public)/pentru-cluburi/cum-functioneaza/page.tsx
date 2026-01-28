"use cache";

import React from "react";
import type { Metadata } from "next";
import { cacheTag } from "next/cache";
import HowItWorksHero from "@/components/features/clubs/HowItWorksHero";
import HowItWorksProcess from "@/components/features/clubs/HowItWorksProcess";
import HowItWorksTechnical from "@/components/features/clubs/HowItWorksTechnical";
import HowItWorksBenefits from "@/components/features/clubs/HowItWorksBenefits";
import HowItWorksFAQ from "@/components/features/clubs/HowItWorksFAQ";
import HowItWorksCTA from "@/components/features/clubs/HowItWorksCTA";
import { routes } from "@/lib/routes";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro";
const canonicalUrl = `${baseUrl}${routes.clubs.howItWorks}`;

export const metadata: Metadata = {
  title: "Cum Funcționează - Yuvoo | Procesul complet pentru cluburi",
  description:
    "Explică în detaliu cum funcționează Yuvoo: procesul de verificare, sistemul de lead-uri, platforma și beneficii. Ghid complet pentru cluburi sportive.",
  keywords: [
    "cum funcționează Yuvoo",
    "proces verificare cluburi",
    "sistem lead-uri",
    "platformă cluburi sportive",
    "verificare cluburi",
  ],
  openGraph: {
    title: "Cum Funcționează - Yuvoo | Procesul complet pentru cluburi",
    description:
      "Explică în detaliu cum funcționează Yuvoo: procesul de verificare, sistemul de lead-uri, platforma și beneficii.",
    url: canonicalUrl,
    siteName: "Yuvoo",
    type: "website",
    locale: "ro_RO",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cum Funcționează - Yuvoo",
    description: "Procesul complet de verificare și sistemul de lead-uri pentru cluburi",
  },
  alternates: {
    canonical: canonicalUrl,
  },
};

export default async function HowItWorksPage() {
  cacheTag("clubs-how-it-works");

  return (
    <>
      <HowItWorksHero />
      <HowItWorksProcess />
      <HowItWorksTechnical />
      <HowItWorksBenefits />
      <HowItWorksFAQ />
      <HowItWorksCTA />
    </>
  );
}
