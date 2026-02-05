/**
 * Quiz Container
 *
 * Main quiz component that orchestrates the quiz flow.
 * Renders appropriate question based on current step.
 *
 * GDPR Compliance Flow:
 * - Step 0: Child selection (for authenticated users with existing children)
 * - Step 0.5: Consent collection (GDPR Art. 6, 7, 9, 22)
 * - Steps 1-7: Quiz questions
 *
 * The consent step ensures:
 * - Art. 6(1)(a): Consent as legal basis for processing
 * - Art. 7(1): Demonstrable consent with audit trail
 * - Art. 9(2)(a): Explicit consent for health data
 * - Art. 22: Consent for AI-generated recommendations
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
import type { Child } from "@/modules/children/children.types";
import { trackEvent, PostHogEvents, PostHogProperties } from "@/lib/analytics/tracking";

// Question components
import ChildSelectionQuestion from "./questions/ChildSelectionQuestion";
import AgeQuestion from "./questions/AgeQuestion";
import EnergyQuestion from "./questions/EnergyQuestion";
import PersonalityQuestion from "./questions/PersonalityQuestion";
import InterestsQuestion from "./questions/InterestsQuestion";
import CriticalHealthScreeningQuestion from "./questions/CriticalHealthScreeningQuestion";
import PhysicalQuestion from "./questions/PhysicalQuestion";
import PreferencesQuestion from "./questions/PreferencesQuestion";
import QuizLoadingOverlay from "./QuizLoadingOverlay";

// GDPR Consent components
import QuizConsentSection, { type QuizConsents } from "./QuizConsentSection";
import { recordQuizConsentsAction } from "@/app/actions/quiz-consent";

const TOTAL_STEPS = 7;

interface QuizContainerProps {
  childId?: string; // Optional: pre-selected child ID
  childProfiles?: Child[]; // Optional: list of children for authenticated users
}

function QuizContent({
  initialChildId,
  childProfiles = [],
}: {
  initialChildId?: string;
  childProfiles: Child[];
}) {
  const router = useRouter();
  const {
    currentStep,
    canGoNext,
    isComplete,
    nextStep: contextNextStep,
    prevStep: contextPrevStep,
    answers,
    resetQuiz,
    goToStep,
  } = useQuiz();

  // Child selection state
  const [selectedChildId, setSelectedChildId] = useState<string | undefined>(initialChildId);
  const showChildSelection = !initialChildId && childProfiles.length > 0;
  const [childSelectionComplete, setChildSelectionComplete] = useState(!showChildSelection);

  // GDPR Consent state
  const [consents, setConsents] = useState<QuizConsents>({
    childDataRecommendations: false,
    healthDataRecommendations: false,
    shareWithClubs: false,
    specialistSuggestions: false,
    marketingCommunications: false,
  });
  const [consentsComplete, setConsentsComplete] = useState(false);
  const [consentError, setConsentError] = useState<string | null>(null);
  const [isRecordingConsent, setIsRecordingConsent] = useState(false);

  // Effective step calculation:
  // - Step 0: Child selection (if applicable)
  // - Step 0.5: Consent collection (always required)
  // - Steps 1-7: Quiz questions
  const effectiveStep = !childSelectionComplete ? 0 : !consentsComplete ? 0.5 : currentStep;
  const effectiveTotalSteps = showChildSelection ? TOTAL_STEPS + 2 : TOTAL_STEPS + 1; // +1 for consent, +1 for child selection if applicable

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(false);
  const hasTrackedStart = React.useRef(false);

  // Track quiz started on mount
  useEffect(() => {
    if (!hasTrackedStart.current) {
      hasTrackedStart.current = true;
      trackEvent(PostHogEvents.QUIZ_STARTED, {
        [PostHogProperties.TOTAL_STEPS]: effectiveTotalSteps,
      });
    }
  }, [effectiveTotalSteps]);

  // Handle child selection
  const handleChildSelected = (childId: string) => {
    setSelectedChildId(childId);
    setChildSelectionComplete(true);
    // Don't go to step 1 yet - go to consent step first
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle consent changes
  const handleConsentsChange = (newConsents: QuizConsents, allRequiredGranted: boolean) => {
    setConsents(newConsents);
    // Clear error if user is making progress
    if (allRequiredGranted) {
      setConsentError(null);
    }
  };

  // Handle consent submission
  const handleConsentContinue = async () => {
    setIsRecordingConsent(true);
    setConsentError(null);

    try {
      // Record consents via server action
      const result = await recordQuizConsentsAction({
        childId: selectedChildId,
        consents,
      });

      if (!result.success) {
        setConsentError(result.error || "Eroare la înregistrarea consimțămintelor.");
        return;
      }

      // Track consent granted
      const grantedConsents = Object.entries(consents)
        .filter(([, granted]) => granted)
        .map(([type]) => type);

      trackEvent(PostHogEvents.QUIZ_STEP_COMPLETED, {
        [PostHogProperties.QUIZ_STEP]: "consent",
        consent_types_granted: grantedConsents.join(","),
        consent_count: grantedConsents.length,
      });

      // Move to first quiz question
      setConsentsComplete(true);
      goToStep(1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Failed to record consents:", error);
      setConsentError("Eroare la înregistrarea consimțămintelor. Te rugăm să încerci din nou.");
    } finally {
      setIsRecordingConsent(false);
    }
  };

  // Wrapper for nextStep with loading state and tracking
  const handleNextStep = React.useCallback(() => {
    trackEvent(PostHogEvents.QUIZ_STEP_COMPLETED, {
      [PostHogProperties.QUIZ_STEP]: effectiveStep,
      [PostHogProperties.TOTAL_STEPS]: effectiveTotalSteps,
    });

    setIsTransitioning(true);
    contextNextStep();
  }, [contextNextStep, effectiveStep, effectiveTotalSteps]);

  // Wrapper for prevStep with loading state
  const handlePrevStep = React.useCallback(() => {
    // If at step 1, go back to consent step
    if (currentStep === 1) {
      setConsentsComplete(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setIsTransitioning(true);
    contextPrevStep();
  }, [contextPrevStep, currentStep]);

  // Handle going back from consent step to child selection
  const handleConsentBack = () => {
    if (showChildSelection) {
      setChildSelectionComplete(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const questionContentRef = useRef<HTMLDivElement>(null);
  const prevStepRef = useRef(effectiveStep);

  // Handle quiz submission
  const handleSubmit = React.useCallback(async () => {
    if (!isComplete) {
      setSubmitError("Te rugăm să completezi toate câmpurile obligatorii.");
      return;
    }

    // Validate childId
    if (!selectedChildId) {
      setSubmitError("Te rugăm să selectezi sau să adaugi un copil.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setShowLoadingOverlay(true);

    try {
      const quizInput = {
        childId: selectedChildId,
        answers: answers as QuizAnswers,
      };

      const response = await submitQuizAction(quizInput);

      if (!response.success) {
        setSubmitError(
          response.error || "Nu am putut trimite chestionarul. Te rugăm să încerci din nou."
        );
        setShowLoadingOverlay(false);
        return;
      }

      if (!response.result) {
        setSubmitError("Nu s-au putut genera rezultatele. Te rugăm să încerci din nou.");
        setShowLoadingOverlay(false);
        return;
      }

      resetQuiz();
      router.push(routes.quiz.emailGate(response.result.id));
    } catch (error) {
      console.error("Quiz submission failed:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Nu am putut trimite chestionarul. Te rugăm să încerci din nou."
      );
      setShowLoadingOverlay(false);
    } finally {
      setIsSubmitting(false);
    }
  }, [isComplete, selectedChildId, answers, resetQuiz, router]);

  // Auto-focus first input when step changes
  useEffect(() => {
    if (effectiveStep !== prevStepRef.current && questionContentRef.current) {
      const firstInput = questionContentRef.current.querySelector<HTMLElement>(
        "input:not([type='hidden']), textarea, button[type='button']"
      );
      if (firstInput && firstInput.focus) {
        setTimeout(() => {
          firstInput.focus();
          setIsTransitioning(false);
        }, 300);
      } else {
        setTimeout(() => setIsTransitioning(false), 300);
      }
    }
    prevStepRef.current = effectiveStep;
  }, [effectiveStep]);

  // Keyboard navigation: Enter key to proceed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA";
      const isButton = target.tagName === "BUTTON";

      if (e.key === "Enter" && (!isInput || isButton)) {
        if (isInput && target.closest(".input-group")) {
          return;
        }

        e.preventDefault();

        // Don't handle Enter for step 0 (child selection has its own flow)
        if (!childSelectionComplete) {
          return;
        }

        // Don't handle Enter for consent step (has its own button)
        if (!consentsComplete) {
          return;
        }

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
    childSelectionComplete,
    consentsComplete,
    handleNextStep,
    handleSubmit,
  ]);

  // Render current question component
  const renderQuestion = () => {
    // Step 0: Child selection (only for authenticated users with children)
    if (!childSelectionComplete) {
      return (
        <ChildSelectionQuestion
          childProfiles={childProfiles}
          onChildSelected={handleChildSelected}
        />
      );
    }

    // Step 0.5: Consent collection (GDPR compliance)
    if (!consentsComplete) {
      return (
        <div className="quiz-consent-wrapper">
          <QuizConsentSection
            onConsentsChange={handleConsentsChange}
            onContinue={handleConsentContinue}
            initialConsents={consents}
            disabled={isRecordingConsent}
          />

          {/* Consent error message */}
          {consentError && (
            <div className="alert alert-danger mt-3" role="alert">
              <i className="bi bi-exclamation-triangle me-2" />
              {consentError}
            </div>
          )}

          {/* Back button if child selection was shown */}
          {showChildSelection && (
            <div className="text-center mt-3">
              <button
                type="button"
                className="btn btn-link text-muted"
                onClick={handleConsentBack}
                disabled={isRecordingConsent}
              >
                <i className="bi bi-arrow-left me-2" />
                Înapoi la selectarea copilului
              </button>
            </div>
          )}
        </div>
      );
    }

    // Steps 1-7: Quiz questions
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
        return <CriticalHealthScreeningQuestion />;
      case 6:
        return <PhysicalQuestion />;
      case 7:
        return <PreferencesQuestion />;
      default:
        return null;
    }
  };

  // Calculate display step for progress (0-based for child selection)
  const _displayStep = showChildSelection ? effectiveStep : currentStep;
  const _displayTotalSteps = effectiveTotalSteps;

  return (
    <>
      <QuizLoadingOverlay isVisible={showLoadingOverlay} />

      <div className="quiz-container bg-light min-vh-100 py-4 py-md-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-9 col-xl-7">
              <div className="card shadow-lg border-0 position-relative">
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
                      <div className="text-muted fw-semibold">
                        Se încarcă următoarea întrebare...
                      </div>
                      <div className="text-muted small mt-1">Te rugăm să aștepți</div>
                    </div>
                  </div>
                )}

                <div className="card-body">
                  {/* Progress indicator - only show for quiz questions, not child selection or consent */}
                  {childSelectionComplete && consentsComplete && (
                    <QuizProgress
                      currentStep={currentStep}
                      totalSteps={TOTAL_STEPS}
                      className="mb-5"
                    />
                  )}

                  {/* Step indicator for child selection */}
                  {!childSelectionComplete && (
                    <div className="text-center mb-4">
                      <span className="badge bg-yuvoo-primary px-3 py-2">Înainte de a începe</span>
                    </div>
                  )}

                  {/* Step indicator for consent collection */}
                  {childSelectionComplete && !consentsComplete && (
                    <div className="text-center mb-4">
                      <span className="badge bg-yuvoo-primary px-3 py-2">
                        <i className="bi bi-shield-lock me-2" />
                        Protecția datelor
                      </span>
                    </div>
                  )}

                  {/* Current question */}
                  <div
                    ref={questionContentRef}
                    className="quiz-question-content mb-4"
                    id="quiz-question-content"
                  >
                    {renderQuestion()}
                  </div>

                  {/* Submit error message */}
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

                  {/* Navigation - only show for quiz questions, child selection and consent have their own buttons */}
                  {childSelectionComplete && consentsComplete && (
                    <QuizNavigation
                      currentStep={currentStep}
                      totalSteps={TOTAL_STEPS}
                      canGoBack={currentStep >= 1 && !isTransitioning}
                      canGoNext={canGoNext && !isTransitioning}
                      isLastStep={currentStep === TOTAL_STEPS}
                      onBack={handlePrevStep}
                      onNext={handleNextStep}
                      onSubmit={handleSubmit}
                      isSubmitting={isSubmitting || isTransitioning}
                    />
                  )}
                </div>
              </div>

              {/* Help text */}
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
    </>
  );
}

// Main component with provider
export default function QuizContainer({ childId, childProfiles = [] }: QuizContainerProps) {
  return (
    <QuizProvider childId={childId}>
      <QuizContent initialChildId={childId} childProfiles={childProfiles} />
    </QuizProvider>
  );
}
