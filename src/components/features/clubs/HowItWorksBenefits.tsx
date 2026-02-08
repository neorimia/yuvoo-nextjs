"use client";

import React from "react";
import SectionTitle from "@/components/shared/SectionTitle";

/**
 * How It Works Benefits Component
 *
 * Highlights the key benefits of using Yuvoo's system.
 */
export default function HowItWorksBenefits() {
  const benefits = [
    {
      title: "Lead-uri Pre-calificate",
      description:
        "Părinții care te contactează au deja completat un quiz AI și știu că sportul tău este potrivit pentru copilul lor. Conversia este de 3-4x mai mare.",
      icon: "✓",
    },
    {
      title: "Mai Puțin Timp Pierdut",
      description:
        "Nu mai răspunzi la mesaje de la părinți care nu se potrivesc. Filtrarea se face automat prin AI înainte să ajungă la tine.",
      icon: "⏱️",
    },
    {
      title: "Costuri Predictibile",
      description:
        "Fie plătești 3€ per lead (pay-per-lead), fie 99,99 RON/lună pentru Premium (acces nelimitat). Fără surprize, fără costuri ascunse.",
      icon: "💰",
    },
    {
      title: "Verificare și Credibilitate",
      description:
        "Badge-ul de verificare Yuvoo îți crește credibilitatea în fața părinților și te diferențiază de concurență.",
      icon: "🏆",
    },
  ];

  return (
    <section className="pt-70 pb-70" style={{ backgroundColor: "#F8F9FA" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <SectionTitle
              title="De Ce Yuvoo?"
              subtitle="Beneficiile sistemului Yuvoo pentru cluburile sportive"
              className="mb-50"
            />

            <div className="row g-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="col-md-6">
                  <div
                    className="wow fadeInUp"
                    data-wow-duration="1s"
                    data-wow-delay={`${0.3 + index * 0.1}s`}
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: "16px",
                      padding: "30px",
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.06)",
                      height: "100%",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "32px",
                        marginBottom: "15px",
                      }}
                    >
                      {benefit.icon}
                    </div>
                    <h4
                      style={{
                        fontSize: "20px",
                        fontWeight: 700,
                        color: "#1B1B1B",
                        marginBottom: "12px",
                      }}
                    >
                      {benefit.title}
                    </h4>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#424242",
                        marginBottom: 0,
                        lineHeight: "1.6",
                      }}
                    >
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
