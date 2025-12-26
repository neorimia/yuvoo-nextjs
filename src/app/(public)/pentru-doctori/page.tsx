"use cache";

import React from "react";
import type { Metadata } from "next";
import { cacheTag } from "next/cache";
import DoctorsLandingHero from "@/components/features/doctors/DoctorsLandingHero";
import DoctorsLandingProblem from "@/components/features/doctors/DoctorsLandingProblem";
import DoctorsLandingWhatIsNot from "@/components/features/doctors/DoctorsLandingWhatIsNot";
import DoctorsLandingRole from "@/components/features/doctors/DoctorsLandingRole";
import DoctorsLandingCollaboration from "@/components/features/doctors/DoctorsLandingCollaboration";
import DoctorsLandingEthics from "@/components/features/doctors/DoctorsLandingEthics";
import DoctorsLandingWhyChoose from "@/components/features/doctors/DoctorsLandingWhyChoose";
import DoctorsLandingTargetAudience from "@/components/features/doctors/DoctorsLandingTargetAudience";
import DoctorsLandingFAQ from "@/components/features/doctors/DoctorsLandingFAQ";
import DoctorsLandingFinalCTA from "@/components/features/doctors/DoctorsLandingFinalCTA";
import DoctorsLandingTrust from "@/components/features/doctors/DoctorsLandingTrust";
import DoctorsLandingFooter from "@/components/features/doctors/DoctorsLandingFooter";
import DoctorsContactModal from "@/components/features/doctors/DoctorsContactModal";
import { DOCTORS_CONTACT_MODAL_ID } from "@/lib/doctors-landing-modal";
import { routes } from "@/lib/routes";

/**
 * Metadata for doctors landing page
 * SEO-optimized for Romanian search engines
 * Professional, ethical, non-commercial tone per brief
 */
const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro";
const canonicalUrl = `${baseUrl}${routes.doctors.landing}`;

export const metadata: Metadata = {
  title: "Pentru Doctori - Yuvoo | Devino Expert Pediatric Verificat",
  description:
    "Yuvoo este o platformă de ghidare pentru părinți care combină recomandări AI cu validare medicală pediatrică. Căutăm medici și specialiști pediatrici care doresc să contribuie ca Experți Pediatrici Verificați. Fără compromisuri etice, fără promovare agresivă.",
  keywords: [
    "medici pediatri",
    "ortopezi pediatrici",
    "medici sportivă pediatrică",
    "expert pediatric verificat",
    "validare medicală",
    "ghidare sport copii",
    "specialiști pediatrici",
  ],
  openGraph: {
    title: "Pentru Doctori - Yuvoo | Devino Expert Pediatric Verificat",
    description:
      "Yuvoo este o platformă de ghidare pentru părinți cu validare medicală pediatrică. Căutăm medici și specialiști pediatrici care doresc să contribuie ca Experți Pediatrici Verificați.",
    url: canonicalUrl,
    siteName: "Yuvoo",
    type: "website",
    locale: "ro_RO",
    images: [
      {
        url: `${baseUrl}/assets/img/logo/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Yuvoo - Pentru Doctori | Devino Expert Pediatric Verificat",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pentru Doctori - Yuvoo | Devino Expert Pediatric Verificat",
    description:
      "Yuvoo este o platformă de ghidare pentru părinți cu validare medicală pediatrică. Căutăm medici și specialiști pediatrici care doresc să contribuie ca Experți Pediatrici Verificați.",
    images: [`${baseUrl}/assets/img/logo/og-image.jpg`],
  },
  alternates: {
    canonical: canonicalUrl,
  },
};

/**
 * Doctors Landing Page
 *
 * Public landing page for doctors and pediatric specialists to join Yuvoo as Verified Pediatric Experts.
 * Targets pediatric doctors and explains the role and benefits of joining the platform.
 * Professional, ethical, non-commercial tone per brief.
 * SEO-friendly route: /pentru-doctori
 */
export default async function DoctorsLandingPage() {
  // Tag for cache revalidation when doctors are verified
  cacheTag("doctors-verified");

  return (
    <>
      {/* Hero Section */}
      <DoctorsLandingHero />

      {/* Problem Section */}
      <DoctorsLandingProblem />

      {/* What Is / Is Not Section */}
      <DoctorsLandingWhatIsNot />

      {/* Role Section */}
      <DoctorsLandingRole />

      {/* Collaboration Process Section */}
      <DoctorsLandingCollaboration />

      {/* Ethics, GDPR & Professional Control Section (CRITICAL) */}
      <DoctorsLandingEthics />

      {/* Why Choose Yuvoo Section */}
      <DoctorsLandingWhyChoose />

      {/* Target Audience Section */}
      <DoctorsLandingTargetAudience />

      {/* FAQ Section */}
      <DoctorsLandingFAQ />

      {/* Final CTA Section */}
      <DoctorsLandingFinalCTA />

      {/* Trust Indicators Section */}
      <DoctorsLandingTrust />

      {/* Footer Microcopy Section */}
      <DoctorsLandingFooter />

      {/* Contact Modal - Shared across all sections */}
      <DoctorsContactModal modalId={DOCTORS_CONTACT_MODAL_ID} />
    </>
  );
}
