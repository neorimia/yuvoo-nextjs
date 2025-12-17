import React from "react";
import type { Metadata } from "next";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import AboutMain from "@/components/features/about/AboutMain";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Despre Noi - Yuvoo",
  description:
    "Află mai multe despre Yuvoo, platforma AI care ajută părinții să găsească activitățile sportive potrivite pentru copiii lor.",
  openGraph: {
    title: "Despre Noi - Yuvoo",
    description:
      "Află mai multe despre Yuvoo, platforma AI care ajută părinții să găsească activitățile sportive potrivite pentru copiii lor.",
    type: "website",
  },
  alternates: {
    canonical: "/despre-noi",
  },
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
      <BreadcrumbOne
        title="Despre Noi"
        subTitle="Despre Noi"
        items={[
          { name: "Yuvoo", url: routes.home },
          { name: "Despre Noi", url: routes.about }, // Current page
        ]}
      />
      <section className="bd-about-area pt-120 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="bd-about-content text-center mb-50">
                <h1 className="bd-section-title mb-30">Despre Yuvoo</h1>
                <p className="lead mb-40">
                  Platforma AI care transformă modul în care părinții din România găsesc
                  activitățile sportive perfecte pentru copiii lor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <AboutMain />
    </>
  );
}
