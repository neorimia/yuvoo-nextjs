/**
 * OnboardingLayout Component
 *
 * Shared UI wrapper for all onboarding flows (parent, club, doctor).
 * Provides consistent branding, layout structure, and visual identity.
 *
 * Features:
 * - Romanian branding and Yuvoo logo
 * - Clean, distraction-free design
 * - Responsive layout (mobile, tablet, desktop)
 * - Accessible markup (WCAG AA)
 * - Skip to content link for accessibility
 * - Exit confirmation warning
 * - Better mobile experience
 * - Smooth transitions and animations
 */

"use client";

import { useEffect, type ReactNode } from "react";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { HelpCircle, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface OnboardingLayoutProps {
  children: ReactNode;
  /** Optional custom background color class */
  backgroundClass?: string;
  /** Show help link in header? (default: true) */
  showHelpLink?: boolean;
  /** Show exit button? (default: false) */
  showExitButton?: boolean;
  /** Exit confirmation message */
  exitMessage?: string;
  /** Optional header content (e.g., progress indicator) */
  headerContent?: ReactNode;
  /** Optional footer content */
  footerContent?: ReactNode;
}

export function OnboardingLayout({
  children,
  backgroundClass = "bg-white",
  showHelpLink = true,
  showExitButton = false,
  exitMessage = "Ești sigur că vrei să părăsești onboarding-ul? Progresul tău va fi salvat.",
  headerContent,
  footerContent,
}: OnboardingLayoutProps) {
  // Exit confirmation on page unload
  useEffect(() => {
    if (!showExitButton) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = exitMessage;
      return exitMessage;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [showExitButton, exitMessage]);

  const handleExit = () => {
    if (window.confirm(exitMessage)) {
      window.location.href = routes.home;
    }
  };

  return (
    <div className={cn("min-vh-100 d-flex flex-column position-relative", backgroundClass)}>
      {/* Skip to content link (accessibility) */}
      <a
        href="#main-content"
        className="visually-hidden-focusable position-absolute top-4 start-4 z-50 px-3 py-2 bg-yuvoo-primary text-white rounded shadow-lg focus-yuvoo-primary"
        style={{ zIndex: 1050 }}
      >
        Sari la conținut
      </a>

      {/* Header - Minimal branding only */}
      <header
        className="w-100 top-0 z-99 bg-white border-bottom border-yuvoo-primary shadow-sm"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(4px)",
        }}
      >
        <div className="container mx-auto px-3 py-3 px-md-4 py-md-4 px-lg-5">
          <div className="d-flex align-items-center justify-content-between gap-3">
            {/* Logo */}
            <Link
              href={routes.home}
              className="d-flex align-items-center gap-2"
              style={{ flexShrink: 0 }}
              aria-label="Înapoi la pagina principală Yuvoo"
            >
              <Image src="/assets/img/logo/logo.svg" alt="Yuvoo" width={100} height={100} />
            </Link>

            {/* Optional header content (e.g., progress) */}
            {headerContent && (
              <div className="flex-fill mx-4 d-none d-md-block" style={{ maxWidth: "28rem" }}>
                {headerContent}
              </div>
            )}

            {/* Right side actions */}
            <div className="d-flex align-items-center gap-3" style={{ flexShrink: 0 }}>
              {/* Help link */}
              {showHelpLink && (
                <Link
                  href={routes.contact}
                  className="d-none d-sm-flex align-items-center gap-2 small text-secondary text-yuvoo-primary-hover rounded px-2 py-1 focus-yuvoo-primary"
                  style={{ transition: "color 0.2s ease-in-out" }}
                  aria-label="Ajutor și suport"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Ajutor</span>
                </Link>
              )}

              {/* Mobile help link (icon only) */}
              {showHelpLink && (
                <Link
                  href={routes.contact}
                  className="d-sm-none text-secondary text-yuvoo-primary-hover rounded p-2 focus-yuvoo-primary"
                  style={{ transition: "color 0.2s ease-in-out" }}
                  aria-label="Ajutor și suport"
                >
                  <HelpCircle className="w-5 h-5" />
                </Link>
              )}

              {/* Exit button */}
              {showExitButton && (
                <button
                  onClick={handleExit}
                  className="text-secondary text-danger-hover rounded p-2 focus-danger"
                  style={{ transition: "color 0.2s ease-in-out" }}
                  aria-label="Părăsește onboarding-ul"
                  title="Părăsește onboarding-ul"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Mobile header content */}
          {headerContent && <div className="mt-3 d-md-none">{headerContent}</div>}
        </div>
      </header>

      {/* Main content area */}
      <main
        id="main-content"
        className="flex-fill container mx-auto px-3 py-4 px-md-4 py-md-5 px-lg-5"
        style={{ maxWidth: "64rem", width: "100%" }}
      >
        <div className="animate-fadeIn">{children}</div>
      </main>

      {/* Footer - Minimal info only */}
      <footer className="mt-auto py-3 py-md-4 border-top border-yuvoo-primary bg-light">
        <div className="container mx-auto px-3 px-md-4 px-lg-5">
          {footerContent || (
            <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 gap-md-4 small text-yuvoo-primary">
              <p className="text-center text-md-start mb-0">
                © {new Date().getFullYear()} Yuvoo. Toate drepturile rezervate.
              </p>
              <div className="d-flex gap-4">
                <Link
                  href={routes.privacy}
                  className="text-yuvoo-primary-hover focus-yuvoo-primary rounded px-1"
                  style={{ transition: "color 0.2s ease-in-out" }}
                >
                  Confidențialitate
                </Link>
                <Link
                  href={routes.terms}
                  className="text-yuvoo-primary-hover focus-yuvoo-primary rounded px-1"
                  style={{ transition: "color 0.2s ease-in-out" }}
                >
                  Termeni
                </Link>
              </div>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}
