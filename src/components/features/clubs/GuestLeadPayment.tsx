/**
 * Guest Lead Payment Component
 *
 * Client component for guest payment flow (clubs without accounts).
 * Includes email input and Stripe Elements payment form.
 */

"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createGuestLeadPaymentAction } from "@/app/actions/guest-lead-payments";
import { routes } from "@/lib/routes";
import { StripeProvider } from "@/components/providers/StripeProvider";
import type { Club } from "@/modules/clubs/clubs.types";
import type { LeadWithRelations } from "@/types/leads";
import { trackEvent } from "@/lib/analytics/tracking";
import { PostHogEvents, PostHogProperties } from "@/lib/analytics/events";

interface LeadWithLocationName extends LeadWithRelations {
  locationName?: string | null;
}

interface GuestLeadPaymentProps {
  lead: LeadWithLocationName;
  club: Club;
}

interface GuestLeadPaymentContentProps extends GuestLeadPaymentProps {
  onClientSecretReady: (clientSecret: string) => void;
}

const GuestLeadPaymentContent: React.FC<GuestLeadPaymentContentProps> = ({
  lead,
  club,
  onClientSecretReady,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  // Check for success/cancel from URL params
  useEffect(() => {
    const paymentIntentId = searchParams.get("payment_intent");
    const status = searchParams.get("payment_intent_client_secret");
    if (paymentIntentId && status === "succeeded") {
      // Redirect to success page
      router.push(routes.leads.guestPaymentSuccess(lead.id) + `?payment_intent=${paymentIntentId}`);
    }
  }, [searchParams, router, lead.id]);

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Te rugăm să introduci adresa de email.");
      return;
    }

    setIsInitializing(true);
    setError(null);

    try {
      const result = await createGuestLeadPaymentAction(lead.id, email.trim());

      if (!result.success) {
        setError(result.error || "Eroare la inițializarea plății. Te rugăm să încerci din nou.");
        setIsInitializing(false);
        return;
      }

      if (!result.clientSecret) {
        setError("Eroare: Client secret lipsă. Te rugăm să încerci din nou.");
        setIsInitializing(false);
        return;
      }

      setClientSecret(result.clientSecret);
      onClientSecretReady(result.clientSecret);

      // Track payment creation
      trackEvent(PostHogEvents.LEAD_PAYMENT_INITIATED, {
        [PostHogProperties.LEAD_ID]: lead.id,
        [PostHogProperties.CLUB_ID]: club.id,
        [PostHogProperties.LEAD_PAYMENT_METHOD]: "pay_per_lead",
        isGuestPayment: true,
      });
    } catch (err) {
      console.error("[Guest Payment] Error initializing payment:", err);
      setError("Eroare la inițializarea plății. Te rugăm să încerci din nou.");
    } finally {
      setIsInitializing(false);
    }
  };

  const handlePaymentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
          return_url: `${window.location.origin}${routes.leads.guestPaymentSuccess(lead.id)}?payment_intent={PAYMENT_INTENT_ID}`,
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
          isGuestPayment: true,
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
          isGuestPayment: true,
        });

        // Redirect to success page
        router.push(
          routes.leads.guestPaymentSuccess(lead.id) + `?payment_intent=${paymentIntent.id}`
        );
      } else {
        // Payment requires additional action (3D Secure, etc.)
        setError("Plata necesită verificare suplimentară. Vei fi redirecționat automat.");
      }
    } catch (err) {
      console.error("[Guest Payment] Error processing payment:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Eroare la procesarea plății. Te rugăm să încerci din nou."
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="bd-guest-lead-payment">
      {/* Header */}
      <div className="mb-4 text-center">
        <h1 className="bd-dashboard-section-title mb-2">Plată cerere</h1>
        <p className="text-muted mb-0">
          Plătește 3€ pentru a accesa informațiile de contact ale părintelui
        </p>
      </div>

      <div className="row">
        <div className="col-lg-8">
          {/* Lead Summary */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-info-circle me-2"></i>
                Rezumat cerere
              </h5>
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
                {lead.locationName && (
                  <div className="col-md-6 mb-3">
                    <strong>Locație:</strong>
                    <p className="mb-0">{lead.locationName}</p>
                  </div>
                )}
                {lead.message && (
                  <div className="col-12 mb-3">
                    <strong>Mesaj:</strong>
                    <p className="mb-0">{lead.message}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Email Form (if not initialized) */}
          {!clientSecret && (
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">
                  <i className="bi bi-envelope me-2"></i>
                  Adresă email
                </h5>
              </div>
              <div className="card-body">
                <p className="text-muted mb-4">
                  Introdu adresa ta de email pentru a primi informațiile de contact ale părintelui
                  după plată.
                </p>

                {error && (
                  <div className="alert alert-danger mb-4" role="alert">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    {error}
                  </div>
                )}

                <form onSubmit={handleEmailSubmit}>
                  <div className="mb-4">
                    <label htmlFor="guest-email" className="form-label">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="guest-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nume@exemplu.ro"
                      required
                      disabled={isInitializing}
                    />
                    <small className="form-text text-muted">
                      Vei primi informațiile de contact pe această adresă după plată.
                    </small>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100"
                    disabled={isInitializing || !email.trim()}
                  >
                    {isInitializing ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Se pregătește plata...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-arrow-right me-2"></i>
                        Continuă la plată
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Payment Form (if initialized) */}
          {clientSecret && stripe && elements && (
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

                <form onSubmit={handlePaymentSubmit} className="payment-form">
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
              </div>
            </div>
          )}
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
                  Email cu informațiile de contact după plată
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
              <a href={routes.clubs.premium} className="btn btn-outline-success w-100">
                Vezi opțiuni Premium
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GuestLeadPayment: React.FC<GuestLeadPaymentProps> = ({ lead, club }) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  // If we have a clientSecret, render with StripeProvider
  // Otherwise, render without (email form only)
  if (clientSecret) {
    return (
      <StripeProvider clientSecret={clientSecret}>
        <GuestLeadPaymentContent lead={lead} club={club} onClientSecretReady={setClientSecret} />
      </StripeProvider>
    );
  }

  // Render without StripeProvider for email form
  return <GuestLeadPaymentContent lead={lead} club={club} onClientSecretReady={setClientSecret} />;
};

export default GuestLeadPayment;
