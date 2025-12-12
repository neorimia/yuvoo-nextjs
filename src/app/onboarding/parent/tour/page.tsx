/**
 * Parent Onboarding - Step 3: Platform Tour
 *
 * Introduction to platform features with 3-step process visualization.
 */

import { requireRole } from "@/lib/auth/session";
import {
  OnboardingLayout,
  OnboardingProgress,
  OnboardingNavigation,
  type OnboardingStep,
} from "@/components/features/onboarding";
import { routes } from "@/lib/routes";
import { Sparkles, Search, Calendar } from "lucide-react";

const PARENT_STEPS: OnboardingStep[] = [
  { number: 1, label: "Bun venit", description: "Introducere" },
  { number: 2, label: "Adaugă copil", description: "Profil copil" },
  { number: 3, label: "Tur platformă", description: "Funcționalități" },
  { number: 4, label: "Quiz intro", description: "Începe testul" },
  { number: 5, label: "Finalizare", description: "Completare" },
];

export default async function ParentTourPage() {
  const _session = await requireRole("parent");

  return (
    <OnboardingLayout>
      <OnboardingProgress currentStep={3} steps={PARENT_STEPS} className="mb-8" />

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cum funcționează Yuvoo</h1>
          <p className="text-lg text-gray-600">
            Descoperă sportul potrivit pentru copilul tău în doar 3 pași simpli
          </p>
        </div>

        {/* 3-Step Process Visualization */}
        <div className="space-y-6">
          {/* Step 1: AI Coach Quiz */}
          <div className="relative">
            <div className="bg-gradient-to-br from-[#EBFFFE] to-white border-2 border-[#00BBAE] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-start gap-4">
                {/* Step Number Circle */}
                <div className="flex-shrink-0 w-12 h-12 bg-[#00BBAE] rounded-full flex items-center justify-center shadow-md">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">1. AI Coach Quiz</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Răspunde la chestionar și primești recomandări personalizate de sporturi bazate
                    pe personalitatea și interesele copilului tău.
                  </p>
                </div>
              </div>
            </div>

            {/* Arrow Down */}
            <div className="flex justify-center my-4">
              <div className="w-0.5 h-8 bg-[#00BBAE]" />
              <div className="absolute left-1/2 -translate-x-1/2 mt-6">
                <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[12px] border-t-[#00BBAE]" />
              </div>
            </div>
          </div>

          {/* Step 2: Găsești Cluburi */}
          <div className="relative">
            <div className="bg-gradient-to-br from-[#EBFFFE] to-white border-2 border-[#00BBAE] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-start gap-4">
                {/* Step Number Circle */}
                <div className="flex-shrink-0 w-12 h-12 bg-[#00BBAE] rounded-full flex items-center justify-center shadow-md">
                  <Search className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">2. Găsești Cluburi</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Explorează cluburi verificate potrivite pentru copilul tău, cu toate detaliile
                    despre program, tarife și locație.
                  </p>
                </div>
              </div>
            </div>

            {/* Arrow Down */}
            <div className="flex justify-center my-4">
              <div className="w-0.5 h-8 bg-[#00BBAE]" />
              <div className="absolute left-1/2 -translate-x-1/2 mt-6">
                <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[12px] border-t-[#00BBAE]" />
              </div>
            </div>
          </div>

          {/* Step 3: Rezervi & Probă */}
          <div className="bg-gradient-to-br from-[#EBFFFE] to-white border-2 border-[#00BBAE] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start gap-4">
              {/* Step Number Circle */}
              <div className="flex-shrink-0 w-12 h-12 bg-[#00BBAE] rounded-full flex items-center justify-center shadow-md">
                <Calendar className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">3. Rezervi & Probă</h3>
                <p className="text-gray-700 leading-relaxed">
                  Rezervă o probă gratuită și descoperiți sportul împreună. Copilul tău poate
                  încerca sportul înainte de a te angaja.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-10 bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Știai că?</h4>
              <p className="text-sm text-gray-700">
                Platforma Yuvoo te ajută să economisești timp prin filtrarea automată a cluburilor
                potrivite pentru copilul tău. Nu mai trebuie să cauți și să suni zeci de cluburi!
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8">
          <OnboardingNavigation
            backHref={routes.onboarding.parent.addChild}
            nextHref={routes.onboarding.parent.quizIntro}
            nextText="Continuă"
          />
        </div>
      </div>
    </OnboardingLayout>
  );
}
