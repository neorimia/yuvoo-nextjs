"use client";

import React from "react";
import SectionTitle from "@/components/shared/SectionTitle";
import TrustCard, { TrustCardProps } from "@/components/shared/TrustCard";

/**
 * How It Works Technical Component
 *
 * Detailed technical information about verification, lead system, and platform.
 */
export default function HowItWorksTechnical() {
  const verificationSteps: TrustCardProps[] = [
    {
      id: 1,
      icon: "flaticon-badge",
      title: "Verificare Identitate Legală",
      description: "Confirmăm că clubul există legal și are toate documentele necesare",
    },
    {
      id: 2,
      icon: "flaticon-presentation",
      title: "Verificare Instalații și Echipamente",
      description: "Confirmăm că facilitățile sunt adecvate și sigure pentru copii",
    },
    {
      id: 3,
      icon: "flaticon-reading",
      title: "Verificare Calificări Antrenori",
      description: "Verificăm că antrenorii au calificările minime necesare",
    },
    {
      id: 4,
      icon: "flaticon-badge",
      title: "Verificare Protocoale de Siguranță",
      description: "Confirmăm că există protocoale clare pentru siguranța copiilor",
    },
    {
      id: 5,
      icon: "flaticon-presentation",
      title: "Review Intern Yuvoo",
      description: "Echipa noastră face o verificare finală și aprobă clubul",
    },
  ];

  return (
    <section className="pt-120 pb-70">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Verification Process */}
            <SectionTitle
              title="Procesul de Verificare"
              subtitle="Cum verificăm cluburile pentru a asigura calitate și siguranță"
              className="mb-50"
            />

            <div className="row bd-trust-cards-row mb-80">
              {verificationSteps.map((step) => (
                <TrustCard
                  key={step.id}
                  {...step}
                  columnClasses="col-lg-4 col-md-6 col-sm-10"
                  animationDelay={`${0.3 + (step.id - 1) * 0.1}s`}
                />
              ))}
            </div>

            <div
              className="mb-50 p-4"
              style={{
                backgroundColor: "#EBFFFE",
                borderRadius: "12px",
                border: "2px solid var(--bd-theme-1)",
              }}
            >
              <p style={{ fontSize: "16px", fontWeight: 600, marginBottom: "10px" }}>
                ⏱️ Durata procesului de verificare
              </p>
              <p style={{ marginBottom: 0 }}>
                Procesul complet de verificare durează <strong>1-2 săptămâni</strong>. În call-ul
                inițial de 15 minute, configurăm împreună profilul complet. Apoi echipa noastră
                verifică toate aspectele și te ține la curent cu progresul.
              </p>
            </div>

            {/* Lead System */}
            <SectionTitle
              title="Sistemul de Lead-uri"
              subtitle="Cum funcționează cererile de părinți și cum le primești"
              className="mb-50"
            />

            <div className="row g-4 mb-50">
              <div className="col-md-6">
                <div
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "16px",
                    padding: "30px",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.06)",
                    height: "100%",
                    border: "2px solid #E6E6E6",
                  }}
                >
                  <h4
                    style={{
                      fontSize: "20px",
                      fontWeight: 700,
                      color: "#1B1B1B",
                      marginBottom: "20px",
                    }}
                  >
                    📨 Crearea Lead-urilor
                  </h4>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    <li
                      style={{
                        fontSize: "14px",
                        color: "#424242",
                        marginBottom: "12px",
                        paddingLeft: "24px",
                        position: "relative",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          color: "var(--bd-theme-1)",
                        }}
                      >
                        •
                      </span>
                      Părintele completează quiz-ul AI și primește recomandări
                    </li>
                    <li
                      style={{
                        fontSize: "14px",
                        color: "#424242",
                        marginBottom: "12px",
                        paddingLeft: "24px",
                        position: "relative",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          color: "var(--bd-theme-1)",
                        }}
                      >
                        •
                      </span>
                      Vede clubul tău în listă și trimite o cerere de informații
                    </li>
                    <li
                      style={{
                        fontSize: "14px",
                        color: "#424242",
                        marginBottom: "12px",
                        paddingLeft: "24px",
                        position: "relative",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          color: "var(--bd-theme-1)",
                        }}
                      >
                        •
                      </span>
                      Sistemul creează automat un lead pre-calificat cu toate detaliile
                    </li>
                    <li
                      style={{
                        fontSize: "14px",
                        color: "#424242",
                        marginBottom: 0,
                        paddingLeft: "24px",
                        position: "relative",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          color: "var(--bd-theme-1)",
                        }}
                      >
                        •
                      </span>
                      Primești notificare în dashboard și pe email
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-md-6">
                <div
                  style={{
                    backgroundColor: "#EBFFFE",
                    borderRadius: "16px",
                    padding: "30px",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.06)",
                    height: "100%",
                    border: "2px solid var(--bd-theme-1)",
                  }}
                >
                  <h4
                    style={{
                      fontSize: "20px",
                      fontWeight: 700,
                      color: "var(--bd-theme-1)",
                      marginBottom: "20px",
                    }}
                  >
                    💰 Sistemul de Plată
                  </h4>
                  <div style={{ fontSize: "14px", color: "#424242", lineHeight: "1.8" }}>
                    <p style={{ marginBottom: "15px" }}>
                      <strong>Pay-per-lead:</strong> Plătești <strong>3€ per cerere</strong> (plată
                      unică prin Stripe Payment Intents). Ideal dacă primești rar cereri.
                    </p>
                    <p style={{ marginBottom: 0 }}>
                      <strong>Premium:</strong> Abonament <strong>99 lei/lună</strong> sau{" "}
                      <strong>990 lei/an</strong> pentru acces nelimitat. Dacă primești mai mult de
                      3 cereri pe lună, Premium se plătește singur.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Platform Features */}
            <SectionTitle
              title="Platforma și Dashboard-ul"
              subtitle="Cum gestionezi lead-urile și profilul clubului"
              className="mb-50"
            />

            <div className="row g-4">
              <div className="col-md-4">
                <div
                  style={{
                    backgroundColor: "#F8F9FA",
                    borderRadius: "12px",
                    padding: "24px",
                    height: "100%",
                  }}
                >
                  <h5
                    style={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "#1B1B1B",
                      marginBottom: "12px",
                    }}
                  >
                    📊 Dashboard
                  </h5>
                  <p style={{ fontSize: "14px", color: "#424242", marginBottom: 0 }}>
                    Vezi toate lead-urile într-un singur loc, cu statusuri clare și filtrare
                    avansată.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div
                  style={{
                    backgroundColor: "#F8F9FA",
                    borderRadius: "12px",
                    padding: "24px",
                    height: "100%",
                  }}
                >
                  <h5
                    style={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "#1B1B1B",
                      marginBottom: "12px",
                    }}
                  >
                    📧 Notificări
                  </h5>
                  <p style={{ fontSize: "14px", color: "#424242", marginBottom: 0 }}>
                    Primești notificări instant pe email când un părinte trimite o cerere.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div
                  style={{
                    backgroundColor: "#F8F9FA",
                    borderRadius: "12px",
                    padding: "24px",
                    height: "100%",
                  }}
                >
                  <h5
                    style={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "#1B1B1B",
                      marginBottom: "12px",
                    }}
                  >
                    ⏰ Expirare Lead-uri
                  </h5>
                  <p style={{ fontSize: "14px", color: "#424242", marginBottom: 0 }}>
                    Lead-urile expiră după 5 zile dacă nu sunt acceptate. Ai timp suficient să
                    răspunzi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
