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

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Adaugă profilul copilului 👶</h1>
          <p className="text-lg text-gray-600">
            Spune-ne câteva detalii despre copilul tău pentru a primi recomandări personalizate.
          </p>
        </div>

        {/* Info box */}
        <div className="bg-[#EBFFFE] border border-[#00BBAE]/20 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <span className="text-2xl">ℹ️</span>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                De ce avem nevoie de aceste informații?
              </h3>
              <p className="text-sm text-gray-700">
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
