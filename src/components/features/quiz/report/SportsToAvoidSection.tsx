/**
 * Sports to Avoid Section Component
 *
 * Displays sports that should be avoided currently with short explanations.
 */

import React from "react";
import type { SportRecommendation } from "@/modules/quiz/quiz.types";

interface SportsToAvoidSectionProps {
  recommendations: SportRecommendation[];
  topRecommendations: SportRecommendation[];
}

/**
 * Sports to Avoid Section
 *
 * Displays sports with low match scores or that should be avoided.
 */
export default function SportsToAvoidSection({
  recommendations,
  topRecommendations,
}: SportsToAvoidSectionProps) {
  // Get sports with low match scores (below 50%) or not in top recommendations
  const sportsToAvoid = recommendations
    .filter(
      (rec) => rec.matchScore < 50 || !topRecommendations.some((top) => top.sportId === rec.sportId)
    )
    .sort((a, b) => a.matchScore - b.matchScore)
    .slice(0, 3); // Show top 3 to avoid

  if (sportsToAvoid.length === 0) {
    return null;
  }

  return (
    <section className="mb-5">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-light">
          <h2 className="h4 mb-0">
            <i className="bi bi-exclamation-triangle-fill me-2 text-warning"></i>
            Ce Sporturi Ar Trebui Evitate Momentan
          </h2>
        </div>
        <div className="card-body p-4">
          <p className="text-muted mb-4">
            Pe baza profilului completat, următoarele sporturi nu sunt recomandate în acest moment.
            Acest lucru nu înseamnă că copilul tău nu va putea practica aceste sporturi în viitor,
            ci că momentan există opțiuni mai potrivite pentru dezvoltarea sa.
          </p>

          <div className="row g-3">
            {sportsToAvoid.map((recommendation) => (
              <div key={recommendation.sportId} className="col-12 col-md-6">
                <div className="card border-0 bg-light">
                  <div className="card-body p-3">
                    <div className="d-flex align-items-start">
                      <i
                        className="bi bi-x-circle-fill text-muted me-3 mt-1"
                        style={{ fontSize: "1.25rem" }}
                      ></i>
                      <div className="flex-grow-1">
                        <h4 className="h6 fw-bold mb-2">{recommendation.sportName}</h4>
                        {recommendation.considerations &&
                        recommendation.considerations.length > 0 ? (
                          <p className="text-muted small mb-0">
                            {recommendation.considerations[0]}
                          </p>
                        ) : (
                          <p className="text-muted small mb-0">
                            Acest sport necesită abilități sau nivel de dezvoltare care nu sunt încă
                            potrivite pentru profilul completat. Recomandăm să revii la acest sport
                            peste 6-12 luni, după ce copilul tău va avea ocazia să se dezvolte mai
                            mult.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
