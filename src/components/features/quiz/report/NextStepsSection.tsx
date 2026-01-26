/**
 * Next Steps Section Component
 *
 * Displays recommended next steps for parents.
 */

import React from "react";
import type { QuizResult } from "@/modules/quiz/quiz.types";
import { routes } from "@/lib/routes";
import Link from "next/link";

interface NextStepsSectionProps {
  quizResult: QuizResult;
}

/**
 * Next Steps Section
 *
 * Displays how to start, what to watch, and questions to ask clubs.
 */
export default function NextStepsSection({ quizResult }: NextStepsSectionProps) {
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
            <i className="bi bi-arrow-right-circle-fill me-2 text-yuvoo-primary"></i>
            Pașii următori recomandați
          </h2>
        </div>
        <div className="card-body p-4">
          <p className="text-muted mb-4">
            Iată un ghid practic pentru a începe călătoria copilului tău în sportul recomandat:
          </p>

          <div className="row gap-4">
            {/* How to Start */}
            <div className="col-12">
              <div className="card border-0 bg-light h-100">
                <div className="card-body p-4">
                  <h3 className="h5 fw-bold mb-3">
                    <i className="bi bi-play-circle-fill text-yuvoo-primary me-2"></i>
                    Cum să începi
                  </h3>
                  <ol className="mb-0">
                    <li className="mb-2">
                      <strong>Caută cluburi locale</strong> care oferă programe pentru copii de
                      vârsta copilului tău
                    </li>
                    <li className="mb-2">
                      <strong>Programează o lecție de probă</strong> pentru a vedea dacă copilul tău
                      se simte confortabil
                    </li>
                    <li className="mb-2">
                      <strong>Discută cu antrenorul</strong> despre programul și abordarea lor
                    </li>
                    <li className="mb-0">
                      <strong>Începe cu un program flexibil</strong> care permite copilului să se
                      adapteze treptat
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            {/* What to Watch */}
            <div className="col-12">
              <div className="card border-0 bg-light h-100">
                <div className="card-body p-4">
                  <h3 className="h5 fw-bold mb-3">
                    <i className="bi bi-eye-fill text-yuvoo-primary me-2"></i>
                    La ce să fii atent la primul antrenament
                  </h3>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      <strong>Reacția copilului:</strong> Este entuziasmat sau pare reticent?
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      <strong>Atmosfera:</strong> Este prietenoasă și susținătoare pentru copii?
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      <strong>Raportul antrenor-copil:</strong> Antrenorul este răbdător și
                      încurajator?
                    </li>
                    <li className="mb-0">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      <strong>Nivelul de dificultate:</strong> Este potrivit pentru începători?
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Questions to Ask */}
          <div className="mt-4">
            <div className="card border-0" style={{ borderLeft: "4px solid #7C81FF" }}>
              <div className="card-body p-4">
                <h3 className="h5 fw-bold mb-3">
                  <i className="bi bi-question-circle-fill text-yuvoo-primary me-2"></i>
                  Întrebări importante de pus clubului
                </h3>
                <div className="row">
                  <div className="col-12">
                    <ul className="list-unstyled mb-0">
                      <li className="mb-2">
                        <i className="bi bi-dot text-yuvoo-primary me-2"></i>
                        Ce vârstă minimă acceptați pentru programul de începători?
                      </li>
                      <li className="mb-2">
                        <i className="bi bi-dot text-yuvoo-primary me-2"></i>
                        Câte copii sunt într-un grup și câți antrenori?
                      </li>
                      <li className="mb-2">
                        <i className="bi bi-dot text-yuvoo-primary me-2"></i>
                        Oferiți lecții de probă sau programe de introducere?
                      </li>
                      <li className="mb-2">
                        <i className="bi bi-dot text-yuvoo-primary me-2"></i>
                        Care este programul și cât de flexibil este?
                      </li>
                      <li className="mb-2">
                        <i className="bi bi-dot text-yuvoo-primary me-2"></i>
                        Ce echipament este necesar și unde poate fi procurat?
                      </li>
                      <li className="mb-0">
                        <i className="bi bi-dot text-yuvoo-primary me-2"></i>
                        Cum gestionați dezvoltarea progresivă a copiilor?
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA to Browse Clubs */}
          <div className="mt-4 text-center">
            <Link href={routes.clubs.list} className="btn btn-yuvoo-primary btn-lg">
              <i className="bi bi-search me-2"></i>
              Explorează Cluburi Locale
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
