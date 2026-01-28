/**
 * Age Guidance Section Component
 *
 * Displays ideal age to start each recommended sport.
 */

import React from "react";
import type { QuizResult, QuizAnswers } from "@/modules/quiz/quiz.types";

interface AgeGuidanceSectionProps {
  quizResult: QuizResult;
  quizAnswers?: QuizAnswers | null;
}

/**
 * Age Guidance Section
 *
 * Displays when to start each sport (now vs in 6-12 months) and signs to watch.
 */
export default function AgeGuidanceSection({ quizResult, quizAnswers }: AgeGuidanceSectionProps) {
  const childAge = quizAnswers?.age || null;
  const topRecommendations = [...quizResult.recommendations]
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3);

  if (topRecommendations.length === 0) {
    return null;
  }

  return (
    <section className="mb-4">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-light">
          <h2 className="h4 mb-0">
            <i className="bi bi-calendar-check-fill me-2 text-warning"></i>
            Vârsta ideală pentru început
          </h2>
        </div>
        <div className="card-body p-4">
          {childAge !== null ? (
            <>
              <p className="text-muted mb-4">
                Pe baza vârstei copilului tău ({childAge} ani), iată recomandările noastre pentru
                momentul potrivit de început:
              </p>

              <div className="row">
                {topRecommendations.map((recommendation) => {
                  // Determine start timing based on age and sport
                  const canStart = childAge >= 5;
                  const waitMonths = childAge < 5 ? 6 : 0;

                  return (
                    <div key={recommendation.sportId} className="col-12">
                      <div className="card border-0" style={{ borderLeft: "4px solid #00BBAE" }}>
                        <div className="card-body p-4">
                          <h3 className="h5 fw-bold mb-3">{recommendation.sportName}</h3>

                          {canStart ? (
                            <div>
                              <div className="alert alert-success mb-3" role="alert">
                                <i className="bi bi-check-circle-fill me-2"></i>
                                <strong>Poate începe acum</strong>
                              </div>
                              <p className="small mb-0">
                                Copilul tău are vârsta potrivită pentru a începe acest sport. Este
                                important să găsești un club sau antrenor care lucrează cu copii de
                                vârsta lui și care oferă un program adaptat pentru începători.
                              </p>
                            </div>
                          ) : (
                            <div>
                              <div className="alert alert-warning mb-3" role="alert">
                                <i className="bi bi-clock-fill me-2"></i>
                                <strong>Recomandăm să aștepți {waitMonths} luni</strong>
                              </div>
                              <p className="small mb-0">
                                Pentru acest sport, recomandăm să aștepți până când copilul tău va
                                avea {childAge + 1} ani. În acest timp, poți pregăti copilul prin
                                activități de bază care dezvoltă coordonarea și echilibrul.
                              </p>
                            </div>
                          )}

                          {/* Signs to Watch */}
                          <div className="mt-3 pt-3 border-top">
                            <h4 className="h6 text-muted mb-2">Semne de urmărit:</h4>
                            <ul className="list-unstyled mb-0 small">
                              <li className="mb-1">
                                <i className="bi bi-check-circle text-success me-2"></i>
                                Interes și entuziasm pentru sport
                              </li>
                              <li className="mb-1">
                                <i className="bi bi-check-circle text-success me-2"></i>
                                Capacitatea de a urmări instrucțiuni simple
                              </li>
                              <li className="mb-1">
                                <i className="bi bi-check-circle text-success me-2"></i>
                                Coordonare de bază și echilibru
                              </li>
                              <li className="mb-0">
                                <i className="bi bi-check-circle text-success me-2"></i>
                                Dispoziție de a interacționa cu alți copii (pentru sporturi de
                                echipă)
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <p className="text-muted mb-0">
              Pentru a oferi recomandări precise despre vârsta ideală de început, avem nevoie de
              informații despre vârsta copilului. În general, majoritatea sporturilor pot fi
              începute între 5-7 ani, dar fiecare copil este unic și dezvoltarea sa poate varia.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
