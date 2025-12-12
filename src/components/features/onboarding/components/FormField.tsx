/**
 * FormField Component
 *
 * Reusable form field component with label, input, error message, and optional tooltip.
 * Reduces code duplication across onboarding forms.
 */

"use client";

import { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from "react";
import { InfoTooltip } from "@/components/shared/InfoTooltip";

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
    <div className={`space-y-2 ${className}`}>
      {/* Label */}
      <label
        htmlFor={fieldId}
        className="flex items-center gap-2 text-sm font-medium text-gray-700"
      >
        {label}
        {required && <span className="text-red-500">*</span>}
        {helpText && <InfoTooltip content={helpText} size="sm" />}
      </label>

      {/* Description */}
      {description && <p className="text-sm text-gray-500">{description}</p>}

      {/* Input Field */}
      {props.type === "textarea" ? (
        <textarea
          id={fieldId}
          {...props.textareaProps}
          className={`
            w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00BBAE] focus:border-transparent resize-y
            ${error ? "border-red-500" : "border-gray-300"}
            ${props.textareaProps?.disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
            ${props.textareaProps?.className || ""}
          `}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${fieldId}-error` : undefined}
        />
      ) : props.type === "select" ? (
        <select
          id={fieldId}
          {...props.selectProps}
          className={`
            w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00BBAE] focus:border-transparent
            ${error ? "border-red-500" : "border-gray-300"}
            ${props.selectProps?.disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
            ${props.selectProps?.className || ""}
          `}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${fieldId}-error` : undefined}
        >
          {props.placeholder && <option value="">{props.placeholder}</option>}
          {props.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={fieldId}
          type={props.type}
          {...props.inputProps}
          className={`
            w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00BBAE] focus:border-transparent
            ${error ? "border-red-500" : "border-gray-300"}
            ${props.inputProps?.disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
            ${props.inputProps?.className || ""}
          `}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${fieldId}-error` : undefined}
        />
      )}

      {/* Character Counter (for textarea) */}
      {props.type === "textarea" && props.characterCount && (
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>Minim 100 caractere, maxim {props.characterCount.max} caractere</span>
          <span
            className={
              props.characterCount.current < 100 ||
              props.characterCount.current > props.characterCount.max
                ? "text-red-500"
                : "text-gray-500"
            }
          >
            {props.characterCount.current} / {props.characterCount.max}
          </span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <p id={`${fieldId}-error`} className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
