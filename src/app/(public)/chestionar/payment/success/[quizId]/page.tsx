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

  // Otherwise, show success message (webhook may still be processing)
  return (
    <>
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
                      ></i>
                    </div>
                  </div>

                  {/* Success Message */}
                  <h1 className="h3 fw-bold mb-3">Plată Reușită!</h1>
                  <p className="lead text-muted mb-4">
                    Mulțumim pentru plata ta. Raportul complet este în curs de pregătire.
                  </p>

                  {/* Polling Component - Checks for access token availability */}
                  <PaymentSuccessPolling quizId={quizId} paymentId={payment.id} />

                  {/* Instructions */}
                  <p className="text-muted small mb-4">
                    Vei primi un email cu link-ul către raportul complet în câteva momente. Poți
                    accesa raportul oricând folosind link-ul din email.
                  </p>

                  {/* Back to Quiz Link */}
                  <Link
                    href={routes.quiz.intro}
                    className="btn btn-outline-primary"
                    aria-label="Înapoi la pagina de start a chestionarului"
                  >
                    <i className="bi bi-arrow-left me-2" aria-hidden="true"></i>
                    Înapoi la Chestionar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
