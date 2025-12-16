/**
 * Quiz History Component
 *
 * Displays list of completed quizzes for a child.
 * Shows date, recommended sports, and links to view full results.
 */

"use client";

import React from "react";
import Link from "next/link";
import { routes } from "@/lib/routes";
import type { QuizResult } from "@/modules/quiz/quiz.types";

interface QuizHistoryProps {
  quizzes: QuizResult[];
  childName?: string; // Optional child name for personalization
  className?: string;
}

/**
 * Format date to Romanian format
 */
function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("ro-RO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

/**
 * Get top recommended sport from quiz result
 */
function getTopSport(result: QuizResult): string {
  if (result.recommendations.length === 0) return "N/A";
  // Recommendations are already sorted by match score
  return result.recommendations[0].sportName;
}

const QuizHistory: React.FC<QuizHistoryProps> = ({ quizzes, childName, className = "" }) => {
  if (quizzes.length === 0) {
    return (
      <div className={`quiz-history-empty ${className}`}>
        <div className="card border-0 shadow-sm">
          <div className="card-body p-5 text-center">
            <i className="bi bi-clipboard-check text-muted" style={{ fontSize: "3rem" }}></i>
            <h5 className="mt-3 mb-2">Nu există chestionare completate</h5>
            <p className="text-muted mb-4">
              {childName
                ? `Nu ai completat încă niciun chestionar pentru ${childName}.`
                : "Nu ai completat încă niciun chestionar."}
            </p>
            <Link href={routes.quiz.intro} className="btn btn-yuvoo-primary">
              <i className="bi bi-plus-circle me-2"></i>
              Începe Primul Chestionar
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`quiz-history ${className}`}>
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white border-bottom">
          <h5 className="mb-0">
            <i className="bi bi-clock-history me-2 text-yuvoo-primary"></i>
            Istoric Chestionare
            {childName && <span className="text-muted"> - {childName}</span>}
          </h5>
        </div>
        <div className="card-body p-0">
          <div className="list-group list-group-flush">
            {quizzes.map((quiz) => (
              <div key={quiz.id} className="list-group-item list-group-item-action border-bottom">
                <div className="d-flex justify-content-between align-items-start">
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <h6 className="mb-0">Chestionar din {formatDate(quiz.createdAt)}</h6>
                      <span className="badge bg-yuvoo-primary">
                        {quiz.recommendations.length} recomandări
                      </span>
                    </div>
                    <div className="d-flex flex-wrap gap-2 mb-2">
                      {quiz.recommendations.slice(0, 3).map((rec) => (
                        <span key={rec.sportId} className="badge bg-light text-dark border">
                          <i className="bi bi-star-fill text-warning me-1"></i>
                          {rec.sportName} ({rec.matchScore}%)
                        </span>
                      ))}
                      {quiz.recommendations.length > 3 && (
                        <span className="badge bg-light text-dark border">
                          +{quiz.recommendations.length - 3} mai multe
                        </span>
                      )}
                    </div>
                    <p className="text-muted small mb-0">
                      Sport principal recomandat: <strong>{getTopSport(quiz)}</strong>
                    </p>
                  </div>
                  <div className="d-flex flex-column gap-2 ms-3">
                    <Link
                      href={routes.quiz.results(quiz.id)}
                      className="btn btn-sm btn-outline-primary"
                    >
                      <i className="bi bi-eye me-1"></i>
                      Vezi Rezultate
                    </Link>
                    <Link href={routes.quiz.intro} className="btn btn-sm btn-outline-secondary">
                      <i className="bi bi-arrow-repeat me-1"></i>
                      Repetă
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {quizzes.length > 0 && (
          <div className="card-footer bg-white border-top text-center">
            <Link href={routes.quiz.intro} className="btn btn-yuvoo-primary">
              <i className="bi bi-plus-circle me-2"></i>
              Completează un Nou Chestionar
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizHistory;
