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

      <div className="mx-auto" style={{ maxWidth: "42rem" }}>
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-body mb-4">Cum funcționează Yuvoo</h1>
          <p className="h5 text-body">
            Descoperă sportul potrivit pentru copilul tău în doar 3 pași simpli
          </p>
        </div>

        {/* 3-Step Process Visualization */}
        <div className="mb-0">
          {/* Step 1: AI Coach Quiz */}
          <div className="position-relative mb-4">
            <div
              className="border-2 border-yuvoo-primary rounded-3 p-4 shadow text-yuvoo-primary-hover"
              style={{
                background: "linear-gradient(to bottom right, var(--bd-theme-1-light), white)",
                transition: "box-shadow 0.3s ease-in-out",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "";
              }}
            >
              <div className="d-flex align-items-start gap-4">
                {/* Step Number Circle */}
                <div
                  className="rounded-circle bg-yuvoo-primary d-flex align-items-center justify-content-center shadow"
                  style={{ width: "3rem", height: "3rem", flexShrink: 0 }}
                >
                  <Sparkles className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <div className="flex-fill">
                  <h3 className="h4 fw-bold text-body mb-2">1. AI Coach Quiz</h3>
                  <p className="text-body mb-0" style={{ lineHeight: "1.75" }}>
                    Răspunde la chestionar și primești recomandări personalizate de sporturi bazate
                    pe personalitatea și interesele copilului tău.
                  </p>
                </div>
              </div>
            </div>

            {/* Arrow Down */}
            <div className="d-flex justify-content-center my-4">
              <div className="bg-yuvoo-primary" style={{ width: "2px", height: "2rem" }} />
              <div
                className="position-absolute start-50 translate-middle-x"
                style={{ marginTop: "1.5rem" }}
              >
                <div
                  style={{
                    width: 0,
                    height: 0,
                    borderLeft: "0.5rem solid transparent",
                    borderRight: "0.5rem solid transparent",
                    borderTop: "0.75rem solid var(--bd-theme-1)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Step 2: Găsești Cluburi */}
          <div className="position-relative mb-4">
            <div
              className="border-2 border-yuvoo-primary rounded-3 p-4 shadow text-yuvoo-primary-hover"
              style={{
                background: "linear-gradient(to bottom right, var(--bd-theme-1-light), white)",
                transition: "box-shadow 0.3s ease-in-out",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "";
              }}
            >
              <div className="d-flex align-items-start gap-4">
                {/* Step Number Circle */}
                <div
                  className="rounded-circle bg-yuvoo-primary d-flex align-items-center justify-content-center shadow"
                  style={{ width: "3rem", height: "3rem", flexShrink: 0 }}
                >
                  <Search className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <div className="flex-fill">
                  <h3 className="h4 fw-bold text-body mb-2">2. Găsești Cluburi</h3>
                  <p className="text-body mb-0" style={{ lineHeight: "1.75" }}>
                    Explorează cluburi verificate potrivite pentru copilul tău, cu toate detaliile
                    despre program, tarife și locație.
                  </p>
                </div>
              </div>
            </div>

            {/* Arrow Down */}
            <div className="d-flex justify-content-center my-4">
              <div className="bg-yuvoo-primary" style={{ width: "2px", height: "2rem" }} />
              <div
                className="position-absolute start-50 translate-middle-x"
                style={{ marginTop: "1.5rem" }}
              >
                <div
                  style={{
                    width: 0,
                    height: 0,
                    borderLeft: "0.5rem solid transparent",
                    borderRight: "0.5rem solid transparent",
                    borderTop: "0.75rem solid var(--bd-theme-1)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Step 3: Rezervi & Probă */}
          <div
            className="border-2 border-yuvoo-primary rounded-3 p-4 shadow text-yuvoo-primary-hover"
            style={{
              background: "linear-gradient(to bottom right, var(--bd-theme-1-light), white)",
              transition: "box-shadow 0.3s ease-in-out",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "";
            }}
          >
            <div className="d-flex align-items-start gap-4">
              {/* Step Number Circle */}
              <div
                className="rounded-circle bg-yuvoo-primary d-flex align-items-center justify-content-center shadow"
                style={{ width: "3rem", height: "3rem", flexShrink: 0 }}
              >
                <Calendar className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <div className="flex-fill">
                <h3 className="h4 fw-bold text-body mb-2">3. Rezervi & Probă</h3>
                <p className="text-body mb-0" style={{ lineHeight: "1.75" }}>
                  Rezervă o probă gratuită și descoperiți sportul împreună. Copilul tău poate
                  încerca sportul înainte de a te angaja.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-5 bg-white border-2 border-secondary rounded-3 p-4">
          <div className="d-flex align-items-start gap-3">
            <span style={{ fontSize: "1.5rem" }}>💡</span>
            <div>
              <h4 className="fw-semibold text-body mb-2">Știai că?</h4>
              <p className="small text-body mb-0">
                Platforma Yuvoo te ajută să economisești timp prin filtrarea automată a cluburilor
                potrivite pentru copilul tău. Nu mai trebuie să cauți și să suni zeci de cluburi!
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-5">
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
