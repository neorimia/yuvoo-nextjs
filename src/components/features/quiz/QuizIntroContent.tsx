/**
 * Quiz Intro Content Component
 *
 * Introduction section for the AI Coach Quiz.
 * Explains benefits, time estimate, and provides CTA to start.
 */

"use client";

import React from "react";
import Link from "next/link";
import { routes } from "@/lib/routes";

export default function QuizIntroContent({ quizCount }: { quizCount: number }) {
  return (
    <div className="quiz-intro-content">
      {/* Hero Section */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold mb-3 text-yuvoo-primary">
          Descoperă ce sport i se potrivește copilului tău
        </h1>
        <p className="lead text-muted mb-4">
          Chestionar AI personalizat pentru recomandări inteligente
        </p>
        <div className="d-flex align-items-center justify-content-center gap-2 mb-4">
          <i className="bi bi-clock text-yuvoo-primary"></i>
          <span className="text-muted">
            Doar 3–4 minute, 6 întrebări pentru recomandări personalizate
          </span>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="row justify-content-center mb-5">
        <div className="col-lg-10">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h2 className="h4 fw-semibold mb-4 text-center">Ce vei primi:</h2>
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="d-flex align-items-start gap-3">
                    <div className="w-auto d-flex justify-content-center align-items-center">
                      <div
                        className="bg-yuvoo-primary bg-opacity-10 rounded-circle p-2"
                        style={{ width: "40px", height: "40px" }}
                      >
                        <i className="bi bi-check-circle-fill text-white fs-4"></i>
                      </div>
                    </div>
                    <div>
                      <h3 className="h6 fw-semibold mb-1">Recomandări personalizate</h3>
                      <p className="text-muted small mb-0">
                        Sporturi potrivite pentru vârsta, personalitatea și energia copilului tău
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-start gap-3">
                    <div className="w-auto d-flex justify-content-center align-items-center">
                      <div
                        className="bg-yuvoo-primary bg-opacity-10 rounded-circle p-2"
                        style={{ width: "40px", height: "40px" }}
                      >
                        <i className="bi bi-lightbulb-fill text-white fs-4"></i>
                      </div>
                    </div>
                    <div>
                      <h3 className="h6 fw-semibold mb-1">Explicații clare</h3>
                      <p className="text-muted small mb-0">
                        Înțelege de ce fiecare sport este recomandat pentru copilul tău
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-start gap-3">
                    <div className="d-flex align-items-start gap-3">
                      <div
                        className="bg-yuvoo-primary bg-opacity-10 rounded-circle p-2"
                        style={{ width: "40px", height: "40px" }}
                      >
                        <i className="bi bi-building text-white fs-4"></i>
                      </div>
                    </div>
                    <div>
                      <h3 className="h6 fw-semibold mb-1">
                        <Link href={routes.clubs.list} className="text-decoration-none">
                          Cluburi potrivite
                        </Link>
                      </h3>
                      <p className="text-muted small mb-0">
                        Acces direct la{" "}
                        <Link href={routes.clubs.list} className="text-primary">
                          cluburi sportive
                        </Link>{" "}
                        care oferă sporturile recomandate. Explorează{" "}
                        <Link href={routes.sports.list} className="text-primary">
                          toate sporturile disponibile
                        </Link>
                        .
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-start gap-3">
                    <div className="d-flex align-items-start gap-3">
                      <div
                        className="bg-yuvoo-primary bg-opacity-10 rounded-circle p-2"
                        style={{ width: "40px", height: "40px" }}
                      >
                        <i className="bi bi-heart-pulse-fill text-white fs-4"></i>
                      </div>
                    </div>
                    <div>
                      <h3 className="h6 fw-semibold mb-1">Sugestii de specialiști</h3>
                      <p className="text-muted small mb-0">
                        Recomandări de medici specialiști dacă este necesar
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="row justify-content-center my-5">
        <div className="col-lg-10">
          <h2 className="h4 fw-semibold mb-4 text-center">Cum funcționează?</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="text-center">
                <div
                  className="bg-yuvoo-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: "64px", height: "64px" }}
                >
                  <span className="fs-3 fw-bold text-white">1</span>
                </div>
                <h3 className="h6 fw-semibold mb-2">Răspunde la 6 întrebări</h3>
                <p className="text-muted small mb-0">
                  Despre vârsta, energia, personalitatea și interesele copilului tău
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center">
                <div
                  className="bg-yuvoo-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: "64px", height: "64px" }}
                >
                  <span className="fs-3 fw-bold text-white">2</span>
                </div>
                <h3 className="h6 fw-semibold mb-2">Analiza AI</h3>
                <p className="text-muted small mb-0">
                  Algoritmul nostru analizează răspunsurile și identifică sporturile potrivite
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center">
                <div
                  className="bg-yuvoo-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: "64px", height: "64px" }}
                >
                  <span className="fs-3 fw-bold text-white">3</span>
                </div>
                <h3 className="h6 fw-semibold mb-2">Primești recomandări</h3>
                <p className="text-muted small mb-0">
                  Recomandări personalizate cu explicații și cluburi sportive
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center mb-4">
        <Link href={routes.quiz.container} className="btn btn-yuvoo-primary btn-lg px-5 py-3">
          <i className="bi bi-play-circle me-2"></i>
          Începe Chestionarul
        </Link>
        <p className="text-muted small mt-3 mb-0">
          <i className="bi bi-shield-check me-1"></i>
          Datele tale sunt sigure și private. Confidențialitate garantată.
        </p>
      </div>

      {/* Trust Indicators */}
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="alert alert-info border-0 bg-yuvoo-primary bg-opacity-10">
            <div className="d-flex align-items-start gap-3 text-white">
              <i className="bi bi-info-circle-fill fs-4"></i>
              <div>
                <h4 className="h6 fw-semibold mb-2 text-white">De ce să ai încredere în Yuvoo?</h4>
                <ul className="small mb-0 ps-3">
                  <li>
                    Recomandări AI personalizate bazate pe analiza pattern-urilor și profilului unic
                    al copilului tău
                  </li>
                  <li>
                    Date sigure și private. Proces transparent. 100% GDPR compliant cu protecție
                    completă a datelor copilului tău
                  </li>
                  <li>
                    Algoritm bazat pe mii de profiluri analizate pentru recomandări precise și
                    personalizate
                  </li>
                  {quizCount >= 100 && (
                    <li>
                      Peste {quizCount.toLocaleString("ro-RO")} părinți au folosit deja chestionarul
                      nostru și au primit recomandări relevante
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
