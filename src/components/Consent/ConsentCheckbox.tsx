"use client";

import React from "react";
import Link from "next/link";
import { routes } from "@/lib/routes";

interface ConsentCheckboxProps {
  /** Unique ID for the checkbox input */
  id: string;
  /** Name attribute for form submission */
  name: string;
  /** Main label text for the consent */
  label: React.ReactNode;
  /** Additional description text shown below the label */
  description?: string;
  /** Whether this consent is required */
  required?: boolean;
  /** Current checked state */
  checked: boolean;
  /** Callback when checkbox state changes */
  onChange: (checked: boolean) => void;
  /** Whether the checkbox is disabled */
  disabled?: boolean;
  /** Error message to display */
  error?: string;
  /** Link to a related policy document */
  linkedPolicy?: "privacy" | "terms" | "gdpr";
}

/**
 * ConsentCheckbox - GDPR-compliant consent checkbox component
 *
 * Features:
 * - Required/optional state with visual indicator
 * - Policy document linking
 * - Accessible with proper ARIA attributes
 * - Bootstrap 5 styling
 * - Error state handling
 *
 * GDPR Requirements:
 * - Art. 7(2): Clear, plain language
 * - Art. 7(4): No bundling with service acceptance
 */
export function ConsentCheckbox({
  id,
  name,
  label,
  description,
  required = false,
  checked,
  onChange,
  disabled = false,
  error,
  linkedPolicy,
}: ConsentCheckboxProps) {
  const policyLinks: Record<string, { href: string; text: string }> = {
    privacy: { href: routes.privacy, text: "Politica de confidențialitate" },
    terms: { href: routes.terms, text: "Termeni și condiții" },
    gdpr: { href: routes.gdpr, text: "GDPR pentru părinți" },
  };

  const policyLink = linkedPolicy ? policyLinks[linkedPolicy] : null;

  return (
    <div className="consent-checkbox-wrapper mb-3">
      <div className="form-check d-flex align-items-start">
        <input
          type="checkbox"
          id={id}
          name={name}
          className={`form-check-input mt-1 ${error ? "is-invalid" : ""}`}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          aria-describedby={description ? `${id}-description` : undefined}
          aria-invalid={!!error}
          required={required}
        />
        <div className="ms-2 flex-grow-1">
          <label className={`form-check-label ${disabled ? "text-muted" : ""}`} htmlFor={id}>
            {label}
            {required && (
              <span className="text-danger ms-1" aria-label="obligatoriu">
                *
              </span>
            )}
          </label>
          {description && (
            <small id={`${id}-description`} className="d-block text-muted mt-1">
              {description}
            </small>
          )}
          {policyLink && (
            <Link
              href={policyLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="d-block small mt-1 text-decoration-none"
              style={{ color: "var(--yuvoo-primary, #6366f1)" }}
            >
              Citește {policyLink.text} →
            </Link>
          )}
        </div>
      </div>
      {error && (
        <div className="invalid-feedback d-block ms-4" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}

export default ConsentCheckbox;
