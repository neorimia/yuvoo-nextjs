/**
 * FormSection Component
 *
 * Reusable section wrapper for form groups.
 * Provides consistent spacing and layout.
 */

"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

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
    <div className={cn("mb-4", className)}>
      {title && (
        <div className="mb-3">
          <h3 className="h5 fw-semibold text-body">{title}</h3>
          {description && <p className="small text-secondary mt-1">{description}</p>}
        </div>
      )}
      {children}
    </div>
  );
}
