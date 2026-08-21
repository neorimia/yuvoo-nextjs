/**
 * Expanded SEO content for location club listing pages.
 */

import Link from "next/link";
import type { LocationExpandedContent } from "@/lib/content/location-expanded-content";
import { routes } from "@/lib/routes";
import SectionTitle from "@/components/shared/SectionTitle";

interface LocationContentExpandedProps {
  content: LocationExpandedContent;
  locationDisplayName: string;
}

export default function LocationContentExpanded({
  content,
  locationDisplayName,
}: LocationContentExpandedProps) {
  const {
    stats,
    cityParagraph,
    districtParagraph,
    howToChoose,
    popularSports,
    ageGuide,
    localFaq,
    siblingLocations,
  } = content;

  return (
    <section className="bd-location-expanded-content pb-50">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 mx-auto">
            <div className="row g-4 mb-4">
              <div className="col-md-4">
                <div className="theme-bg-6 p-4 rounded text-center h-100">
                  <p className="display-6 fw-bold text-yuvoo-primary mb-1">{stats.totalClubs}</p>
                  <p className="small text-muted mb-0">Cluburi listate</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="theme-bg-6 p-4 rounded text-center h-100">
                  <p className="display-6 fw-bold text-yuvoo-primary mb-1">{stats.verifiedClubs}</p>
                  <p className="small text-muted mb-0">Cu badge verificat</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="theme-bg-6 p-4 rounded text-center h-100">
                  <p className="display-6 fw-bold text-yuvoo-primary mb-1">{stats.sportCount}</p>
                  <p className="small text-muted mb-0">Sporturi disponibile</p>
                </div>
              </div>
            </div>

            <p className="mb-4">{cityParagraph}</p>
            {districtParagraph && <p className="mb-4">{districtParagraph}</p>}

            <SectionTitle title={`Cum alegi un club în ${locationDisplayName}`} className="mb-30" />
            <p className="mb-4">{howToChoose}</p>

            {popularSports.length > 0 && (
              <>
                <SectionTitle
                  title={`Sporturi populare în ${locationDisplayName}`}
                  className="mb-30"
                />
                <ul className="list-unstyled mb-4">
                  {popularSports.map((sport) => (
                    <li key={sport.slug} className="mb-2">
                      <Link
                        href={routes.sports.detail(sport.slug)}
                        className="text-yuvoo-primary text-decoration-underline"
                      >
                        {sport.name}
                      </Link>
                      <span className="text-muted"> — {sport.count} cluburi</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <SectionTitle title="Vârste și programe" className="mb-30" />
            <p className="mb-4">{ageGuide}</p>

            {localFaq.length > 0 && (
              <>
                <SectionTitle
                  title={`Întrebări frecvente despre cluburi în ${locationDisplayName}`}
                  className="mb-30"
                />
                <div className="mb-4">
                  {localFaq.map((item) => (
                    <div key={item.question} className="mb-3">
                      <h3 className="h6 fw-semibold">{item.question}</h3>
                      <p className="small text-muted mb-0">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            <SectionTitle title="Ghiduri utile pentru părinți" className="mb-30" />
            <p className="mb-3 small text-muted">
              Resurse Yuvoo pentru alegerea sportului potrivit — pe vârstă, personalitate și
              întrebări frecvente.
            </p>
            <div className="d-flex flex-wrap gap-2 mb-4">
              <Link
                href={routes.guides.detail("sport-copii-6-ani")}
                className="btn btn-sm btn-yuvoo-outline-primary"
              >
                Sport copii 6 ani
              </Link>
              <Link
                href={routes.guides.detail("ce-sport-la-8-ani")}
                className="btn btn-sm btn-yuvoo-outline-primary"
              >
                Ce sport la 8 ani
              </Link>
              <Link
                href={routes.guides.detail("ce-sport-potrivit-copilului")}
                className="btn btn-sm btn-yuvoo-outline-primary"
              >
                Sport potrivit copilului
              </Link>
              <Link href={routes.guides.list} className="btn btn-sm btn-yuvoo-outline-secondary">
                Toate ghidurile
              </Link>
            </div>

            {siblingLocations.length > 0 && (
              <>
                <SectionTitle title="Explorează alte zone" className="mb-30" />
                <div className="d-flex flex-wrap gap-2 mb-4">
                  {siblingLocations.map((loc) => (
                    <Link
                      key={loc.slug}
                      href={routes.clubs.location(loc.slug)}
                      className="btn btn-sm btn-yuvoo-outline-primary"
                    >
                      {loc.displayName}
                    </Link>
                  ))}
                </div>
              </>
            )}

            <div className="theme-bg-6 p-4 rounded">
              <p className="mb-2 fw-semibold">Nu ești sigur ce sport se potrivește copilului?</p>
              <p className="small text-muted mb-3">
                Completează chestionarul AI Yuvoo (3–4 minute) pentru recomandări personalizate, sau
                consultă un{" "}
                <Link href={routes.doctors.list} className="text-yuvoo-primary">
                  specialist pediatru
                </Link>{" "}
                înainte de înscriere.
              </p>
              <Link href={routes.quiz.intro} className="btn btn-yuvoo-primary btn-sm">
                Începe chestionarul AI
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
