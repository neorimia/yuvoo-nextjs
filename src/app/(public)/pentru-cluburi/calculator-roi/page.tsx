"use cache";

import React from "react";
import type { Metadata } from "next";
import { cacheTag } from "next/cache";
import SectionTitle from "@/components/shared/SectionTitle";
import ClubsLandingROICalculator from "@/components/features/clubs/ClubsLandingROICalculator";
import ROICalculatorComparison from "@/components/features/clubs/ROICalculatorComparison";
import ROICalculatorFAQ from "@/components/features/clubs/ROICalculatorFAQ";
import ROICalculatorCTA from "@/components/features/clubs/ROICalculatorCTA";
import { routes } from "@/lib/routes";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro";
const canonicalUrl = `${baseUrl}${routes.clubs.roiCalculator}`;

export const metadata: Metadata = {
  title: "Calculator ROI - Yuvoo | Calculează ROI-ul tău cu Yuvoo",
  description:
    "Descoperă cât poți economisi cu lead-uri pre-calificate vs. Google/Facebook ads. Calculator ROI interactiv pentru cluburi sportive.",
  keywords: [
    "calculator ROI cluburi",
    "compară costuri Yuvoo",
    "ROI calculator",
    "economii cluburi sportive",
  ],
  openGraph: {
    title: "Calculator ROI - Yuvoo | Calculează ROI-ul tău",
    description: "Descoperă cât poți economisi cu lead-uri pre-calificate vs. Google/Facebook ads.",
    url: canonicalUrl,
    siteName: "Yuvoo",
    type: "website",
    locale: "ro_RO",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculator ROI - Yuvoo",
    description: "Calculează ROI-ul tău cu Yuvoo vs. Google/Facebook ads",
  },
  alternates: {
    canonical: canonicalUrl,
  },
};

export default async function ROICalculatorPage() {
  cacheTag("clubs-roi-calculator");

  return (
    <>
      {/* Hero Section */}
      <section className="bd-hero-area bd-hero-area-3 fix pt-120 pb-70">
        <div className="bd-gradient-bg"></div>
        <div className="container">
          <div className="bd-hero-inner-3">
            <div className="row align-items-center">
              <div className="col-lg-10 col-xl-9 mx-auto">
                <div className="bd-hero-content text-center">
                  <SectionTitle
                    headingLevel={1}
                    title="Calculează ROI-ul tău cu Yuvoo"
                    subtitle="Descoperă cât poți economisi cu lead-uri pre-calificate vs. Google/Facebook ads"
                    className="mb-30"
                  />
                  <p
                    style={{
                      fontSize: "16px",
                      color: "#6B6B6B",
                      marginBottom: "30px",
                    }}
                  >
                    Calculator interactiv pentru a compara costurile și ROI-ul între Yuvoo Premium
                    și Google/Facebook ads.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator Component */}
      <section className="pt-70 pb-70">
        <div className="container">
          <ClubsLandingROICalculator />
        </div>
      </section>

      {/* Comparison Section */}
      <section className="pt-70 pb-70" style={{ backgroundColor: "#F8F9FA" }}>
        <div className="container">
          <ROICalculatorComparison />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pt-70 pb-70">
        <div className="container">
          <ROICalculatorFAQ />
        </div>
      </section>

      {/* CTA Section */}
      <section className="pt-70 pb-120" style={{ backgroundColor: "#F8F9FA" }}>
        <div className="container">
          <ROICalculatorCTA />
        </div>
      </section>
    </>
  );
}
