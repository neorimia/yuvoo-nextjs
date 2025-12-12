/**
 * FormSection Component
 *
 * Reusable section wrapper for form groups.
 * Provides consistent spacing and layout.
 */

"use client";

import { ReactNode } from "react";

interface FormSectionProps {
  /** Section title */
  title?: string;
  /** Section description */
  description?: string;
  /** Section content */
  children: ReactNode;
  /** Optional custom class name */
  className?: string;
}

export function FormSection({ title, description, children, className = "" }: FormSectionProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {title && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
        </div>
      )}
      {children}
    </div>
  );
}
