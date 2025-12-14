/**
 * Quiz Container
 *
 * Main quiz component that orchestrates the quiz flow.
 * Renders appropriate question based on current step.
 */

"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { QuizProvider, useQuiz } from "./QuizContext";
import QuizProgress from "./QuizProgress";
import QuizNavigation from "./QuizNavigation";
import { routes } from "@/lib/routes";
import { submitQuizAction } from "@/app/actions/quiz";
import type { QuizAnswers } from "@/modules/quiz/quiz.types";

// Question components
import AgeQuestion from "./questions/AgeQuestion";
import EnergyQuestion from "./questions/EnergyQuestion";
import PersonalityQuestion from "./questions/PersonalityQuestion";
import InterestsQuestion from "./questions/InterestsQuestion";
import PhysicalQuestion from "./questions/PhysicalQuestion";
import PreferencesQuestion from "./questions/PreferencesQuestion";

const TOTAL_STEPS = 6;

interface QuizContainerProps {
  childId: string; // Required: child ID for quiz submission
}

function QuizContent({ childId }: { childId: string }) {
  const router = useRouter();
  const {
    currentStep,
    canGoNext,
    isComplete,
    nextStep: contextNextStep,
    prevStep: contextPrevStep,
    answers,
    resetQuiz,
  } = useQuiz();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Wrapper for nextStep with loading state
  const handleNextStep = React.useCallback(() => {
    setIsTransitioning(true);
    contextNextStep();
  }, [contextNextStep]);

  // Wrapper for prevStep with loading state
  const handlePrevStep = React.useCallback(() => {
    setIsTransitioning(true);
    contextPrevStep();
  }, [contextPrevStep]);
  const questionContentRef = useRef<HTMLDivElement>(null);
  const prevStepRef = useRef(currentStep);

  // Handle quiz submission
  const handleSubmit = React.useCallback(async () => {
    if (!isComplete) {
      setSubmitError("Te rugăm să completezi toate câmpurile obligatorii.");
      return;
    }

    // Validate childId is provided
    if (!childId) {
      setSubmitError("ID-ul copilului lipsește. Te rugăm să reîncărci pagina.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Prepare quiz submission input
      const quizInput = {
        childId,
        answers: answers as QuizAnswers, // Type assertion safe because isComplete ensures all required fields
      };

      // Call quiz submission server action
      const response = await submitQuizAction(quizInput);

      if (!response.success) {
        // Display error message from server
        setSubmitError(
          response.error || "Nu am putut trimite chestionarul. Te rugăm să încerci din nou."
        );
        return;
      }

      if (!response.result) {
        setSubmitError("Nu s-au putut genera rezultatele. Te rugăm să încerci din nou.");
        return;
      }

      // Clear quiz progress from localStorage
      resetQuiz();

      // Redirect to results page
      router.push(routes.quiz.results(response.result.id));
    } catch (error) {
      console.error("Quiz submission failed:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Nu am putut trimite chestionarul. Te rugăm să încerci din nou."
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [isComplete, childId, answers, resetQuiz, router]);

  // Auto-focus first input when moving to next question
  useEffect(() => {
    if (currentStep !== prevStepRef.current && questionContentRef.current) {
      // Find first input, textarea, or button in the question
      const firstInput = questionContentRef.current.querySelector<HTMLElement>(
        "input:not([type='hidden']), textarea, button[type='button']"
      );
      if (firstInput && firstInput.focus) {
        // Delay to ensure DOM is ready and show loading state briefly, then clear transition state
        setTimeout(() => {
          firstInput.focus();
          setIsTransitioning(false);
        }, 300);
      } else {
        // If no input found, clear transition state after delay
        setTimeout(() => setIsTransitioning(false), 300);
      }
    }
    prevStepRef.current = currentStep;
  }, [currentStep]);

  // Keyboard navigation: Enter key to proceed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle Enter if not in an input/textarea or if it's a button
      const target = e.target as HTMLElement;
      const isInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA";
      const isButton = target.tagName === "BUTTON";

      // If Enter is pressed and we're not in a text input (or it's a button)
      if (e.key === "Enter" && (!isInput || isButton)) {
        // Don't proceed if we're in a custom input field (let it handle its own Enter)
        if (isInput && target.closest(".input-group")) {
          return;
        }

        e.preventDefault();
        if (currentStep < TOTAL_STEPS && canGoNext && !isTransitioning) {
          handleNextStep();
        } else if (
          currentStep === TOTAL_STEPS &&
          canGoNext &&
          !isSubmitting &&
          !isTransitioning &&
          isComplete
        ) {
          handleSubmit();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    currentStep,
    canGoNext,
    isSubmitting,
    isComplete,
    isTransitioning,
    handleNextStep,
    handleSubmit,
  ]);

  // Render current question component
  const renderQuestion = () => {
    switch (currentStep) {
      case 1:
        return <AgeQuestion />;
      case 2:
        return <EnergyQuestion />;
      case 3:
        return <PersonalityQuestion />;
      case 4:
        return <InterestsQuestion />;
      case 5:
        return <PhysicalQuestion />;
      case 6:
        return <PreferencesQuestion />;
      default:
        return null;
    }
  };

  return (
    <div className="quiz-container bg-light min-vh-100 py-4 py-md-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-9 col-xl-7">
            {/* Quiz card */}
            <div className="card shadow-lg border-0 position-relative">
              {/* Loading overlay during step transitions */}
              {isTransitioning && (
                <div
                  className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center rounded"
                  style={{
                    zIndex: 10,
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(2px)",
                  }}
                >
                  <div className="text-center">
                    <div
                      className="spinner-border text-yuvoo-primary mb-3"
                      role="status"
                      style={{ width: "3rem", height: "3rem" }}
                    >
                      <span className="visually-hidden">Se încarcă...</span>
                    </div>
                    <div className="text-muted fw-semibold">Se încarcă următoarea întrebare...</div>
                    <div className="text-muted small mt-1">Te rugăm să aștepți</div>
                  </div>
                </div>
              )}

              <div className="card-body p-4 p-md-5">
                {/* Progress indicator */}
                <QuizProgress currentStep={currentStep} totalSteps={TOTAL_STEPS} className="mb-5" />

                {/* Current question */}
                <div
                  ref={questionContentRef}
                  className="quiz-question-content mb-4"
                  id="quiz-question-content"
                >
                  {renderQuestion()}
                </div>

                {/* Submit error message - improved visibility with better positioning */}
                {submitError && (
                  <div
                    className="alert alert-danger d-flex align-items-start gap-3 mb-4 shadow-lg border-0"
                    role="alert"
                    style={{
                      borderLeft: "5px solid var(--bd-danger)",
                      backgroundColor: "#fff5f5",
                      animation: "fadeIn 0.3s ease-in",
                    }}
                  >
                    <i className="bi bi-exclamation-triangle-fill fs-3 flex-shrink-0 mt-1 text-danger"></i>
                    <div className="flex-grow-1">
                      <strong className="d-block mb-2 text-danger fs-6">
                        Eroare la trimitere:
                      </strong>
                      <div className="mb-0 text-danger">{submitError}</div>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <QuizNavigation
                  currentStep={currentStep}
                  totalSteps={TOTAL_STEPS}
                  canGoBack={currentStep > 1 && !isTransitioning}
                  canGoNext={canGoNext && !isTransitioning}
                  isLastStep={currentStep === TOTAL_STEPS}
                  onBack={handlePrevStep}
                  onNext={handleNextStep}
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting || isTransitioning}
                />
              </div>
            </div>

            {/* Help text - more visible */}
            <div className="text-center mt-4">
              <div className="d-inline-flex align-items-center gap-2 px-3 py-2 bg-white rounded-pill shadow-sm">
                <i className="bi bi-shield-check text-success"></i>
                <small className="text-muted fw-semibold">
                  Datele tale sunt protejate și confidențiale
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main component with provider
export default function QuizContainer({ childId }: QuizContainerProps) {
  return (
    <QuizProvider childId={childId}>
      <QuizContent childId={childId} />
    </QuizProvider>
  );
}
