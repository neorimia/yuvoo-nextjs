import React from "react";
import type { Metadata } from "next";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import FaqMainEnhanced from "@/components/FAQ/FaqMainEnhanced";
import FAQPageSchema from "@/components/SEO/FAQPageSchema";
import { faqItems } from "@/data/faq-data";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Întrebări Frecvente - Răspunsuri Despre Yuvoo | FAQ",
  description:
    "Răspunsuri la peste 20 de întrebări frecvente despre platforma Yuvoo: cum funcționează chestionarul AI, verificarea cluburilor, contactarea specialiștilor pediatri, siguranța datelor și multe altele. Găsește toate răspunsurile despre serviciile noastre.",
  keywords: [
    "FAQ Yuvoo",
    "întrebări frecvente",
    "cum funcționează Yuvoo",
    "chestionar AI",
    "cluburi sportive verificate",
    "specialiști pediatri",
    "siguranță date",
    "GDPR",
    "platformă sporturi copii",
  ],
  openGraph: {
    title: "Întrebări Frecvente - Răspunsuri Despre Yuvoo | FAQ",
    description:
      "Răspunsuri la peste 20 de întrebări frecvente despre platforma Yuvoo, chestionarul AI, cluburile verificate și specialiștii pediatri.",
    type: "website",
    url: `${process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro"}/intrebari-frecvente`,
    siteName: "Yuvoo",
    locale: "ro_RO",
  },
  twitter: {
    card: "summary_large_image",
    title: "Întrebări Frecvente - Răspunsuri Despre Yuvoo",
    description:
      "Răspunsuri la peste 20 de întrebări frecvente despre platforma Yuvoo și serviciile noastre.",
  },
  alternates: {
    canonical: "/intrebari-frecvente",
  },
};

/**
 * FAQ Page
 *
 * Public marketing page with frequently asked questions.
 * SEO-friendly route: /intrebari-frecvente
 */
export default function FAQPage() {
  return (
    <>
      <FAQPageSchema faqs={faqItems} />
      <BreadcrumbOne
        title="Întrebări Frecvente"
        subTitle="FAQ"
        items={[
          { name: "Yuvoo", url: routes.home },
          { name: "Întrebări Frecvente", url: routes.faq }, // Current page
        ]}
      />
      <section className="bd-faq-area pt-120 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="bd-faq-content text-center mb-50">
                <h1 className="bd-section-title mb-30">Întrebări Frecvente</h1>
                <p className="mb-40">
                  Găsește răspunsuri la cele mai frecvente întrebări despre platforma Yuvoo și
                  serviciile noastre.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FaqMainEnhanced />
    </>
  );
}
