/**
 * Doctor Onboarding - Step 3: Bio & Experience
 *
 * Form to add doctor bio and experience information with validation.
 */

import { requireRole } from "@/lib/auth/session";
import {
  OnboardingLayout,
  OnboardingProgress,
  type OnboardingStep,
} from "@/components/features/onboarding";
import { DoctorBioExperienceForm } from "@/components/features/onboarding/DoctorBioExperienceForm";

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

export default async function DoctorBioExperiencePage() {
  const _session = await requireRole("doctor");

  return (
    <OnboardingLayout>
      <OnboardingProgress currentStep={3} steps={DOCTOR_STEPS} className="mb-8" />

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Bio profesional și experiență 📝
          </h1>
          <p className="text-lg text-gray-600">
            Descrie experiența și abordarea ta profesională pentru a crea un profil complet și
            atractiv.
          </p>
        </div>

        {/* Form */}
        <DoctorBioExperienceForm />
      </div>
    </OnboardingLayout>
  );
}
