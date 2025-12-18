/**
 * OnboardingProgress Component
 *
 * Visual progress indicator showing users where they are in the onboarding flow.
 * Displays steps with labels, current position, and completion status.
 *
 * Features:
 * - Step numbering and labels
 * - Current step highlighting
 * - Completed step indicators
 * - Responsive design (mobile, tablet, desktop)
 * - Accessible with ARIA labels
 */

"use client";

import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface OnboardingStep {
  /** Step number (1-based) */
  number: number;
  /** Romanian label for the step */
  label: string;
  /** Optional description */
  description?: string;
}

interface OnboardingProgressProps {
  /** Current active step (1-based) */
  currentStep: number;
  /** Array of step definitions */
  steps: OnboardingStep[];
  /** Optional custom class name */
  className?: string;
}

export function OnboardingProgress({
  currentStep,
  steps,
  className = "",
}: OnboardingProgressProps) {
  // Use same calculation as desktop for consistency
  // Progress represents completion: step 1 = 0%, step 2 = 25%, etc.
  const progressPercentage = currentStep === 1 ? 0 : ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div
      className={cn("bd-onboarding-progress w-100", className)}
      role="navigation"
      aria-label="Progres onboarding"
    >
      {/* Desktop/Tablet: Horizontal stepper */}
      <div className="d-none d-md-block">
        <div className="bd-onboarding-progress-stepper">
          {/* Background line */}
          <div className="bd-onboarding-progress-stepper-line" aria-hidden="true" />

          {/* Progress line - extends from step 1 to current step */}
          <div
            className="bd-onboarding-progress-stepper-line-active"
            style={{
              width:
                currentStep === 1 ? "0%" : `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
            aria-hidden="true"
          />

          {/* Steps */}
          <div className="position-relative d-flex justify-content-between">
            {steps.map((step) => {
              const isCompleted = step.number < currentStep;
              const isCurrent = step.number === currentStep;
              const isPending = step.number > currentStep;

              return (
                <div key={step.number} className="bd-onboarding-progress-stepper-step">
                  {/* Step circle */}
                  <div
                    className={cn(
                      "bd-onboarding-progress-stepper-step-circle",
                      isCompleted && "completed",
                      isCurrent && "current",
                      isPending && "pending"
                    )}
                    aria-current={isCurrent ? "step" : undefined}
                    aria-label={`Pas ${step.number}: ${step.label}`}
                  >
                    {isCompleted ? (
                      <CheckCircle2
                        className="w-5 h-5"
                        style={{ strokeWidth: 2.5 }}
                        aria-hidden="true"
                      />
                    ) : (
                      <span className="fw-semibold small lh-1">{step.number}</span>
                    )}
                  </div>

                  {/* Step label */}
                  <div className="bd-onboarding-progress-stepper-step-label">
                    <p
                      className={cn(
                        "label-text",
                        isCurrent && "current",
                        isCompleted && "completed",
                        isPending && "pending"
                      )}
                    >
                      {step.label}
                    </p>
                    {step.description && (
                      <p className={cn("label-description", isCurrent ? "current" : "pending")}>
                        {step.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile: Compact vertical indicator */}
      <div className="d-block d-md-none">
        <div className="bd-onboarding-progress-mobile">
          <div className="bd-onboarding-progress-mobile-header">
            <p className="bd-onboarding-progress-mobile-step">
              Pas {currentStep} din {steps.length}
            </p>
            <p className="bd-onboarding-progress-mobile-percentage">
              {Math.round(progressPercentage)}% complet
            </p>
          </div>

          {/* Progress bar */}
          <div
            className="bd-onboarding-progress-mobile-bar"
            role="progressbar"
            aria-valuenow={progressPercentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Progres: ${currentStep} din ${steps.length} pași completați`}
          >
            <div
              className="bd-onboarding-progress-mobile-bar-fill"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {/* Current step label */}
          <div className="bd-onboarding-progress-mobile-label">
            <p className="bd-onboarding-progress-mobile-label-title">
              {steps[currentStep - 1]?.label}
            </p>
            {steps[currentStep - 1]?.description && (
              <p className="bd-onboarding-progress-mobile-label-description">
                {steps[currentStep - 1].description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
