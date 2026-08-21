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
              <div className="mb-50">
                <p className="lead text-yuvoo-body mb-4">
                  Yuvoo publică ghiduri gratuite pentru părinții din România care vor să aleagă
                  sportul potrivit copilului — fără presiune, fără recomandări generice și fără ore
                  pierdute căutând informații contradictorii online.
                </p>
                <p className="text-yuvoo-body mb-4">
                  Fiecare ghid răspunde la o întrebare concretă: la ce vârstă poate începe un copil
                  un anumit sport, cum recunoști un club de calitate, ce costuri și echipament să
                  anticipezi sau cum combini recomandările medicului cu preferințele copilului.
                  Conținutul este scris în română, orientat spre părinți din București și alte orașe
                  mari, și se bazează pe practici comune în cluburile verificate de pe platformă.
                </p>
                <p className="text-yuvoo-body mb-4">
                  Dacă vrei o recomandare personalizată — nu doar informații generale — poți folosi{" "}
                  <Link href={routes.quiz.intro} className="text-yuvoo-primary fw-semibold">
                    chestionarul AI Yuvoo
                  </Link>
                  . În 3–4 minute răspunzi la întrebări despre personalitatea, energia și ritmul de
                  dezvoltare al copilului; primești sporturi potrivite și pași clari pentru
                  explorarea cluburilor din zona ta.
                </p>
                <p className="text-yuvoo-body mb-0">
                  Mai jos găsești toate ghidurile publicate. Alege tema care te interesează acum —
                  vârstă, sport specific, siguranță sau alegerea între mai multe opțiuni — și
                  folosește linkurile către{" "}
                  <Link href={routes.clubs.list} className="text-yuvoo-primary fw-semibold">
                    cluburi verificate
                  </Link>{" "}
                  și{" "}
                  <Link href={routes.sports.list} className="text-yuvoo-primary fw-semibold">
                    paginile de sport
                  </Link>{" "}
                  pentru a trece de la informație la acțiune.
                </p>
              </div>
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
