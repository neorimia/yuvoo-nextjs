import React from "react";
import type { Metadata } from "next";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";

export const metadata: Metadata = {
  title: "Chestionar AI - Yuvoo",
  description:
    "Descoperă sportul potrivit pentru copilul tău cu ajutorul chestionarului nostru AI. Răspunde la câteva întrebări și primește recomandări personalizate.",
};

/**
 * Quiz Intro Page
 *
 * Public page introducing the AI Coach Quiz.
 * SEO-friendly route: /chestionar
 */
export default function QuizIntroPage() {
  return (
    <>
      <BreadcrumbOne title="Chestionar AI" subTitle="Chestionar" />
      <section className="bd-quiz-intro-area pt-120 pb-70">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10">
              <div className="bd-quiz-intro-content text-center">
                <h1 className="bd-section-title mb-30">Chestionar AI pentru Sporturi</h1>
                <p className="mb-40">
                  Descoperă sportul potrivit pentru copilul tău cu ajutorul chestionarului nostru
                  AI. Răspunde la câteva întrebări despre copilul tău și primește recomandări
                  personalizate.
                </p>
                {/* TODO: Add quiz intro component */}
                <div className="bd-quiz-intro-placeholder">
                  <p>Componenta de introducere a chestionarului va fi adăugată aici.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
