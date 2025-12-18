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
      <div className="bd-onboarding-page mx-auto text-center">
        <div className="bd-onboarding-page-header">
          <h1 className="display-4 fw-bold text-body mb-4">
            Bună, {session.user.displayName || "Administrator"}! 👋
          </h1>
          <p className="h5 text-body mb-5">
            Bun venit pe platforma Yuvoo pentru administratori de cluburi! În următorii pași vei
            crea profilul clubului tău.
          </p>
        </div>

        {/* Benefits list */}
        <div className="bd-onboarding-welcome-benefits">
          <h2 className="h4 fw-semibold text-body mb-4">Ce vei face în următorii pași:</h2>
          <ul className="mb-0">
            <li className="d-flex align-items-start gap-3 mb-3">
              <span className="check-icon text-yuvoo-primary">✓</span>
              <span className="text-body">Informații despre club</span>
            </li>
            <li className="d-flex align-items-start gap-3 mb-3">
              <span className="check-icon text-yuvoo-primary">✓</span>
              <span className="text-body">Program și tarife</span>
            </li>
            <li className="d-flex align-items-start gap-3 mb-3">
              <span className="check-icon text-yuvoo-primary">✓</span>
              <span className="text-body">Fotografii și documente</span>
            </li>
            <li className="d-flex align-items-start gap-3">
              <span className="check-icon text-yuvoo-primary">✓</span>
              <span className="text-body">Verificare și aprobare</span>
            </li>
          </ul>
        </div>

        {/* Estimated time */}
        <p className="bd-onboarding-welcome-time">⏱️ Durată estimată: 10-15 minute</p>
      </div>

      {/* Navigation */}
      <OnboardingNavigation
        backHref={null}
        nextHref={routes.onboarding.club.basicInfo}
        nextText="Începe"
        className="mt-5"
      />
    </OnboardingLayout>
  );
}
