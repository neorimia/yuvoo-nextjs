/**
 * Payment Failure Page
 *
 * Displays error message after failed payment.
 * Allows user to retry payment.
 */

import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import { getQuizResultAction } from "@/app/actions/quiz";
import { routes } from "@/lib/routes";
import Link from "next/link";

interface PaymentFailurePageProps {
  params: Promise<{ quizId: string }>;
  searchParams: Promise<{ error?: string }>;
}

/**
 * Generate static params for Cache Components compatibility
 */
export async function generateStaticParams() {
  return [{ quizId: "placeholder" }];
}

/**
 * Generate metadata for payment failure page
 */
export async function generateMetadata({ params }: PaymentFailurePageProps): Promise<Metadata> {
  const { quizId: _quizId } = await params;

  return {
    title: "Plată Eșuată - Yuvoo",
    description: "Plata nu a putut fi procesată. Te rugăm să încerci din nou.",
    robots: {
      index: false,
      follow: false,
    },
  };
}

/**
 * Payment Failure Page
 *
 * Displays error message and allows retry.
 */
export default async function PaymentFailurePage({
  params,
  searchParams,
}: PaymentFailurePageProps) {
  // Access dynamic data sources first to mark route as dynamic
  const _cookies = await cookies();
  const { quizId } = await params;
  const { error } = await searchParams;

  // Verify quiz exists
  const quizResult = await getQuizResultAction(quizId);
  if (!quizResult) {
    notFound();
  }

  // Get error message
  const errorMessage =
    error ||
    "Plata nu a putut fi procesată. Te rugăm să verifici datele cardului și să încerci din nou.";

  return (
    <>
      <BreadcrumbOne
        title="Plată Eșuată"
        subTitle="Eroare"
        titleAs="p"
        items={[
          { name: "Yuvoo", url: routes.home },
          { name: "Chestionar", url: routes.quiz.intro },
          { name: "Plată Eșuată", url: routes.quiz.paymentFailure(quizId) },
        ]}
      />
      <section className="payment-failure-section py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-8 col-xl-6">
              <div className="card shadow-lg border-0 text-center">
                <div className="card-body p-5">
                  {/* Error Icon */}
                  <div className="mb-4">
                    <div
                      className="rounded-circle bg-danger bg-opacity-10 d-inline-flex align-items-center justify-content-center"
                      style={{ width: "80px", height: "80px" }}
                      role="img"
                      aria-label="Plată eșuată"
                    >
                      <i
                        className="bi bi-x-circle-fill text-danger"
                        style={{ fontSize: "3rem" }}
                        aria-hidden="true"
                      ></i>
                    </div>
                  </div>

                  {/* Error Message */}
                  <h1 className="h3 fw-bold mb-3">Plată Eșuată</h1>
                  <div className="alert alert-danger mb-4" role="alert" aria-live="polite">
                    <i className="bi bi-exclamation-triangle me-2" aria-hidden="true"></i>
                    {errorMessage}
                  </div>

                  {/* Common Reasons */}
                  <div className="text-start mb-4">
                    <h4 className="h6 mb-3">Posibile motive:</h4>
                    <ul className="list-unstyled mb-0">
                      <li className="mb-2">
                        <i className="bi bi-dash-circle text-muted me-2" aria-hidden="true"></i>
                        Fonduri insuficiente pe card
                      </li>
                      <li className="mb-2">
                        <i className="bi bi-dash-circle text-muted me-2" aria-hidden="true"></i>
                        Date card invalide sau expirate
                      </li>
                      <li className="mb-2">
                        <i className="bi bi-dash-circle text-muted me-2" aria-hidden="true"></i>
                        Limită de tranzacție depășită
                      </li>
                      <li className="mb-2">
                        <i className="bi bi-dash-circle text-muted me-2" aria-hidden="true"></i>
                        Problema temporară cu banca emitentă
                      </li>
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="d-grid gap-2">
                    <Link
                      href={routes.quiz.paywall(quizId)}
                      className="btn btn-primary btn-lg"
                      aria-label="Încearcă din nou să completezi plata"
                    >
                      <i className="bi bi-arrow-clockwise me-2" aria-hidden="true"></i>
                      Încearcă Din Nou
                    </Link>
                    <Link
                      href={routes.quiz.intro}
                      className="btn btn-outline-secondary"
                      aria-label="Înapoi la pagina de start a chestionarului"
                    >
                      <i className="bi bi-arrow-left me-2" aria-hidden="true"></i>
                      Înapoi la Chestionar
                    </Link>
                  </div>

                  {/* Support */}
                  <div className="mt-4 pt-4 border-top">
                    <p className="text-muted small mb-2">
                      Dacă problema persistă, te rugăm să ne contactezi:
                    </p>
                    <a
                      href="mailto:support@yuvoo.com"
                      className="text-decoration-none"
                      aria-label="Trimite email la support@yuvoo.com"
                    >
                      <i className="bi bi-envelope me-2" aria-hidden="true"></i>
                      support@yuvoo.com
                    </a>
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
