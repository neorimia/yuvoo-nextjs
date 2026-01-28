/**
 * Sport Explanations Section Component
 *
 * Displays detailed explanations for why each recommended sport is suitable.
 */

import React from "react";
import type { SportRecommendation } from "@/modules/quiz/quiz.types";

interface SportExplanationsSectionProps {
  recommendations: SportRecommendation[];
}

const headingId = "de-ce-potrivite-heading";

/**
 * Sport Explanations Section
 *
 * Displays why each recommended sport is suitable (non-medical explanations).
 */
export default function SportExplanationsSection({
  recommendations,
}: SportExplanationsSectionProps) {
  if (recommendations.length === 0) {
    return null;
  }

  return (
    <section id="de-ce-potrivite" className="mb-4" aria-labelledby={headingId}>
      <div className="card shadow-sm border-0">
        <div className="card-header bg-light">
          <h2 id={headingId} className="h4 mb-0">
            <i className="bi bi-lightbulb-fill me-2 text-warning" aria-hidden="true"></i>
            De ce aceste sporturi sunt potrivite
          </h2>
        </div>
        <div className="card-body p-4">
          <p className="text-muted mb-4">
            Fiecare sport a fost selectat pe baza profilului completat, ținând cont de
            personalitatea, nivelul de energie, vârsta și preferințele copilului tău.
          </p>

          <div className="row g-4">
            {recommendations.map((recommendation) => (
              <div key={recommendation.sportId} className="col-12">
                <div className="card border-0 bg-light">
                  <div className="card-body p-4">
                    <h3 className="h5 fw-bold mb-3">
                      <span className="badge bg-yuvoo-primary me-2 report-badge">
                        {recommendation.matchScore}%
                      </span>
                      {recommendation.sportName}
                    </h3>
                    {recommendation.reasoning ? (
                      <p className="mb-0">{recommendation.reasoning}</p>
                    ) : (
                      <p className="text-muted mb-0">
                        {recommendation.sportName} este potrivit pentru profilul completat, oferind
                        un echilibru între dezvoltarea fizică și emoțională.
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
