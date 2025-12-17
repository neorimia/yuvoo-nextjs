import React from "react";
import type { Metadata } from "next";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import FaqMain from "@/components/FAQ/FaqMain";
import FAQPageSchema from "@/components/SEO/FAQPageSchema";
import { faqItems } from "@/data/faq-data";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Întrebări Frecvente - Yuvoo",
  description: "Răspunsuri la cele mai frecvente întrebări despre Yuvoo.",
  openGraph: {
    title: "Întrebări Frecvente - Yuvoo",
    description: "Răspunsuri la cele mai frecvente întrebări despre Yuvoo.",
    type: "website",
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
      <FaqMain />
    </>
  );
}
