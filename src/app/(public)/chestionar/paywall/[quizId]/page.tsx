/**
 * Paywall Page
 *
 * Displays pricing and payment form for unlocking full report.
 * Integrates with Stripe for secure payment processing.
 */

import React from "react";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
import { connection } from "next/server";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import { getQuizResultAction } from "@/app/actions/quiz";
import {
  getPaymentByQuizId,
  getReportAccessByPaymentId,
} from "@/modules/payments/payments.repository";
import { getQuizCount, getQuizEmail } from "@/modules/quiz/quiz.repository";
import { routes } from "@/lib/routes";
import { PaymentErrorBoundary } from "@/components/shared/ErrorBoundary";
import PaymentFormWrapper from "@/components/features/payments/PaymentFormWrapper";
import { trackEventServer } from "@/lib/analytics/tracking-server";
import { PostHogEvents, PostHogProperties } from "@/lib/analytics/events";
import { PAYMENT_AMOUNT_LEI } from "@/modules/payments/payments.service";

interface PaywallPageProps {
  params: Promise<{ quizId: string }>;
}

/**
 * Note: With Cache Components enabled, routes are dynamic by default.
 * We access dynamic data sources (connection, cookies, headers, params) at the
 * start of both generateMetadata and the component to mark this route as dynamic
 * and prevent crypto.randomUUID() errors.
 */

/**
 * Generate static params for Cache Components compatibility
 */
export async function generateStaticParams() {
  return [{ quizId: "placeholder" }];
}

/**
 * Generate metadata for paywall page
 */
