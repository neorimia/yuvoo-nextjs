/**
 * Sport Details Main Component
 *
 * Main component for displaying sport details.
 * Similar structure to ClubDetailsMain.
 * Server Component - can be used in SSG pages.
 */

import React from "react";
import Link from "next/link";
import { routes } from "@/lib/routes";
import type { Sport } from "@/modules/sports/sports.types";

interface SportDetailsMainProps {
  sport: Sport;
}

const categoryLabels: Record<string, string> = {
  echipa: "Sport de echipă",
  individual: "Sport individual",
  combat: "Sport de luptă",
  artistic: "Sport artistic",
  altul: "Alte sporturi",
};

const SportDetailsMain: React.FC<SportDetailsMainProps> = ({ sport }) => {
  return (
    <section className="bd-sport-details-widget pt-120 pb-70">
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-12 mb-50">
            <div
              className="bd-sport-details-thumb wow fadeInLeft"
              data-wow-duration="1s"
              data-wow-delay=".3s"
            >
              {sport.icon && <i className={sport.icon} style={{ fontSize: "8rem" }}></i>}
            </div>
          </div>
          <div className="col-xl-6 col-lg-12 mb-50">
            <div
              className="bd-sport-details-widget-content theme-bg-6 wow fadeInRight"
              data-wow-duration="1s"
              data-wow-delay=".3s"
            >
              <h3 className="bd-sport-details-widget-title mb-20">{sport.name}</h3>
              <p className="mb-25">{sport.description}</p>

              <div className="bd-sport-details-info-wrapper mt-35">
                {/* Category Information */}
                <div className="bd-sport-details-info">
                  <div className="bd-sport-details-category">
                    <span>
                      <i className="flaticon-category me-2"></i>Categorie
                    </span>
                    <h5>{categoryLabels[sport.category] || sport.category}</h5>
                  </div>
                </div>

                {/* Age Range Information */}
                <div className="bd-sport-details-age">
                  <span>
                    <i className="flaticon-calendar me-2"></i>Vârstă recomandată
                  </span>
                  <h5>
                    {sport.minAge} - {sport.maxAge} ani
                  </h5>
                </div>

                {/* Clubs Information */}
                {sport.clubCount !== undefined && (
                  <div className="bd-sport-details-clubs">
                    <span>
                      <i className="flaticon-sports me-2"></i>Cluburi disponibile
                    </span>
                    <h5>
                      {sport.clubCount} {sport.clubCount === 1 ? "club" : "cluburi"}
                      {sport.verifiedClubCount !== undefined && sport.verifiedClubCount > 0 && (
                        <span className="text-success ms-2">
                          ({sport.verifiedClubCount} verificate)
                        </span>
                      )}
                    </h5>
                  </div>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="bd-sport-details-btn mt-40 d-flex gap-3 flex-wrap">
                {sport.clubCount !== undefined && sport.clubCount > 0 && (
                  <Link href={`${routes.clubs.list}?sport=${sport.id}`} className="bd-btn">
                    <span className="bd-btn-inner">
                      <span className="bd-btn-normal">Vezi cluburi</span>
                      <span className="bd-btn-hover">Vezi cluburi</span>
                    </span>
                  </Link>
                )}
                <Link href={routes.quiz.intro} className="bd-btn bd-btn-outline">
                  <span className="bd-btn-inner">
                    <span className="bd-btn-normal">Începe chestionarul</span>
                    <span className="bd-btn-hover">Începe chestionarul</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SportDetailsMain;
