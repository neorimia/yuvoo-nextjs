"use cache";

import React from "react";
import type { Metadata } from "next";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import SportsMain from "@/components/features/sports/SportsMain";
import { getAllSports } from "@/modules/sports/sports.service";
import { cacheTag } from "next/cache";

export const metadata: Metadata = {
  title: "Sporturi - Yuvoo",
  description: "Descoperă toate sporturile disponibile pentru copii pe platforma Yuvoo.",
  openGraph: {
    title: "Sporturi - Yuvoo",
    description: "Descoperă toate sporturile disponibile pentru copii pe platforma Yuvoo.",
    type: "website",
  },
};

/**
 * Sports Listing Page
 *
 * Public page displaying all available sports.
 * Uses Next.js 16 Cache Components with "use cache" directive.
 * SEO-friendly route: /sporturi
 */
export default async function SportsPage() {
  // Fetch all sports
  const sports = await getAllSports();

  // Cache tag for revalidation
  cacheTag("sports-list");

  return (
    <>
      <BreadcrumbOne title="Sporturi" subTitle="Sporturi" />
      <section className="bd-sports-area pt-120 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="bd-sports-content text-center mb-50">
                <h1 className="bd-section-title mb-30">Sporturi Disponibile</h1>
                <p className="mb-40">
                  Descoperă toate sporturile disponibile pentru copiii tăi. Fiecare sport este
                  adaptat pentru diferite vârste și niveluri de pregătire.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SportsMain sports={sports} />
    </>
  );
}
