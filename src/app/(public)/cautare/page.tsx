import React from "react";
import type { Metadata } from "next";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";

export const metadata: Metadata = {
  title: "Căutare - Yuvoo",
  description: "Caută cluburi sportive, doctori și sporturi pe platforma Yuvoo.",
};

/**
 * Search Page
 *
 * Public page for searching clubs, doctors, and sports.
 * SEO-friendly route: /cautare
 */
export default function SearchPage() {
  return (
    <>
      <BreadcrumbOne title="Căutare" subTitle="Căutare" />
      <section className="bd-search-area pt-120 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="bd-search-content">
                <h1 className="bd-section-title mb-30">Caută pe Yuvoo</h1>
                {/* TODO: Add search component */}
                <div className="bd-search-placeholder">
                  <p>Componenta de căutare va fi adăugată aici.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
