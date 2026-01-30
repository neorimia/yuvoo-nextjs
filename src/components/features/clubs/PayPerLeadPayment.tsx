/**
 * Pay-Per-Lead Payment Component
 *
 * Client component for processing pay-per-lead payment (3€).
 * Uses Stripe Elements for secure payment collection.
 */

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createPayPerLeadPaymentAction } from "@/app/actions/lead-payments";
import { routes } from "@/lib/routes";
import { StripeProvider } from "@/components/providers/StripeProvider";
import type { Club } from "@/modules/clubs/clubs.types";
import type { LeadWithRelations } from "@/types/leads";
import { trackEvent } from "@/lib/analytics/tracking";
import { PostHogEvents, PostHogProperties } from "@/lib/analytics/events";

interface PayPerLeadPaymentProps {
  club: Club;
  lead: LeadWithRelations;
}

const PayPerLeadPaymentContent: React.FC<PayPerLeadPaymentProps> = ({ club, lead }) => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  // Create payment intent on mount
  useEffect(() => {
    async function initializePayment() {
      try {
        setIsLoading(true);
        setError(null);

        const result = await createPayPerLeadPaymentAction(lead.id);

        if (!result.success) {
          setError(result.error || "Eroare la inițializarea plății. Te rugăm să încerci din nou.");
          setIsLoading(false);
          return;
        }

        if (!result.clientSecret) {
          setError("Eroare: Client secret lipsă. Te rugăm să încerci din nou.");
          setIsLoading(false);
          return;
        }

        setClientSecret(result.clientSecret);

        // Track payment creation
        trackEvent(PostHogEvents.LEAD_PAYMENT_INITIATED, {
          [PostHogProperties.LEAD_ID]: lead.id,
          [PostHogProperties.CLUB_ID]: club.id,
          [PostHogProperties.LEAD_PAYMENT_METHOD]: "pay_per_lead",
        });
      } catch (err) {
        console.error("[Pay-Per-Lead Payment] Error initializing payment:", err);
        setError("Eroare la inițializarea plății. Te rugăm să încerci din nou.");
      } finally {
        setIsLoading(false);
      }
    }

    initializePayment();
  }, [lead.id, club.id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      setError("Plata nu este încă pregătită. Te rugăm să aștepți.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Submit elements to validate form
      const { error: submitError } = await elements.submit();

      if (submitError) {
        setError(submitError.message || "Te rugăm să completezi toate câmpurile corect.");
        setIsLoading(false);
        return;
      }

      // Confirm payment with Stripe
      const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}${routes.club.leads.detail(lead.id)}`,
        },
        redirect: "if_required",
      });

      if (confirmError) {
        setError(confirmError.message || "Plata a eșuat. Te rugăm să încerci din nou.");
        setIsLoading(false);

        // Track payment failure
        trackEvent(PostHogEvents.PAYMENT_FAILED, {
          [PostHogProperties.LEAD_ID]: lead.id,
          [PostHogProperties.CLUB_ID]: club.id,
          error: confirmError.message || "Unknown error",
        });

        return;
      }

      // Payment succeeded
      if (paymentIntent?.status === "succeeded") {
        // Track payment completion
        trackEvent(PostHogEvents.LEAD_PAYMENT_COMPLETED, {
          [PostHogProperties.LEAD_ID]: lead.id,
          [PostHogProperties.CLUB_ID]: club.id,
          [PostHogProperties.LEAD_PAYMENT_METHOD]: "pay_per_lead",
          [PostHogProperties.PAYMENT_AMOUNT]: paymentIntent.amount,
        });

        // Redirect to lead detail page
        router.push(routes.club.leads.detail(lead.id));
      } else {
        // Payment requires additional action (3D Secure, etc.)
        setError("Plata necesită verificare suplimentară. Vei fi redirecționat automat.");
      }
    } catch (err) {
      console.error("[Pay-Per-Lead Payment] Error processing payment:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Eroare la procesarea plății. Te rugăm să încerci din nou."
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="bd-pay-per-lead-payment">
      {/* Header */}
      <div className="mb-4">
        <Link
          href={routes.club.leads.detail(lead.id)}
          className="btn btn-link text-decoration-none mb-3"
        >
          <i className="bi bi-arrow-left me-2"></i>
          Înapoi la cerere
        </Link>
        <h1 className="bd-dashboard-section-title mb-2">Plată per cerere</h1>
        <p className="text-muted mb-0">Plătește 3€ pentru a debloca datele de contact</p>
      </div>

      <div className="row">
        <div className="col-lg-8">
          {/* Lead Summary */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Rezumat cerere</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <strong>Sport:</strong>
                  <p className="mb-0">{lead.sportType || "N/A"}</p>
                </div>
                <div className="col-md-6 mb-3">
                  <strong>Vârsta copilului:</strong>
                  <p className="mb-0">{lead.childAge} ani</p>
                </div>
                {lead.message && (
                  <div className="col-12 mb-3">
                    <strong>Mesaj:</strong>
                    <p className="mb-0">{lead.message}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-credit-card me-2"></i>
                Detalii plată
              </h5>
            </div>
            <div className="card-body">
              {error && (
                <div className="alert alert-danger mb-4" role="alert">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  {error}
                </div>
              )}

              {isLoading && !clientSecret && (
                <div className="text-center py-4">
                  <div className="spinner-border text-yuvoo-primary" role="status">
                    <span className="visually-hidden">Se încarcă...</span>
                  </div>
                  <p className="mt-2 text-muted">Se pregătește plata...</p>
                </div>
              )}

              {clientSecret && (
                <form onSubmit={handleSubmit} className="payment-form">
                  <div className="mb-4">
                    <PaymentElement />
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                      <h4 className="mb-0">Total: 3 €</h4>
                      <small className="text-muted">Plată unică pentru această cerere</small>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100"
                    disabled={!stripe || !elements || isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Se procesează plata...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-lock-fill me-2"></i>
                        Plătește 3 €
                      </>
                    )}
                  </button>

                  <p className="text-center text-muted small mt-3 mb-0">
                    <i className="bi bi-shield-check text-success me-1"></i>
                    Plata este securizată și procesată de Stripe. Nu stocăm datele tale de card.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-lg-4">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">
                <i className="bi bi-info-circle me-2"></i>
                Ce primești
              </h5>
            </div>
            <div className="card-body">
              <ul className="list-unstyled mb-0">
                <li className="mb-3">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Date de contact părinte (nume, email, telefon)
                </li>
                <li className="mb-3">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Acces permanent la această cerere
                </li>
                <li className="mb-0">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Posibilitate de a contacta direct părintele
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
              <Link href={routes.club.premium} className="btn btn-outline-success w-100">
                Vezi opțiuni Premium
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PayPerLeadPayment: React.FC<PayPerLeadPaymentProps> = ({ club, lead }) => {
  return (
    <StripeProvider>
      <PayPerLeadPaymentContent club={club} lead={lead} />
    </StripeProvider>
  );
};

export default PayPerLeadPayment;
