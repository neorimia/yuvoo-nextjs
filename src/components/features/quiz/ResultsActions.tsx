/**
 * Results Actions Component
 *
 * Action buttons for quiz results page:
 * - Save results (if authenticated)
 * - Retake quiz
 * - View all clubs
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { routes } from "@/lib/routes";
import { saveQuizResultsAction } from "@/app/actions/quiz";

interface ResultsActionsProps {
  quizId: string;
  className?: string;
  isAuthenticated?: boolean; // Pass auth status from server
}

/**
 * Results Actions Component
 *
 * Displays action buttons for quiz results.
 * Handles authentication state and save functionality.
 * Auth status is passed from server to avoid StackProvider dependency.
 */
const ResultsActions: React.FC<ResultsActionsProps> = ({
  quizId,
  className = "",
  isAuthenticated = false,
}) => {
  const router = useRouter();
  const pathname = usePathname(); // Safe way to get current pathname
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  // Handle save results
  const handleSaveResults = async () => {
    if (!isAuthenticated) {
      // Redirect to login with return URL
      router.push(`${routes.login}?returnUrl=${encodeURIComponent(pathname)}`);
      return;
    }

    setIsSaving(true);
    setSaveMessage(null);

    try {
      const result = await saveQuizResultsAction(quizId);
      if (result.success) {
        setSaveMessage("Rezultatele au fost salvate cu succes!");
      } else {
        setSaveMessage(
          result.error || "Nu am putut salva rezultatele. Te rugăm să încerci din nou."
        );
      }
    } catch (error) {
      console.error("Error saving results:", error);
      setSaveMessage("Nu am putut salva rezultatele. Te rugăm să încerci din nou.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={`quiz-results-actions ${className}`}>
      <div className="card border-0 shadow-sm">
        <div className="card-body p-3">
          <div className="d-flex flex-wrap gap-2 justify-content-center">
            {/* Save Results Button (if authenticated) */}
            {isAuthenticated && (
              <button
                type="button"
                className="btn btn-yuvoo-primary w-100 w-lg-auto"
                onClick={handleSaveResults}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Se salvează...
                  </>
                ) : (
                  <>
                    <i className="bi bi-bookmark-fill me-2"></i>
                    Salvează rezultatele
                  </>
                )}
              </button>
            )}

            {/* Login Prompt (if not authenticated) */}
            {!isAuthenticated && (
              <Link
                href={`${routes.login}?returnUrl=${encodeURIComponent(pathname)}`}
                className="btn btn-outline-primary  w-100 w-lg-auto"
              >
                <i className="bi bi-person-plus me-2"></i>
                Autentifică-te pentru a salva rezultatele
              </Link>
            )}

            {/* Retake Quiz Button */}
            <Link href={routes.quiz.intro} className="btn btn-outline-secondary  w-100 w-lg-auto">
              <i className="bi bi-arrow-repeat me-2"></i>
              Repetă chestionarul
            </Link>

            {/* View All Clubs Button */}
            <Link href={routes.clubs.list} className="btn btn-outline-primary  w-100 w-lg-auto">
              <i className="bi bi-search me-2"></i>
              Vezi toate cluburile
            </Link>
          </div>

          {/* Save message */}
          {saveMessage && (
            <div
              className={`alert mt-3 mb-0 ${
                saveMessage.includes("succes") ? "alert-success" : "alert-danger"
              }`}
              role="alert"
            >
              <i
                className={`bi me-2 ${
                  saveMessage.includes("succes") ? "bi-check-circle" : "bi-exclamation-triangle"
                }`}
              ></i>
              {saveMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsActions;
