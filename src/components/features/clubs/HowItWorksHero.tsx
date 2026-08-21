"use client";

import React from "react";
import SectionTitle from "@/components/shared/SectionTitle";

/**
 * How It Works Hero Component
 *
 * Hero section for the "How It Works" page.
 * Provides overview and introduction to the detailed process.
 */
export default function HowItWorksHero() {
  return (
    <section className="bd-hero-area bd-hero-area-3 fix pt-120 pb-70">
      <div className="bd-gradient-bg"></div>
      <div className="container">
        <div className="bd-hero-inner-3">
          <div className="row align-items-center">
            <div className="col-lg-10 col-xl-9 mx-auto">
              <div className="bd-hero-content text-center">
                <SectionTitle
                  headingLevel={1}
                  title="Cum Funcționează Yuvoo"
                  subtitle="Procesul complet de la verificare la lead-uri pre-calificate"
                  className="mb-30"
                />
                <p
                  style={{
                    fontSize: "16px",
                    color: "#6B6B6B",
                    marginBottom: "30px",
                    lineHeight: "1.8",
                  }}
                >
                  Yuvoo conectează cluburi sportive verificate cu părinți pre-calificați prin AI. În
                  acest ghid vei descoperi procesul complet: de la verificarea clubului tău până la
                  primirea lead-urilor calificate și gestionarea lor în platformă.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
