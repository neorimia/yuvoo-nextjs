/**
 * Question Wrapper
 *
 * Shared wrapper component for all quiz questions.
 * Provides consistent layout, title, description, and error display.
 */

import React from "react";

interface QuestionWrapperProps {
  title: string; // Question title
  description?: string; // Optional question description
  helpText?: string; // Optional help text
  error?: string; // Validation error message
  required?: boolean; // Is this question required
  children: React.ReactNode; // Question content (form fields)
}

export default function QuestionWrapper({
  title,
  description,
  helpText,
  error,
  required = true,
  children,
}: QuestionWrapperProps) {
  return (
    <div className="question-wrapper">
      {/* Question header */}
      <div className="question-header mb-4">
        <h3 className="h3 fw-bold mb-3">
          {title}
          {required && <span className="text-danger ms-1">*</span>}
        </h3>
        {description && (
          <div className="alert alert-light border-start border-yuvoo-primary border-3 ps-3 py-2 mb-0">
            <p className="text-muted mb-0 small">
              <i className="bi bi-lightbulb text-yuvoo-primary me-2"></i>
              {description}
            </p>
          </div>
        )}
      </div>

      {/* Question content */}
      <div className="question-content mb-4">{children}</div>

      {/* Help text */}
      {helpText && (
        <div className="question-help mb-3">
          <div className="d-flex align-items-start gap-2">
            <i className="bi bi-info-circle text-yuvoo-primary mt-1"></i>
            <small className="text-muted">{helpText}</small>
          </div>
        </div>
      )}

      {/* Error message - improved visibility with better positioning */}
      {error && (
        <div
          className="alert alert-danger d-flex align-items-start gap-3 mt-3 mb-0 shadow-sm"
          role="alert"
          style={{ borderLeft: "4px solid var(--bd-danger)" }}
        >
          <i className="bi bi-exclamation-triangle-fill fs-4 flex-shrink-0 mt-1"></i>
          <div className="flex-grow-1">
            <strong className="d-block mb-1">Eroare:</strong>
            <div className="mb-0">{error}</div>
          </div>
        </div>
      )}
    </div>
  );
}
