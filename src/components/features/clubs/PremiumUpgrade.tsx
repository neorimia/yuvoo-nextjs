/**
 * Premium Upgrade Component
 *
 * Client component for processing premium upgrade payment (199 lei/year).
 * Uses Stripe Elements for secure payment collection.
 */

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createPremiumUpgradePaymentAction } from "@/app/actions/lead-payments";
import { routes } from "@/lib/routes";
import { StripeProvider } from "@/components/providers/StripeProvider";
import type { Club } from "@/modules/clubs/clubs.types";
import type { PremiumClubStatus } from "@/types/leads";
import { trackEvent } from "@/lib/analytics/tracking";
import { PostHogEvents, PostHogProperties } from "@/lib/analytics/events";
import { format } from "date-fns";
import { ro } from "date-fns/locale";

interface PremiumUpgradeProps {
  club: Club;
  isPremium: boolean;
  premiumStatus: PremiumClubStatus | null;
}

const PremiumUpgradeContent: React.FC<PremiumUpgradeProps> = ({
  club,
  isPremium,
  premiumStatus,
}) => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  // Create payment intent on mount (only if not already premium)
  useEffect(() => {
    if (isPremium) {
      return; // Don't create payment if already premium
    }

    async function initializePayment() {
      try {
        setIsLoading(true);
        setError(null);

        const result = await createPremiumUpgradePaymentAction();

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

        // Track premium upgrade initiation
        trackEvent(PostHogEvents.PREMIUM_UPGRADE_INITIATED, {
          [PostHogProperties.CLUB_ID]: club.id,
        });
      } catch (err) {
        console.error("[Premium Upgrade] Error initializing payment:", err);
        setError("Eroare la inițializarea plății. Te rugăm să încerci din nou.");
      } finally {
        setIsLoading(false);
      }
    }

    initializePayment();
  }, [club.id, isPremium]);

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
          return_url: `${window.location.origin}${routes.club.dashboard}`,
        },
        redirect: "if_required",
      });

      if (confirmError) {
        setError(confirmError.message || "Plata a eșuat. Te rugăm să încerci din nou.");
        setIsLoading(false);

        // Track payment failure
        trackEvent(PostHogEvents.PAYMENT_FAILED, {
          [PostHogProperties.CLUB_ID]: club.id,
          error: confirmError.message || "Unknown error",
        });

        return;
      }

      // Payment succeeded
      if (paymentIntent?.status === "succeeded") {
        // Track premium upgrade completion
        trackEvent(PostHogEvents.PREMIUM_UPGRADE_COMPLETED, {
          [PostHogProperties.CLUB_ID]: club.id,
          [PostHogProperties.PAYMENT_AMOUNT]: paymentIntent.amount,
        });

        // Redirect to dashboard
        router.push(routes.club.dashboard);
      } else {
        // Payment requires additional action (3D Secure, etc.)
        setError("Plata necesită verificare suplimentară. Vei fi redirecționat automat.");
      }
    } catch (err) {
      console.error("[Premium Upgrade] Error processing payment:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Eroare la procesarea plății. Te rugăm să încerci din nou."
      );
      setIsLoading(false);
    }
  };

  // If already premium, show success message
  if (isPremium && premiumStatus) {
    return (
      <div className="bd-premium-upgrade">
        <div className="mb-4">
          <Link href={routes.club.dashboard} className="btn btn-link text-decoration-none mb-3">
            <i className="bi bi-arrow-left me-2"></i>
            Înapoi la dashboard
          </Link>
          <h1 className="bd-dashboard-section-title mb-2">Club Premium Activ</h1>
          <p className="text-muted mb-0">Clubul tău are deja status Premium activ</p>
        </div>

        <div className="card border-success">
          <div className="card-header bg-success text-white">
            <h5 className="mb-0">
              <i className="bi bi-star-fill me-2"></i>
              Status Premium
            </h5>
          </div>
          <div className="card-body">
            <div className="alert alert-success mb-0">
              <i className="bi bi-check-circle-fill me-2"></i>
              <strong>Felicitări!</strong> Clubul tău are status Premium activ până pe{" "}
              {premiumStatus.premiumEndDate &&
                format(new Date(premiumStatus.premiumEndDate), "dd MMMM yyyy", { locale: ro })}
              .
            </div>
          </div>
        </div>

        <div className="card mt-4">
          <div className="card-header">
            <h5 className="mb-0">Beneficii Premium</h5>
          </div>
          <div className="card-body">
            <ul className="list-unstyled mb-0">
              <li className="mb-3">
                <i className="bi bi-check-circle-fill text-success me-2"></i>
                Acces nelimitat la toate cererile
              </li>
              <li className="mb-3">
                <i className="bi bi-check-circle-fill text-success me-2"></i>
                Badge &quot;Verificat Yuvoo&quot;
              </li>
              <li className="mb-3">
                <i className="bi bi-check-circle-fill text-success me-2"></i>
                Afișare prioritară în listări
              </li>
              <li className="mb-3">
                <i className="bi bi-check-circle-fill text-success me-2"></i>
                Date de contact vizibile pentru părinți
              </li>
              <li className="mb-0">
                <i className="bi bi-check-circle-fill text-success me-2"></i>
                Notificări instant pentru cereri noi
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bd-premium-upgrade">
      {/* Header */}
      <div className="mb-4">
        <Link href={routes.club.dashboard} className="btn btn-link text-decoration-none mb-3">
          <i className="bi bi-arrow-left me-2"></i>
          Înapoi la dashboard
        </Link>
        <h1 className="bd-dashboard-section-title mb-2">Upgrade la Premium</h1>
        <p className="text-muted mb-0">Acces nelimitat la cereri și multe altele</p>
      </div>

      <div className="row">
        <div className="col-lg-8">
          {/* Premium Benefits */}
          <div className="card mb-4">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">
                <i className="bi bi-star-fill me-2"></i>
                Beneficii Premium
              </h5>
            </div>
            <div className="card-body">
              <ul className="list-unstyled mb-0">
                <li className="mb-3">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  <strong>Acces nelimitat la cereri</strong> - Vezi toate cererile fără plată
                  suplimentară
                </li>
                <li className="mb-3">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  <strong>Badge &quot;Verificat Yuvoo&quot;</strong> - Aumentează credibilitatea
                  clubului tău
                </li>
                <li className="mb-3">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  <strong>Afișare prioritară în listări</strong> - Apari primul în rezultatele de
                  căutare
                </li>
                <li className="mb-3">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  <strong>Date de contact vizibile pentru părinți</strong> - Părinții pot contacta
                  direct clubul
                </li>
                <li className="mb-0">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  <strong>Notificări instant pentru cereri noi</strong> - Primești notificări
                  imediat când apare o cerere nouă
                </li>
              </ul>
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
                  <div className="spinner-border text-primary" role="status">
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
                      <h4 className="mb-0">Total: 199 lei/an</h4>
                      <small className="text-muted">Abonament anual - reînnoire automată</small>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-success btn-lg w-100"
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
                        <i className="bi bi-star-fill me-2"></i>
                        Upgrade la Premium - 199 lei/an
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
          <div className="card border-primary">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">
                <i className="bi bi-calculator me-2"></i>
                Comparație prețuri
              </h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <strong>Plată per cerere:</strong>
                <p className="mb-0">3 € per cerere</p>
                <small className="text-muted">
                  Dacă primești 10 cereri/lună = 30 €/lună = 360 €/an
                </small>
              </div>
              <hr />
              <div className="mb-0">
                <strong className="text-success">Premium:</strong>
                <p className="mb-0 text-success">
                  <strong>199 lei/an</strong>
                </p>
                <small className="text-muted">
                  Acces nelimitat - economisești dacă primești mai mult de 7 cereri/lună
                </small>
              </div>
            </div>
          </div>

          <div className="card mt-4">
            <div className="card-body">
              <h6 className="mb-3">Întrebări frecvente</h6>
              <div className="mb-3">
                <strong>Se reînnoiește automat?</strong>
                <p className="small text-muted mb-0">Da, abonamentul se reînnoiește anual.</p>
              </div>
              <div className="mb-0">
                <strong>Pot anula oricând?</strong>
                <p className="small text-muted mb-0">
                  Da, poți anula abonamentul oricând din setări.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PremiumUpgrade: React.FC<PremiumUpgradeProps> = ({ club, isPremium, premiumStatus }) => {
  return (
    <StripeProvider>
      <PremiumUpgradeContent club={club} isPremium={isPremium} premiumStatus={premiumStatus} />
    </StripeProvider>
  );
};

export default PremiumUpgrade;
