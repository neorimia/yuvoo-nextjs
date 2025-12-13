/**
 * Club Admin Onboarding - Step 6: Verification
 *
 * Form to upload club verification documents with validation.
 */

import { requireRole } from "@/lib/auth/session";
import {
  OnboardingLayout,
  OnboardingProgress,
  type OnboardingStep,
} from "@/components/features/onboarding";
import { ClubVerificationForm } from "@/components/features/onboarding/ClubVerificationForm";

const CLUB_STEPS: OnboardingStep[] = [
  { number: 1, label: "Bun venit", description: "Introducere" },
  { number: 2, label: "Informații de bază", description: "Profil club" },
  { number: 3, label: "Contact & Program", description: "Detalii contact" },
  { number: 4, label: "Tarife & Vârste", description: "Prețuri" },
  { number: 5, label: "Fotografii", description: "Logo & galerie" },
  { number: 6, label: "Verificare", description: "Documente" },
  { number: 7, label: "Finalizare", description: "Completare" },
];

export default async function ClubVerificationPage() {
  const _session = await requireRole("club_admin");

  return (
    <OnboardingLayout>
      <OnboardingProgress currentStep={6} steps={CLUB_STEPS} className="mb-8" />

      <div className="mx-auto" style={{ maxWidth: "48rem" }}>
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-body mb-4">Documente de Verificare 📄</h1>
          <p className="h5 text-body">
            Încarcă documentele necesare pentru verificarea clubului tău. Procesul de verificare
            ajută părinții să își facă o idee mai bună despre seriozitatea și siguranța
            activităților tale.
          </p>
        </div>

        {/* Form */}
        <ClubVerificationForm />
      </div>
    </OnboardingLayout>
  );
}
