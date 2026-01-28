/**
 * Email Collection Page
 *
 * Collects email address and location after quiz completion.
 * On submit, shows next-steps UI (check email, etc.) with CTAs to view teaser or home.
 */

import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import { getQuizResultAction } from "@/app/actions/quiz";
import { routes } from "@/lib/routes";
import EmailCollectionForm from "@/components/features/quiz/EmailCollectionForm";
import { getQuizCount } from "@/modules/quiz/quiz.repository";

interface EmailCollectionPageProps {
  params: Promise<{ quizId: string }>;
}

/**
 * Generate static params for Cache Components compatibility
 */
export async function generateStaticParams() {
  return [{ quizId: "placeholder" }];
}

/**
 * Generate metadata for email collection page
 */
export async function generateMetadata({ params }: EmailCollectionPageProps): Promise<Metadata> {
  const { quizId: _quizId } = await params;

  return {
    title: "Vezi recomandarea personalizată pentru copilul tău | Yuvoo",
    description:
      "Pe baza răspunsurilor tale, am identificat sportul cel mai potrivit. Introdu email-ul pentru a vedea imediat recomandarea personalizată.",
    robots: {
      index: false,
      follow: false,
    },
  };
}

/**
 * Email Collection Page
 *
 * Displays form to collect email address after quiz completion.
 * Public route (no authentication required).
 */
export default async function EmailCollectionPage({ params }: EmailCollectionPageProps) {
  // Access dynamic data sources first to mark route as dynamic
  const _cookies = await cookies();
  const { quizId } = await params;

  // Verify quiz exists and has recommendations
  const quizResult = await getQuizResultAction(quizId);

  if (!quizResult) {
    notFound();
  }

  const quizCount = await getQuizCount();

  return (
    <>
      <BreadcrumbOne
        title="Vezi recomandarea personalizată pentru copilul tău"
        subTitle="Email"
        items={[
          { name: "Yuvoo", url: routes.home },
          { name: "Chestionar", url: routes.quiz.intro },
          { name: "Email", url: routes.quiz.emailGate(quizId) },
        ]}
      />
      <section className="email-collection-section py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-8 col-xl-6">
              <div className="card shadow-sm border-0">
                <div className="card-body p-4 p-md-5">
                  <EmailCollectionForm quizId={quizId} quizCount={quizCount} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
