"use client";

import React from "react";
import SectionTitle from "@/components/shared/SectionTitle";
import TrustCard, { TrustCardProps } from "@/components/shared/TrustCard";
import { routes } from "@/lib/routes";
import Link from "next/link";
import { trackEvent, PostHogEvents } from "@/lib/analytics/tracking";

/**
 * Clubs Landing Pricing Section
 *
 * Displays Premium subscription pricing and benefits.
 * Part of the clubs landing page (/pentru-cluburi).
 * Promotes Premium subscription with both monthly (99 lei/month) and yearly (990 lei/year) options.
 */
export default function ClubsLandingPricing() {
  const premiumBenefits: TrustCardProps[] = [
    {
      id: 1,
      icon: "fa-solid fa-certificate",
      title: 'Badge "Verificat Yuvoo"',
      description: "Aumentează credibilitatea și încrederea părinților",
    },
    {
      id: 2,
      icon: "fa-solid fa-infinity",
      title: "Acces nelimitat la cereri",
      description: "Vezi toate cererile fără plată suplimentară",
    },
    {
      id: 3,
      icon: "fa-solid fa-star",
      title: "Afișare prioritară în listări",
      description: "Apari primul în rezultatele de căutare",
    },
    {
      id: 4,
      icon: "fa-solid fa-phone",
      title: "Date de contact vizibile",
      description: "Părinții te pot contacta direct",
    },
    {
      id: 5,
      icon: "fa-solid fa-bell",
      title: "Notificări instant",
      description: "Primești alerte imediat pentru cereri noi",
    },
    {
      id: 6,
      icon: "fa-solid fa-clock",
      title: "Abonament cu reînnoire automată",
      description: "Plătește o singură dată și beneficiează de acces nelimitat la cereri",
    },
  ];

  const handleCTAClick = () => {
    // Track event
    trackEvent(PostHogEvents.CLUBS_LANDING_CTA_CLICKED, {
      location: "pricing",
      cta_text: "Upgrade la Premium",
    });
  };

  return (
    <section
      className="bd-clubs-landing-pricing pt-120 pb-120"
      style={{ backgroundColor: "#F8F9FA" }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            {/* Section Title */}
            <SectionTitle
              title="Plan Premium - Investește în creșterea clubului tău"
              subtitle={
                <>
                  Acces nelimitat la cereri și beneficii exclusive. Alege planul care ți se
                  potrivește:
                  <strong style={{ color: "var(--bd-theme-1)" }}> 99 lei/lună</strong> sau{" "}
                  <strong style={{ color: "var(--bd-theme-1)" }}>990 lei/an</strong>
                </>
              }
              className="mb-50"
              animationDelay=".3s"
            />

            {/* Pricing Comparison Cards */}
            <div className="row justify-content-center mb-50 g-4">
              {/* Monthly Plan */}
              <div className="col-lg-5 col-md-6">
                <div
                  className="wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay=".4s"
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "20px",
                    padding: "40px 30px",
                    boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.06)",
                    border: "2px solid #E0E0E0",
                    textAlign: "center",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <h3
                      style={{
                        fontSize: "20px",
                        fontWeight: 600,
                        color: "#1B1B1B",
                        marginBottom: "20px",
                      }}
                    >
                      Plan Lunar
                    </h3>
                    <div
                      style={{
                        fontSize: "56px",
                        fontWeight: 700,
                        color: "#424242",
                        lineHeight: "1",
                        marginBottom: "8px",
                      }}
                    >
                      99
                    </div>
                    <div
                      style={{
                        fontSize: "20px",
                        fontWeight: 600,
                        color: "#6B6B6B",
                        marginBottom: "20px",
                      }}
                    >
                      lei/lună
                    </div>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#6B6B6B",
                        marginBottom: "24px",
                        lineHeight: "1.6",
                      }}
                    >
                      Plată flexibilă lunară. Anulează oricând.
                    </p>
                    <div
                      style={{
                        backgroundColor: "#F8F9FA",
                        borderRadius: "8px",
                        padding: "12px",
                        marginBottom: "24px",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "12px",
                          color: "#424242",
                          marginBottom: 0,
                          lineHeight: "1.5",
                        }}
                      >
                        <strong>Break-even:</strong> ~3-4 leaduri/lună
                      </p>
                    </div>
                  </div>
                  <Link
                    href={routes.club.premium}
                    className="bd-btn mx-auto"
                    onClick={handleCTAClick}
                    style={{ display: "inline-block", width: "100%" }}
                  >
                    <span className="bd-btn-inner">
                      <span className="bd-btn-normal">Alege Planul Lunar</span>
                      <span className="bd-btn-hover">Alege Planul Lunar</span>
                    </span>
                  </Link>
                </div>
              </div>

              {/* Yearly Plan - Recommended */}
              <div className="col-lg-5 col-md-6">
                <div
                  className="wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay=".5s"
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "20px",
                    padding: "40px 30px",
                    boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.12)",
                    border: "3px solid var(--bd-theme-1)",
                    textAlign: "center",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                  }}
                >
                  {/* Most Popular Badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: "-12px",
                      right: "20px",
                      backgroundColor: "var(--bd-theme-1)",
                      color: "#FFFFFF",
                      padding: "6px 16px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                  >
                    Cel mai popular
                  </div>

                  <div style={{ flex: 1 }}>
                    <h3
                      style={{
                        fontSize: "20px",
                        fontWeight: 600,
                        color: "#1B1B1B",
                        marginBottom: "20px",
                      }}
                    >
                      Plan Anual
                    </h3>
                    <div
                      style={{
                        fontSize: "56px",
                        fontWeight: 700,
                        color: "var(--bd-theme-1)",
                        lineHeight: "1",
                        marginBottom: "8px",
                      }}
                    >
                      990
                    </div>
                    <div
                      style={{
                        fontSize: "20px",
                        fontWeight: 600,
                        color: "#6B6B6B",
                        marginBottom: "8px",
                      }}
                    >
                      lei/an
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        color: "var(--bd-theme-1)",
                        fontWeight: 600,
                        marginBottom: "20px",
                      }}
                    >
                      Doar 82.5 lei/lună echivalent
                    </div>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#6B6B6B",
                        marginBottom: "20px",
                        lineHeight: "1.6",
                      }}
                    >
                      Plătești pentru 10 luni, primești 12
                    </p>

                    {/* Savings Highlight */}
                    <div
                      style={{
                        backgroundColor: "#EBFFFE",
                        borderRadius: "8px",
                        padding: "12px",
                        marginBottom: "24px",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "var(--bd-theme-1)",
                          marginBottom: "4px",
                        }}
                      >
                        💡 Economisești 198 lei/an
                      </p>
                      <p
                        style={{
                          fontSize: "12px",
                          color: "#424242",
                          marginBottom: 0,
                          lineHeight: "1.5",
                        }}
                      >
                        vs planul lunar (1,188 lei/an)
                      </p>
                    </div>
                  </div>
                  <Link
                    href={routes.club.premium}
                    className="bd-btn mx-auto"
                    onClick={handleCTAClick}
                    style={{ display: "inline-block", width: "100%" }}
                  >
                    <span className="bd-btn-inner">
                      <span className="bd-btn-normal">Alege Planul Anual</span>
                      <span className="bd-btn-hover">Alege Planul Anual</span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Value Comparison */}
            <div className="row justify-content-center mb-50">
              <div className="col-lg-10">
                <div
                  className="wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay=".6s"
                  style={{
                    backgroundColor: "#EBFFFE",
                    borderRadius: "12px",
                    padding: "24px",
                    textAlign: "center",
                  }}
                >
                  <p
                    style={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "#1B1B1B",
                      marginBottom: "12px",
                    }}
                  >
                    💡 De ce Premium?
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#424242",
                      marginBottom: 0,
                      lineHeight: "1.6",
                    }}
                  >
                    Fără Premium: plătești 3€ per cerere (plată unică prin Stripe Payment Intents).
                    Cu Premium: acces nelimitat pentru doar 99 lei/lună sau 990 lei/an (abonament cu
                    reînnoire automată prin Stripe Subscriptions). Dacă primești mai mult de 3
                    cereri pe lună, Premium se plătește singur.
                  </p>
                </div>
              </div>
            </div>

            {/* Guarantee */}
            <div className="row justify-content-center mb-50">
              <div className="col-lg-10">
                <p
                  style={{
                    fontSize: "14px",
                    color: "#6B6B6B",
                    textAlign: "center",
                    marginBottom: 0,
                  }}
                >
                  ✓ Anulare oricând • ✓ Fără costuri ascunse • ✓ Suport dedicat
                </p>
              </div>
            </div>

            {/* Premium Benefits Grid */}
            <div className="wow fadeInUp" data-wow-duration="1s" data-wow-delay=".5s">
              <div className="row bd-trust-cards-row">
                {premiumBenefits.map((benefit) => (
                  <TrustCard
                    key={benefit.id}
                    {...benefit}
                    columnClasses="col-lg-4 col-md-6 col-sm-10"
                    animationDelay={`${0.5 + (benefit.id - 1) * 0.1}s`}
                  />
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="row justify-content-center mt-50">
              <div className="col-lg-10">
                <div
                  className="wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay=".7s"
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "16px",
                    padding: "40px",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.06)",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "24px",
                      fontWeight: 700,
                      color: "#1B1B1B",
                      marginBottom: "30px",
                      textAlign: "center",
                    }}
                  >
                    Întrebări frecvente despre Premium
                  </h3>

                  <div className="row g-4">
                    {/* FAQ Item 1 */}
                    <div className="col-lg-6">
                      <div
                        style={{
                          padding: "20px",
                          backgroundColor: "#F8F9FA",
                          borderRadius: "12px",
                          height: "100%",
                        }}
                      >
                        <h4
                          style={{
                            fontSize: "18px",
                            fontWeight: 600,
                            color: "#1B1B1B",
                            marginBottom: "10px",
                          }}
                        >
                          Când se plătește Premium?
                        </h4>
                        <p
                          style={{
                            fontSize: "14px",
                            color: "#424242",
                            marginBottom: 0,
                            lineHeight: "1.6",
                          }}
                        >
                          Premium se plătește lunar (99 lei/lună) sau anual (990 lei/an). Poți face
                          upgrade oricând din dashboard-ul clubului tău. Planul anual oferă economii
                          de 198 lei/an.
                        </p>
                      </div>
                    </div>

                    {/* FAQ Item 2 */}
                    <div className="col-lg-6">
                      <div
                        style={{
                          padding: "20px",
                          backgroundColor: "#F8F9FA",
                          borderRadius: "12px",
                          height: "100%",
                        }}
                      >
                        <h4
                          style={{
                            fontSize: "18px",
                            fontWeight: 600,
                            color: "#1B1B1B",
                            marginBottom: "10px",
                          }}
                        >
                          Pot anula Premium?
                        </h4>
                        <p
                          style={{
                            fontSize: "14px",
                            color: "#424242",
                            marginBottom: 0,
                            lineHeight: "1.6",
                          }}
                        >
                          Da, poți anula Premium oricând. Nu vei mai primi beneficii Premium după
                          expirarea perioadei plătite, dar vei putea continua să folosești
                          platforma.
                        </p>
                      </div>
                    </div>

                    {/* FAQ Item 3 */}
                    <div className="col-lg-6">
                      <div
                        style={{
                          padding: "20px",
                          backgroundColor: "#F8F9FA",
                          borderRadius: "12px",
                          height: "100%",
                        }}
                      >
                        <h4
                          style={{
                            fontSize: "18px",
                            fontWeight: 600,
                            color: "#1B1B1B",
                            marginBottom: "10px",
                          }}
                        >
                          Ce înseamnă &ldquo;acces nelimitat&rdquo;?
                        </h4>
                        <p
                          style={{
                            fontSize: "14px",
                            color: "#424242",
                            marginBottom: 0,
                            lineHeight: "1.6",
                          }}
                        >
                          Cu Premium, poți vedea toate cererile de părinți fără să plătești 3€ per
                          cerere. Vei avea acces complet la toate detaliile cererilor.
                        </p>
                      </div>
                    </div>

                    {/* FAQ Item 4 */}
                    <div className="col-lg-6">
                      <div
                        style={{
                          padding: "20px",
                          backgroundColor: "#F8F9FA",
                          borderRadius: "12px",
                          height: "100%",
                        }}
                      >
                        <h4
                          style={{
                            fontSize: "18px",
                            fontWeight: 600,
                            color: "#1B1B1B",
                            marginBottom: "10px",
                          }}
                        >
                          Când începe Premium?
                        </h4>
                        <p
                          style={{
                            fontSize: "14px",
                            color: "#424242",
                            marginBottom: 0,
                            lineHeight: "1.6",
                          }}
                        >
                          Premium devine activ imediat după plata. Vei primi toate beneficii Premium
                          instant, inclusiv badge-ul și afișarea prioritară. Abonamentul se
                          reînnoiește automat lunar sau anual, în funcție de planul ales.
                        </p>
                      </div>
                    </div>

                    {/* FAQ Item 5 - Pay-per-lead */}
                    <div className="col-lg-6">
                      <div
                        style={{
                          padding: "20px",
                          backgroundColor: "#F8F9FA",
                          borderRadius: "12px",
                          height: "100%",
                        }}
                      >
                        <h4
                          style={{
                            fontSize: "18px",
                            fontWeight: 600,
                            color: "#1B1B1B",
                            marginBottom: "10px",
                          }}
                        >
                          Pot plăti doar pentru cereri individuale?
                        </h4>
                        <p
                          style={{
                            fontSize: "14px",
                            color: "#424242",
                            marginBottom: 0,
                            lineHeight: "1.6",
                          }}
                        >
                          Da, poți plăti 3€ per cerere (plată unică prin Stripe Payment Intents)
                          pentru a vedea detaliile unei cereri specifice. Această opțiune este
                          ideală dacă primești rar cereri. Dacă primești mai mult de 3 cereri pe
                          lună, Premium este mai avantajos.
                        </p>
                      </div>
                    </div>

                    {/* FAQ Item 6 - Payment methods */}
                    <div className="col-lg-6">
                      <div
                        style={{
                          padding: "20px",
                          backgroundColor: "#F8F9FA",
                          borderRadius: "12px",
                          height: "100%",
                        }}
                      >
                        <h4
                          style={{
                            fontSize: "18px",
                            fontWeight: 600,
                            color: "#1B1B1B",
                            marginBottom: "10px",
                          }}
                        >
                          Cum funcționează plățile?
                        </h4>
                        <p
                          style={{
                            fontSize: "14px",
                            color: "#424242",
                            marginBottom: 0,
                            lineHeight: "1.6",
                          }}
                        >
                          <strong>Pay-per-lead:</strong> Plăți unice de 3€ per cerere prin Stripe
                          Payment Intents (fără abonament). <strong>Premium:</strong> Abonament
                          lunar sau anual cu reînnoire automată prin Stripe Subscriptions. Toate
                          plățile sunt procesate securizat prin Stripe.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
