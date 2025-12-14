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
        <h3 className="h4 mb-2">
          {title}
          {required && <span className="text-danger ms-1">*</span>}
        </h3>
        {description && <p className="text-muted mb-0">{description}</p>}
      </div>

      {/* Question content */}
      <div className="question-content mb-3">{children}</div>

      {/* Help text */}
      {helpText && (
        <div className="question-help">
          <small className="text-muted">
            <i className="bi bi-info-circle me-1"></i>
            {helpText}
          </small>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
        </div>
      )}
    </div>
  );
}
