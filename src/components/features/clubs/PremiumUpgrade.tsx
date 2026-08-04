/**
 * Premium Upgrade Component
 *
 * Client component for processing premium upgrade payment (99,99 RON/month or 999,99 RON/year).
 * Uses Stripe Elements for secure payment collection.
 */

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createPremiumUpgradeCheckoutAction } from "@/app/actions/lead-payments";
import { routes } from "@/lib/routes";
import type { Club } from "@/modules/clubs/clubs.types";
import type { PremiumClubStatus } from "@/types/leads";
import { SubscriptionType } from "@/types/leads";
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [subscriptionType, setSubscriptionType] = useState<SubscriptionType>(
    SubscriptionType.YEARLY
  ); // Default to yearly (recommended)

  // Check for checkout session completion or cancellation
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");
    const canceled = params.get("canceled");

    if (sessionId) {
      // Checkout completed - refresh page to show updated premium status
      router.replace("/club/dashboard/premium");
    } else if (canceled) {
      setError("Plata a fost anulată. Poți încerca din nou când ești gata.");
      // Remove canceled param from URL
      router.replace("/club/dashboard/premium");
    }
  }, [router]);

  const handleUpgrade = async () => {
    if (isPremium) {
      return; // Already premium
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await createPremiumUpgradeCheckoutAction(subscriptionType);

      if (!result.success) {
        setError(result.error || "Eroare la inițializarea plății. Te rugăm să încerci din nou.");
        setIsLoading(false);
        return;
      }

      if (!result.checkoutUrl) {
        setError("Eroare: URL-ul de checkout lipsă. Te rugăm să încerci din nou.");
        setIsLoading(false);
        return;
      }

      // Track premium upgrade initiation
      trackEvent(PostHogEvents.PREMIUM_UPGRADE_INITIATED, {
        [PostHogProperties.CLUB_ID]: club.id,
        subscriptionType,
      });

      // Redirect to Stripe Checkout
      window.location.href = result.checkoutUrl;
    } catch (err) {
      console.error("[Premium Upgrade] Error initializing checkout:", err);
      setError("Eroare la inițializarea plății. Te rugăm să încerci din nou.");
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
                Badge &quot;Verificat Yuvoo&quot;
              </li>
              <li className="mb-3">
                <i className="bi bi-check-circle-fill text-success me-2"></i>
                Afișare prioritară în listări
              </li>
              <li className="mb-3">
                <i className="bi bi-check-circle-fill text-success me-2"></i>
                Profil evidențiat în rezultatele de căutare
              </li>
              <li className="mb-0">
                <i className="bi bi-check-circle-fill text-success me-2"></i>
                Notificări instant pentru cereri noi
              </li>
            </ul>
            {premiumStatus.subscriptionType && (
              <div className="mt-3 pt-3 border-top">
                <small className="text-muted">
                  <strong>Plan activ:</strong>{" "}
                  {premiumStatus.subscriptionType === SubscriptionType.MONTHLY ? "Lunar" : "Anual"}
                  {premiumStatus.nextBillingDate && (
                    <>
                      {" "}
                      • Următoarea plată:{" "}
                      {format(new Date(premiumStatus.nextBillingDate), "dd MMM yyyy", {
                        locale: ro,
                      })}
                    </>
                  )}
                </small>
              </div>
            )}
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
                  <strong>Profil evidențiat</strong> - Mai multă vizibilitate în directorul Yuvoo
                </li>
                <li className="mb-0">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  <strong>Notificări instant pentru cereri noi</strong> - Primești notificări
                  imediat când apare o cerere nouă
                </li>
              </ul>
            </div>
          </div>

          {/* Subscription Type Selector */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-calendar-check me-2"></i>
                Alege planul
              </h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                {/* Monthly Option */}
                <div className="col-md-6">
                  <label
                    className={`card h-100 m-0 cursor-pointer ${
                      subscriptionType === SubscriptionType.MONTHLY
                        ? "border-primary border-2"
                        : "border"
                    }`}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="card-body">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="subscriptionType"
                          id="subscriptionMonthly"
                          value={SubscriptionType.MONTHLY}
                          checked={subscriptionType === SubscriptionType.MONTHLY}
                          onChange={(e) => setSubscriptionType(e.target.value as SubscriptionType)}
                        />
                        <label
                          className="form-check-label w-100"
                          htmlFor="subscriptionMonthly"
                          style={{ cursor: "pointer" }}
                        >
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <strong>Plan Lunar</strong>
                          </div>
                          <div className="mb-2">
                            <span className="h4 mb-0">99</span>
                            <span className="text-muted"> lei/lună</span>
                          </div>
                          <small className="text-muted d-block">
                            Plată flexibilă • Anulează oricând
                          </small>
                        </label>
                      </div>
                    </div>
                  </label>
                </div>

                {/* Yearly Option */}
                <div className="col-md-6">
                  <label
                    className={`card h-100 m-0 cursor-pointer ${
                      subscriptionType === SubscriptionType.YEARLY
                        ? "border-primary border-2"
                        : "border"
                    }`}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="card-body">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="subscriptionType"
                          id="subscriptionYearly"
                          value={SubscriptionType.YEARLY}
                          checked={subscriptionType === SubscriptionType.YEARLY}
                          onChange={(e) => setSubscriptionType(e.target.value as SubscriptionType)}
                        />
                        <label
                          className="form-check-label w-100"
                          htmlFor="subscriptionYearly"
                          style={{ cursor: "pointer" }}
                        >
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <strong>Plan Anual</strong>
                            <span
                              className="badge bg-primary"
                              style={{ fontSize: "10px", padding: "4px 8px" }}
                            >
                              Recomandat
                            </span>
                          </div>
                          <div className="mb-2">
                            <span className="h4 mb-0 text-yuvoo-primary">990</span>
                            <span className="text-muted"> lei/an</span>
                          </div>
                          <small className="text-success d-block fw-semibold mb-1">
                            Economisești 198 lei/an
                          </small>
                          <small className="text-muted d-block">
                            Doar 82.5 lei/lună echivalent
                          </small>
                        </label>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Savings Message for Annual */}
              {subscriptionType === SubscriptionType.YEARLY && (
                <div className="alert alert-info mt-3 mb-0" role="alert">
                  <i className="bi bi-info-circle me-2"></i>
                  <strong>Plătești pentru 10 luni, primești 12!</strong> Planul anual oferă 2 luni
                  gratuite comparativ cu planul lunar.
                </div>
              )}
            </div>
          </div>

          {/* Checkout Button */}
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-credit-card me-2"></i>
                Finalizează upgrade-ul
              </h5>
            </div>
            <div className="card-body">
              {error && (
                <div className="alert alert-danger mb-4" role="alert">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  {error}
                </div>
              )}

              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h4 className="mb-0">
                    Total:{" "}
                    {subscriptionType === SubscriptionType.MONTHLY
                      ? "99,99 RON/lună"
                      : "999,99 RON/an"}
                  </h4>
                  <small className="text-muted">
                    {subscriptionType === SubscriptionType.MONTHLY
                      ? "Abonament lunar - reînnoire automată"
                      : "Abonament anual - reînnoire automată"}
                  </small>
                </div>
              </div>

              <button
                type="button"
                onClick={handleUpgrade}
                className="btn btn-success btn-lg w-100"
                disabled={isLoading}
              >
                {isLoading ? (
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
                    <i className="bi bi-star-fill me-2"></i>
                    Continuă la plată -{" "}
                    {subscriptionType === SubscriptionType.MONTHLY
                      ? "99,99 RON/lună"
                      : "999,99 RON/an"}
                  </>
                )}
              </button>

              <p className="text-center text-muted small mt-3 mb-0">
                <i className="bi bi-shield-check text-success me-1"></i>
                Vei fi redirecționat către Stripe Checkout pentru plată securizată. Nu stocăm datele
                tale de card.
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-lg-4">
          <div className="card border-primary">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">
                <i className="bi bi-info-circle me-2"></i>
                Contact gratuit
              </h5>
            </div>
            <div className="card-body">
              <p className="mb-3">
                Contactul cu părinții este <strong>gratuit</strong> pentru toate cluburile. Premium
                îți oferă vizibilitate sporită, nu deblocarea contactului.
              </p>
              <hr />
              <div className="mb-3">
                <strong className="text-success">Premium Lunar:</strong>
                <p className="mb-0 text-success">
                  <strong>99,99 RON/lună</strong>
                </p>
                <small className="text-muted">Badge verificat + afișare prioritară</small>
              </div>
              <hr />
              <div className="mb-0">
                <strong className="text-success">Premium Anual:</strong>
                <p className="mb-0 text-success">
                  <strong>999,99 RON/an</strong>
                </p>
                <small className="text-muted d-block mb-1">Doar 83,33 RON/lună echivalent</small>
                <small className="text-success fw-semibold d-block">
                  Economisești 199,89 RON/an vs planul lunar
                </small>
              </div>
            </div>
          </div>

          <div className="card mt-4">
            <div className="card-body">
              <h6 className="mb-3">Întrebări frecvente</h6>
              <div className="mb-3">
                <strong>Se reînnoiește automat?</strong>
                <p className="small text-muted mb-0">
                  Da, abonamentul se reînnoiește{" "}
                  {subscriptionType === SubscriptionType.MONTHLY ? "lunar" : "anual"}.
                </p>
              </div>
              <div className="mb-3">
                <strong>Pot anula oricând?</strong>
                <p className="small text-muted mb-0">
                  Da, poți anula abonamentul oricând din setări.
                </p>
              </div>
              <div className="mb-0">
                <strong>Pot schimba planul?</strong>
                <p className="small text-muted mb-0">
                  Da, poți trece de la planul lunar la cel anual oricând pentru a beneficia de
                  economii.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumUpgradeContent;
