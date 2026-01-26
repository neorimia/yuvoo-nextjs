"use client";

import React from "react";
import SectionTitle from "@/components/shared/SectionTitle";

/**
 * How It Works Process Component
 *
 * Expanded 4-step process explanation with detailed information.
 * More detailed than the landing page version.
 */
export default function HowItWorksProcess() {
  const detailedSteps = [
    {
      id: 1,
      icon: "flaticon-reading",
      title: "Părintele completează un quiz AI",
      description: "3 minute despre copil",
      details: [
        "Părintele răspunde la întrebări despre copil: vârstă, personalitate, preferințe, experiență sportivă",
        "Quiz-ul analizează compatibilitatea cu diferite sporturi folosind algoritmi AI",
        "Rezultatele sunt generate în timp real și personalizate pentru fiecare copil",
      ],
    },
    {
      id: 2,
      icon: "flaticon-presentation",
      title: "Primește sporturile compatibile",
      description: "Cu vârsta și personalitatea copilului",
      details: [
        "Sistemul recomandă 3-5 sporturi potrivite, cu explicații detaliate",
        "Fiecare recomandare include: de ce este potrivit, beneficii, și ce să aștepte",
        "Părintele vede doar sporturi care se potrivesc cu profilul copilului",
      ],
    },
    {
      id: 3,
      icon: "flaticon-badge",
      title: "Vede doar cluburi verificate",
      description: "Care se potrivesc cu sportul și vârsta copilului",
      details: [
        "Părintele vede doar cluburi verificate de Yuvoo (badge de verificare)",
        "Filtrare automată: doar cluburi care acceptă vârsta copilului și oferă sportul recomandat",
        "Informații complete: program, prețuri, locație, antrenori, recenzii",
      ],
    },
    {
      id: 4,
      icon: "flaticon-phone-call",
      title: "Ești contactat doar de părinți potriviți",
      description: "Părinți care se potrivesc cu sportul și vârsta copilului",
      details: [
        "Părintele trimite o cerere de informații prin platformă",
        "Tu primești un lead pre-calificat cu toate detaliile relevante",
        "Conversia este mult mai mare (60-80% vs. 15-25%) pentru că părintele știe deja că sportul este potrivit",
      ],
    },
  ];

  return (
    <section className="pt-120 pb-70" style={{ backgroundColor: "#FFF6EB" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-9">
            <SectionTitle
              title="Procesul în 4 Pași (detaliat)"
              subtitle="De la quiz AI la lead-uri pre-calificate"
              className="mb-50"
            />

            {detailedSteps.map((step, index) => (
              <div
                key={step.id}
                className="wow fadeInUp mb-50"
                data-wow-duration="1s"
                data-wow-delay={`${0.3 + index * 0.1}s`}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "16px",
                  padding: "40px",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.06)",
                }}
              >
                <div className="row align-items-center">
                  <div className="col-md-2 text-center mb-3 mb-md-0">
                    <div
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                        backgroundColor: "#EBFFFE",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto",
                        border: "3px solid var(--bd-theme-1)",
                      }}
                    >
                      <i
                        className={step.icon}
                        style={{
                          fontSize: "36px",
                          color: "var(--bd-theme-1)",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "var(--bd-theme-1)",
                        marginTop: "10px",
                      }}
                    >
                      Pasul {step.id}
                    </div>
                  </div>
                  <div className="col-md-10">
                    <h3
                      style={{
                        fontSize: "24px",
                        fontWeight: 700,
                        color: "#1B1B1B",
                        marginBottom: "10px",
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "16px",
                        color: "#6B6B6B",
                        marginBottom: "20px",
                      }}
                    >
                      {step.description}
                    </p>
                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                      }}
                    >
                      {step.details.map((detail, detailIndex) => (
                        <li
                          key={detailIndex}
                          style={{
                            fontSize: "14px",
                            color: "#424242",
                            marginBottom: "10px",
                            paddingLeft: "24px",
                            position: "relative",
                          }}
                        >
                          <span
                            style={{
                              position: "absolute",
                              left: 0,
                              color: "var(--bd-theme-1)",
                              fontWeight: 600,
                            }}
                          >
                            ✓
                          </span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
