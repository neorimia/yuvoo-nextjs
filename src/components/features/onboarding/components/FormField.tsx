/**
 * FormField Component
 *
 * Reusable form field component with label, input, error message, and optional tooltip.
 * Reduces code duplication across onboarding forms.
 */

"use client";

import { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from "react";
import { InfoTooltip } from "@/components/shared/InfoTooltip";
import {
  BootstrapInput,
  BootstrapTextarea,
  BootstrapSelect,
} from "@/components/UI/bootstrap-index";
import { cn } from "@/lib/utils";

interface BaseFormFieldProps {
  /** Field label */
  label: string;
  /** Is field required? */
  required?: boolean;
  /** Error message to display */
  error?: string;
  /** Help text/tooltip content */
  helpText?: string;
  /** Optional description below label */
  description?: string;
  /** Optional custom class name */
  className?: string;
}

interface TextInputFieldProps extends BaseFormFieldProps {
  type: "text" | "email" | "tel" | "url" | "number" | "time";
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}

interface TextareaFieldProps extends BaseFormFieldProps {
  type: "textarea";
  textareaProps?: TextareaHTMLAttributes<HTMLTextAreaElement>;
  /** Character counter (current/max) */
  characterCount?: { current: number; max: number };
}

interface SelectFieldProps extends BaseFormFieldProps {
  type: "select";
  selectProps?: SelectHTMLAttributes<HTMLSelectElement>;
  /** Select options */
  options: Array<{ value: string; label: string }>;
  /** Placeholder option text */
  placeholder?: string;
}

type FormFieldProps = TextInputFieldProps | TextareaFieldProps | SelectFieldProps;

export function FormField(props: FormFieldProps) {
  const { label, required, error, helpText, description, className = "" } = props;

  // Get field ID based on type
  let fieldId: string;
  if (props.type === "textarea") {
    fieldId = props.textareaProps?.id || `field-${label.toLowerCase().replace(/\s+/g, "-")}`;
  } else if (props.type === "select") {
    fieldId = props.selectProps?.id || `field-${label.toLowerCase().replace(/\s+/g, "-")}`;
  } else {
    fieldId = props.inputProps?.id || `field-${label.toLowerCase().replace(/\s+/g, "-")}`;
  }

  return (
    <div className={cn("mb-4", className)}>
      {/* Label */}
      <label
        htmlFor={fieldId}
        className="d-flex align-items-center gap-2 small fw-medium text-body mb-2"
      >
        {label}
        {required && <span className="text-danger">*</span>}
        {helpText && <InfoTooltip content={helpText} size="sm" />}
      </label>

      {/* Description */}
      {description && <p className="small text-secondary mb-2">{description}</p>}

      {/* Input Field */}
      {props.type === "textarea" ? (
        <BootstrapTextarea
          id={fieldId}
          {...props.textareaProps}
          error={!!error}
          className={cn("w-100", props.textareaProps?.className)}
          style={{ resize: "vertical" }}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${fieldId}-error` : undefined}
        />
      ) : props.type === "select" ? (
        <BootstrapSelect
          id={fieldId}
          {...props.selectProps}
          error={!!error}
          className={cn("w-100", props.selectProps?.className)}
          options={[
            ...(props.placeholder ? [{ value: "", label: props.placeholder }] : []),
            ...props.options,
          ]}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${fieldId}-error` : undefined}
        />
      ) : (
        <BootstrapInput
          id={fieldId}
          type={props.type}
          {...props.inputProps}
          error={!!error}
          className={cn("w-100", props.inputProps?.className)}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${fieldId}-error` : undefined}
        />
      )}

      {/* Character Counter (for textarea) */}
      {props.type === "textarea" && props.characterCount && (
        <div className="d-flex justify-content-between align-items-center text-xs text-secondary mt-2">
          <span>Minim 100 caractere, maxim {props.characterCount.max} caractere</span>
          <span
            className={
              props.characterCount.current < 100 ||
              props.characterCount.current > props.characterCount.max
                ? "text-danger"
                : "text-secondary"
            }
          >
            {props.characterCount.current} / {props.characterCount.max}
          </span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <p id={`${fieldId}-error`} className="small text-danger mt-2" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
