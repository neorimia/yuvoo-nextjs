"use client";
import React from "react";
import Link from "next/link";
import SectionTitle from "@/components/shared/SectionTitle";
import TrustCard, { TrustCardProps } from "@/components/shared/TrustCard";
import { openClubsPremiumMailto } from "@/lib/clubs-landing-modal";
import { PostHogEvents, trackEvent } from "@/lib/analytics/tracking";
import { routes } from "@/lib/routes";

/**
 * Clubs Landing Benefits Section
 *
 * Displays the benefits of joining as a Founding Club and eligibility requirements.
 * Part of the clubs landing page (/pentru-cluburi).
 */
export default function ClubsLandingBenefits() {
  const benefits: TrustCardProps[] = [
    {
      id: 1,
      icon: "fa-solid fa-gift",
      title: "Profil complet GRATUIT – 6 luni",
      description: "valoare echivalentă cu 594 lei (99 lei/lună × 6 luni)",
    },
    {
      id: 2,
      icon: "fa-solid fa-certificate",
      title: 'Badge "Verified Founding Club"',
      description: "distincție exclusivă pentru primele 15 cluburi",
    },
    {
      id: 3,
      icon: "fa-solid fa-globe",
      title: "Pagină publică optimizată SEO",
      description: "site web propriu, găsit ușor de părinți pe Google",
    },
    {
      id: 4,
      icon: "fa-solid fa-star",
      title: "Prioritate în rezultate",
      description: "afișat primul când părinții caută sportul tău",
    },
    {
      id: 5,
      icon: "fa-solid fa-users",
      title: "Părinți pre-calificați prin AI",
      description: "cereri de părinți care știu că sportul tău este potrivit pentru copilul lor",
    },
    {
      id: 6,
      icon: "fa-solid fa-user-plus",
      title: "Cereri reale, nu spam",
      description: "părinți care au completat quiz-ul AI și au primit recomandări personalizate",
    },
    {
      id: 7,
      icon: "fa-solid fa-comments",
      title: "Feedback direct",
      description: "ajută-ne să îmbunătățim calitatea cererilor pentru toți",
    },
    {
      id: 8,
      icon: "fa-solid fa-chart-line",
      title: "Analiză și statistici",
      description: "vezi câți părinți vizitează profilul și câte cereri primești",
    },
    {
      id: 9,
      icon: "fa-solid fa-headset",
      title: "Suport dedicat",
      description: "asistență personalizată de la echipa Yuvoo pentru configurarea profilului",
    },
  ];

  const requirements = [
    "Profil complet al clubului (sporturi oferite, vârste acceptate, locație, contact, program)",
    "Confirmarea identității legale și a calificărilor antrenorilor (diplome, certificări)",
    "Verificarea protocolurilor de siguranță pentru copii (spații, echipamente, proceduri)",
    "Disponibilitate pentru un call de 15 minute pentru configurarea profilului și onboarding",
    "Feedback periodic despre calitatea cererilor (opțional, dar apreciat)",
    "Disponibilitate pentru un mini-testimonial după primele 2-3 luni (dacă experiența e pozitivă)",
  ];

  const eligibleTypes = [
    "Cluburi de înot, fotbal, baschet, tenis, gimnastică, dans și alte sporturi pentru copii",
    "Grupe dedicate pentru copii între 4 și 14 ani (nu doar adulți)",
    "Minim 2 ani de activitate continuă și experiență cu copii",
    "Reviews pozitive de la părinți și focus clar pe siguranță copiilor",
  ];

  const nonEligibleTypes = [
    "Cluburi exclusiv pentru adulți (fără programe pentru copii)",
    "Sporturi ultra-niche sau experimentale (în faza MVP)",
    "Organizații care caută exclusivitate sau volume mari instant (nu suntem agenție de marketing)",
  ];

  const handleCTAClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Track event
    trackEvent(PostHogEvents.CLUBS_LANDING_CTA_CLICKED, {
      location: "benefits",
      cta_text: "Începe acum - 6 luni gratuite",
    });

    // Open modal
    openClubsPremiumMailto("benefits", "Începe acum - 6 luni gratuite");
  };

  return (
    <>
      {/* Benefits Section */}
      <section className="bd-clubs-landing-benefits pt-120 pb-70">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              {/* Section Title */}
              <SectionTitle
                title="Ce primești ca Founding Club"
                subtitle={
                  <>
                    Program gratuit 6 luni, limitat doar pentru{" "}
                    <strong style={{ color: "var(--bd-theme-1)" }}>15 cluburi / România</strong>
                    <br />
                    <span style={{ fontSize: "16px", fontWeight: 400, color: "#6B6B6B" }}>
                      Acces la cereri de părinți pre-calificați prin sistemul AI Yuvoo
                    </span>
                  </>
                }
                className="mb-50"
                animationDelay=".3s"
              />

              {/* Benefits List */}
              <div className="wow fadeInUp" data-wow-duration="1s" data-wow-delay=".4s">
                <div className="row bd-trust-cards-row mb-50">
                  {benefits.map((benefit) => (
                    <TrustCard
                      key={benefit.id}
                      {...benefit}
                      columnClasses="col-lg-4 col-md-6 col-sm-10"
                      animationDelay={`${0.4 + (benefit.id - 1) * 0.1}s`}
                    />
                  ))}
                </div>
              </div>

              {/* Requirements Section */}
              <div className="wow fadeInUp" data-wow-duration="1s" data-wow-delay=".6s">
                <div
                  style={{
                    backgroundColor: "#EBFFFE",
                    borderRadius: "16px",
                    padding: "30px",
                    marginBottom: "30px",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "22px",
                      fontWeight: 700,
                      color: "#1B1B1B",
                      marginBottom: "20px",
                    }}
                  >
                    🧩 Ce cerem:
                  </h3>
                  <ul
                    className="list-unstyled"
                    style={{
                      fontSize: "16px",
                      lineHeight: "28px",
                      color: "#424242",
                      marginBottom: 0,
                    }}
                  >
                    {requirements.map((req, index) => (
                      <li
                        key={index}
                        className="mb-2 d-flex align-items-start"
                        style={{ paddingLeft: "25px", position: "relative" }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            left: 0,
                            top: "0",
                            color: "var(--bd-theme-1)",
                            fontSize: "18px",
                            fontWeight: 600,
                          }}
                        >
                          •
                        </span>
                        <span style={{ lineHeight: "28px", marginTop: "2px" }}>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Closing Statement */}
              <div
                className="wow fadeInUp text-center"
                data-wow-duration="1s"
                data-wow-delay=".7s"
                style={{
                  padding: "30px",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "16px",
                  border: "2px solid var(--bd-theme-1)",
                }}
              >
                <p
                  style={{
                    fontSize: "22px",
                    fontWeight: 600,
                    color: "#1B1B1B",
                    marginBottom: "15px",
                    lineHeight: "1.5",
                  }}
                >
                  Zero costuri. Zero riscuri. Zero compromisuri.
                </p>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#6B6B6B",
                    marginBottom: "20px",
                    lineHeight: "1.6",
                  }}
                >
                  Nu mai sunt locuri disponibile în programul Founding Club?{" "}
                  <Link
                    href={routes.club.premium}
                    style={{
                      color: "var(--bd-theme-1)",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    Upgrade la Premium
                  </Link>{" "}
                  pentru acces nelimitat la cereri de părinți pre-calificați (99 lei/lună sau 990
                  lei/an)
                </p>
                {/* Primary CTA Button */}
                <div
                  className="bd-hero-btn mt-4 wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay=".8s"
                >
                  <button type="button" className="bd-btn mx-auto" onClick={handleCTAClick}>
                    <span className="bd-btn-inner">
                      <span className="bd-btn-normal">Începe acum - 6 luni gratuite</span>
                      <span className="bd-btn-hover">Începe acum - 6 luni gratuite</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="bd-clubs-landing-eligibility pt-70 pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-xl-9">
              {/* Section Title */}
              <SectionTitle
                title="Pentru ce tipuri de cluburi este Yuvoo?"
                className="mb-50"
                animationDelay=".3s"
              />

              <div className="row g-4">
                {/* Eligible Types */}
                <div className="col-lg-6 col-md-6">
                  <div
                    className="wow fadeInUp"
                    data-wow-duration="1s"
                    data-wow-delay=".4s"
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: "16px",
                      padding: "30px",
                      height: "100%",
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.06)",
                      border: "2px solid #00BBAE",
                    }}
                  >
                    <h4
                      style={{
                        fontSize: "20px",
                        fontWeight: 700,
                        color: "#1B1B1B",
                        marginBottom: "20px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <i
                        className="fa-solid fa-check-circle"
                        style={{ marginRight: "10px", fontSize: "24px", color: "#00BBAE" }}
                      ></i>
                      Este pentru:
                    </h4>
                    <ul
                      className="list-unstyled"
                      style={{
                        fontSize: "16px",
                        lineHeight: "28px",
                        color: "#424242",
                        marginBottom: 0,
                      }}
                    >
                      {eligibleTypes.map((type, index) => (
                        <li
                          key={index}
                          className="mb-2 d-flex align-items-start"
                          style={{ paddingLeft: "25px", position: "relative" }}
                        >
                          <span
                            style={{
                              position: "absolute",
                              left: 0,
                              top: "0",
                              color: "#00BBAE",
                              fontSize: "18px",
                              fontWeight: 600,
                            }}
                          >
                            ✓
                          </span>
                          <span>{type}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Non-Eligible Types */}
                <div className="col-lg-6 col-md-6">
                  <div
                    className="wow fadeInUp"
                    data-wow-duration="1s"
                    data-wow-delay=".5s"
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: "16px",
                      padding: "30px",
                      height: "100%",
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.06)",
                      border: "2px solid #E6E6E6",
                    }}
                  >
                    <h4
                      style={{
                        fontSize: "20px",
                        fontWeight: 700,
                        color: "#1B1B1B",
                        marginBottom: "20px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <i
                        className="fa-solid fa-times-circle"
                        style={{ marginRight: "10px", fontSize: "24px", color: "#999999" }}
                      ></i>
                      NU este pentru:
                    </h4>
                    <ul
                      className="list-unstyled"
                      style={{
                        fontSize: "16px",
                        lineHeight: "28px",
                        color: "#6B6B6B",
                        marginBottom: 0,
                      }}
                    >
                      {nonEligibleTypes.map((type, index) => (
                        <li
                          key={index}
                          className="mb-2 d-flex align-items-start"
                          style={{ paddingLeft: "25px", position: "relative" }}
                        >
                          <span
                            style={{
                              position: "absolute",
                              left: 0,
                              top: "0",
                              color: "#999999",
                              fontSize: "18px",
                              fontWeight: 600,
                            }}
                          >
                            ✗
                          </span>
                          <span>{type}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
