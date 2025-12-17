/**
 * Sport Card Component
 *
 * Reusable sport card component for displaying sport information.
 * Similar structure to ClubCard but for sports.
 */

import React from "react";
import Link from "next/link";
import { routes } from "@/lib/routes";
import type { Sport } from "@/modules/sports/sports.types";

interface SportCardProps {
  sport: Sport;
  variant?: "default" | "compact" | "featured";
  className?: string;
  delay?: string; // Animation delay for wow.js
}

const SportCard: React.FC<SportCardProps> = ({
  sport,
  variant: _variant = "default",
  className = "",
  delay,
}) => {
  const categoryLabels: Record<string, string> = {
    echipa: "Sport de echipă",
    individual: "Sport individual",
    combat: "Sport de luptă",
    artistic: "Sport artistic",
    altul: "Alte sporturi",
  };

  // Default variant matches bd-class-3 structure
  return (
    <div
      className={`bd-sport-3 fix radius-24 p-relative mb-50 ${className}`}
      data-wow-duration="1s"
      data-wow-delay={delay}
    >
      <div className="bd-sport-thumb">
        {sport.icon && <i className={sport.icon} style={{ fontSize: "4rem" }}></i>}
      </div>
      <div className="bd-sport-content-3 theme-bg-6">
        <h3 className="bd-sport-title-3">
          <Link href={routes.sports.detail(sport.slug)}>{sport.name}</Link>
        </h3>
        <p className="mb-20">{sport.description}</p>
        <div className="bd-sport-meta-wrapper d-flex justify-content-between align-items-center flex-wrap">
          <div className="bd-sport-meta d-flex align-items-center flex-wrap">
            <div className="bd-sport-category me-3">
              <i className="flaticon-category"></i>
              <span>{categoryLabels[sport.category] || sport.category}</span>
            </div>
            <div className="bd-sport-age me-3">
              <i className="flaticon-calendar"></i>
              <span>
                {sport.minAge}-{sport.maxAge} ani
              </span>
            </div>
          </div>
          {sport.clubCount !== undefined && (
            <div className="bd-sport-clubs">
              <span className="text-muted">
                {sport.clubCount} {sport.clubCount === 1 ? "club" : "cluburi"}
                {sport.verifiedClubCount !== undefined && sport.verifiedClubCount > 0 && (
                  <span className="text-success ms-1">({sport.verifiedClubCount} verificate)</span>
                )}
              </span>
            </div>
          )}
        </div>
        <div className="bd-sport-btn mt-3">
          <Link href={routes.sports.detail(sport.slug)} className="bd-btn">
            <span className="bd-btn-inner">
              <span className="bd-btn-normal">Vezi detalii</span>
              <span className="bd-btn-hover">Vezi detalii</span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SportCard;
