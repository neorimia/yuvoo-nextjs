import React from "react";
import type { Metadata } from "next";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import FaqMain from "@/components/FAQ/FaqMain";

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
      <BreadcrumbOne title="Întrebări Frecvente" subTitle="FAQ" />
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
