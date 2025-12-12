/**
 * MultiSelectCheckboxField Component
 *
 * Reusable multi-select component with checkbox grid layout.
 * Used for selecting multiple options like age groups, experience levels, languages, etc.
 *
 * Features:
 * - Grid-based checkbox layout
 * - Visual selection feedback
 * - Loading state support
 * - Error message display
 * - Accessibility attributes
 * - Bootstrap styling
 */

"use client";

import { Control, Controller, FieldError } from "react-hook-form";
import { InfoTooltip } from "@/components/shared/InfoTooltip";
import { cn } from "@/lib/utils";

interface Option {
  value: string | number;
  label: string;
  icon?: string;
  emoji?: string;
}

interface MultiSelectCheckboxFieldProps {
  /** Field label */
  label: string;
  /** Field name (for React Hook Form) */
  name: string;
  /** React Hook Form control */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  /** Validation error */
  error?: FieldError;
  /** Options to display */
  options: Option[];
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
    lg?: number;
  };
  /** Loading state */
  isLoading?: boolean;
  /** Optional custom class name */
  className?: string;
}

export function MultiSelectCheckboxField({
  label,
  name,
  control,
  error,
  options,
  required = false,
  helpText,
  description,
  gridCols = { xs: 12, sm: 6, md: 4 },
  isLoading = false,
  className = "",
}: MultiSelectCheckboxFieldProps) {
  const getColClass = () => {
    const classes = [];
    if (gridCols.xs) classes.push(`col-${12 / gridCols.xs}`);
    if (gridCols.sm) classes.push(`col-sm-${12 / gridCols.sm}`);
    if (gridCols.md) classes.push(`col-md-${12 / gridCols.md}`);
    if (gridCols.lg) classes.push(`col-lg-${12 / gridCols.lg}`);
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
      {description && <p className="text-xs text-secondary mb-3">{description}</p>}

      {/* Checkbox Grid */}
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const fieldValue = (field.value as (string | number)[]) || [];
          return (
            <div className="row g-3">
              {options.map((option) => {
                const isSelected = fieldValue.includes(option.value);

                return (
                  <div key={String(option.value)} className={getColClass()}>
                    <label
                      className={cn(
                        "d-flex align-items-center justify-content-center p-3 border-2 rounded",
                        isSelected
                          ? "border-yuvoo-primary bg-yuvoo-primary-light text-yuvoo-primary"
                          : "border-secondary bg-white text-body",
                        !isLoading && "cursor-pointer border-secondary-hover",
                        isLoading && "opacity-50"
                      )}
                      style={{
                        cursor: isLoading ? "not-allowed" : "pointer",
                        transition: "all 0.2s ease-in-out",
                      }}
                    >
                      <input
                        type="checkbox"
                        value={String(option.value)}
                        checked={isSelected}
                        onChange={() => {
                          const current = fieldValue;
                          const newValue = isSelected
                            ? current.filter((v: string | number) => v !== option.value)
                            : [...current, option.value];
                          // Sort if values are numbers
                          const sortedValue =
                            typeof option.value === "number"
                              ? (newValue as number[]).sort((a: number, b: number) => a - b)
                              : newValue;
                          field.onChange(sortedValue);
                        }}
                        disabled={isLoading}
                        className="visually-hidden"
                        aria-label={option.label}
                      />

                      {option.emoji && (
                        <span className="me-2" aria-hidden="true">
                          {option.emoji}
                        </span>
                      )}

                      {option.icon && (
                        <span className="me-2" aria-hidden="true">
                          {option.icon}
                        </span>
                      )}

                      <span className="fw-medium">{option.label}</span>
                    </label>
                  </div>
                );
              })}
            </div>
          );
        }}
      />

      {/* Error Message */}
      {error && (
        <p className="mt-2 small text-danger" role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
}
