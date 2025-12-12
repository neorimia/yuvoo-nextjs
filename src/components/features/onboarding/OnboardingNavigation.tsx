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
import { BootstrapButton, BootstrapAlert } from "@/components/UI/bootstrap-index";
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
  showBackTextOnMobile: _showBackTextOnMobile = false,
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
    <div className={cn("mb-4", className)}>
      {/* Error message */}
      {error && (
        <BootstrapAlert variant="danger" className="mb-4">
          <AlertCircle className="me-2" />
          {error}
        </BootstrapAlert>
      )}

      {/* Navigation buttons */}
      <div
        className={cn(
          "d-flex align-items-center  gap-3 my-4",
          "mx-auto",
          !backHref ? "justify-content-center" : "justify-content-between"
        )}
      >
        {/* Back button */}
        {backHref && (
          <div style={{ flexShrink: 0 }}>
            {backHref ? (
              <Link
                href={backHref || "#"}
                onClick={handleBackClick}
                className={cn(
                  "bd-btn bd-btn-lg btn-outline",
                  "bg-transparent text-white",
                  "shadow shadow-yuvoo-primary",
                  "text-yuvoo-primary hover:text-yuvoo-primary-hover",
                  "border-yuvoo-primary hover:border-yuvoo-primary-hover"
                )}
                style={{ minWidth: "120px" }}
                aria-label={backText}
              >
                <span className="bd-btn-inner">
                  <span className="bd-btn-normal d-flex align-items-center justify-content-center">
                    <ArrowLeft className="me-1" aria-hidden="true" />
                    <span className="d-none d-sm-inline">{backText}</span>
                  </span>
                  <span className="bd-btn-hover text-white d-flex align-items-center justify-content-center">
                    <ArrowLeft className="me-1" aria-hidden="true" />
                    <span className="d-none d-sm-inline">{backText}</span>
                  </span>
                </span>
              </Link>
            ) : (
              <div className="w-16" style={{ width: "96px" }} aria-hidden="true" />
            )}
          </div>
        )}

        {/* Center: Skip button (optional) */}
        {skipHref && !isFinalStep && (
          <div className="flex-fill d-flex justify-content-center">
            <Link
              href={skipHref}
              onClick={handleSkipClick}
              className={cn("text-muted text-yuvoo-primary-hover", "focus-yuvoo-primary")}
              aria-label={skipText}
            >
              {skipText}
            </Link>
          </div>
        )}

        {/* Next/Finish button */}
        <div style={{ flexShrink: 0 }} className="text-white">
          {isSubmitButton ? (
            // Submit button (for forms) - Using Yuvoo brand design
            <BootstrapButton
              type="submit"
              form={formId}
              onClick={handleNextClick}
              disabled={isNextDisabled || isLoading}
              size="lg"
              variant="primary"
              isLoading={isLoading}
              className={cn("w-100", "bg-yuvoo-primary text-white", "shadow shadow-yuvoo-primary")}
              style={{ minWidth: "120px" }}
              aria-label={buttonText}
              aria-busy={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin me-2" aria-hidden="true" />
                  <span className="d-none d-sm-inline">{loadingText}</span>
                  <span className="d-sm-none">...</span>
                </>
              ) : (
                <>
                  <span>{buttonText}</span>
                  <ArrowRight className="ms-2" aria-hidden="true" />
                </>
              )}
            </BootstrapButton>
          ) : isNextDisabled ? (
            // Disabled button (when navigation is disabled)
            <BootstrapButton
              type="button"
              disabled
              size="lg"
              variant="primary"
              className={cn("w-100", "bg-yuvoo-primary text-white", "shadow")}
              style={{ minWidth: "120px" }}
              aria-label={buttonText}
              aria-disabled={true}
            >
              <span>{buttonText}</span>
              <ArrowRight className="ms-2" aria-hidden="true" />
            </BootstrapButton>
          ) : (
            // Link button (for navigation when enabled) - Using Yuvoo brand design
            <Link
              href={nextHref || "#"}
              onClick={handleNextClick}
              className={cn(
                "bd-btn bd-btn-lg",
                "bg-yuvoo-primary text-white",
                "shadow shadow-yuvoo-primary"
              )}
              style={{ minWidth: "120px" }}
              aria-label={buttonText}
            >
              <span className="bd-btn-inner">
                <span className="bd-btn-normal">
                  <span>{buttonText}</span>
                  <ArrowRight className="ms-2" aria-hidden="true" />
                </span>
                <span className="bd-btn-hover">
                  <span>{buttonText}</span>
                  <ArrowRight className="ms-2" aria-hidden="true" />
                </span>
              </span>
            </Link>
          )}
        </div>
      </div>

      {/* Keyboard shortcuts hint (desktop only) */}
      {/* {enableKeyboardShortcuts && !isLoading && (
        <div className="d-none d-md-flex align-items-center justify-content-center gap-4 small text-secondary mb-4">
          <kbd className="px-2 py-1 bg-light text-black border border-secondary rounded small">
            Enter
          </kbd>
          <span>pentru a continua</span>
          {backHref && (
            <>
              <span className="text-secondary">•</span>
              <kbd className="px-2 py-1 bg-light text-black border border-secondary rounded small">
                Esc
              </kbd>
              <span>pentru a reveni</span>
            </>
          )}
        </div>
      )} */}
    </div>
  );
}
