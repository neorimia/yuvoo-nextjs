/**
 * Quiz Container
 *
 * Main quiz component that orchestrates the quiz flow.
 * Renders appropriate question based on current step.
 */

"use client";

import React, { useState } from "react";
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
  const { currentStep, canGoNext, isComplete, nextStep, prevStep, answers, resetQuiz } = useQuiz();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Handle quiz submission
  const handleSubmit = async () => {
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
  };

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
    <div className="quiz-container">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8 col-xl-6">
            {/* Quiz card */}
            <div className="card shadow-sm">
              <div className="card-body p-4 p-md-5">
                {/* Progress indicator */}
                <QuizProgress currentStep={currentStep} totalSteps={TOTAL_STEPS} className="mb-4" />

                {/* Current question */}
                <div className="quiz-question-content mb-4">{renderQuestion()}</div>

                {/* Submit error message */}
                {submitError && (
                  <div className="alert alert-danger" role="alert">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    {submitError}
                  </div>
                )}

                {/* Navigation */}
                <QuizNavigation
                  currentStep={currentStep}
                  totalSteps={TOTAL_STEPS}
                  canGoBack={currentStep > 1}
                  canGoNext={canGoNext}
                  isLastStep={currentStep === TOTAL_STEPS}
                  onBack={prevStep}
                  onNext={nextStep}
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                />
              </div>
            </div>

            {/* Help text */}
            <div className="text-center mt-3">
              <small className="text-muted">
                <i className="bi bi-shield-check me-1"></i>
                Datele tale sunt protejate și confidențiale
              </small>
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
