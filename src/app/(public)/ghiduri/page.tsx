import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import { routes } from "@/lib/routes";
import { GUIDE_PAGES } from "@/data/guide-pages-data";
import { generateGuidesHubMetadata } from "@/lib/seo/guide-metadata";
import SectionTitle from "@/components/shared/SectionTitle";

export const metadata: Metadata = generateGuidesHubMetadata();

/**
 * Guides hub — parent-facing long-tail SEO landing pages
 * Route: /ghiduri
 */
export default function GuidesHubPage() {
  return (
    <>
      <BreadcrumbOne
        title="Ghiduri pentru părinți"
        subTitle="Ghiduri"
        items={[
          { name: "Yuvoo", url: routes.home },
          { name: "Ghiduri", url: routes.guides.list },
        ]}
      />
      <section className="bd-guides-hub-area pt-120 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <SectionTitle
                title="Ghiduri pentru alegerea sportului potrivit"
                subtitle="Resurse gratuite pentru părinți din România — vârstă, personalitate, cluburi verificate și chestionar AI Yuvoo."
                className="mb-50"
              />
              <div className="row g-4">
                {GUIDE_PAGES.map((guide) => (
                  <div key={guide.slug} className="col-md-6">
                    <article className="card h-100 border-0 theme-bg-6">
                      <div className="card-body p-4">
                        <h2 className="h5 card-title mb-3">
                          <Link
                            href={routes.guides.detail(guide.slug)}
                            className="text-decoration-none text-yuvoo-primary"
                          >
                            {guide.h1}
                          </Link>
                        </h2>
                        <p className="card-text small text-muted mb-3">{guide.metaDescription}</p>
                        <Link
                          href={routes.guides.detail(guide.slug)}
                          className="btn btn-sm btn-yuvoo-outline-primary"
                        >
                          Citește ghidul
                        </Link>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
              <div className="theme-bg-6 p-4 rounded mt-5 text-center">
                <p className="mb-3 fw-semibold">Vrei recomandări personalizate?</p>
                <Link href={routes.quiz.intro} className="btn btn-yuvoo-primary">
                  Începe chestionarul AI
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
