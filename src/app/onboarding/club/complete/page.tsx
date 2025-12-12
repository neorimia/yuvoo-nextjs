/**
 * Club Admin Onboarding - Step 7: Complete
 *
 * Final step - show success message and redirect to dashboard.
 */

import { requireRole } from "@/lib/auth/session";
import { completeClubOnboarding } from "@/app/actions/onboarding";
import {
  OnboardingLayout,
  OnboardingProgress,
  type OnboardingStep,
} from "@/components/features/onboarding";
import { ClubCompletionContent } from "@/components/features/onboarding/ClubCompletionContent";

const CLUB_STEPS: OnboardingStep[] = [
  { number: 1, label: "Bun venit", description: "Introducere" },
  { number: 2, label: "Informații de bază", description: "Profil club" },
  { number: 3, label: "Contact & Program", description: "Detalii contact" },
  { number: 4, label: "Tarife & Vârste", description: "Prețuri" },
  { number: 5, label: "Fotografii", description: "Logo & galerie" },
  { number: 6, label: "Verificare", description: "Documente" },
  { number: 7, label: "Finalizare", description: "Completare" },
];

export default async function ClubCompletePage() {
  const session = await requireRole("club_admin");

  // Mark onboarding as complete
  const result = await completeClubOnboarding();

  // If completion failed, we should handle it
  // For now, we'll still show the page (component will handle redirect)
  if (!result.success) {
    console.error("Error completing onboarding:", result.error);
  }

  return (
    <OnboardingLayout>
      <OnboardingProgress currentStep={7} steps={CLUB_STEPS} className="mb-8" />

      <div className="max-w-3xl mx-auto">
        <ClubCompletionContent userName={session.dbUser.firstName || session.dbUser.email} />
      </div>
    </OnboardingLayout>
  );
}
