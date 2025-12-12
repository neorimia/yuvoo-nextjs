/**
 * InfoBox Component
 *
 * Reusable info box component for displaying helpful information.
 * Consistent styling across all onboarding forms.
 */

"use client";

import { ReactNode } from "react";

interface InfoBoxProps {
  /** Info box content */
  children: ReactNode;
  /** Optional title */
  title?: string;
  /** Optional icon (emoji or component) */
  icon?: string | ReactNode;
  /** Optional custom class name */
  className?: string;
  /** Variant: info (default) or warning */
  variant?: "info" | "warning";
}

export function InfoBox({
  children,
  title,
  icon = "ℹ️",
  className = "",
  variant = "info",
}: InfoBoxProps) {
  const variantClasses = {
    info: "bg-[#EBFFFE] border-[#00BBAE]/20",
    warning: "bg-amber-50 border-amber-200",
  };

  return (
    <div
      className={`${variantClasses[variant]} border rounded-xl p-6 ${className}`}
      role="region"
      aria-label={title || "Informații"}
    >
      <div className="flex items-start gap-3">
        {typeof icon === "string" ? (
          <span className="text-2xl shrink-0" aria-hidden="true">
            {icon}
          </span>
        ) : (
          <div className="shrink-0">{icon}</div>
        )}
        <div className="flex-1">
          {title && <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>}
          <div className="text-sm text-gray-700">{children}</div>
        </div>
      </div>
    </div>
  );
}
