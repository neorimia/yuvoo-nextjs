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
  return (
    <div className={`w-full ${className}`} role="navigation" aria-label="Progres onboarding">
      {/* Progress bar - visual indicator */}
      <div className="mb-8">
        {/* Desktop/Tablet: Horizontal stepper */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Background line */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200" aria-hidden="true" />

            {/* Progress line */}
            <div
              className="absolute top-5 left-0 h-0.5 bg-[#00BBAE] transition-all duration-500 ease-in-out"
              style={{
                width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
              }}
              aria-hidden="true"
            />

            {/* Steps */}
            <div className="relative flex justify-between">
              {steps.map((step) => {
                const isCompleted = step.number < currentStep;
                const isCurrent = step.number === currentStep;
                const _isPending = step.number > currentStep;

                return (
                  <div key={step.number} className="flex flex-col items-center">
                    {/* Step circle */}
                    <div
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        transition-all duration-300 ease-in-out
                        ${
                          isCompleted
                            ? "bg-[#00BBAE] text-white shadow-md"
                            : isCurrent
                              ? "bg-white border-4 border-[#00BBAE] text-[#00BBAE] shadow-lg"
                              : "bg-white border-2 border-gray-300 text-gray-400"
                        }
                      `}
                      aria-current={isCurrent ? "step" : undefined}
                      aria-label={`Pas ${step.number}: ${step.label}`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <span className="font-semibold">{step.number}</span>
                      )}
                    </div>

                    {/* Step label */}
                    <div className="mt-3 text-center max-w-[120px]">
                      <p
                        className={`
                          text-sm font-medium
                          ${isCurrent ? "text-[#00BBAE]" : isCompleted ? "text-gray-700" : "text-gray-400"}
                        `}
                      >
                        {step.label}
                      </p>
                      {step.description && (
                        <p className="text-xs text-gray-500 mt-1">{step.description}</p>
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
            <p className="text-sm font-medium text-gray-700">
              Pas {currentStep} din {steps.length}
            </p>
            <p className="text-sm text-gray-500">
              {Math.round((currentStep / steps.length) * 100)}% complet
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#00BBAE] transition-all duration-500 ease-in-out"
              style={{
                width: `${(currentStep / steps.length) * 100}%`,
              }}
              role="progressbar"
              aria-valuenow={currentStep}
              aria-valuemin={1}
              aria-valuemax={steps.length}
              aria-label={`Progres: ${currentStep} din ${steps.length} pași completați`}
            />
          </div>

          {/* Current step label */}
          <div className="mt-4">
            <p className="text-base font-semibold text-[#00BBAE]">
              {steps[currentStep - 1]?.label}
            </p>
            {steps[currentStep - 1]?.description && (
              <p className="text-sm text-gray-600 mt-1">{steps[currentStep - 1].description}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
