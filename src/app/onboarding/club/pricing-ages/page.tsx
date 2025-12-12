/**
 * Club Admin Onboarding - Step 4: Pricing & Age Groups
 *
 * Form to add pricing options, age groups, and experience levels with validation.
 */

import { requireRole } from "@/lib/auth/session";
import {
  OnboardingLayout,
  OnboardingProgress,
  type OnboardingStep,
} from "@/components/features/onboarding";
import { ClubPricingAgesForm } from "@/components/features/onboarding/ClubPricingAgesForm";

const CLUB_STEPS: OnboardingStep[] = [
  { number: 1, label: "Bun venit", description: "Introducere" },
  { number: 2, label: "Informații de bază", description: "Profil club" },
  { number: 3, label: "Contact & Program", description: "Detalii contact" },
  { number: 4, label: "Tarife & Vârste", description: "Prețuri" },
  { number: 5, label: "Fotografii", description: "Logo & galerie" },
  { number: 6, label: "Verificare", description: "Documente" },
  { number: 7, label: "Finalizare", description: "Completare" },
];

export default async function ClubPricingAgesPage() {
  const _session = await requireRole("club_admin");

  return (
    <OnboardingLayout>
      <OnboardingProgress currentStep={4} steps={CLUB_STEPS} className="mb-8" />

      <div className="mx-auto" style={{ maxWidth: "42rem" }}>
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-body mb-4">Prețuri și Grupe de Vârstă 💰</h1>
          <p className="h5 text-body">
            Configurează prețurile, grupele de vârstă și nivelurile de experiență pentru ca părinții
            să știe exact ce oferi.
          </p>
        </div>

        {/* Form */}
        <ClubPricingAgesForm />
      </div>
    </OnboardingLayout>
  );
}
