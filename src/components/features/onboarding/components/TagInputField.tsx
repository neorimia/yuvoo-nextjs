/**
 * TagInputField Component
 *
 * Reusable tag input component with quick-add buttons and custom input.
 * Used for credentials, languages, and other tag-based selections.
 *
 * Features:
 * - Quick-add buttons for common options
 * - Custom input for adding new tags
 * - Tag display with remove functionality
 * - Loading state support
 * - Error message display
 * - Accessibility attributes
 * - Bootstrap styling
 */

"use client";

import { useState, useEffect, useRef } from "react";
import { UseFormSetValue, FieldError } from "react-hook-form";
import { BootstrapInput, BootstrapButton } from "@/components/UI/bootstrap-index";
import { InfoTooltip } from "@/components/shared/InfoTooltip";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface TagInputFieldProps {
  /** Field label */
  label: string;
  /** Field name (for React Hook Form) */
  name: string;
  /** React Hook Form setValue function */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: UseFormSetValue<any>;
  /** Current field value (from watch() or form state) */
  currentValue?: string[];
  /** Validation error */
  error?: FieldError;
  /** Is field required? */
  required?: boolean;
  /** Help text/tooltip content */
  helpText?: string;
  /** Optional description below label */
  description?: string;
  /** Placeholder for custom input */
  placeholder?: string;
  /** Quick-add options (common tags) */
  quickAddOptions?: readonly string[];
  /** Maximum number of tags */
  maxTags?: number;
  /** Loading state */
  isLoading?: boolean;
  /** Optional custom class name */
  className?: string;
}

export function TagInputField({
  label,
  name,
  setValue,
  currentValue,
  error,
  required = false,
  helpText,
  description,
  placeholder = "Adaugă",
  quickAddOptions = [],
  maxTags,
  isLoading = false,
  className = "",
}: TagInputFieldProps) {
  const [tags, setTags] = useState<string[]>(currentValue || []);
  const [inputValue, setInputValue] = useState("");
  const prevCurrentValueRef = useRef<string[] | undefined>(currentValue);

  // Sync internal tags state with currentValue prop (for form restoration)
  useEffect(() => {
    // Only update if currentValue actually changed from outside
    if (currentValue !== undefined) {
      const prevValueStr = JSON.stringify(prevCurrentValueRef.current || []);
      const currentValueStr = JSON.stringify(currentValue || []);

      if (currentValueStr !== prevValueStr) {
        setTags(currentValue || []);
        prevCurrentValueRef.current = currentValue;
      }
    }
  }, [currentValue]);

  // Sync tags with form state
  useEffect(() => {
    setValue(name, tags, { shouldValidate: true });
  }, [tags, setValue, name]);

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (!trimmed) return;
    if (tags.includes(trimmed)) return;
    if (maxTags && tags.length >= maxTags) return;

    setTags([...tags, trimmed]);
    setInputValue("");
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(inputValue);
    }
  };

  const isMaxReached = maxTags ? tags.length >= maxTags : false;

  return (
    <div className={cn("mb-4", className)}>
      {/* Label */}
      <label className="d-flex align-items-center gap-2 small fw-medium text-body mb-2">
        {label}
        {required && <span className="text-danger">*</span>}
        {helpText && <InfoTooltip content={helpText} size="sm" />}
      </label>

      {/* Description */}
      {description && <p className="small text-secondary mb-3">{description}</p>}

      {/* Quick add buttons */}
      {quickAddOptions.length > 0 && (
        <div className="mb-3">
          <p className="text-xs text-secondary mb-2">Adaugă rapid:</p>
          <div className="d-flex flex-wrap gap-2">
            {quickAddOptions.map((option) => {
              const isAdded = tags.includes(option);
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => addTag(option)}
                  disabled={isAdded || isMaxReached || isLoading}
                  className={cn(
                    "px-3 py-1 small rounded border",
                    isAdded
                      ? "bg-light text-secondary border-secondary cursor-not-allowed"
                      : "bg-white text-body border-secondary",
                    !isAdded && !isMaxReached && !isLoading && "text-secondary-hover cursor-pointer"
                  )}
                  style={{
                    cursor: isAdded || isMaxReached || isLoading ? "not-allowed" : "pointer",
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Custom input */}
      <div className="d-flex flex-column flex-sm-row gap-2 mb-3">
        <BootstrapInput
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isMaxReached || isLoading}
          className="flex-fill"
        />
        <BootstrapButton
          type="button"
          onClick={() => addTag(inputValue)}
          disabled={!inputValue.trim() || isMaxReached || isLoading}
          variant="primary"
          className="bg-yuvoo-primary text-white"
          style={{ whiteSpace: "nowrap" }}
        >
          Adaugă
        </BootstrapButton>
      </div>

      {/* Selected tags */}
      {tags.length > 0 && (
        <div className="mb-3">
          {tags.map((tag) => (
            <div
              key={tag}
              className="d-flex align-items-center justify-content-between px-3 py-2 bg-light rounded mb-2"
            >
              <span className="small text-body">{tag}</span>
              <button
                type="button"
                onClick={() => removeTag(tag)}
                disabled={isLoading}
                className="text-danger border-0 bg-transparent p-0"
                style={{ transition: "color 0.2s ease-in-out" }}
                aria-label={`Șterge ${tag}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Max tags info */}
      {maxTags && (
        <p className="text-xs text-secondary mb-2">
          {tags.length}/{maxTags} {tags.length === 1 ? "element adăugat" : "elemente adăugate"}
        </p>
      )}

      {/* Error */}
      {error && (
        <p className="mt-2 small text-danger" role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
}
