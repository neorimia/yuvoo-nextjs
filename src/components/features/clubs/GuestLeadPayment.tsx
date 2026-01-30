/**
 * Guest Lead Payment Component
 *
 * Client component for guest payment flow (clubs without accounts).
 * Email step has no Stripe hooks; payment step is only rendered inside StripeProvider.
 */

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
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

/** Lead summary + sidebar (shared layout) */
function LeadSummaryAndSidebar({
  lead,
  children,
}: {
  lead: LeadWithLocationName;
  children: React.ReactNode;
}) {
  return (
    <div className="bd-guest-lead-payment">
      <div className="mb-4">
        <h1 className="bd-dashboard-section-title mb-2">Plată cerere</h1>
        <p className="text-muted mb-2">
          Un <strong>părinte pre-calificat</strong> prin quiz-ul nostru AI caută exact sportul tău
          și este gata să ia legătura. Pentru <strong>doar 3€</strong> primești datele de contact
          (nume, email, telefon) și poți programa direct o lecție de probă.
        </p>
        <p className="text-muted small mb-0">
          Fără bani pierduți pe reclame, plătești doar pentru un lead real, interesat de oferta ta.{" "}
          <a
            href={routes.clubs.roiCalculator}
            target="_blank"
            rel="noopener noreferrer"
            className="text-yuvoo-primary text-decoration-underline"
          >
            Calculează ROI-ul tău vs. reclame
          </a>
          <br />
          <strong>ROI: Cat profit faci pe lead vs. Cat platesti pentru lead</strong>
        </p>
      </div>

      <div className="row wow fadeInUp mb-4" data-wow-duration="1s" data-wow-delay=".3s">
        <div className="col-lg-8">
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
          {children}
        </div>

        <div className="col-lg-4 wow fadeInUp mb-4" data-wow-duration="1s" data-wow-delay=".3s">
          <div className="card">
            <div className="card-header bg-yuvoo-primary text-white py-3">
              <h5 className="mb-0 text-white">
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

          <div className="card mt-4">
            <div className="card-body text-center py-3">
              <a
                href={routes.clubs.roiCalculator}
                target="_blank"
                rel="noopener noreferrer"
                className="d-flex align-items-center justify-content-center gap-2 text-decoration-none text-muted small"
              >
                <i className="bi bi-calculator"></i>
                Calculează ROI-ul tău vs. Google/Facebook ads
              </a>
            </div>
          </div>

          <div className="card mt-4 border-success">
            <div className="card-body text-center">
              <h5 className="mb-3">Interesat de Premium?</h5>
              <p className="text-muted small mb-3">
                Vei putea accesa toate cererile din zona ta de geografie, fără limită de timp.
              </p>
              <a
                href={routes.clubs.howItWorks}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-success w-100"
              >
                Vezi cum funcționează abonarea Premium
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Email step – no Stripe hooks, safe to render without Elements provider */
const GuestLeadPaymentEmailStep: React.FC<
  GuestLeadPaymentProps & { onClientSecretReady: (clientSecret: string) => void }
> = ({ lead, club, onClientSecretReady }) => {
  const [email, setEmail] = useState(club?.contact?.email?.trim() ?? "");
  const [isInitializing, setIsInitializing] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      onClientSecretReady(result.clientSecret);
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

  return (
    <LeadSummaryAndSidebar lead={lead}>
      <div className="card wow fadeInUp mb-4" data-wow-duration="1s" data-wow-delay=".3s">
        <div className="card-header">
          <h5 className="mb-0">
            <i className="bi bi-envelope me-2"></i>
            Adresă email
          </h5>
        </div>
        <div className="card-body">
          <p className="text-muted mb-4">
            Introdu adresa ta de email pentru a primi informațiile de contact ale părintelui după
            plată.
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
              className="btn btn-yuvoo-primary btn-lg w-100"
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
    </LeadSummaryAndSidebar>
  );
};

/** Payment step – uses Stripe hooks; must be rendered inside StripeProvider */
const GuestLeadPaymentPaymentStep: React.FC<GuestLeadPaymentProps & { clientSecret: string }> = ({
  lead,
  club,
  clientSecret,
}) => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePaymentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) {
      setError("Plata nu este încă pregătită. Te rugăm să aștepți.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setError(submitError.message || "Te rugăm să completezi toate câmpurile corect.");
        setIsLoading(false);
        return;
      }
      const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}${routes.leads.guestPaymentSuccess(lead.id)}`,
        },
        redirect: "if_required",
      });
      if (confirmError) {
        setError(confirmError.message || "Plata a eșuat. Te rugăm să încerci din nou.");
        setIsLoading(false);
        trackEvent(PostHogEvents.PAYMENT_FAILED, {
          [PostHogProperties.LEAD_ID]: lead.id,
          [PostHogProperties.CLUB_ID]: club.id,
          error: confirmError.message || "Unknown error",
          isGuestPayment: true,
        });
        return;
      }
      if (paymentIntent?.status === "succeeded") {
        trackEvent(PostHogEvents.LEAD_PAYMENT_COMPLETED, {
          [PostHogProperties.LEAD_ID]: lead.id,
          [PostHogProperties.CLUB_ID]: club.id,
          [PostHogProperties.LEAD_PAYMENT_METHOD]: "pay_per_lead",
          [PostHogProperties.PAYMENT_AMOUNT]: paymentIntent.amount,
          isGuestPayment: true,
        });
        router.push(
          routes.leads.guestPaymentSuccess(lead.id) + `?payment_intent=${paymentIntent.id}`
        );
      } else {
        setError("Plata necesită verificare suplimentară. Vei fi redirecționat automat.");
        setIsLoading(false);
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
    <LeadSummaryAndSidebar lead={lead}>
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
              className="btn btn-yuvoo-primary btn-lg w-100"
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
    </LeadSummaryAndSidebar>
  );
};

const GuestLeadPayment: React.FC<GuestLeadPaymentProps> = ({ lead, club }) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  if (clientSecret) {
    return (
      <StripeProvider clientSecret={clientSecret}>
        <GuestLeadPaymentPaymentStep lead={lead} club={club} clientSecret={clientSecret} />
      </StripeProvider>
    );
  }

  return (
    <GuestLeadPaymentEmailStep lead={lead} club={club} onClientSecretReady={setClientSecret} />
  );
};

export default GuestLeadPayment;
