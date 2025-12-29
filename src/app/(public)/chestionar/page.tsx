import React from "react";
import type { Metadata } from "next";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import QuizIntroContent from "@/components/features/quiz/QuizIntroContent";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Chestionar AI - Descoperă Sportul Potrivit | Yuvoo",
  description:
    "Chestionar AI personalizat pentru recomandări de sporturi. Doar 3-4 minute, 6 întrebări simple pentru a găsi sportul perfect pentru copilul tău. Recomandări AI bazate pe analiza pattern-urilor și profilului copilului.",
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
      "Chestionar AI personalizat pentru recomandări de sporturi. Doar 3-4 minute pentru recomandări AI bazate pe analiza pattern-urilor și profilului copilului.",
    url: `${process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro"}/chestionar`,
    siteName: "Yuvoo",
    type: "website",
    locale: "ro_RO",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro"}/assets/img/logo/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Chestionar AI Yuvoo - Descoperă sportul potrivit pentru copilul tău",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chestionar AI - Descoperă Sportul Potrivit | Yuvoo",
    description:
      "Chestionar AI personalizat pentru recomandări de sporturi. Doar 3-4 minute pentru recomandări AI bazate pe analiza pattern-urilor și profilului copilului.",
    images: [
      `${process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro"}/assets/img/logo/og-image.jpg`,
    ],
  },
  alternates: {
    canonical: "/chestionar",
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
      <BreadcrumbOne
        title="Chestionar AI"
        subTitle="Chestionar"
        items={[
          { name: "Yuvoo", url: routes.home },
          { name: "Chestionar", url: routes.quiz.intro }, // Current page
        ]}
      />
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
