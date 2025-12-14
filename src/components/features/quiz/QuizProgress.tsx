/**
 * Quiz Progress Indicator
 *
 * Displays current quiz step and progress bar.
 * Shows visual progress and step number in Romanian.
 */

"use client";

import React from "react";

interface QuizProgressProps {
  currentStep: number; // Current step (1-6)
  totalSteps: number; // Total steps (6)
  className?: string;
}

export default function QuizProgress({
  currentStep,
  totalSteps,
  className = "",
}: QuizProgressProps) {
  // Calculate progress percentage
  const progressPercentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className={`quiz-progress ${className}`}>
      {/* Step indicator text */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <span className="text-muted small">
          Întrebarea {currentStep} din {totalSteps}
        </span>
        <span className="text-muted small fw-semibold">{progressPercentage}%</span>
      </div>

      {/* Progress bar */}
      <div className="progress" style={{ height: "8px" }}>
        <div
          className="progress-bar bg-primary"
          role="progressbar"
          style={{ width: `${progressPercentage}%` }}
          aria-valuenow={progressPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Progres chestionar: ${progressPercentage}%`}
        >
          <span className="visually-hidden">{progressPercentage}% completat</span>
        </div>
      </div>

      {/* Encouragement message based on progress */}
      {currentStep > 1 && currentStep < totalSteps && (
        <p className="text-center text-muted small mt-2 mb-0">
          {currentStep >= totalSteps - 1 ? "Aproape ai terminat! 🎉" : "Ești pe drumul cel bun! 👍"}
        </p>
      )}
    </div>
  );
}
