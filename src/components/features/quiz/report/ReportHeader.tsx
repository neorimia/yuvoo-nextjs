/**
 * Report Header Component
 *
 * Displays report header with child information and report metadata.
 */

import React from "react";
import type { QuizResult, SportRecommendation } from "@/modules/quiz/quiz.types";

interface ReportHeaderProps {
  quizResult: QuizResult;
  topRecommendations?: SportRecommendation[];
}

/**
 * Report Header
 *
 * Displays personalized header for the report.
 */
export default function ReportHeader({ quizResult, topRecommendations }: ReportHeaderProps) {
  const displayCount = topRecommendations?.length ?? quizResult.recommendations.length;
  const countLabel =
    topRecommendations && topRecommendations.length < quizResult.recommendations.length
      ? `Top ${displayCount} recomandări afișate`
      : `${displayCount} ${displayCount === 1 ? "recomandare" : "recomandări"}`;

  return (
    <div className="card shadow-sm border-0 mb-4 report-header-card">
      <div className="card-body p-4 p-md-5">
        <div className="text-center">
          <h1 className="display-5 fw-bold mb-3">Raport Complet Personalizat</h1>
          <p className="lead text-muted mb-4">
            Recomandări de sporturi bazate pe profilul completat în chestionar
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3 text-muted small">
            <span>
              <i className="bi bi-calendar3 me-1" aria-hidden="true"></i>
              Generat:{" "}
              {new Date(quizResult.createdAt).toLocaleDateString("ro-RO", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span>
              <i className="bi bi-check-circle me-1" aria-hidden="true"></i>
              {countLabel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
