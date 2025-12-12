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

      <div className="mx-auto" style={{ maxWidth: "42rem" }}>
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-body mb-4">Bio profesional și experiență 📝</h1>
          <p className="h5 text-body">
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
