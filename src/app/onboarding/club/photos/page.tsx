/**
 * Club Admin Onboarding - Step 5: Photos
 *
 * Form to upload club logo and gallery photos with validation.
 */

import { requireRole } from "@/lib/auth/session";
import {
  OnboardingLayout,
  OnboardingProgress,
  type OnboardingStep,
} from "@/components/features/onboarding";
import { ClubPhotosForm } from "@/components/features/onboarding/ClubPhotosForm";

const CLUB_STEPS: OnboardingStep[] = [
  { number: 1, label: "Bun venit", description: "Introducere" },
  { number: 2, label: "Informații de bază", description: "Profil club" },
  { number: 3, label: "Contact & Program", description: "Detalii contact" },
  { number: 4, label: "Tarife & Vârste", description: "Prețuri" },
  { number: 5, label: "Fotografii", description: "Logo & galerie" },
  { number: 6, label: "Verificare", description: "Documente" },
  { number: 7, label: "Finalizare", description: "Completare" },
];

export default async function ClubPhotosPage() {
  const _session = await requireRole("club_admin");

  return (
    <OnboardingLayout>
      <OnboardingProgress currentStep={5} steps={CLUB_STEPS} className="mb-8" />

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Fotografii ale Clubului 📸</h1>
          <p className="text-lg text-gray-600">
            Încarcă logo-ul clubului și fotografii din galerie pentru ca părinții să vadă
            facilitățile și activitățile pe care le oferi.
          </p>
        </div>

        {/* Form */}
        <ClubPhotosForm />
      </div>
    </OnboardingLayout>
  );
}
