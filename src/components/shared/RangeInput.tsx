/**
 * Range Input Component
 *
 * Reusable Bootstrap 5 range input with value display, labels, and error handling.
 * Mobile-friendly with proper accessibility support.
 */

"use client";

import React from "react";

export interface RangeInputProps {
  // Required props
  id: string;
  name: string;
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;

  // Optional props
  step?: number;
  required?: boolean;
  error?: string;
  helpText?: string;
  minLabel?: string;
  maxLabel?: string;
  valueSuffix?: string; // e.g., "ani", "kg", etc.
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
}

export default function RangeInput({
  id,
  name,
  label,
  min,
  max,
  value,
  onChange,
  step = 1,
  required = false,
  error,
  helpText,
  minLabel,
  maxLabel,
  valueSuffix = "",
  className = "",
  disabled = false,
  ariaLabel,
}: RangeInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      onChange(newValue);
    }
  };

  const errorId = error ? `${id}-error` : undefined;
  const helpId = helpText ? `${id}-help` : undefined;
  const ariaDescribedBy = [errorId, helpId].filter(Boolean).join(" ") || undefined;

  // Format value display
  const displayValue = `${value}${valueSuffix ? ` ${valueSuffix}` : ""}`;

  return (
    <div className={`mb-4 ${className}`}>
      {/* Label and value display */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <label htmlFor={id} className="form-label fw-semibold mb-0">
          {label}
          {required && <span className="text-danger ms-1">*</span>}
        </label>
        <div className="d-flex align-items-center gap-2">
          <span
            className="badge bg-yuvoo-primary fs-6 px-3 py-2"
            style={{ minWidth: "3.5rem", textAlign: "center" }}
            aria-live="polite"
          >
            {displayValue}
          </span>
        </div>
      </div>

      {/* Range input */}
      <input
        type="range"
        className={`form-range ${error ? "is-invalid" : ""}`}
        id={id}
        name={name}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        required={required}
        disabled={disabled}
        aria-label={ariaLabel || label}
        aria-describedby={ariaDescribedBy}
        aria-invalid={error ? "true" : "false"}
        style={{
          height: "0.75rem", // Slightly larger for better mobile usability
        }}
      />

      {/* Min/Max labels */}
      <div className="d-flex justify-content-between mt-1 mb-2">
        <small className="text-muted">
          {minLabel || `${min}${valueSuffix ? ` ${valueSuffix}` : ""}`}
        </small>
        <small className="text-muted">
          {maxLabel || `${max}${valueSuffix ? ` ${valueSuffix}` : ""}`}
        </small>
      </div>

      {/* Error message */}
      {error && (
        <div id={errorId} className="invalid-feedback d-block">
          <i className="bi bi-exclamation-circle me-1"></i>
          {error}
        </div>
      )}

      {/* Help text */}
      {helpText && (
        <div id={helpId} className={`form-text ${error ? "text-danger" : ""}`}>
          <i className="bi bi-info-circle me-1"></i>
          {helpText}
        </div>
      )}
    </div>
  );
}
