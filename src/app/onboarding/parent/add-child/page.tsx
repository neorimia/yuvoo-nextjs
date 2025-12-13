/**
 * Parent Onboarding - Step 2: Add Child Profile
 *
 * Form to add first child profile with validation and date picker.
 */

import { requireRole } from "@/lib/auth/session";
import {
  OnboardingLayout,
  OnboardingProgress,
  type OnboardingStep,
} from "@/components/features/onboarding";
import { AddChildForm } from "@/components/features/onboarding/AddChildForm";

const PARENT_STEPS: OnboardingStep[] = [
  { number: 1, label: "Bun venit", description: "Introducere" },
  { number: 2, label: "Adaugă copil", description: "Profil copil" },
  { number: 3, label: "Tur platformă", description: "Funcționalități" },
  { number: 4, label: "Quiz intro", description: "Începe testul" },
  { number: 5, label: "Finalizare", description: "Completare" },
];

export default async function ParentAddChildPage() {
  const _session = await requireRole("parent");

  return (
    <OnboardingLayout>
      <OnboardingProgress currentStep={2} steps={PARENT_STEPS} className="mb-8" />

      <div className="mx-auto" style={{ maxWidth: "42rem" }}>
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-body mb-4">Adaugă profilul copilului 👶</h1>
          <p className="h5 text-body">
            Spune-ne câteva detalii despre copilul tău pentru a primi recomandări personalizate.
          </p>
        </div>

        {/* Info box */}
        <div className="bg-yuvoo-primary-light border border-yuvoo-primary rounded-3 p-4 mb-5">
          <div className="d-flex align-items-start gap-3">
            <span style={{ fontSize: "1.5rem" }}>ℹ️</span>
            <div>
              <h3 className="fw-semibold text-body mb-2">
                De ce avem nevoie de aceste informații?
              </h3>
              <p className="small text-body">
                Vârsta și genul copilului ne ajută să îți oferim recomandări de sporturi adecvate
                dezvoltării sale. Aceste date sunt utilizate doar pentru personalizarea experienței
                tale pe platformă.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <AddChildForm />
      </div>
    </OnboardingLayout>
  );
}
