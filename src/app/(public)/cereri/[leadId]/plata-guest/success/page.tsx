/**
 * Guest Payment Success Page
 *
 * Public page displaying parent contact information after successful guest payment.
 * No authentication required.
 * Route: /cereri/[leadId]/plata-guest/success
 *
 * Note: This is a dynamic route that depends on params and searchParams, so we don't use "use cache" directive.
 */

import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getGuestPaymentSuccessData } from "@/app/actions/guest-lead-payments";
import { routes } from "@/lib/routes";
import StripStripeParamsFromUrl from "@/components/features/payments/StripStripeParamsFromUrl";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";

interface GuestPaymentSuccessPageProps {
  params: Promise<{
    leadId: string;
  }>;
  searchParams: Promise<{
    payment_intent?: string;
  }>;
}

/**
 * Generate static params - returns placeholder to satisfy Cache Components requirement
 */
export async function generateStaticParams() {
  return [{ leadId: "placeholder-lead-id" }];
}

export async function generateMetadata({
  params,
}: GuestPaymentSuccessPageProps): Promise<Metadata> {
  // Access params to mark as dynamic
  await params;
  return {
    title: `Plată confirmată - Yuvoo`,
    description: "Informații de contact părinte.",
  };
}

export default async function GuestPaymentSuccessPage({
  params,
  searchParams,
}: GuestPaymentSuccessPageProps) {
  const { leadId } = await params;
  const isProductionBuild = process.env.NEXT_PHASE === "phase-production-build";

  // During build, render placeholder for placeholder lead ID
  if (isProductionBuild && leadId === "placeholder-lead-id") {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card">
              <div className="card-body text-center py-5">
                <h2 className="mb-3">Plată confirmată</h2>
                <p className="text-muted">Build placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { payment_intent } = await searchParams;

  // Require payment intent ID
  if (!payment_intent) {
    redirect(routes.leads.guestPayment(leadId));
  }

  // Fetch payment success data
  const result = await getGuestPaymentSuccessData(leadId, payment_intent);

  if (!result.success || !result.lead || !result.club) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-danger">
              <div className="card-body text-center py-5">
                <i
                  className="bi bi-exclamation-triangle-fill text-danger"
                  style={{ fontSize: "3rem" }}
                ></i>
                <h2 className="mt-3 mb-3">Eroare</h2>
                <p className="text-muted">
                  {result.error || "Plata nu a fost găsită sau nu a fost finalizată."}
                </p>
                <a href={routes.leads.guestPayment(leadId)} className="btn btn-primary mt-3">
                  Înapoi la plată
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { lead, club } = result;

  const guestSuccessFallback = (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body text-center py-5">
              <i
                className="bi bi-check-circle-fill text-success"
                style={{ fontSize: "3rem" }}
                aria-hidden
              />
              <h2 className="mt-3 mb-3">Plată confirmată</h2>
              <p className="text-muted mb-4">
                Mulțumim pentru plată. Vei primi informațiile de contact pe email.
              </p>
              <Link href={routes.leads.guestPayment(leadId)} className="btn btn-primary">
                Înapoi la cerere
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <StripStripeParamsFromUrl />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <ErrorBoundary fallback={guestSuccessFallback}>
              <div className="bd-guest-payment-success">
                {/* Success Header */}
                <div className="text-center mb-5">
                  <i
                    className="bi bi-check-circle-fill text-success"
                    style={{ fontSize: "4rem" }}
                  ></i>
                  <h1 className="mt-3 mb-2">Plată confirmată!</h1>
                  <p className="text-muted">
                    Mulțumim pentru plata de <strong>3€</strong> pentru cererea de{" "}
                    <strong>{lead.sportType || "sport"}</strong> pentru clubul{" "}
                    <strong>{club.name}</strong>.
                  </p>
                  <p className="text-muted">
                    Vei primi informațiile de contact pe email. Mai jos găsești detaliile
                    părintelui.
                  </p>
                </div>

                <div className="row">
                  {/* Parent Contact Information */}
                  <div className="col-lg-8">
                    <div className="card mb-4">
                      <div className="card-header bg-primary text-white">
                        <h5 className="mb-0">
                          <i className="bi bi-person-circle me-2"></i>
                          Informații părinte
                        </h5>
                      </div>
                      <div className="card-body">
                        <div className="row mb-3">
                          <div className="col-md-6">
                            <strong>Nume:</strong>
                            <p className="mb-0">{lead.parentName}</p>
                          </div>
                          <div className="col-md-6">
                            <strong>Email:</strong>
                            <p className="mb-0">
                              <a href={`mailto:${lead.parentEmail}`}>{lead.parentEmail}</a>
                            </p>
                          </div>
                        </div>
                        {lead.parentPhone && (
                          <div className="row mb-3">
                            <div className="col-md-6">
                              <strong>Telefon:</strong>
                              <p className="mb-0">
                                <a href={`tel:${lead.parentPhone}`}>{lead.parentPhone}</a>
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Child Details */}
                    <div className="card mb-4">
                      <div className="card-header">
                        <h5 className="mb-0">
                          <i className="bi bi-info-circle me-2"></i>
                          Detalii copil
                        </h5>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <strong>Vârstă:</strong>
                            <p className="mb-0">
                              {lead.childAge} {lead.childAge === 1 ? "an" : "ani"}
                            </p>
                          </div>
                          <div className="col-md-6 mb-3">
                            <strong>Sport:</strong>
                            <p className="mb-0">{lead.sportType || "N/A"}</p>
                          </div>
                        </div>
                        {lead.message && (
                          <div className="mb-3">
                            <strong>Mesaj:</strong>
                            <p className="mb-0">{lead.message}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="col-lg-4">
                    <div className="card">
                      <div className="card-header bg-success text-white">
                        <h5 className="mb-0">
                          <i className="bi bi-check-circle me-2"></i>
                          Ce să faci acum?
                        </h5>
                      </div>
                      <div className="card-body">
                        <ul className="list-unstyled mb-0">
                          <li className="mb-3">
                            <i className="bi bi-envelope-fill text-yuvoo-primary me-2"></i>
                            Contactează părintele pe email sau telefon
                          </li>
                          <li className="mb-3">
                            <i className="bi bi-clock-fill text-warning me-2"></i>
                            Contactează cât mai curând - cererile expiră după 5 zile
                          </li>
                          <li className="mb-0">
                            <i className="bi bi-info-circle-fill text-info me-2"></i>
                            Vei primi și un email cu aceste informații
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="card mt-4 border-success">
                      <div className="card-body text-center">
                        <h5 className="mb-3">Interesat de Premium?</h5>
                        <p className="text-muted small mb-3">
                          Upgrade la Premium pentru acces nelimitat la toate cererile.
                        </p>
                        <a href={routes.clubs.howItWorks} className="btn btn-outline-success w-100">
                          Vezi opțiuni Premium
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </>
  );
}
