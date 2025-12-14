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
  totalSteps,
  canGoBack,
  canGoNext,
  isLastStep,
  onBack,
  onNext,
  onSubmit,
  isSubmitting = false,
}: QuizNavigationProps) {
  return (
    <div className="quiz-navigation d-flex justify-content-between align-items-center gap-3 mt-4">
      {/* Back button */}
      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={onBack}
        disabled={!canGoBack || currentStep === 1}
        aria-label="Mergi la întrebarea anterioară"
      >
        <i className="bi bi-arrow-left me-2"></i>
        Înapoi
      </button>

      {/* Step indicator (mobile-friendly) */}
      <div className="d-none d-md-block text-muted small">
        Pasul {currentStep}/{totalSteps}
      </div>

      {/* Next or Submit button */}
      {!isLastStep ? (
        <button
          type="button"
          className="btn btn-primary"
          onClick={onNext}
          disabled={!canGoNext}
          aria-label="Mergi la următoarea întrebare"
        >
          Următorul
          <i className="bi bi-arrow-right ms-2"></i>
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-primary"
          onClick={onSubmit}
          disabled={!canGoNext || isSubmitting}
          aria-label="Finalizează chestionarul"
        >
          {isSubmitting ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Se procesează...
            </>
          ) : (
            <>
              Finalizează
              <i className="bi bi-check-lg ms-2"></i>
            </>
          )}
        </button>
      )}
    </div>
  );
}
