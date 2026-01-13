/**
 * Sport Recommendations Section Component
 *
 * Displays top 2-3 sport recommendations with match scores.
 */

import React from "react";
import type { SportRecommendation } from "@/modules/quiz/quiz.types";

interface SportRecommendationsSectionProps {
  recommendations: SportRecommendation[];
}

/**
 * Sport Recommendations Section
 *
 * Displays top recommendations with visual match scores.
 */
export default function SportRecommendationsSection({
  recommendations,
}: SportRecommendationsSectionProps) {
  if (recommendations.length === 0) {
    return null;
  }

  return (
    <section className="mb-5">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-primary text-white">
          <h2 className="h4 mb-0">
            <i className="bi bi-star-fill me-2"></i>
            Top {recommendations.length} Sporturi Recomandate
          </h2>
        </div>
        <div className="card-body p-4">
          <p className="text-muted mb-4">
            Pe baza profilului completat, am identificat următoarele sporturi ca fiind cele mai
            potrivite pentru copilul tău, ordonate după nivelul de compatibilitate:
          </p>

          <div className="row g-4">
            {recommendations.map((recommendation, index) => (
              <div key={recommendation.sportId} className="col-12 col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body p-4">
                    {/* Rank Badge */}
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <span
                        className="badge bg-primary rounded-pill"
                        style={{ fontSize: "0.875rem" }}
                      >
                        #{index + 1}
                      </span>
                      <span className="badge bg-success rounded-pill" style={{ fontSize: "1rem" }}>
                        {recommendation.matchScore}% potrivire
                      </span>
                    </div>

                    {/* Sport Name */}
                    <h3 className="h5 fw-bold mb-3">{recommendation.sportName}</h3>

                    {/* Match Score Visual */}
                    <div className="mb-3">
                      <div className="progress" style={{ height: "8px" }}>
                        <div
                          className="progress-bar bg-success"
                          role="progressbar"
                          style={{ width: `${recommendation.matchScore}%` }}
                          aria-valuenow={recommendation.matchScore}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        ></div>
                      </div>
                    </div>

                    {/* Quick Preview */}
                    {recommendation.reasoning && (
                      <p className="text-muted small mb-0" style={{ minHeight: "60px" }}>
                        {recommendation.reasoning.length > 120
                          ? `${recommendation.reasoning.substring(0, 120)}...`
                          : recommendation.reasoning}
                      </p>
                    )}
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
