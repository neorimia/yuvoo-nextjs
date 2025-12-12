/**
 * Parent Onboarding - Step 4: Quiz Introduction & CTA
 *
 * Introduces AI Coach Quiz and encourages immediate engagement.
 * Provides two options: start quiz now or go to dashboard.
 */

import { requireRole } from "@/lib/auth/session";
import {
  OnboardingLayout,
  OnboardingProgress,
  type OnboardingStep,
} from "@/components/features/onboarding";
import { db } from "@/lib/db";
import { children, onboardingProgress } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Target, Clock, CheckCircle2 } from "lucide-react";
import { completeParentOnboarding } from "@/app/actions/onboarding";

const PARENT_STEPS: OnboardingStep[] = [
  { number: 1, label: "Bun venit", description: "Introducere" },
  { number: 2, label: "Adaugă copil", description: "Profil copil" },
  { number: 3, label: "Tur platformă", description: "Funcționalități" },
  { number: 4, label: "Quiz intro", description: "Începe testul" },
  { number: 5, label: "Finalizare", description: "Completare" },
];

export default async function ParentQuizIntroPage() {
  const session = await requireRole("parent");

  // Get child name from onboarding progress
  const progress = await db.query.onboardingProgress.findFirst({
    where: eq(onboardingProgress.userId, session.dbUser.id),
  });

  let childName = "copilul tău";
  if (
    progress?.stepData &&
    typeof progress.stepData === "object" &&
    "child_id" in progress.stepData
  ) {
    const childId = progress.stepData.child_id as string;
    const child = await db.query.children.findFirst({
      where: eq(children.id, childId),
    });
    if (child) {
      childName = child.firstName;
    }
  }

  return (
    <OnboardingLayout>
      <OnboardingProgress currentStep={4} steps={PARENT_STEPS} className="mb-8" />

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#00BBAE] to-[#00998D] rounded-full mb-4 shadow-lg">
            <Target className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">🎯 AI Coach Quiz</h1>
          <p className="text-xl text-gray-700">
            Descoperă sportul potrivit pentru <strong>{childName}</strong>!
          </p>
        </div>

        {/* Benefits Section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-8 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Chestionarul personalizat te ajută:
          </h2>

          <div className="space-y-4">
            {/* Benefit 1 */}
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-6 h-6 rounded-full bg-[#EBFFFE] flex items-center justify-center mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-[#00BBAE]" />
              </div>
              <p className="text-gray-700 leading-relaxed">
                Să înțelegi <strong>personalitatea și interesele</strong> copilului
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-6 h-6 rounded-full bg-[#EBFFFE] flex items-center justify-center mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-[#00BBAE]" />
              </div>
              <p className="text-gray-700 leading-relaxed">
                Să primești <strong>recomandări de sporturi potrivite</strong>
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-6 h-6 rounded-full bg-[#EBFFFE] flex items-center justify-center mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-[#00BBAE]" />
              </div>
              <p className="text-gray-700 leading-relaxed">
                Să găsești <strong>cluburile potrivite</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Time Estimate */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <Clock className="w-5 h-5 text-[#00BBAE]" />
          <p className="text-base text-gray-600">
            ⏱️ <strong>Timp necesar:</strong> 5-7 minute
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-4">
          {/* Primary CTA - Start Quiz */}
          <form action={completeParentOnboarding.bind(null, "quiz")}>
            <button
              type="submit"
              className="
                w-full inline-flex items-center justify-center gap-3 px-8 py-4
                text-base font-semibold text-white
                bg-[#00BBAE] rounded-xl
                hover:bg-[#00998D]
                focus:outline-none focus:ring-2 focus:ring-[#00BBAE] focus:ring-offset-2
                transition-all duration-200
                shadow-md hover:shadow-lg
              "
            >
              <Target className="w-5 h-5" />
              <span>Începe Chestionarul Acum</span>
            </button>
          </form>

          {/* Secondary CTA - Go to Dashboard */}
          <form action={completeParentOnboarding.bind(null, "dashboard")}>
            <button
              type="submit"
              className="
                w-full inline-flex items-center justify-center gap-2 px-6 py-3
                text-sm font-medium text-gray-700
                bg-white border border-gray-300 rounded-xl
                hover:bg-gray-50 hover:border-gray-400
                focus:outline-none focus:ring-2 focus:ring-[#00BBAE] focus:ring-offset-2
                transition-all duration-200
              "
            >
              <span>Mai târziu, mergi la dashboard</span>
            </button>
          </form>
        </div>

        {/* Info Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Poți completa chestionarul oricând din dashboard-ul tău
          </p>
        </div>
      </div>
    </OnboardingLayout>
  );
}
