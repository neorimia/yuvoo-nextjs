/**
 * Doctor Onboarding - Step 1: Welcome
 *
 * Welcome screen for doctor onboarding flow with new base components.
 */

import { requireRole } from "@/lib/auth/session";
import { routes } from "@/lib/routes";
import {
  OnboardingLayout,
  OnboardingProgress,
  OnboardingNavigation,
  type OnboardingStep,
} from "@/components/features/onboarding";

// Define doctor onboarding steps
const DOCTOR_STEPS: OnboardingStep[] = [
  { number: 1, label: "Bun venit", description: "Introducere" },
  { number: 2, label: "Informații profesionale", description: "Profil de bază" },
  { number: 3, label: "Bio & Experiență", description: "Despre tine" },
  { number: 4, label: "Cabinet & Contact", description: "Detalii contact" },
  { number: 5, label: "Fotografie", description: "Foto profesională" },
  { number: 6, label: "Verificare", description: "Documente" },
  { number: 7, label: "Disponibilitate", description: "Program" },
  { number: 8, label: "Finalizare", description: "Completare" },
];

export default async function DoctorWelcomePage() {
  const session = await requireRole("doctor");

  return (
    <OnboardingLayout>
      {/* Progress indicator */}
      <OnboardingProgress currentStep={1} steps={DOCTOR_STEPS} className="mb-8" />

      {/* Main content */}
      <div className="bd-onboarding-page mx-auto text-center">
        <div className="bd-onboarding-page-header">
          <h1 className="display-4 fw-bold text-body mb-4">
            Bună, {session.user.displayName || "Dr."}! 👋
          </h1>
          <p className="h5 text-body mb-5">
            Bun venit pe platforma Yuvoo pentru specialiști pediatri! În următorii pași vei crea
            profilul tău profesional.
          </p>
        </div>

        {/* Benefits list */}
        <div className="bd-onboarding-welcome-benefits">
          <h2 className="h4 fw-semibold text-body mb-4">Ce vei face în următorii pași:</h2>
          <ul className="mb-0">
            <li className="d-flex align-items-start gap-3 mb-3">
              <span className="check-icon text-yuvoo-primary">✓</span>
              <span className="text-body">Informații profesionale</span>
            </li>
            <li className="d-flex align-items-start gap-3 mb-3">
              <span className="check-icon text-yuvoo-primary">✓</span>
              <span className="text-body">Specializare și experiență</span>
            </li>
            <li className="d-flex align-items-start gap-3 mb-3">
              <span className="check-icon text-yuvoo-primary">✓</span>
              <span className="text-body">Cabinet și program</span>
            </li>
            <li className="d-flex align-items-start gap-3">
              <span className="check-icon text-yuvoo-primary">✓</span>
              <span className="text-body">Documente de verificare</span>
            </li>
          </ul>
        </div>

        {/* Estimated time */}
        <p className="bd-onboarding-welcome-time">⏱️ Durată estimată: 10-15 minute</p>
      </div>

      {/* Navigation */}
      <OnboardingNavigation
        backHref={null}
        nextHref={routes.onboarding.doctor.basicInfo}
        nextText="Începe"
        className="mt-5"
      />
    </OnboardingLayout>
  );
}
