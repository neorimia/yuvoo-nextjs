/**
 * CharacterCounterTextarea Component
 *
 * Reusable textarea component with character counter and validation feedback.
 * Reduces code duplication across onboarding forms that need textarea with character limits.
 *
 * Features:
 * - Character counter display (current/max)
 * - Min/max character validation feedback
 * - Error message display
 * - Loading state support
 * - Accessibility attributes
 * - Bootstrap styling
 */

"use client";

import { UseFormRegister, FieldError } from "react-hook-form";
import { BootstrapTextarea } from "@/components/UI/bootstrap-index";
import { InfoTooltip } from "@/components/shared/InfoTooltip";
import { cn } from "@/lib/utils";

interface CharacterCounterTextareaProps {
  /** Field label */
  label: string;
  /** Field name (for React Hook Form) */
  name: string;
  /** React Hook Form register function */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  /** Validation error */
  error?: FieldError;
  /** Has field been touched? (for conditional error display) */
  touched?: boolean;
  /** Minimum character count */
  minChars: number;
  /** Maximum character count */
  maxChars: number;
  /** Number of rows */
  rows?: number;
  /** Placeholder text */
  placeholder?: string;
  /** Is field required? */
  required?: boolean;
  /** Help text/tooltip content */
  helpText?: string;
  /** Optional description below label */
  description?: string;
  /** Loading state */
  isLoading?: boolean;
  /** Current value (for character count) */
  currentValue?: string;
  /** Optional custom class name */
  className?: string;
}

export function CharacterCounterTextarea({
  label,
  name,
  register,
  error,
  touched = false,
  minChars,
  maxChars,
  rows = 6,
  placeholder,
  required = false,
  helpText,
  description,
  isLoading = false,
  currentValue = "",
  className = "",
}: CharacterCounterTextareaProps) {
  const charCount = currentValue?.length || 0;
  const isUnderMin = charCount < minChars;
  const isOverMax = charCount > maxChars;
  // Only show error state if field has been touched or there's a validation error
  // This prevents showing errors on initial render when field is empty
  const hasError = !!error || (touched && (isUnderMin || isOverMax));

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

      {/* Textarea */}
      <BootstrapTextarea
        id={name}
        {...register(name)}
        disabled={isLoading}
        rows={rows}
        maxLength={maxChars}
        error={hasError}
        className="w-100"
        style={{ minHeight: "120px", resize: "vertical" }}
        placeholder={placeholder}
        aria-invalid={hasError ? "true" : "false"}
        aria-describedby={hasError ? `${name}-error` : description ? `${name}-help` : undefined}
      />

      {/* Character Counter and Help Text */}
      <div className="mt-2 d-flex align-items-center justify-content-between">
        <div className="flex-fill">
          {error ? (
            <p id={`${name}-error`} className="small text-danger" role="alert">
              {error.message}
            </p>
          ) : hasError && touched ? (
            <p id={`${name}-error`} className="small text-danger" role="alert">
              {isUnderMin
                ? `Minim ${minChars} caractere necesare (ai ${charCount})`
                : isOverMax
                  ? `Maxim ${maxChars} caractere permise (ai ${charCount})`
                  : `Minim ${minChars} caractere, maxim ${maxChars} caractere`}
            </p>
          ) : null}
        </div>

        <p
          className={cn("text-xs ms-3", hasError ? "text-danger" : "text-secondary")}
          style={{ whiteSpace: "nowrap" }}
        >
          {charCount} / {maxChars} caractere
        </p>
      </div>
    </div>
  );
}
