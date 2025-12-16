/**
 * Sport Recommendation Card
 *
 * Displays a single sport recommendation with match score, reasoning, benefits, and considerations.
 * Used in quiz results page to show AI-generated recommendations.
 * Includes interactive club recommendations.
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { getRecommendedClubsAction } from "@/app/actions/clubs";
import ClubCard from "@/components/features/clubs/ClubCard";
import type { SportRecommendation } from "@/modules/quiz/quiz.types";
import type { Club } from "@/modules/clubs/clubs.types";

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
  const [recommendedClubs, setRecommendedClubs] = useState<Club[]>([]);
  const [loadingClubs, setLoadingClubs] = useState(false);
  const [showClubs, setShowClubs] = useState(false);

  const matchScoreColor = getMatchScoreColor(recommendation.matchScore);
  const matchScoreBadge = getMatchScoreBadge(recommendation.matchScore);
  const sportIcon = getSportIcon(recommendation.sportId);

  // Load recommended clubs when user clicks to view
  const handleViewClubs = async () => {
    if (recommendedClubs.length > 0) {
      setShowClubs(!showClubs);
      return;
    }

    setLoadingClubs(true);
    try {
      const result = await getRecommendedClubsAction(recommendation.sportId, undefined, 5);
      setRecommendedClubs(result.clubs);
      setShowClubs(true);
    } catch (error) {
      console.error("Error loading recommended clubs:", error);
    } finally {
      setLoadingClubs(false);
    }
  };

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

        {/* CTA Buttons */}
        <div className="mt-4 pt-3 border-top">
          <div className="d-flex gap-2 flex-wrap">
            <button
              type="button"
              className="btn btn-yuvoo-primary flex-grow-1"
              onClick={handleViewClubs}
              disabled={loadingClubs}
            >
              {loadingClubs ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Se încarcă...
                </>
              ) : (
                <>
                  <i className="bi bi-search me-2"></i>
                  {showClubs ? "Ascunde" : "Vezi"} Cluburi Recomandate
                </>
              )}
            </button>
            <Link
              href={`${routes.clubs.list}?sport=${recommendation.sportId}&quiz=true`}
              className="btn btn-outline-yuvoo-primary"
            >
              <i className="bi bi-list-ul me-2"></i>
              Vezi toate cluburile
            </Link>
          </div>
        </div>

        {/* Recommended Clubs List */}
        {showClubs && recommendedClubs.length > 0 && (
          <div className="mt-4 pt-4 border-top">
            <h6 className="mb-3">
              <i className="bi bi-trophy-fill text-yuvoo-primary me-2"></i>
              Cluburi Recomandate pentru {recommendation.sportName} ({recommendedClubs.length})
            </h6>
            <div className="row g-3">
              {recommendedClubs.map((club) => (
                <div key={club.id} className="col-12 col-md-6">
                  <ClubCard club={club} variant="compact" />
                </div>
              ))}
            </div>
            <div className="mt-3 text-center">
              <Link
                href={`${routes.clubs.list}?sport=${recommendation.sportId}`}
                className="btn btn-sm btn-outline-yuvoo-primary"
              >
                Vezi toate cluburile pentru {recommendation.sportName}
              </Link>
            </div>
          </div>
        )}

        {showClubs && recommendedClubs.length === 0 && !loadingClubs && (
          <div className="mt-4 pt-4 border-top">
            <div className="alert alert-info mb-0" role="alert">
              <i className="bi bi-info-circle me-2"></i>
              Nu s-au găsit cluburi disponibile pentru {recommendation.sportName} în acest moment.
              Te rugăm să verifici din nou mai târziu.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SportRecommendationCard;
