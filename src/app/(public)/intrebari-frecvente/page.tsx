import React from "react";
import type { Metadata } from "next";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";

export const metadata: Metadata = {
  title: "Întrebări Frecvente - Yuvoo",
  description: "Răspunsuri la cele mai frecvente întrebări despre Yuvoo.",
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
              <div className="bd-faq-content">
                <h1 className="bd-section-title mb-30">Întrebări Frecvente</h1>
                {/* TODO: Add FAQ component */}
                <div className="bd-faq-placeholder">
                  <p>Componenta FAQ va fi adăugată aici.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
