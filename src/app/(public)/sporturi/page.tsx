import React from "react";
import type { Metadata } from "next";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";

export const metadata: Metadata = {
  title: "Sporturi - Yuvoo",
  description: "Descoperă toate sporturile disponibile pentru copii pe platforma Yuvoo.",
};

/**
 * Sports Listing Page
 *
 * Public page displaying all available sports.
 * SEO-friendly route: /sporturi
 */
export default function SportsPage() {
  return (
    <>
      <BreadcrumbOne title="Sporturi" subTitle="Sporturi" />
      <section className="bd-sports-area pt-120 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="bd-sports-content text-center">
                <h1 className="bd-section-title mb-30">Sporturi Disponibile</h1>
                <p className="mb-40">
                  Descoperă toate sporturile disponibile pentru copiii tăi. Fiecare sport este
                  adaptat pentru diferite vârste și niveluri de pregătire.
                </p>
                {/* TODO: Add sports listing component */}
                <div className="bd-sports-placeholder">
                  <p>Lista de sporturi va fi adăugată aici.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
