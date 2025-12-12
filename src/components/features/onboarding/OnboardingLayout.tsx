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
    <div className={`min-h-screen flex flex-col ${backgroundClass}`}>
      {/* Skip to content link (accessibility) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#00BBAE] focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#00BBAE] focus:ring-offset-2"
      >
        Sari la conținut
      </a>

      {/* Header - Minimal branding only */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-3 md:py-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link
              href={routes.home}
              className="flex items-center space-x-2 group shrink-0"
              aria-label="Înapoi la pagina principală Yuvoo"
            >
              <Image src="/assets/img/logo/logo.svg" alt="Yuvoo" width={100} height={100} />
            </Link>

            {/* Optional header content (e.g., progress) */}
            {headerContent && (
              <div className="flex-1 max-w-md mx-4 hidden md:block">{headerContent}</div>
            )}

            {/* Right side actions */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Help link */}
              {showHelpLink && (
                <Link
                  href={routes.contact}
                  className="hidden sm:flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#00BBAE] transition-colors focus:outline-none focus:ring-2 focus:ring-[#00BBAE] focus:ring-offset-2 rounded-lg px-2 py-1"
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
                  className="sm:hidden text-gray-600 hover:text-[#00BBAE] transition-colors focus:outline-none focus:ring-2 focus:ring-[#00BBAE] focus:ring-offset-2 rounded-lg p-2"
                  aria-label="Ajutor și suport"
                >
                  <HelpCircle className="w-5 h-5" />
                </Link>
              )}

              {/* Exit button */}
              {showExitButton && (
                <button
                  onClick={handleExit}
                  className="text-gray-600 hover:text-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-lg p-2"
                  aria-label="Părăsește onboarding-ul"
                  title="Părăsește onboarding-ul"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Mobile header content */}
          {headerContent && <div className="mt-3 md:hidden">{headerContent}</div>}
        </div>
      </header>

      {/* Main content area */}
      <main
        id="main-content"
        className="flex-1 container mx-auto px-4 py-6 md:py-8 md:px-6 lg:px-8 max-w-4xl w-full"
      >
        <div className="animate-fadeIn">{children}</div>
      </main>

      {/* Footer - Minimal info only */}
      <footer className="mt-auto py-4 md:py-6 border-t border-gray-200 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          {footerContent || (
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 text-sm text-gray-600">
              <p className="text-center md:text-left">
                © {new Date().getFullYear()} Yuvoo. Toate drepturile rezervate.
              </p>
              <div className="flex gap-4">
                <Link
                  href={routes.privacy}
                  className="hover:text-[#00BBAE] transition-colors focus:outline-none focus:ring-2 focus:ring-[#00BBAE] focus:ring-offset-2 rounded px-1"
                >
                  Confidențialitate
                </Link>
                <Link
                  href={routes.terms}
                  className="hover:text-[#00BBAE] transition-colors focus:outline-none focus:ring-2 focus:ring-[#00BBAE] focus:ring-offset-2 rounded px-1"
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
