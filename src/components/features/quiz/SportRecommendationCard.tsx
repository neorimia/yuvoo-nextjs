/**
 * Sport Recommendation Card
 *
 * Displays a single sport recommendation with match score, reasoning, benefits, and considerations.
 * Used in quiz results page to show AI-generated recommendations.
 */

import React from "react";
import Link from "next/link";
import { routes } from "@/lib/routes";
import type { SportRecommendation } from "@/modules/quiz/quiz.types";

interface SportRecommendationCardProps {
  recommendation: SportRecommendation;
  rank: number; // Ranking position (1, 2, 3, etc.)
  className?: string;
}

/**
 * Get match score color class based on score
 */
function getMatchScoreColor(score: number): string {
  if (score >= 90) return "text-success";
  if (score >= 80) return "text-yuvoo-primary";
  if (score >= 70) return "text-info";
  return "text-muted";
}

/**
 * Get match score badge variant
 */
function getMatchScoreBadge(score: number): string {
  if (score >= 90) return "bg-success";
  if (score >= 80) return "bg-yuvoo-primary";
  if (score >= 70) return "bg-info";
  return "bg-secondary";
}

/**
 * Get sport icon (placeholder - can be enhanced with actual sport icons)
 */
function getSportIcon(sportId: string): string {
  // Map sport IDs to Bootstrap icons or custom icons
  const iconMap: Record<string, string> = {
    fotbal: "bi-ball",
    baschet: "bi-basket",
    volei: "bi-circle",
    handbal: "bi-circle-fill",
    tenis: "bi-circle-half",
    "tenis-de-masa": "bi-circle-half",
    badminton: "bi-circle-half",
    inot: "bi-droplet",
    polo: "bi-droplet-fill",
    atletism: "bi-lightning",
    alergare: "bi-lightning-fill",
    gimnastica: "bi-star",
    dans: "bi-music-note",
    balet: "bi-music-note-beamed",
    "arte-martiale": "bi-shield",
    judo: "bi-shield-fill",
    karate: "bi-shield-check",
    taekwondo: "bi-shield-exclamation",
    ciclism: "bi-bicycle",
    patinaj: "bi-snow",
    skateboarding: "bi-snow2",
    escalada: "bi-mountain",
    alpinism: "bi-mountain-fill",
    golf: "bi-circle",
    sah: "bi-grid",
    "tir-cu-arcul": "bi-bullseye",
  };

  return iconMap[sportId] || "bi-star-fill";
}

const SportRecommendationCard: React.FC<SportRecommendationCardProps> = ({
  recommendation,
  rank,
  className = "",
}) => {
  const matchScoreColor = getMatchScoreColor(recommendation.matchScore);
  const matchScoreBadge = getMatchScoreBadge(recommendation.matchScore);
  const sportIcon = getSportIcon(recommendation.sportId);

  return (
    <div className={`card shadow-sm h-100 ${className}`}>
      <div className="card-body p-4">
        {/* Header with rank, sport name, and match score */}
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div className="d-flex align-items-center gap-3">
            {/* Rank badge */}
            <div
              className={`badge ${matchScoreBadge} rounded-circle d-flex align-items-center justify-content-center`}
              style={{ width: "40px", height: "40px", fontSize: "1.1rem" }}
            >
              #{rank}
            </div>

            {/* Sport name and icon */}
            <div>
              <h3 className="h5 mb-0 d-flex align-items-center gap-2">
                <i className={`bi ${sportIcon} text-yuvoo-primary`}></i>
                {recommendation.sportName}
              </h3>
            </div>
          </div>

          {/* Match score */}
          <div className="text-end">
            <div className={`fw-bold fs-4 ${matchScoreColor}`}>{recommendation.matchScore}%</div>
            <small className="text-muted">Potrivire</small>
          </div>
        </div>

        {/* Reasoning (AI-generated explanation) */}
        <div className="mb-3">
          <p className="text-muted mb-0" style={{ lineHeight: "1.6" }}>
            {recommendation.reasoning}
          </p>
        </div>

        {/* Benefits */}
        {recommendation.benefits && recommendation.benefits.length > 0 && (
          <div className="mb-3">
            <h6 className="text-yuvoo-primary mb-2">
              <i className="bi bi-check-circle-fill me-2"></i>
              Beneficii
            </h6>
            <ul className="list-unstyled mb-0">
              {recommendation.benefits.map((benefit, index) => (
                <li key={index} className="mb-1">
                  <i className="bi bi-check text-success me-2"></i>
                  <small>{benefit}</small>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Considerations */}
        {recommendation.considerations && recommendation.considerations.length > 0 && (
          <div className="mb-3">
            <h6 className="text-warning mb-2">
              <i className="bi bi-info-circle-fill me-2"></i>
              Considerente
            </h6>
            <ul className="list-unstyled mb-0">
              {recommendation.considerations.map((consideration, index) => (
                <li key={index} className="mb-1">
                  <i className="bi bi-dash text-muted me-2"></i>
                  <small className="text-muted">{consideration}</small>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA Button */}
        <div className="mt-4 pt-3 border-top">
          <Link
            href={`${routes.clubs.list}?sport=${recommendation.sportId}&quiz=true`}
            className="btn btn-yuvoo-primary w-100"
          >
            <i className="bi bi-search me-2"></i>
            Vezi cluburi pentru {recommendation.sportName}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SportRecommendationCard;
