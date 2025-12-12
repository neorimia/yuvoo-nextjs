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
import { Progress } from "@/components/UI/progress";
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
    <div className={cn("w-full", className)} role="navigation" aria-label="Progres onboarding">
      {/* Progress bar - visual indicator */}
      <div className="my-8">
        {/* Desktop/Tablet: Horizontal stepper */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Background line */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted" aria-hidden="true" />

            {/* Progress line - extends from step 1 to current step */}
            <div
              className="absolute top-5 left-0 h-0.5 bg-yuvoo-primary transition-all duration-500 ease-in-out"
              style={{
                width:
                  currentStep === 1 ? "0%" : `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
              }}
              aria-hidden="true"
            />

            {/* Steps */}
            <div className="relative flex justify-between">
              {steps.map((step) => {
                const isCompleted = step.number < currentStep;
                const isCurrent = step.number === currentStep;
                const isPending = step.number > currentStep;

                return (
                  <div
                    key={step.number}
                    className="flex flex-col items-center flex-1 max-w-[150px]"
                  >
                    {/* Step circle */}
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center relative z-10",
                        "transition-all duration-300 ease-in-out",
                        isCompleted &&
                          "bg-yuvoo-primary text-white shadow-md shadow-yuvoo-primary/20 border-2 border-yuvoo-primary",
                        isCurrent &&
                          "bg-white border-4 border-yuvoo-primary text-yuvoo-primary shadow-lg shadow-primary/10",
                        isPending && "bg-white border-2 border-muted text-muted-foreground"
                      )}
                      aria-current={isCurrent ? "step" : undefined}
                      aria-label={`Pas ${step.number}: ${step.label}`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
                      ) : (
                        <span className="font-semibold text-sm leading-none">{step.number}</span>
                      )}
                    </div>

                    {/* Step label */}
                    <div className="mt-3 text-center w-full px-2">
                      <p
                        className={cn(
                          "text-sm font-semibold leading-tight",
                          isCurrent && "text-yuvoo-primary",
                          isCompleted && "text-foreground",
                          isPending && "text-muted-foreground"
                        )}
                      >
                        {step.label}
                      </p>
                      {step.description && (
                        <p
                          className={cn(
                            "text-xs mt-1 leading-relaxed",
                            isCurrent ? "text-yuvoo-primary" : "text-muted-foreground"
                          )}
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
        <div className="block md:hidden">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-foreground">
              Pas {currentStep} din {steps.length}
            </p>
            <p className="text-sm text-muted-foreground">
              {Math.round(progressPercentage)}% complet
            </p>
          </div>

          {/* Progress bar using shadcn Progress component */}
          <Progress
            value={progressPercentage}
            className="h-2 mb-4"
            aria-label={`Progres: ${currentStep} din ${steps.length} pași completați`}
          />

          {/* Current step label */}
          <div className="mt-4">
            <p className="text-base font-semibold text-yuvoo-primary">
              {steps[currentStep - 1]?.label}
            </p>
            {steps[currentStep - 1]?.description && (
              <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                {steps[currentStep - 1].description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
