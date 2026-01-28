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

  const noun = recommendations.length === 1 ? "sport" : "sporturi";
  const headingId = "sporturi-recomandate-heading";

  return (
    <section id="sporturi-recomandate" className="mb-4" aria-labelledby={headingId}>
      <div className="card shadow-sm border-0">
        <div className="card-header bg-light">
          <h2 id={headingId} className="h4 mb-0">
            <i className="bi bi-star-fill me-2 text-warning" aria-hidden="true"></i>
            Top {recommendations.length} {noun} recomandate pentru copilul tău
          </h2>
        </div>
        <div className="card-body p-4">
          <p className="text-muted mb-4">
            Pe baza profilului completat, am identificat următoarele {noun} ca fiind cele mai
            potrivite pentru copilul tău, ordonate după nivelul de compatibilitate:
          </p>

          <div className="row g-4">
            {recommendations.map((recommendation, index) => (
              <div key={recommendation.sportId} className="col-12">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <span className="badge bg-yuvoo-primary rounded-md report-badge">
                        #{index + 1}
                      </span>
                      <span className="badge bg-success rounded-md report-badge">
                        {recommendation.matchScore}% potrivire
                      </span>
                    </div>

                    <h3 className="h5 fw-bold mb-3">{recommendation.sportName}</h3>

                    <div className="mb-0">
                      <div className="progress report-progress">
                        <div
                          className="progress-bar bg-success"
                          role="progressbar"
                          style={{ width: `${recommendation.matchScore}%` }}
                          aria-valuenow={recommendation.matchScore}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-valuetext={`${recommendation.matchScore}% potrivire`}
                        />
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
