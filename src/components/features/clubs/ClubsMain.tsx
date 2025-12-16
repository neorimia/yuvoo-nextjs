/**
 * Clubs Main Component
 *
 * Main component for displaying a list of clubs.
 * Adapted from Class/ClassesMain.tsx
 */

"use client";

import React from "react";
import Link from "next/link";
import { routes } from "@/lib/routes";
import type { Club } from "@/modules/clubs/clubs.types";
import ClubCard from "./ClubCard";

interface ClubsMainProps {
  clubs: Club[];
  recommendedSportIds?: string[]; // Sport IDs from quiz recommendations
  isQuizContext?: boolean; // Whether this is a quiz-based recommendation view
}

const ClubsMain: React.FC<ClubsMainProps> = ({
  clubs,
  recommendedSportIds = [],
  isQuizContext = false,
}) => {
  // Empty state
  if (!clubs || clubs.length === 0) {
    return (
      <section className="bd-club-area pt-110 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="text-center py-5">
                <div className="mb-4">
                  <i className="flaticon-sports" style={{ fontSize: "4rem", color: "#ccc" }}></i>
                </div>
                <h3 className="mb-3">Nu s-au găsit cluburi</h3>
                <p className="text-muted mb-4">
                  În prezent nu există cluburi disponibile care să corespundă criteriilor tale.
                  <br />
                  Încearcă să modifici filtrele sau revino mai târziu.
                </p>
                <Link href={routes.clubs.list} className="bd-btn">
                  <span className="bd-btn-inner">
                    <span className="bd-btn-normal">Vezi toate cluburile</span>
                    <span className="bd-btn-hover">Vezi toate cluburile</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bd-club-area pt-110 pb-70">
      <div className="container">
        {/* Quiz Recommendations Banner */}
        {isQuizContext && recommendedSportIds.length > 0 && (
          <div className="row mb-4">
            <div className="col-12">
              <div className="alert alert-info d-flex align-items-center" role="alert">
                <i className="bi bi-star-fill text-warning me-3 fs-4"></i>
                <div className="flex-grow-1">
                  <h5 className="alert-heading mb-1">Cluburi Recomandate</h5>
                  <p className="mb-0">
                    Aceste cluburi oferă sporturile recomandate pentru copilul tău. Explorează
                    opțiunile și rezervă o probă gratuită!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results count */}
        <div className="row mb-4">
          <div className="col-12">
            <p className="text-muted mb-0">
              {clubs.length} {clubs.length === 1 ? "club găsit" : "cluburi găsite"}
            </p>
          </div>
        </div>

        <div className="row">
          {clubs.map((club, index) => (
            <div className="col-xl-4 col-lg-6 col-md-6" key={club.id}>
              <div className="wow fadeInUp">
                <ClubCard
                  club={club}
                  variant="listing"
                  recommended={recommendedSportIds.includes(club.sportId)}
                  showAgeGroups={true}
                  delay={`.${(index + 1) * 2}s`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClubsMain;
