import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import QuizIntroContent from "@/components/features/quiz/QuizIntroContent";
import YuvooDefinitionBlock from "@/components/shared/YuvooDefinitionBlock";
import { routes } from "@/lib/routes";
import { getQuizCount } from "@/modules/quiz/quiz.repository";

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
 *
 * Access cookies first so the route is dynamic (avoids crypto.randomBytes-before-dynamic-data error
 * when getQuizCount hits the DB).
 */
export default async function QuizIntroPage() {
  const _cookies = await cookies();
  const quizCount = await getQuizCount();
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
          <YuvooDefinitionBlock className="pb-2 pt-0" />
          <div className="row justify-content-center mb-4">
            <div className="col-lg-10 text-center">
              <p className="small text-muted mb-2">
                Preferi să citești înainte de quiz? Explorează{" "}
                <Link
                  href={routes.guides.list}
                  className="text-yuvoo-primary text-decoration-underline"
                >
                  ghidurile pentru părinți
                </Link>{" "}
                — sport copii 6 ani, ce sport la 8 ani și altele.
              </p>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-12">
              <QuizIntroContent quizCount={quizCount} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
