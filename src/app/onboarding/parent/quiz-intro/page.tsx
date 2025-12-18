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

  // During production builds, skip database queries
  const isProductionBuild = process.env.NEXT_PHASE === "phase-production-build";

  let childName = "copilul tău";

  if (!isProductionBuild) {
    // Get child name from onboarding progress (runtime only)
    const progress = await db.query.onboardingProgress.findFirst({
      where: eq(onboardingProgress.userId, session.dbUser.id),
    });

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
  }

  return (
    <OnboardingLayout>
      <OnboardingProgress currentStep={4} steps={PARENT_STEPS} className="mb-8" />

      <div className="mx-auto" style={{ maxWidth: "42rem" }}>
        {/* Header */}
        <div className="text-center mb-5">
          <div
            className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4 shadow"
            style={{
              width: "4rem",
              height: "4rem",
              background:
                "linear-gradient(to bottom right, var(--bd-theme-1), var(--bd-theme-1-hover))",
            }}
          >
            <Target className="w-8 h-8 text-white" />
          </div>
          <h1 className="display-4 fw-bold text-body mb-3">🎯 AI Coach Quiz</h1>
          <p className="h4 text-body">
            Descoperă sportul potrivit pentru <strong>{childName}</strong>!
          </p>
        </div>

        {/* Benefits Section */}
        <div className="bg-white border border-secondary rounded-3 p-5 mb-5 shadow-sm">
          <h2 className="h5 fw-semibold text-body mb-4">Chestionarul personalizat te ajută:</h2>

          <div className="mb-0">
            {/* Benefit 1 */}
            <div className="d-flex align-items-start gap-3 mb-4">
              <div
                className="rounded-circle bg-yuvoo-primary-light d-flex align-items-center justify-content-center mt-1"
                style={{ width: "1.5rem", height: "1.5rem", flexShrink: 0 }}
              >
                <CheckCircle2 className="w-4 h-4 text-yuvoo-primary" />
              </div>
              <p className="text-body mb-0" style={{ lineHeight: "1.75" }}>
                Să înțelegi <strong>personalitatea și interesele</strong> copilului
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="d-flex align-items-start gap-3 mb-4">
              <div
                className="rounded-circle bg-yuvoo-primary-light d-flex align-items-center justify-content-center mt-1"
                style={{ width: "1.5rem", height: "1.5rem", flexShrink: 0 }}
              >
                <CheckCircle2 className="w-4 h-4 text-yuvoo-primary" />
              </div>
              <p className="text-body mb-0" style={{ lineHeight: "1.75" }}>
                Să primești <strong>recomandări de sporturi potrivite</strong>
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="d-flex align-items-start gap-3">
              <div
                className="rounded-circle bg-yuvoo-primary-light d-flex align-items-center justify-content-center mt-1"
                style={{ width: "1.5rem", height: "1.5rem", flexShrink: 0 }}
              >
                <CheckCircle2 className="w-4 h-4 text-yuvoo-primary" />
              </div>
              <p className="text-body mb-0" style={{ lineHeight: "1.75" }}>
                Să găsești <strong>cluburile potrivite</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Time Estimate */}
        <div className="d-flex align-items-center justify-content-center gap-2 mb-5">
          <Clock className="w-5 h-5 text-yuvoo-primary" />
          <p className="h6 text-body mb-0">
            ⏱️ <strong>Timp necesar:</strong> 5-7 minute
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="mb-4">
          {/* Primary CTA - Start Quiz */}
          <form action={completeParentOnboarding.bind(null, "quiz")} className="mb-3">
            <button
              type="submit"
              className="w-100 d-inline-flex align-items-center justify-content-center gap-3 px-5 py-4 h6 fw-semibold text-white bg-yuvoo-primary rounded-3 text-yuvoo-primary-hover focus-yuvoo-primary shadow"
            >
              <Target className="w-5 h-5" />
              <span>Începe Chestionarul Acum</span>
            </button>
          </form>

          {/* Secondary CTA - Go to Dashboard */}
          <form action={completeParentOnboarding.bind(null, "dashboard")}>
            <button
              type="submit"
              className="w-100 d-inline-flex align-items-center justify-content-center gap-2 px-4 py-3 small fw-medium text-body bg-white border border-secondary rounded-3 text-yuvoo-primary-hover border-yuvoo-primary-hover focus-yuvoo-primary"
            >
              <span>Mai târziu, mergi la dashboard</span>
            </button>
          </form>
        </div>

        {/* Info Note */}
        <div className="mt-5 text-center">
          <p className="small text-secondary mb-0">
            Poți completa chestionarul oricând din dashboard-ul tău
          </p>
        </div>
      </div>
    </OnboardingLayout>
  );
}
