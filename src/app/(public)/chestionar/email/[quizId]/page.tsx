/**
 * Email Collection Page
 *
 * Collects email address after quiz completion.
 * Redirects to teaser page after email submission.
 */

import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import { getQuizResultAction } from "@/app/actions/quiz";
import { routes } from "@/lib/routes";
import EmailCollectionForm from "@/components/features/quiz/EmailCollectionForm";

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
    title: "Completează pentru a vedea recomandarea | Yuvoo",
    description:
      "Introdu email-ul tău pentru a primi recomandarea personalizată de sport pentru copilul tău.",
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

  // Check if quiz already has email (already collected)
  // If email exists, redirect to teaser page
  // Note: We'll check this in the form component or handle redirect here

  return (
    <>
      <BreadcrumbOne
        title="Completează pentru a vedea recomandarea"
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
                  {/* Header */}
                  <div className="text-center mb-4">
                    <div className="mb-3">
                      <i
                        className="bi bi-envelope-check text-success"
                        style={{ fontSize: "3rem" }}
                        aria-hidden="true"
                      ></i>
                    </div>
                    <h1 className="h3 fw-bold mb-3">Completează pentru a vedea recomandarea</h1>
                    <p className="text-muted mb-0">
                      Am analizat răspunsurile tale și am identificat sportul potrivit pentru
                      copilul tău. Introdu email-ul tău pentru a primi recomandarea personalizată.
                    </p>
                  </div>

                  {/* Email Collection Form */}
                  <EmailCollectionForm quizId={quizId} />

                  {/* Trust Indicators */}
                  <div className="mt-4 pt-4 border-top">
                    <div className="row g-3 text-center">
                      <div className="col-12 col-md-4">
                        <div className="d-flex flex-column align-items-center">
                          <i
                            className="bi bi-shield-check text-success mb-2"
                            style={{ fontSize: "1.5rem" }}
                            aria-hidden="true"
                          ></i>
                          <small className="text-muted">Confidențialitate garantată</small>
                        </div>
                      </div>
                      <div className="col-12 col-md-4">
                        <div className="d-flex flex-column align-items-center">
                          <i
                            className="bi bi-clock text-primary mb-2"
                            style={{ fontSize: "1.5rem" }}
                            aria-hidden="true"
                          ></i>
                          <small className="text-muted">Rezultate instant</small>
                        </div>
                      </div>
                      <div className="col-12 col-md-4">
                        <div className="d-flex flex-column align-items-center">
                          <i
                            className="bi bi-gift text-warning mb-2"
                            style={{ fontSize: "1.5rem" }}
                            aria-hidden="true"
                          ></i>
                          <small className="text-muted">Recomandare gratuită</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
