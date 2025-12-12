/**
 * InfoBox Component
 *
 * Reusable info box component for displaying helpful information.
 * Consistent styling across all onboarding forms.
 */

"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface InfoBoxProps {
  /** Info box content */
  children: ReactNode;
  /** Optional title (string or ReactNode) */
  title?: string | ReactNode;
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
    info: "bg-yuvoo-primary-light",
    warning: "bg-warning bg-opacity-10",
  };

  return (
    <div
      className={cn(
        variantClasses[variant],
        "border rounded p-4",
        variant === "info" && "border-yuvoo-primary",
        variant === "warning" && "border-warning",
        className
      )}
      style={variant === "info" ? { borderColor: "rgba(0, 187, 174, 0.2)" } : undefined}
      role="region"
      aria-label={typeof title === "string" ? title : "Informații"}
    >
      <div className="d-flex align-items-start gap-3">
        {typeof icon === "string" ? (
          <span className="fs-4" style={{ flexShrink: 0 }} aria-hidden="true">
            {icon}
          </span>
        ) : (
          <div style={{ flexShrink: 0 }}>{icon}</div>
        )}
        <div className="flex-fill">
          {title && <h3 className="fw-semibold text-body mb-2">{title}</h3>}
          <div className="small text-body">{children}</div>
        </div>
      </div>
    </div>
  );
}
