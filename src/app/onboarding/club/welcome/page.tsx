/**
 * Club Admin Onboarding - Step 1: Welcome
 *
 * Welcome screen for club admin onboarding flow with new base components.
 */

import { requireRole } from "@/lib/auth/session";
import { routes } from "@/lib/routes";
import {
  OnboardingLayout,
  OnboardingProgress,
  OnboardingNavigation,
  type OnboardingStep,
} from "@/components/features/onboarding";

// Define club admin onboarding steps
const CLUB_STEPS: OnboardingStep[] = [
  { number: 1, label: "Bun venit", description: "Introducere" },
  { number: 2, label: "Informații de bază", description: "Profil club" },
  { number: 3, label: "Contact & Program", description: "Detalii contact" },
  { number: 4, label: "Tarife & Vârste", description: "Prețuri" },
  { number: 5, label: "Fotografii", description: "Logo & galerie" },
  { number: 6, label: "Verificare", description: "Documente" },
  { number: 7, label: "Finalizare", description: "Completare" },
];

export default async function ClubWelcomePage() {
  const session = await requireRole("club_admin");

  return (
    <OnboardingLayout>
      {/* Progress indicator */}
      <OnboardingProgress currentStep={1} steps={CLUB_STEPS} className="mb-8" />

      {/* Main content */}
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Bună, {session.user.displayName || "Administrator"}! 👋
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Bun venit pe platforma Yuvoo pentru administratori de cluburi! În următorii pași vei crea
          profilul clubului tău.
        </p>

        {/* Benefits list */}
        <div className="bg-[#EBFFFE] rounded-xl p-6 mb-8 text-left">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Ce vei face în următorii pași:
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-[#00BBAE] text-2xl">✓</span>
              <span className="text-gray-700">Informații despre club</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#00BBAE] text-2xl">✓</span>
              <span className="text-gray-700">Program și tarife</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#00BBAE] text-2xl">✓</span>
              <span className="text-gray-700">Fotografii și documente</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#00BBAE] text-2xl">✓</span>
              <span className="text-gray-700">Verificare și aprobare</span>
            </li>
          </ul>
        </div>

        {/* Estimated time */}
        <p className="text-sm text-gray-500 mb-8">⏱️ Durată estimată: 10-15 minute</p>
      </div>

      {/* Navigation */}
      <OnboardingNavigation
        backHref={null}
        nextHref={routes.onboarding.club.basicInfo}
        nextText="Începe"
        className="mt-8"
      />
    </OnboardingLayout>
  );
}
