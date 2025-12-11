import React from "react";
import type { Metadata } from "next";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";

export const metadata: Metadata = {
  title: "Despre Noi - Yuvoo",
  description:
    "Află mai multe despre Yuvoo, platforma AI care ajută părinții să găsească activitățile sportive potrivite pentru copiii lor.",
};

/**
 * About Page
 *
 * Public marketing page about Yuvoo.
 * SEO-friendly route: /despre-noi
 */
export default function AboutPage() {
  return (
    <>
      <BreadcrumbOne title="Despre Noi" subTitle="Despre Noi" />
      <section className="bd-about-area pt-120 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="bd-about-content">
                <h1 className="bd-section-title mb-30">Despre Yuvoo</h1>
                {/* TODO: Add about content component */}
                <div className="bd-about-placeholder">
                  <p>Conținutul despre Yuvoo va fi adăugat aici.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
