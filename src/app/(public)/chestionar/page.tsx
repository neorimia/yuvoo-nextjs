import React from "react";
import type { Metadata } from "next";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import QuizIntroContent from "@/components/features/quiz/QuizIntroContent";

export const metadata: Metadata = {
  title: "Chestionar AI - Descoperă Sportul Potrivit | Yuvoo",
  description:
    "Chestionar AI personalizat pentru recomandări de sporturi. Doar 3-4 minute, 6 întrebări simple pentru a găsi sportul perfect pentru copilul tău. Recomandări bazate pe specialiști.",
  keywords: [
    "chestionar sporturi copii",
    "AI recomandări sport",
    "sport potrivit copil",
    "test sporturi copii",
    "activități sportive copii",
    "chestionar activități copii",
  ],
  openGraph: {
    title: "Chestionar AI - Descoperă Sportul Potrivit | Yuvoo",
    description:
      "Chestionar AI personalizat pentru recomandări de sporturi. Doar 3-4 minute pentru recomandări bazate pe specialiști.",
    type: "website",
    locale: "ro_RO",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chestionar AI - Descoperă Sportul Potrivit | Yuvoo",
    description:
      "Chestionar AI personalizat pentru recomandări de sporturi. Doar 3-4 minute pentru recomandări bazate pe specialiști.",
  },
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
      <section className="quiz-intro-section py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <QuizIntroContent />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
