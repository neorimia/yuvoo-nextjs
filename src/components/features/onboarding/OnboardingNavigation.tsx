/**
 * OnboardingNavigation Component
 *
 * Navigation buttons for moving between onboarding steps.
 * Provides back/next/skip/finish buttons with loading states.
 *
 * Features:
 * - Back button (optional, disabled on first step)
 * - Next/Continue button with loading state
 * - Skip button (optional)
 * - Finish button (final step)
 * - Responsive layout
 * - Accessible keyboard navigation
 */

"use client";

import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

interface OnboardingNavigationProps {
  /** Back button URL (null to hide) */
  backHref?: string | null;
  /** Next button URL (null for form submit) */
  nextHref?: string | null;
  /** Skip button URL (null to hide) */
  skipHref?: string | null;
  /** Is this the final step? */
  isFinalStep?: boolean;
  /** Is the form submitting/loading? */
  isLoading?: boolean;
  /** Is the next button disabled? */
  isNextDisabled?: boolean;
  /** Custom back button text (default: "Înapoi") */
  backText?: string;
  /** Custom next button text (default: "Continuă") */
  nextText?: string;
  /** Custom skip button text (default: "Omite") */
  skipText?: string;
  /** Custom finish button text (default: "Finalizează") */
  finishText?: string;
  /** Form ID to submit (for submit button) */
  formId?: string;
  /** Optional custom class name */
  className?: string;
}

export function OnboardingNavigation({
  backHref,
  nextHref,
  skipHref,
  isFinalStep = false,
  isLoading = false,
  isNextDisabled = false,
  backText = "Înapoi",
  nextText = "Continuă",
  skipText = "Omite",
  finishText = "Finalizează",
  formId,
  className = "",
}: OnboardingNavigationProps) {
  // Determine next button type
  const isSubmitButton = !nextHref; // If no href, it's a submit button
  const buttonText = isFinalStep ? finishText : nextText;

  return (
    <div className={`flex items-center justify-between gap-4 ${className}`}>
      {/* Back button */}
      <div className="flex-shrink-0">
        {backHref ? (
          <Link
            href={backHref}
            className="
              inline-flex items-center gap-2 px-4 py-2.5
              text-sm font-medium text-gray-700
              bg-white border border-gray-300 rounded-lg
              hover:bg-gray-50 hover:border-gray-400
              focus:outline-none focus:ring-2 focus:ring-[#00BBAE] focus:ring-offset-2
              transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
            "
            aria-label={backText}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{backText}</span>
          </Link>
        ) : (
          <div className="w-24" aria-hidden="true" /> // Spacer to maintain layout
        )}
      </div>

      {/* Center: Skip button (optional) */}
      <div className="flex-shrink-0">
        {skipHref && !isFinalStep && (
          <Link
            href={skipHref}
            className="
              inline-flex items-center gap-2 px-4 py-2.5
              text-sm font-medium text-gray-600
              hover:text-[#00BBAE] hover:underline
              focus:outline-none focus:ring-2 focus:ring-[#00BBAE] focus:ring-offset-2 rounded-lg
              transition-all duration-200
            "
          >
            {skipText}
          </Link>
        )}
      </div>

      {/* Next/Finish button */}
      <div className="flex-shrink-0">
        {isSubmitButton ? (
          // Submit button (for forms)
          <button
            type="submit"
            form={formId}
            disabled={isNextDisabled || isLoading}
            className="
              inline-flex items-center gap-2 px-6 py-2.5
              text-sm font-semibold text-white
              bg-[#00BBAE] rounded-lg
              hover:bg-[#00998D]
              focus:outline-none focus:ring-2 focus:ring-[#00BBAE] focus:ring-offset-2
              transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
              shadow-md hover:shadow-lg
            "
            aria-label={buttonText}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Se procesează...</span>
              </>
            ) : (
              <>
                <span>{buttonText}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        ) : (
          // Link button (for navigation)
          <Link
            href={nextHref || "#"}
            className={`
              inline-flex items-center gap-2 px-6 py-2.5
              text-sm font-semibold text-white
              bg-[#00BBAE] rounded-lg
              hover:bg-[#00998D]
              focus:outline-none focus:ring-2 focus:ring-[#00BBAE] focus:ring-offset-2
              transition-all duration-200
              shadow-md hover:shadow-lg
              ${isNextDisabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}
            `}
            aria-label={buttonText}
            aria-disabled={isNextDisabled}
          >
            <span>{buttonText}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
