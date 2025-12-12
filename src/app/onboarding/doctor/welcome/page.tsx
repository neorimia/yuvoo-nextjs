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
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Bună, {session.user.displayName || "Dr."}! 👋
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Bun venit pe platforma Yuvoo pentru specialiști pediatri! În următorii pași vei crea
          profilul tău profesional.
        </p>

        {/* Benefits list */}
        <div className="bg-[#EBFFFE] rounded-xl p-6 mb-8 text-left">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Ce vei face în următorii pași:
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-[#00BBAE] text-2xl">✓</span>
              <span className="text-gray-700">Informații profesionale</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#00BBAE] text-2xl">✓</span>
              <span className="text-gray-700">Specializare și experiență</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#00BBAE] text-2xl">✓</span>
              <span className="text-gray-700">Cabinet și program</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#00BBAE] text-2xl">✓</span>
              <span className="text-gray-700">Documente de verificare</span>
            </li>
          </ul>
        </div>

        {/* Estimated time */}
        <p className="text-sm text-gray-500 mb-8">⏱️ Durată estimată: 10-15 minute</p>
      </div>

      {/* Navigation */}
      <OnboardingNavigation
        backHref={null}
        nextHref={routes.onboarding.doctor.basicInfo}
        nextText="Începe"
        className="mt-8"
      />
    </OnboardingLayout>
  );
}
