/**
 * Parent Onboarding - Step 1: Welcome
 *
 * Welcome screen for parent onboarding flow with new base components.
 */

import { requireRole } from "@/lib/auth/session";
import { routes } from "@/lib/routes";
import {
  OnboardingLayout,
  OnboardingProgress,
  OnboardingNavigation,
  type OnboardingStep,
} from "@/components/features/onboarding";

// Define parent onboarding steps
const PARENT_STEPS: OnboardingStep[] = [
  { number: 1, label: "Bun venit", description: "Introducere" },
  { number: 2, label: "Adaugă copil", description: "Profil copil" },
  { number: 3, label: "Tur platformă", description: "Funcționalități" },
  { number: 4, label: "Quiz intro", description: "Începe testul" },
  { number: 5, label: "Finalizare", description: "Completare" },
];

export default async function ParentWelcomePage() {
  const _session = await requireRole("parent");

  return (
    <OnboardingLayout>
      {/* Progress indicator */}
      <OnboardingProgress currentStep={1} steps={PARENT_STEPS} className="mb-8" />

      {/* Main content */}
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Bun venit la Yuvoo! 👋</h1>
        <p className="text-lg text-gray-600 mb-8">
          Hai să începem configurarea contului tău de părinte. Te vom ghida pas cu pas pentru a găsi
          sportul perfect pentru copilul tău.
        </p>

        {/* Benefits list */}
        <div className="bg-[#EBFFFE] rounded-xl p-6 mb-8 text-left">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Ce vei face în următorii pași:
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-[#00BBAE] text-2xl">✓</span>
              <span className="text-gray-700">Adaugă profilul copilului tău</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#00BBAE] text-2xl">✓</span>
              <span className="text-gray-700">Descoperă funcționalitățile platformei</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#00BBAE] text-2xl">✓</span>
              <span className="text-gray-700">
                Începe chestionarul AI pentru recomandări personalizate
              </span>
            </li>
          </ul>
        </div>

        {/* Estimated time */}
        <p className="text-sm text-gray-500 mb-8">⏱️ Durată estimată: 5-10 minute</p>
      </div>

      {/* Navigation */}
      <OnboardingNavigation
        backHref={null}
        nextHref={routes.onboarding.parent.addChild}
        nextText="Începe"
        className="mt-8"
      />
    </OnboardingLayout>
  );
}
