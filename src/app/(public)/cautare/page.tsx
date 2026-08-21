"use client";

import React, { Suspense } from "react";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import SearchResults from "@/components/features/search/SearchResults";
import SearchForm from "@/components/features/search/SearchForm";

// Note: Metadata cannot be exported from client components
// Metadata is handled via layout or moved to a separate metadata file

/**
 * Search Page
 *
 * Public page for searching clubs, doctors, and sports.
 * SEO-friendly route: /cautare
 */
export default function SearchPage() {
  return (
    <>
      <BreadcrumbOne title="Căutare" subTitle="Căutare" titleAs="p" />
      <section className="bd-search-area pt-120 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="bd-search-content mb-50">
                <h1 className="bd-section-title mb-30">Caută pe Yuvoo</h1>
                <p className="text-muted mb-4">
                  Găsește cluburi sportive, doctori sau sporturi potrivite pentru copilul tău.
                </p>
                <Suspense fallback={null}>
                  <SearchForm />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SearchResults />
    </>
  );
}
