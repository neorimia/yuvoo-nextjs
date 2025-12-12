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
 * - Keyboard shortcuts (Enter to submit, Escape to go back)
 * - Better mobile experience
 * - Error state display
 * - Progress indicator
 */

"use client";

import { ArrowLeft, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useCallback } from "react";
import { Button } from "@/components/UI/button";
import { Alert, AlertDescription } from "@/components/UI/alert";
import { cn } from "@/lib/utils";

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
  /** Error message to display */
  error?: string | null;
  /** Custom back button text (default: "Înapoi") */
  backText?: string;
  /** Custom next button text (default: "Continuă") */
  nextText?: string;
  /** Custom skip button text (default: "Omite") */
  skipText?: string;
  /** Custom finish button text (default: "Finalizează") */
  finishText?: string;
  /** Custom loading text (default: "Se procesează...") */
  loadingText?: string;
  /** Form ID to submit (for submit button) */
  formId?: string;
  /** Enable keyboard shortcuts? (default: true) */
  enableKeyboardShortcuts?: boolean;
  /** Show back button text on mobile? (default: false) */
  showBackTextOnMobile?: boolean;
  /** Optional custom class name */
  className?: string;
  /** Optional callback when back is clicked */
  onBackClick?: () => void;
  /** Optional callback when next is clicked */
  onNextClick?: () => void;
  /** Optional callback when skip is clicked */
  onSkipClick?: () => void;
}

export function OnboardingNavigation({
  backHref,
  nextHref,
  skipHref,
  isFinalStep = false,
  isLoading = false,
  isNextDisabled = false,
  error = null,
  backText = "Înapoi",
  nextText = "Continuă",
  skipText = "Omite",
  finishText = "Finalizează",
  loadingText = "Se procesează...",
  formId,
  enableKeyboardShortcuts = true,
  showBackTextOnMobile = false,
  className = "",
  onBackClick,
  onNextClick,
  onSkipClick,
}: OnboardingNavigationProps) {
  // Determine next button type
  const isSubmitButton = !nextHref; // If no href, it's a submit button
  const buttonText = isFinalStep ? finishText : nextText;

  // Keyboard shortcuts
  useEffect(() => {
    if (!enableKeyboardShortcuts) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Enter to submit/continue (if not in input/textarea)
      if (e.key === "Enter" && !isNextDisabled && !isLoading) {
        const target = e.target as HTMLElement;
        if (
          target.tagName !== "INPUT" &&
          target.tagName !== "TEXTAREA" &&
          !target.isContentEditable
        ) {
          if (isSubmitButton && formId) {
            const form = document.getElementById(formId) as HTMLFormElement | null;
            if (form) {
              e.preventDefault();
              form.requestSubmit();
              onNextClick?.();
            }
          } else if (nextHref && onNextClick) {
            e.preventDefault();
            onNextClick();
          }
        }
      }

      // Escape to go back
      if (e.key === "Escape" && backHref && !isLoading) {
        const target = e.target as HTMLElement;
        if (
          target.tagName !== "INPUT" &&
          target.tagName !== "TEXTAREA" &&
          !target.isContentEditable
        ) {
          e.preventDefault();
          onBackClick?.();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    enableKeyboardShortcuts,
    isNextDisabled,
    isLoading,
    isSubmitButton,
    formId,
    nextHref,
    backHref,
    onNextClick,
    onBackClick,
  ]);

  const handleBackClick = useCallback(() => {
    onBackClick?.();
  }, [onBackClick]);

  const handleNextClick = useCallback(() => {
    onNextClick?.();
  }, [onNextClick]);

  const handleSkipClick = useCallback(() => {
    onSkipClick?.();
  }, [onSkipClick]);

  return (
    <div className={cn("space-y-4", className)}>
      {/* Error message */}
      {error && (
        <Alert variant="destructive" aria-live="polite">
          <AlertCircle />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Navigation buttons */}
      <div className="flex items-center justify-between gap-3 md:gap-4 my-4">
        {/* Back button */}
        <div className="shrink-0">
          {backHref ? (
            <Button
              variant="outline"
              size="default"
              asChild
              onClick={handleBackClick}
              className="min-w-[44px] md:min-w-auto bg-white border-border text-neutral-body hover:bg-muted hover:border-primary focus-visible:ring-primary"
            >
              <Link href={backHref} aria-label={backText} title={backText}>
                <ArrowLeft />
                <span className={showBackTextOnMobile ? "" : "hidden sm:inline"}>{backText}</span>
              </Link>
            </Button>
          ) : (
            <div className="w-16 md:w-24" aria-hidden="true" />
          )}
        </div>

        {/* Center: Skip button (optional) */}
        <div className="flex-1 flex justify-center">
          {skipHref && !isFinalStep && (
            <Button
              variant="link"
              size="default"
              asChild
              onClick={handleSkipClick}
              className="text-neutral-body hover:text-primary focus-visible:ring-primary"
              aria-label={skipText}
            >
              <Link href={skipHref}>{skipText}</Link>
            </Button>
          )}
        </div>

        {/* Next/Finish button */}
        <div className="shrink-0">
          {isSubmitButton ? (
            // Submit button (for forms) - Using Yuvoo brand design
            <Button
              type="submit"
              form={formId}
              onClick={handleNextClick}
              disabled={isNextDisabled || isLoading}
              size="lg"
              className="btn-yuvoo-primary min-w-section-lg md:min-w-auto shadow-md hover:shadow-[0px_4px_12px_rgba(0,187,174,0.2)] disabled:hover:bg-primary disabled:hover:shadow-md disabled:active:scale-100"
              aria-label={buttonText}
              aria-busy={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" aria-hidden="true" />
                  <span className="hidden sm:inline">{loadingText}</span>
                  <span className="sm:hidden">...</span>
                </>
              ) : (
                <>
                  <span>{buttonText}</span>
                  <ArrowRight aria-hidden="true" />
                </>
              )}
            </Button>
          ) : isNextDisabled ? (
            // Disabled button (when navigation is disabled)
            <Button
              type="button"
              disabled
              size="lg"
              variant="default"
              className="btn-yuvoo-primary min-w-section-lg md:min-w-auto shadow-md hover:shadow-[0px_4px_12px_rgba(0,187,174,0.2)] disabled:hover:bg-primary disabled:hover:shadow-md disabled:active:scale-100"
              aria-label={buttonText}
              aria-disabled={true}
            >
              <span>{buttonText}</span>
              <ArrowRight aria-hidden="true" />
            </Button>
          ) : (
            // Link button (for navigation when enabled) - Using Yuvoo brand design
            <Button
              size="lg"
              asChild
              onClick={handleNextClick}
              className="btn-yuvoo-primary min-w-section-lg md:min-w-auto shadow-md hover:shadow-[0px_4px_12px_rgba(0,187,174,0.2)]"
              aria-label={buttonText}
            >
              <Link href={nextHref || "#"}>
                <span>{buttonText}</span>
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Keyboard shortcuts hint (desktop only) */}
      {enableKeyboardShortcuts && !isLoading && (
        <div className="hidden md:flex items-center justify-center gap-4 text-xs text-gray-500 mb-4">
          <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs">Enter</kbd>
          <span>pentru a continua</span>
          {backHref && (
            <>
              <span className="text-gray-300">•</span>
              <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs">
                Esc
              </kbd>
              <span>pentru a reveni</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
