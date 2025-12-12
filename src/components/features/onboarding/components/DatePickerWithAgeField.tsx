/**
 * DatePickerWithAgeField Component
 *
 * Reusable date picker component with automatic age calculation and display.
 * Used for date of birth inputs with age validation.
 *
 * Features:
 * - Date picker input
 * - Automatic age calculation
 * - Age display
 * - Min/max date validation
 * - Loading state support
 * - Error message display
 * - Accessibility attributes
 * - Bootstrap styling
 */

"use client";

import { UseFormSetValue, FieldError } from "react-hook-form";
import { BootstrapInput } from "@/components/UI/bootstrap-index";
import { InfoTooltip } from "@/components/shared/InfoTooltip";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface DatePickerWithAgeFieldProps {
  /** Field label */
  label: string;
  /** Field name (for React Hook Form) */
  name: string;
  /** React Hook Form setValue function */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: UseFormSetValue<any>;
  /** Current date value */
  currentValue?: Date;
  /** Validation error */
  error?: FieldError;
  /** Is field required? */
  required?: boolean;
  /** Help text/tooltip content */
  helpText?: string;
  /** Optional description below label */
  description?: string;
  /** Minimum age (years) */
  minAge?: number;
  /** Maximum age (years) */
  maxAge?: number;
  /** Loading state */
  isLoading?: boolean;
  /** Optional custom class name */
  className?: string;
}

/**
 * Format date for HTML date input (YYYY-MM-DD)
 */
function formatDateForInput(date?: Date): string {
  if (!date) return "";
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Calculate age from date of birth
 */
function calculateAge(dateOfBirth?: Date): number | null {
  if (!dateOfBirth) return null;
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export function DatePickerWithAgeField({
  label,
  name,
  setValue,
  currentValue,
  error,
  required = false,
  helpText,
  description,
  minAge,
  maxAge,
  isLoading = false,
  className = "",
}: DatePickerWithAgeFieldProps) {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateString = e.target.value;
    if (dateString) {
      setValue(name, new Date(dateString), { shouldValidate: true });
    }
  };

  // Calculate min/max dates from age constraints
  const today = new Date();
  const maxDate = today.toISOString().split("T")[0];
  const minDate = minAge
    ? new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate())
        .toISOString()
        .split("T")[0]
    : undefined;
  const maxDateFromAge = maxAge
    ? new Date(today.getFullYear() - maxAge, today.getMonth(), today.getDate())
        .toISOString()
        .split("T")[0]
    : undefined;

  const age = calculateAge(currentValue);

  return (
    <div className={cn("mb-4", className)}>
      {/* Label */}
      <label
        htmlFor={name}
        className="d-flex align-items-center gap-2 small fw-medium text-body mb-2"
      >
        {label}
        {required && <span className="text-danger">*</span>}
        {helpText && <InfoTooltip content={helpText} size="sm" />}
      </label>

      {/* Description */}
      {description && <p className="small text-secondary mb-2">{description}</p>}

      {/* Date Input */}
      <div className="position-relative">
        <BootstrapInput
          id={name}
          type="date"
          onChange={handleDateChange}
          value={formatDateForInput(currentValue)}
          disabled={isLoading}
          max={maxDate}
          min={maxDateFromAge || minDate}
          error={!!error}
          className="w-100"
          style={{ paddingRight: "2.5rem" }}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${name}-error` : age !== null ? `${name}-help` : undefined}
        />
        <Calendar
          className="position-absolute"
          style={{
            right: "0.75rem",
            top: "50%",
            transform: "translateY(-50%)",
            width: "1.25rem",
            height: "1.25rem",
            color: "var(--bs-secondary)",
            pointerEvents: "none",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Age Display */}
      {age !== null && !error && (
        <p id={`${name}-help`} className="mt-2 small text-body">
          Vârsta: {age} {age === 1 ? "an" : "ani"}
        </p>
      )}

      {/* Error Message */}
      {error && (
        <p id={`${name}-error`} className="mt-2 small text-danger" role="alert">
          {error.message}
        </p>
      )}

      {/* Age Range Info */}
      {(minAge || maxAge) && (
        <p className="mt-2 text-xs text-secondary">
          {minAge && maxAge
            ? `Vârsta acceptată: ${minAge}-${maxAge} ani`
            : minAge
              ? `Vârsta minimă: ${minAge} ani`
              : `Vârsta maximă: ${maxAge} ani`}
        </p>
      )}
    </div>
  );
}
