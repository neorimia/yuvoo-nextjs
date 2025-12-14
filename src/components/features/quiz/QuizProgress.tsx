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
      {/* Step indicator text - more prominent */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center gap-2">
          <span className="badge bg-yuvoo-primary rounded-pill px-3 py-2">
            Pasul {currentStep} din {totalSteps}
          </span>
          <span className="text-muted small d-none d-sm-inline">
            {currentStep === 1 && "Să începem!"}
            {currentStep === 2 && "Continuă!"}
            {currentStep === 3 && "Ești pe drumul cel bun!"}
            {currentStep === 4 && "Mai puțin de jumătate!"}
            {currentStep === 5 && "Aproape gata!"}
            {currentStep === 6 && "Ultimul pas!"}
          </span>
        </div>
        <span className="text-yuvoo-primary fw-bold">{progressPercentage}%</span>
      </div>

      {/* Progress bar - more visible */}
      <div className="progress mb-2" style={{ height: "12px", borderRadius: "10px" }}>
        <div
          className="progress-bar bg-yuvoo-primary progress-bar-striped progress-bar-animated"
          role="progressbar"
          style={{ width: `${progressPercentage}%`, transition: "width 0.3s ease" }}
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
          {currentStep >= totalSteps - 1 ? (
            <>
              <i className="bi bi-star-fill text-warning me-1"></i>
              Aproape ai terminat! 🎉
            </>
          ) : (
            <>
              <i className="bi bi-check-circle text-success me-1"></i>
              Ești pe drumul cel bun! 👍
            </>
          )}
        </p>
      )}
    </div>
  );
}
