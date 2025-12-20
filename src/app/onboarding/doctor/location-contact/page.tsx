/**
 * Doctor Onboarding - Step 4: Location & Contact
 *
 * Form to add doctor location and contact information with validation.
 */

import { requireRole } from "@/lib/auth/session";
import {
  OnboardingLayout,
  OnboardingProgress,
  type OnboardingStep,
} from "@/components/features/onboarding";
import { DoctorLocationContactForm } from "@/components/features/onboarding/DoctorLocationContactForm";

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

export default async function DoctorLocationContactPage() {
  const _session = await requireRole("doctor");

  return (
    <OnboardingLayout>
      <OnboardingProgress currentStep={4} steps={DOCTOR_STEPS} className="mb-8" />

      <div className="bd-onboarding-page mx-auto">
        {/* Header */}
        <div className="bd-onboarding-page-header">
          <h1 className="display-4 fw-bold text-body mb-4">Cabinet și contact 📍</h1>
          <p className="h5 text-body">
            Adaugă adresa cabinetului și informațiile de contact pentru ca părinții să te poată
            găsi.
          </p>
        </div>

        {/* Form */}
        <div className="bd-onboarding-page-content">
          <DoctorLocationContactForm />
        </div>
      </div>
    </OnboardingLayout>
  );
}
