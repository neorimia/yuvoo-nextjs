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
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <button
        type="button"
        className="focus:outline-none focus:ring-2 focus:ring-[#00BBAE] focus:ring-offset-2 rounded-full"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        aria-label={`Informație: ${content}`}
        aria-describedby="tooltip"
      >
        <HelpCircle
          className={`${sizeClasses[size]} text-gray-400 hover:text-[#00BBAE] transition-colors`}
        />
      </button>
      {isVisible && (
        <div
          id="tooltip"
          className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 bottom-full mb-2 w-64 sm:w-72 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-50 pointer-events-none"
          role="tooltip"
        >
          <p className="whitespace-normal">{content}</p>
          {/* Arrow */}
          <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
}
