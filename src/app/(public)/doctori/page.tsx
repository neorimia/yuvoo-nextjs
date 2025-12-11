import React from "react";
import type { Metadata } from "next";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";

export const metadata: Metadata = {
  title: "Doctori - Yuvoo",
  description:
    "Găsește specialiști pediatri verificați pentru consultații despre activitățile sportive ale copilului tău.",
};

/**
 * Doctors Listing Page
 *
 * Public page displaying all pediatric specialists.
 * SEO-friendly route: /doctori
 */
export default function DoctorsPage() {
  return (
    <>
      <BreadcrumbOne title="Specialiști Pediatri" subTitle="Doctori" />
      <section className="bd-doctors-area pt-120 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="bd-doctors-content text-center">
                <h1 className="bd-section-title mb-30">Specialiști Pediatri</h1>
                <p className="mb-40">
                  Găsește specialiști pediatri verificați pentru consultații despre activitățile
                  sportive ale copilului tău.
                </p>
                {/* TODO: Add doctors listing component */}
                <div className="bd-doctors-placeholder">
                  <p>Lista de doctori va fi adăugată aici.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
