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

const MAX_AVOID_TEXT = 200;

function avoidExplanation(rec: SportRecommendation): string | null {
  if (rec.reasoning && rec.reasoning.trim().length > 0) {
    return rec.reasoning.length > MAX_AVOID_TEXT
      ? rec.reasoning.substring(0, MAX_AVOID_TEXT).trim() + "..."
      : rec.reasoning;
  }
  if (rec.considerations && rec.considerations.length > 0) {
    const joined = rec.considerations.join(" ").trim();
    return joined.length > MAX_AVOID_TEXT
      ? joined.substring(0, MAX_AVOID_TEXT).trim() + "..."
      : joined;
  }
  return null;
}

const headingId = "sporturi-de-evitata-heading";

/**
 * Sports to Avoid Section
 *
 * Displays sports with low match scores or that should be avoided.
 */
export default function SportsToAvoidSection({
  recommendations,
  topRecommendations,
}: SportsToAvoidSectionProps) {
  const sportsToAvoid = recommendations
    .filter(
      (rec) => rec.matchScore < 50 || !topRecommendations.some((top) => top.sportId === rec.sportId)
    )
    .sort((a, b) => a.matchScore - b.matchScore)
    .slice(0, 3);

  if (sportsToAvoid.length === 0) {
    return null;
  }

  return (
    <section id="sporturi-de-evitata" className="mb-4" aria-labelledby={headingId}>
      <div className="card shadow-sm border-0">
        <div className="card-header bg-light">
          <h2 id={headingId} className="h4 mb-0">
            <i className="bi bi-exclamation-triangle-fill me-2 text-warning" aria-hidden="true"></i>
            Ce sporturi ar trebui evitate momentan
          </h2>
        </div>
        <div className="card-body p-4">
          <p className="text-muted mb-4">
            Pe baza profilului completat, următoarele sporturi nu sunt recomandate în acest moment.
            Acest lucru nu înseamnă că copilul tău nu va putea practica aceste sporturi în viitor,
            ci că momentan există opțiuni mai potrivite pentru dezvoltarea sa.
          </p>

          <div className="row">
            {sportsToAvoid.map((rec) => {
              const text = avoidExplanation(rec);
              return (
                <div key={rec.sportId} className="col-12">
                  <div className="card border-0 bg-light">
                    <div className="card-body p-3">
                      <div className="d-flex align-items-start">
                        <i
                          className="bi bi-x-circle-fill text-muted me-3 mt-1 report-icon-avoid"
                          aria-hidden="true"
                        ></i>
                        <div className="flex-grow-1">
                          <h4 className="h6 fw-bold mb-2">{rec.sportName}</h4>
                          <p className="text-muted small mb-0">
                            {text ?? (
                              <>
                                Acest sport necesită abilități sau nivel de dezvoltare care nu sunt
                                încă potrivite pentru profilul completat. Recomandăm să revii la
                                acest sport peste 6-12 luni, după ce copilul tău va avea ocazia să
                                se dezvolte mai mult.
                              </>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
