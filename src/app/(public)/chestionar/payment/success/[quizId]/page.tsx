/**
 * Payment Success Page
 *
 * Displays success message after successful payment.
 * Redirects to report page if access token is available.
 */

import React from "react";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import { getQuizResultAction } from "@/app/actions/quiz";
import { getPaymentByQuizId } from "@/modules/payments/payments.repository";
import { getReportAccessByPaymentId } from "@/modules/payments/payments.repository";
import { routes } from "@/lib/routes";
import Link from "next/link";
import PaymentSuccessPolling from "@/components/features/payments/PaymentSuccessPolling";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import StripStripeParamsFromUrl from "@/components/features/payments/StripStripeParamsFromUrl";

interface PaymentSuccessPageProps {
  params: Promise<{ quizId: string }>;
}

/**
 * Generate static params for Cache Components compatibility
 */
export async function generateStaticParams() {
  return [{ quizId: "placeholder" }];
}

/**
 * Generate metadata for payment success page
 */
export async function generateMetadata({ params }: PaymentSuccessPageProps): Promise<Metadata> {
  const { quizId: _quizId } = await params;

  return {
    title: "Plată Reușită - Yuvoo",
    description: "Plata ta a fost procesată cu succes. Accesează acum raportul complet.",
    robots: {
      index: false,
      follow: false,
    },
  };
}

/**
 * Payment Success Page
 *
 * Displays success message and redirects to report if available.
 */
export default async function PaymentSuccessPage({ params }: PaymentSuccessPageProps) {
  // Access dynamic data sources first to mark route as dynamic
  const _cookies = await cookies();
  const { quizId } = await params;

  // Verify quiz exists
  const quizResult = await getQuizResultAction(quizId);
  if (!quizResult) {
    notFound();
  }

  // Get payment status
  const payment = await getPaymentByQuizId(quizId);

  if (!payment) {
    // No payment found - redirect to paywall
    redirect(routes.quiz.paywall(quizId));
  }

  if (payment.status !== "completed") {
    // Payment not completed - redirect to paywall
    redirect(routes.quiz.paywall(quizId));
  }

  // Get report access token (webhook may still be processing)
  const reportAccess = await getReportAccessByPaymentId(payment.id);

  // If report access exists, redirect to report page
  if (reportAccess?.accessToken) {
    redirect(routes.quiz.report(reportAccess.accessToken));
  }

  // Fallback when React error occurs (e.g. hook mismatch after Stripe redirect)
  const paymentSuccessFallback = (
    <div className="card-body p-5 text-center">
      <div className="mb-4">
        <div
          className="rounded-circle bg-success bg-opacity-10 d-inline-flex align-items-center justify-content-center"
          style={{ width: "80px", height: "80px" }}
          role="img"
          aria-label="Plată reușită"
        >
          <i
            className="bi bi-check-circle-fill text-success"
            style={{ fontSize: "3rem" }}
            aria-hidden="true"
          />
        </div>
      </div>
      <h1 className="h3 fw-bold mb-3">Plată Reușită!</h1>
      <p className="lead text-muted mb-4">
        Mulțumim pentru plata ta! Verifică email-ul pentru link-ul permanent către raportul complet.
        Poți accesa raportul oricând folosind link-ul din email.
      </p>
      <Link href={routes.quiz.intro} className="btn btn-primary">
        <i className="bi bi-arrow-right me-2" aria-hidden="true" />
        Înapoi la Chestionar
      </Link>
    </div>
  );

  // Otherwise, show success message (webhook may still be processing)
  return (
    <>
      <StripStripeParamsFromUrl />
      <BreadcrumbOne
        title="Plată Reușită"
        subTitle="Succes"
        items={[
          { name: "Yuvoo", url: routes.home },
          { name: "Chestionar", url: routes.quiz.intro },
          { name: "Plată Reușită", url: routes.quiz.paymentSuccess(quizId) },
        ]}
      />
      <section className="payment-success-section py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-8 col-xl-6">
              <div className="card shadow-lg border-0 text-center">
                <ErrorBoundary fallback={paymentSuccessFallback}>
                  <div className="card-body p-5">
                    {/* Success Icon */}
                    <div className="mb-4">
                      <div
                        className="rounded-circle bg-success bg-opacity-10 d-inline-flex align-items-center justify-content-center"
                        style={{ width: "80px", height: "80px" }}
                        role="img"
                        aria-label="Plată reușită"
                      >
                        <i
                          className="bi bi-check-circle-fill text-success"
                          style={{ fontSize: "3rem" }}
                          aria-hidden="true"
                        />
                      </div>
                    </div>

                    {/* Success Message */}
                    <h1 className="h3 fw-bold mb-3">Plată Reușită!</h1>
                    <p className="lead text-muted mb-4">
                      Mulțumim pentru plata ta! Raportul complet personalizat pentru copilul tău
                      este în curs de pregătire și va fi disponibil imediat.
                    </p>

                    {/* Value Obtained */}
                    <div className="alert alert-info mb-4" role="alert">
                      <i className="bi bi-check-circle-fill me-2" aria-hidden="true" />
                      <strong>Ai acces la:</strong> Raportul complet personalizat, acces permanent
                      pentru 10 ani și opțiunea de a descărca PDF-ul.
                    </div>

                    {/* Polling Component - Checks for access token availability */}
                    <PaymentSuccessPolling quizId={quizId} paymentId={payment.id} />

                    {/* Instructions */}
                    <p className="text-muted small mb-0">
                      Vei primi un email cu link-ul permanent către raportul complet în câteva
                      momente. Raportul se va deschide automat când este gata — poți accesa raportul
                      oricând folosind link-ul din email.
                    </p>
                  </div>
                </ErrorBoundary>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
