/**
 * Sport Benefits Section Component
 *
 * Displays physical and emotional benefits for each recommended sport.
 */

import React from "react";
import type { SportRecommendation } from "@/modules/quiz/quiz.types";

interface SportBenefitsSectionProps {
  recommendations: SportRecommendation[];
}

/**
 * Sport Benefits Section
 *
 * Displays what each sport develops (physical + emotional).
 */
export default function SportBenefitsSection({ recommendations }: SportBenefitsSectionProps) {
  if (recommendations.length === 0) {
    return null;
  }

  return (
    <section className="mb-5">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-light">
          <h2 className="h4 mb-0">
            <i className="bi bi-heart-fill me-2 text-danger"></i>
            Ce Dezvoltă Fiecare Sport
          </h2>
        </div>
        <div className="card-body p-4">
          <p className="text-muted mb-4">
            Fiecare sport contribuie la dezvoltarea copilului tău atât din punct de vedere fizic,
            cât și emoțional. Iată principalele beneficii pentru fiecare recomandare:
          </p>

          <div className="row g-4">
            {recommendations.map((recommendation) => (
              <div key={recommendation.sportId} className="col-12 col-md-6">
                <div className="card border-0 h-100" style={{ borderLeft: "4px solid #00BBAE" }}>
                  <div className="card-body p-4">
                    <h3 className="h5 fw-bold mb-3">{recommendation.sportName}</h3>

                    {/* Benefits List */}
                    {recommendation.benefits && recommendation.benefits.length > 0 ? (
                      <ul className="list-unstyled mb-0">
                        {recommendation.benefits.map((benefit, index) => (
                          <li key={index} className="mb-2">
                            <i className="bi bi-check-circle-fill text-success me-2"></i>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div>
                        <h4 className="h6 text-muted mb-2">Dezvoltare Fizică:</h4>
                        <ul className="list-unstyled mb-3">
                          <li>
                            <i className="bi bi-check-circle-fill text-success me-2"></i>
                            Coordonare și echilibru
                          </li>
                          <li>
                            <i className="bi bi-check-circle-fill text-success me-2"></i>
                            Forță și rezistență
                          </li>
                          <li>
                            <i className="bi bi-check-circle-fill text-success me-2"></i>
                            Mobilitate și flexibilitate
                          </li>
                        </ul>
                        <h4 className="h6 text-muted mb-2">Dezvoltare Emoțională:</h4>
                        <ul className="list-unstyled mb-0">
                          <li>
                            <i className="bi bi-check-circle-fill text-success me-2"></i>
                            Încredere în sine
                          </li>
                          <li>
                            <i className="bi bi-check-circle-fill text-success me-2"></i>
                            Disciplină și perseverență
                          </li>
                          <li>
                            <i className="bi bi-check-circle-fill text-success me-2"></i>
                            Socializare și lucru în echipă
                          </li>
                        </ul>
                      </div>
                    )}

                    {/* Considerations */}
                    {recommendation.considerations && recommendation.considerations.length > 0 && (
                      <div className="mt-3 pt-3 border-top">
                        <h4 className="h6 text-muted mb-2">Considerații:</h4>
                        <ul className="list-unstyled mb-0 small">
                          {recommendation.considerations.map((consideration, index) => (
                            <li key={index} className="mb-1">
                              <i className="bi bi-info-circle text-info me-2"></i>
                              {consideration}
                            </li>
                          ))}
                        </ul>
                      </div>
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
