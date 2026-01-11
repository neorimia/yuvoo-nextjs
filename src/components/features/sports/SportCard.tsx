/**
 * Sport Card Component
 *
 * Reusable sport card component for displaying sport information.
 * Similar structure to ClubCard but optimized for sports.
 */

import React from "react";
import Link from "next/link";
import { routes } from "@/lib/routes";
import type { Sport } from "@/modules/sports/sports.types";
import Image from "next/image";
import { isPlaceholderUrl } from "@/lib/utils/image-helpers";

interface SportCardProps {
  sport: Sport;
  className?: string;
}

const SportCard: React.FC<SportCardProps> = ({ sport, className = "" }) => {
  const categoryLabels: Record<string, string> = {
    echipa: "Sport de echipă",
    individual: "Sport individual",
    combat: "Sport de luptă",
    artistic: "Sport artistic",
    altul: "Alte sporturi",
  };

  const categoryColors: Record<string, string> = {
    echipa: "bd-sport-category-echipa",
    individual: "bd-sport-category-individual",
    combat: "bd-sport-category-combat",
    artistic: "bd-sport-category-artistic",
    altul: "bd-sport-category-altul",
  };

  return (
    <div className={`bd-sport-card fix radius-24 p-relative mb-50 ${className}`}>
      <div className="bd-sport-card-thumb">
        {sport.image && (
          <Image
            src={sport.image}
            alt={sport.name}
            width={600}
            height={400}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            quality={85}
            unoptimized={isPlaceholderUrl(sport.image)}
          />
        )}
        <div className={`bd-sport-card-category-badge ${categoryColors[sport.category] || ""}`}>
          <i className="flaticon-category"></i>
          <span>{categoryLabels[sport.category] || sport.category}</span>
        </div>
      </div>
      <div className="bd-sport-card-content theme-bg-6">
        <h3 className="bd-sport-card-title">
          <Link href={routes.sports.detail(sport.slug)}>{sport.name}</Link>
        </h3>
        <p className="bd-sport-card-description">
          {sport.description ||
            "Descoperă acest sport și găsește cluburi sportive care oferă programe adaptate pentru copiii tăi."}
        </p>
        <div className="bd-sport-card-meta-wrapper">
          <div className="bd-sport-card-meta">
            <div className="bd-sport-card-age">
              <i className="flaticon-calendar"></i>
              <span>
                {sport.minAge}-{sport.maxAge} ani
              </span>
            </div>
          </div>
          {sport.clubCount !== undefined && sport.clubCount > 0 && (
            <div className="bd-sport-card-clubs">
              <i className="flaticon-sports"></i>
              <span className="bd-sport-card-clubs-count">{sport.clubCount}</span>
              <span className="bd-sport-card-clubs-text">
                {sport.clubCount === 1 ? "club" : "cluburi"}
              </span>
              {sport.verifiedClubCount !== undefined && sport.verifiedClubCount > 0 && (
                <span className="bd-sport-card-clubs-verified">
                  {" "}
                  ({sport.verifiedClubCount} verificate)
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="bd-sport-card-btn theme-bg-2 text-center">
        <Link href={routes.sports.detail(sport.slug)} className="bd-sport-card-btn-link">
          Vezi detalii
          <i className="fal fa-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
};

export default React.memo(SportCard);
