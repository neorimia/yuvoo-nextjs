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
 */

import type { ReactNode } from "react";
import Link from "next/link";
import { routes } from "@/lib/routes";

interface OnboardingLayoutProps {
  children: ReactNode;
  /** Optional custom background color class */
  backgroundClass?: string;
}

export function OnboardingLayout({
  children,
  backgroundClass = "bg-white",
}: OnboardingLayoutProps) {
  return (
    <div className={`min-h-screen ${backgroundClass}`}>
      {/* Header - Minimal branding only */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href={routes.home}
              className="flex items-center space-x-2 group"
              aria-label="Înapoi la pagina principală Yuvoo"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#00BBAE] to-[#00998D] flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <span className="text-white font-bold text-xl">Y</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#00BBAE] to-[#00998D] bg-clip-text text-transparent">
                Yuvoo
              </span>
            </Link>

            {/* Optional help link */}
            <Link
              href={routes.contact}
              className="text-sm text-gray-600 hover:text-[#00BBAE] transition-colors"
              aria-label="Ajutor și suport"
            >
              Ajutor
            </Link>
          </div>
        </div>
      </header>

      {/* Main content area */}
      <main className="container mx-auto px-4 py-8 md:px-6 lg:px-8 max-w-4xl">{children}</main>

      {/* Footer - Minimal info only */}
      <footer className="mt-auto py-6 border-t border-gray-200 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
            <p>© 2024 Yuvoo. Toate drepturile rezervate.</p>
            <div className="flex gap-4">
              <Link href={routes.privacy} className="hover:text-[#00BBAE] transition-colors">
                Confidențialitate
              </Link>
              <Link href={routes.terms} className="hover:text-[#00BBAE] transition-colors">
                Termeni
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
