/**
 * InfoTooltip Component
 *
 * Simple tooltip component for displaying helpful information.
 * Uses native HTML title attribute for accessibility and a custom tooltip on hover.
 */

"use client";

import { useState } from "react";
import { HelpCircle } from "lucide-react";

interface InfoTooltipProps {
  /** Tooltip content */
  content: string;
  /** Optional custom class name */
  className?: string;
  /** Size of the icon */
  size?: "sm" | "md" | "lg";
}

export function InfoTooltip({ content, className = "", size = "md" }: InfoTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const sizeClasses = {
    sm: { width: "0.75rem", height: "0.75rem" },
    md: { width: "1rem", height: "1rem" },
    lg: { width: "1.25rem", height: "1.25rem" },
  };

  return (
    <div className={`position-relative d-inline-flex align-items-center ${className}`}>
      <button
        type="button"
        className="border-0 bg-transparent p-0 focus-yuvoo-primary rounded-circle"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        aria-label={`Informație: ${content}`}
        aria-describedby="tooltip"
      >
        <HelpCircle
          className="text-secondary text-yuvoo-primary-hover"
          style={{
            ...sizeClasses[size],
            transition: "color 0.2s ease-in-out",
          }}
        />
      </button>
      {isVisible && (
        <div
          id="tooltip"
          className="position-absolute start-0 bottom-100 mb-2 p-3 bg-dark text-white small rounded shadow z-3"
          style={{
            width: "16rem",
            maxWidth: "18rem",
            pointerEvents: "none",
            transform: "translateY(-100%)",
            left: 0,
          }}
          role="tooltip"
        >
          <p className="mb-0" style={{ whiteSpace: "normal" }}>
            {content}
          </p>
          {/* Arrow */}
          <div
            className="position-absolute start-4 top-100"
            style={{
              width: 0,
              height: 0,
              borderLeft: "0.25rem solid transparent",
              borderRight: "0.25rem solid transparent",
              borderTop: "0.25rem solid var(--bs-dark)",
            }}
          />
        </div>
      )}
    </div>
  );
}
