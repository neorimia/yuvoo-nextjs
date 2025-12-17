/**
 * Sport Details Main Component
 *
 * Main component for displaying sport details with enhanced styling and content.
 * Similar structure to ClubDetailsMain but optimized for sports.
 * Server Component - can be used in SSG pages.
 */

import React from "react";
import Link from "next/link";
import { routes } from "@/lib/routes";
import type { Sport } from "@/modules/sports/sports.types";
import SportContentExpanded from "./SportContentExpanded";
import { getExpandedContentBySportId } from "@/data/sport-expanded-content";

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
  // Get expanded content if available
  const expandedContent = getExpandedContentBySportId(sport.id);

  return (
    <>
      <section className="bd-sport-details-area">
        <div className="container">
          <div className="row g-4">
            <div className="col-xl-6 col-lg-12">
              <div
                className="bd-sport-details-thumb wow fadeInLeft"
                data-wow-duration="1s"
                data-wow-delay=".3s"
              >
                {sport.icon && (
                  <div className="bd-sport-details-icon-wrapper">
                    <i className={`bd-sport-details-icon ${sport.icon}`}></i>
                  </div>
                )}
              </div>
            </div>
            <div className="col-xl-6 col-lg-12">
              <div
                className="bd-sport-details-content theme-bg-6 wow fadeInRight"
                data-wow-duration="1s"
                data-wow-delay=".3s"
              >
                <h2 className="bd-sport-details-title">{sport.name}</h2>
                <p className="bd-sport-details-description">
                  {sport.description ||
                    "Descoperă acest sport și găsește cluburi verificate care oferă programe adaptate pentru copiii tăi."}
                </p>

                <div className="bd-sport-details-info-wrapper">
                  {/* Category Information */}
                  <div className="bd-sport-details-info-item">
                    <div className="bd-sport-details-info-icon">
                      <i className="fa-solid fa-layer-group"></i>
                    </div>
                    <div className="bd-sport-details-info-content">
                      <span className="bd-sport-details-info-label">Categorie</span>
                      <h5 className="bd-sport-details-info-value">
                        {categoryLabels[sport.category] || sport.category}
                      </h5>
                    </div>
                  </div>

                  {/* Age Range Information */}
                  <div className="bd-sport-details-info-item">
                    <div className="bd-sport-details-info-icon">
                      <i className="fa-solid fa-calendar-days"></i>
                    </div>
                    <div className="bd-sport-details-info-content">
                      <span className="bd-sport-details-info-label">Vârstă recomandată</span>
                      <h5 className="bd-sport-details-info-value">
                        {sport.minAge} - {sport.maxAge} ani
                      </h5>
                    </div>
                  </div>

                  {/* Clubs Information */}
                  {sport.clubCount !== undefined && (
                    <div className="bd-sport-details-info-item">
                      <div className="bd-sport-details-info-icon">
                        <i className="flaticon-sports"></i>
                      </div>
                      <div className="bd-sport-details-info-content">
                        <span className="bd-sport-details-info-label">Cluburi disponibile</span>
                        <h5 className="bd-sport-details-info-value">
                          {sport.clubCount} {sport.clubCount === 1 ? "club" : "cluburi"}
                          {sport.verifiedClubCount !== undefined && sport.verifiedClubCount > 0 && (
                            <span className="bd-sport-details-info-verified">
                              {" "}
                              ({sport.verifiedClubCount} verificate)
                            </span>
                          )}
                        </h5>
                      </div>
                    </div>
                  )}
                </div>

                {/* CTA Buttons */}
                <div className="bd-sport-details-actions">
                  {sport.clubCount !== undefined && sport.clubCount > 0 && (
                    <Link href={`${routes.clubs.list}?sport=${sport.id}`} className="bd-btn">
                      <span className="bd-btn-inner">
                        <span className="bd-btn-normal">
                          <i className="flaticon-sports me-2"></i>Vezi cluburi
                        </span>
                        <span className="bd-btn-hover">
                          <i className="flaticon-sports me-2"></i>Vezi cluburi
                        </span>
                      </span>
                    </Link>
                  )}
                  <Link href={routes.quiz.intro} className="bd-btn bd-btn-outline">
                    <span className="bd-btn-inner">
                      <span className="bd-btn-normal">
                        <i className="flaticon-reading me-2"></i>Începe chestionarul AI
                      </span>
                      <span className="bd-btn-hover">
                        <i className="flaticon-reading me-2"></i>Începe chestionarul AI
                      </span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expanded Content Section */}
      {expandedContent && <SportContentExpanded content={expandedContent} />}
    </>
  );
};

export default SportDetailsMain;