export async function generateMetadata({ params }: PaywallPageProps): Promise<Metadata> {
  // Access params first to mark route as dynamic
  const { quizId } = await params;
  const isProductionBuild = process.env.NEXT_PHASE === "phase-production-build";

  // During build with placeholder, return static metadata
  if (isProductionBuild && quizId === "placeholder") {
    return {
      title: "Obține Raportul Complet - Tot ce trebuie să știi | Yuvoo",
      description: `Obține raportul complet personalizat cu tot ce trebuie să știi pentru a alege sportul potrivit pentru copilul tău. ${PAYMENT_AMOUNT_LEI} lei, plată unică, fără abonament.`,
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  // At runtime, access dynamic data sources to mark route as dynamic
  await connection();
  await cookies();
  await headers();

  return {
    title: "Deblochează Raportul Complet | Yuvoo",
    description: `Deblochează raportul complet cu recomandările personalizate pentru ${PAYMENT_AMOUNT_LEI} lei (plată unică, fără abonament).`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

/**
 * Paywall Page
 *
 * Displays pricing and payment form.
 * Public route (no authentication required).
 */
export default async function PaywallPage({ params }: PaywallPageProps) {
  const { quizId } = await params;
  const isProductionBuild = process.env.NEXT_PHASE === "phase-production-build";

  // During build, render placeholder for placeholder quiz ID
  if (isProductionBuild && quizId === "placeholder") {
    return (
      <>
        <BreadcrumbOne
          title="Obține Raportul Complet - Tot ce trebuie să știi"
          subTitle="Plată"
          titleAs="p"
          items={[
            { name: "Yuvoo", url: routes.home },
            { name: "Chestionar", url: routes.quiz.intro },
            { name: "Plată", url: routes.quiz.paywall(quizId) },
          ]}
        />
        <section className="paywall-section py-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-10 col-xl-8">
                <div className="text-center">
                  <h1 className="display-5 fw-bold mb-3">
                    Obține Raportul Complet - Tot ce trebuie să știi pentru a alege sportul potrivit
                  </h1>
                  <p className="text-muted">Build placeholder</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  // At runtime, access dynamic data sources to mark route as dynamic
  await connection();
  await cookies();
  await headers();

  // Fetch quiz results
  const quizResult = await getQuizResultAction(quizId);

  if (!quizResult) {
    notFound();
  }

  // Verify quiz has recommendations
  if (!quizResult.recommendations || quizResult.recommendations.length === 0) {
    notFound();
  }

  const quizEmail = await getQuizEmail(quizId);
  if (!quizEmail) {
    redirect(routes.quiz.emailGate(quizId));
  }

  // Check if payment already completed
  const existingPayment = await getPaymentByQuizId(quizId);
  const isAlreadyPaid = existingPayment?.status === "completed";

  if (isAlreadyPaid && existingPayment) {
    const reportAccess = await getReportAccessByPaymentId(existingPayment.id);
    if (reportAccess?.accessToken) {
      redirect(routes.quiz.report(reportAccess.accessToken));
    }
    redirect(routes.quiz.paymentSuccess(quizId));
  }

  // Get quiz count for social proof
  const quizCount = await getQuizCount();

  // Track paywall view
  try {
    await trackEventServer(PostHogEvents.PAYWALL_VIEWED, {
      distinctId: "anonymous",
      [PostHogProperties.QUIZ_ID]: quizId,
      [PostHogProperties.PAYMENT_AMOUNT]: PAYMENT_AMOUNT_LEI * 100,
    });
  } catch (error) {
    console.error("[Paywall Page] Error tracking event:", error);
  }

  return (
    <>
      <BreadcrumbOne
        title="Obține Raportul Complet - Tot ce trebuie să știi"
        subTitle="Plată"
        titleAs="p"
        items={[
          { name: "Yuvoo", url: routes.home },
          { name: "Chestionar", url: routes.quiz.intro },
          { name: "Plată", url: routes.quiz.paywall(quizId) },
        ]}
      />
      <section className="paywall-section py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-8">
              {/* Header */}
              <div className="text-center mb-4">
                <h1 className="display-5 fw-bold mb-3">Deblochează Raportul Complet</h1>
                <p className="lead text-muted">
                  Am identificat sportul potrivit pentru copilul tău. Pentru a înțelege de ce este
                  potrivit și ce pași să urmezi mai departe, deblochează raportul complet.
                </p>
              </div>

              {/* Pricing Card */}
              <div className="card shadow-lg border-0 mb-4 border-top border-5 border-yuvoo-primary">
                <div className="card-body p-4 p-md-5">
                  <div className="text-center mb-4">
                    <div className="mb-3">
                      <span className="display-4 fw-bold text-yuvoo-primary">
                        {PAYMENT_AMOUNT_LEI} lei
                      </span>
                      <p className="text-muted small mt-2 mb-0">
                        (echivalentul unei cărți sau a unei ore de activitate)
                      </p>
                    </div>
                    <p className="text-muted mb-2">
                      <i
                        className="bi bi-check-circle-fill text-success me-2"
                        aria-hidden="true"
                      ></i>
                      Plată unică
                    </p>
                    <p className="text-muted mb-2">
                      <i
                        className="bi bi-check-circle-fill text-success me-2"
                        aria-hidden="true"
                      ></i>
                      Fără abonament
                    </p>
                    <p className="text-muted mb-0">
                      <i
                        className="bi bi-check-circle-fill text-success me-2"
                        aria-hidden="true"
                      ></i>
                      Acces permanent
                    </p>
                  </div>
                </div>
              </div>

              {/* Value Proposition - Economy */}
              <div className="card bg-light border-0 mb-4">
                <div className="card-body p-3 text-center">
                  <p className="text-muted mb-0">
                    <i className="bi bi-piggy-bank text-success me-2" aria-hidden="true"></i>
                    <strong>Economisește timp și bani:</strong> Evită consultații costisitoare și
                    ore de cercetare manuală
                  </p>
                </div>
              </div>

              {/* Social Proof */}
              {quizCount >= 100 && (
                <div className="text-center mb-4">
                  <p className="text-muted small mb-0">
                    <i className="bi bi-people-fill text-yuvoo-primary me-2" aria-hidden="true"></i>
                    Peste {quizCount.toLocaleString("ro-RO")} părinți au folosit deja serviciul
                    nostru pentru a găsi sportul potrivit
                  </p>
                </div>
              )}

              {/* What's Included */}
              <div className="card bg-light border-0 mb-4">
                <div className="card-body p-4">
                  <h3 className="h5 mb-3">Ce include raportul complet:</h3>
                  <div className="row g-md-3">
                    <div className="col-12">
                      <ul className="list-unstyled mb-0">
                        <li className="mb-2">
                          <i
                            className="bi bi-check-circle-fill text-success me-2"
                            aria-hidden="true"
                          ></i>
                          Top 2-3 sporturi potrivite pentru copilul tău, cu explicații detaliate
                          despre de ce fiecare este o alegere bună
                        </li>
                        <li className="mb-2">
                          <i
                            className="bi bi-check-circle-fill text-success me-2"
                            aria-hidden="true"
                          ></i>
                          Explicații detaliate despre de ce aceste sporturi sunt potrivite
                        </li>
                        <li className="mb-2">
                          <i
                            className="bi bi-check-circle-fill text-success me-2"
                            aria-hidden="true"
                          ></i>
                          Beneficii fizice și emoționale pentru fiecare sport
                        </li>
                        <li className="mb-2">
                          <i
                            className="bi bi-check-circle-fill text-success me-2"
                            aria-hidden="true"
                          ></i>
                          Sporturi de evitat momentan
                        </li>
                        <li className="mb-2">
                          <i
                            className="bi bi-check-circle-fill text-success me-2"
                            aria-hidden="true"
                          ></i>
                          Vârsta ideală pentru început
                        </li>
                        <li className="mb-2">
                          <i
                            className="bi bi-check-circle-fill text-success me-2"
                            aria-hidden="true"
                          ></i>
                          Pașii următori recomandați
                        </li>
                        <li className="mb-2">
                          <i
                            className="bi bi-check-circle-fill text-success me-2"
                            aria-hidden="true"
                          ></i>
                          Sugestii de cluburi locale
                        </li>
                        <li className="mb-2">
                          <i
                            className="bi bi-check-circle-fill text-success me-2"
                            aria-hidden="true"
                          ></i>
                          Acces permanent + PDF descărcabil
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Post-Payment Process */}
              <div className="alert alert-success mb-4" role="alert">
                <i className="bi bi-check-circle-fill me-2" aria-hidden="true"></i>
                <strong>După plată:</strong> Vei primi imediat accesul la raportul complet + un
                email cu link permanent. Raportul este tău pentru 10 ani.
              </div>

              {/* Payment Form */}
              <div className="card shadow-sm border-0 mb-4">
                <div className="card-body p-4 p-md-5">
                  <h3 className="h5 mb-4">Detalii de plată</h3>
                  <PaymentErrorBoundary>
                    <PaymentFormWrapper quizId={quizId} />
                  </PaymentErrorBoundary>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="text-center">
                <div className="row g-3 mb-4">
                  <div className="col-12 col-md-4">
                    <div className="d-flex flex-column align-items-center">
                      <i
                        className="bi bi-shield-check text-success mb-2"
                        style={{ fontSize: "1.5rem" }}
                        aria-hidden="true"
                      ></i>
                      <small className="text-muted">
                        Plată securizată prin Stripe (standard industrie)
                      </small>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="d-flex flex-column align-items-center">
                      <i
                        className="bi bi-arrow-counterclockwise text-yuvoo-primary mb-2"
                        style={{ fontSize: "1.5rem" }}
                        aria-hidden="true"
                      ></i>
                      <small className="text-muted">Fără costuri ascunse</small>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="d-flex flex-column align-items-center">
                      <i
                        className="bi bi-clock-history text-warning mb-2"
                        style={{ fontSize: "1.5rem" }}
                        aria-hidden="true"
                      ></i>
                      <small className="text-muted">Acces instant</small>
                    </div>
                  </div>
                </div>
                <p className="text-muted small mb-0">
                  Prin continuare, confirmi că ai citit{" "}
                  <a
                    href={routes.terms}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none"
                  >
                    Termenii și condițiile
                  </a>{" "}
                  și{" "}
                  <a
                    href={routes.privacy}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none"
                  >
                    Politica de confidențialitate
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
