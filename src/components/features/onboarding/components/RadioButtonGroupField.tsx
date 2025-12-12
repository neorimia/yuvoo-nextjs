/**
 * RadioButtonGroupField Component
 *
 * Reusable radio button group component with visual cards and icons/emojis.
 * Used for gender selection and other choice-based inputs.
 *
 * Features:
 * - Visual card-based radio buttons
 * - Icon/emoji support
 * - Loading state support
 * - Error message display
 * - Accessibility attributes
 * - Bootstrap styling
 */

"use client";

import { UseFormRegister, FieldError } from "react-hook-form";
import { InfoTooltip } from "@/components/shared/InfoTooltip";
import { cn } from "@/lib/utils";

interface RadioOption {
  value: string;
  label: string;
  icon?: string;
  emoji?: string;
}

interface RadioButtonGroupFieldProps {
  /** Field label */
  label: string;
  /** Field name (for React Hook Form) */
  name: string;
  /** React Hook Form register function */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  /** Validation error */
  error?: FieldError;
  /** Radio button options */
  options: RadioOption[];
  /** Is field required? */
  required?: boolean;
  /** Help text/tooltip content */
  helpText?: string;
  /** Optional description below label */
  description?: string;
  /** Grid column configuration */
  gridCols?: {
    xs?: number;
    sm?: number;
    md?: number;
  };
  /** Loading state */
  isLoading?: boolean;
  /** Optional custom class name */
  className?: string;
}

export function RadioButtonGroupField({
  label,
  name,
  register,
  error,
  options,
  required = false,
  helpText,
  description,
  gridCols = { xs: 4, sm: 4, md: 4 },
  isLoading = false,
  className = "",
}: RadioButtonGroupFieldProps) {
  const getColClass = () => {
    const classes = [];
    if (gridCols.xs) classes.push(`col-${12 / gridCols.xs}`);
    if (gridCols.sm) classes.push(`col-sm-${12 / gridCols.sm}`);
    if (gridCols.md) classes.push(`col-md-${12 / gridCols.md}`);
    return classes.join(" ");
  };

  return (
    <div className={cn("mb-4", className)}>
      {/* Label */}
      <label className="d-flex align-items-center gap-2 small fw-medium text-body mb-3">
        {label}
        {required && <span className="text-danger">*</span>}
        {helpText && <InfoTooltip content={helpText} size="sm" />}
      </label>

      {/* Description */}
      {description && <p className="small text-secondary mb-3">{description}</p>}

      {/* Radio Button Grid */}
      <div className="row g-3">
        {options.map((option) => (
          <div key={option.value} className={getColClass()}>
            <label
              className={cn(
                "d-flex flex-column align-items-center justify-content-center p-4 border-2 rounded",
                isLoading && "opacity-50"
              )}
              style={{
                cursor: isLoading ? "not-allowed" : "pointer",
                transition: "all 0.2s ease-in-out",
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.borderColor = "var(--bd-theme-1)";
                  e.currentTarget.style.backgroundColor = "var(--bd-theme-1-light)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.borderColor = "";
                  e.currentTarget.style.backgroundColor = "";
                }
              }}
            >
              <input
                type="radio"
                value={option.value}
                {...register(name)}
                disabled={isLoading}
                className="visually-hidden"
                aria-label={option.label}
              />
              {option.emoji && (
                <span className="fs-3 mb-2" aria-hidden="true">
                  {option.emoji}
                </span>
              )}
              {option.icon && !option.emoji && (
                <span className="fs-3 mb-2" aria-hidden="true">
                  {option.icon}
                </span>
              )}
              <span className="small fw-medium text-body">{option.label}</span>
            </label>
          </div>
        ))}
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-2 small text-danger" role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
}
