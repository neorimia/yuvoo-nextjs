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
    <div className={cn("w-100", className)} role="navigation" aria-label="Progres onboarding">
      {/* Progress bar - visual indicator */}
      <div className="my-4">
        {/* Desktop/Tablet: Horizontal stepper */}
        <div className="d-none d-md-block">
          <div className="position-relative">
            {/* Background line */}
            <div
              className="position-absolute start-0 end-0 bg-secondary"
              style={{ top: "1.25rem", height: "2px" }}
              aria-hidden="true"
            />

            {/* Progress line - extends from step 1 to current step */}
            <div
              className="position-absolute start-0 bg-yuvoo-primary"
              style={{
                top: "1.25rem",
                height: "2px",
                width:
                  currentStep === 1 ? "0%" : `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                transition: "width 0.5s ease-in-out",
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
                  <div
                    key={step.number}
                    className="d-flex flex-column align-items-center flex-fill"
                    style={{ maxWidth: "150px" }}
                  >
                    {/* Step circle */}
                    <div
                      className={cn(
                        "w-10 h-10 rounded-circle d-flex align-items-center justify-content-center position-relative z-10",
                        "transition-all",
                        isCompleted &&
                          "bg-yuvoo-primary text-white shadow shadow-yuvoo-primary border-2 border-yuvoo-primary",
                        isCurrent &&
                          "bg-white border-4 border-yuvoo-primary text-yuvoo-primary shadow-lg",
                        isPending && "bg-white border-2 border-secondary text-muted"
                      )}
                      style={{ transition: "all 0.3s ease-in-out" }}
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
                    <div className="mt-3 text-center w-100 px-2">
                      <p
                        className={cn(
                          "small fw-semibold lh-tight",
                          isCurrent && "text-yuvoo-primary",
                          isCompleted && "text-body",
                          isPending && "text-muted"
                        )}
                      >
                        {step.label}
                      </p>
                      {step.description && (
                        <p
                          className={cn(
                            "text-xs mt-1",
                            isCurrent ? "text-yuvoo-primary" : "text-muted"
                          )}
                          style={{ lineHeight: "1.5" }}
                        >
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
          <div className="d-flex align-items-center justify-content-between mb-4">
            <p className="small fw-semibold text-body">
              Pas {currentStep} din {steps.length}
            </p>
            <p className="small text-muted">{Math.round(progressPercentage)}% complet</p>
          </div>

          {/* Progress bar using Bootstrap Progress component */}
          <div
            className="progress mb-4"
            style={{ height: "8px" }}
            role="progressbar"
            aria-valuenow={progressPercentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Progres: ${currentStep} din ${steps.length} pași completați`}
          >
            <div
              className="progress-bar bg-yuvoo-primary"
              style={{ width: `${progressPercentage}%`, transition: "width 0.5s ease-in-out" }}
            />
          </div>

          {/* Current step label */}
          <div className="mt-4">
            <p className="text-base fw-semibold text-yuvoo-primary">
              {steps[currentStep - 1]?.label}
            </p>
            {steps[currentStep - 1]?.description && (
              <p className="small text-muted mt-2" style={{ lineHeight: "1.5" }}>
                {steps[currentStep - 1].description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
