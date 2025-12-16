"use client";

import React from "react";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import SearchResults from "@/components/features/search/SearchResults";

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
      <BreadcrumbOne title="Căutare" subTitle="Căutare" />
      <section className="bd-search-area pt-120 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="bd-search-content mb-50">
                <h1 className="bd-section-title mb-30">Caută pe Yuvoo</h1>
                <p className="text-muted">
                  Caută cluburi sportive, doctori sau sporturi folosind termenii de căutare din URL.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SearchResults />
    </>
  );
}
