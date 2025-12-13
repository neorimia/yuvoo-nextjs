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
      <div className="mx-auto text-center" style={{ maxWidth: "42rem" }}>
        <h1 className="display-4 fw-bold text-body mb-4">Bun venit la Yuvoo! 👋</h1>
        <p className="h5 text-body mb-5">
          Hai să începem configurarea contului tău de părinte. Te vom ghida pas cu pas pentru a găsi
          sportul perfect pentru copilul tău.
        </p>

        {/* Benefits list */}
        <div className="bg-yuvoo-primary-light rounded-3 p-4 mb-5 text-start">
          <h2 className="h4 fw-semibold text-body mb-4">Ce vei face în următorii pași:</h2>
          <ul className="mb-0" style={{ listStyle: "none", paddingLeft: 0 }}>
            <li className="d-flex align-items-start gap-3 mb-3">
              <span className="text-yuvoo-primary" style={{ fontSize: "1.5rem" }}>
                ✓
              </span>
              <span className="text-body">Adaugă profilul copilului tău</span>
            </li>
            <li className="d-flex align-items-start gap-3 mb-3">
              <span className="text-yuvoo-primary" style={{ fontSize: "1.5rem" }}>
                ✓
              </span>
              <span className="text-body">Descoperă funcționalitățile platformei</span>
            </li>
            <li className="d-flex align-items-start gap-3">
              <span className="text-yuvoo-primary" style={{ fontSize: "1.5rem" }}>
                ✓
              </span>
              <span className="text-body">
                Începe chestionarul AI pentru recomandări personalizate
              </span>
            </li>
          </ul>
        </div>

        {/* Estimated time */}
        <p className="small text-secondary mb-5">⏱️ Durată estimată: 5-10 minute</p>
      </div>

      {/* Navigation */}
      <OnboardingNavigation
        backHref={null}
        nextHref={routes.onboarding.parent.addChild}
        nextText="Începe"
        className="mt-5"
      />
    </OnboardingLayout>
  );
}
