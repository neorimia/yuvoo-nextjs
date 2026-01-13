/**
 * Report Header Component
 *
 * Displays report header with child information and report metadata.
 */

import React from "react";
import type { QuizResult } from "@/modules/quiz/quiz.types";

interface ReportHeaderProps {
  quizResult: QuizResult;
}

/**
 * Report Header
 *
 * Displays personalized header for the report.
 */
export default function ReportHeader({ quizResult }: ReportHeaderProps) {
  return (
    <div className="card shadow-sm border-0 mb-4" style={{ borderTop: "4px solid #00BBAE" }}>
      <div className="card-body p-4 p-md-5">
        <div className="text-center">
          <h1 className="display-5 fw-bold mb-3">Raport Complet Personalizat</h1>
          <p className="lead text-muted mb-4">
            Recomandări de sporturi bazate pe profilul completat în chestionar
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3 text-muted small">
            <span>
              <i className="bi bi-calendar3 me-1"></i>
              Generat:{" "}
              {new Date(quizResult.createdAt).toLocaleDateString("ro-RO", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span>
              <i className="bi bi-check-circle me-1"></i>
              {quizResult.recommendations.length} recomandări
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
