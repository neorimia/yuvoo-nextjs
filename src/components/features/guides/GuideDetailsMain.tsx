/**
 * Guide detail page content — long-tail SEO / AEO landing pages
 */

import Link from "next/link";
import type { GuidePage } from "@/data/guide-pages-data";
import { getGuideBySlug } from "@/data/guide-pages-data";
import { routes } from "@/lib/routes";
import SectionTitle from "@/components/shared/SectionTitle";
import FaqAccordionItem from "@/components/shared/FaqAccordionItem";
import YMYLDisclaimer from "@/components/shared/YMYLDisclaimer";

interface GuideDetailsMainProps {
  guide: GuidePage;
}

export default function GuideDetailsMain({ guide }: GuideDetailsMainProps) {
  const accordionId = `guideFaq-${guide.slug}`;
  const relatedGuides = guide.relatedGuideSlugs
    .map((slug) => getGuideBySlug(slug))
    .filter((g): g is GuidePage => g !== undefined);

  return (
    <section className="bd-guide-details-area pt-120 pb-70">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 mx-auto">
            <h1 className="bd-section-title mb-4">{guide.h1}</h1>

            <YMYLDisclaimer variant={guide.ymylVariant} className="mb-4" />

            <p className="lead mb-4">{guide.introduction.split("\n\n")[0]}</p>
            {guide.introduction.includes("\n\n") && (
              <p className="mb-4">{guide.introduction.split("\n\n").slice(1).join("\n\n")}</p>
            )}

            <SectionTitle title="Sporturi recomandate" className="mb-30" />
            <ul className="list-unstyled mb-5">
              {guide.recommendations.map((rec) => (
                <li key={rec.sportSlug} className="mb-4 p-3 theme-bg-6 rounded">
                  <h3 className="h5 mb-2">
                    <Link
                      href={routes.sports.detail(rec.sportSlug)}
                      className="text-yuvoo-primary text-decoration-none"
                    >
                      {rec.sportName}
                    </Link>
                  </h3>
                  <p className="mb-2 text-muted">{rec.reason}</p>
                  <Link
                    href={routes.clubs.list}
                    className="small text-yuvoo-primary text-decoration-underline"
                  >
                    Vezi cluburi {rec.sportName.toLowerCase()} pentru copii
                  </Link>
                </li>
              ))}
            </ul>

            {guide.ageTable && guide.ageTable.length > 0 && (
              <>
                <SectionTitle title="Ghid pe vârste" className="mb-30" />
                <div className="table-responsive mb-5">
                  <table className="table table-bordered">
                    <thead className="table-light">
                      <tr>
                        <th scope="col">Vârstă</th>
                        <th scope="col">Sporturi frecvente</th>
                        <th scope="col">Note</th>
                      </tr>
                    </thead>
                    <tbody>
                      {guide.ageTable.map((row) => (
                        <tr key={row.ageRange}>
                          <td>{row.ageRange}</td>
                          <td>{row.sports}</td>
                          <td>{row.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            <div className="theme-bg-6 p-4 rounded mb-5">
              <p className="fw-semibold mb-2">Recomandare personalizată în câteva minute</p>
              <p className="small text-muted mb-3">
                Chestionarul AI Yuvoo analizează profilul copilului tău și propune sporturi
                potrivite, cu explicații clare în română.
              </p>
              <div className="d-flex flex-wrap gap-2">
                <Link href={routes.quiz.intro} className="btn btn-yuvoo-primary btn-sm">
                  Începe chestionarul AI
                </Link>
                <Link href={routes.clubs.list} className="btn btn-yuvoo-outline-primary btn-sm">
                  Explorează cluburi
                </Link>
              </div>
            </div>

            {relatedGuides.length > 0 && (
              <>
                <SectionTitle title="Ghiduri similare" className="mb-30" />
                <div className="d-flex flex-wrap gap-2 mb-5">
                  {relatedGuides.map((related) => (
                    <Link
                      key={related.slug}
                      href={routes.guides.detail(related.slug)}
                      className="btn btn-sm btn-yuvoo-outline-primary"
                    >
                      {related.h1}
                    </Link>
                  ))}
                </div>
              </>
            )}

            <SectionTitle title="Întrebări frecvente" className="mb-30" />
            <div className="accordion mb-4" id={accordionId}>
              {guide.faq.map((item, index) => (
                <FaqAccordionItem
                  key={item.question}
                  id={`${guide.slug}-${index}`}
                  question={item.question}
                  answer={item.answer}
                  isOpen={index === 0}
                  accordionId={accordionId}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
