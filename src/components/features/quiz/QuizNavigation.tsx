/**
 * Quiz Navigation Buttons
 *
 * Navigation controls for quiz flow (Back, Next, Submit).
 * Handles validation and navigation logic.
 */

"use client";

import React from "react";

interface QuizNavigationProps {
  currentStep: number; // Current step (1-6)
  totalSteps: number; // Total steps (6)
  canGoBack: boolean; // Can navigate back
  canGoNext: boolean; // Can navigate forward (validation passed)
  isLastStep: boolean; // Is this the last step
  onBack: () => void; // Back button handler
  onNext: () => void; // Next button handler
  onSubmit: () => void; // Submit button handler
  isSubmitting?: boolean; // Is quiz being submitted
}

export default function QuizNavigation({
  currentStep,
  totalSteps: _totalSteps,
  canGoBack,
  canGoNext,
  isLastStep,
  onBack,
  onNext,
  onSubmit,
  isSubmitting = false,
}: QuizNavigationProps) {
  return (
    <div className="quiz-navigation d-flex justify-content-between align-items-center gap-3 mt-4 pt-3 border-top">
      {/* Back button */}
      <button
        type="button"
        className="btn btn-outline-secondary btn-lg"
        onClick={onBack}
        disabled={!canGoBack || currentStep === 1 || isSubmitting}
        aria-label="Mergi la întrebarea anterioară"
      >
        <i className="bi bi-arrow-left me-2"></i>
        <span className="d-none d-sm-inline">Înapoi</span>
      </button>

      {/* Step indicator (mobile-friendly) - removed as it's now in progress bar */}
      <div className="d-none d-md-flex align-items-center text-muted small">
        <i className="bi bi-info-circle me-1"></i>
        Poți reveni oricând pentru a modifica răspunsurile
      </div>

      {/* Next or Submit button */}
      {!isLastStep ? (
        <button
          type="button"
          className="btn btn-yuvoo-primary btn-lg px-4"
          onClick={onNext}
          disabled={!canGoNext || isSubmitting}
          aria-label="Mergi la următoarea întrebare (sau apasă Enter)"
        >
          Continuă
          <i className="bi bi-arrow-right ms-2"></i>
          <span className="d-none d-md-inline ms-2 text-white-50 small">(Enter)</span>
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-yuvoo-primary btn-lg px-4"
          onClick={onSubmit}
          disabled={!canGoNext || isSubmitting}
          aria-label="Finalizează chestionarul și vezi recomandările (sau apasă Enter)"
        >
          {isSubmitting ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              <span className="d-none d-sm-inline">Se procesează...</span>
              <span className="d-sm-none">Procesare...</span>
            </>
          ) : (
            <>
              <i className="bi bi-check-circle me-2"></i>
              Vezi recomandările
            </>
          )}
        </button>
      )}
    </div>
  );
}
