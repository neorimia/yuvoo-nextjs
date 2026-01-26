"use client";

import React from "react";
import SectionTitle from "@/components/shared/SectionTitle";
import { getVerifiedCaseStudies } from "@/data/case-studies-data";
import CaseStudiesCard from "./CaseStudiesCard";

/**
 * Case Studies List Component
 *
 * Displays all verified case studies in a grid layout.
 */
export default function CaseStudiesList() {
  const caseStudies = getVerifiedCaseStudies();

  if (caseStudies.length === 0) {
    return (
      <section className="pt-70 pb-70">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <SectionTitle
                title="Case Studies"
                subtitle="Case studies-urile vor fi adăugate după ce cluburile Founding vor avea rezultate concrete"
                className="mb-50"
              />
              <div
                style={{
                  backgroundColor: "#F8F9FA",
                  borderRadius: "16px",
                  padding: "60px 40px",
                }}
              >
                <p style={{ fontSize: "18px", color: "#6B6B6B", marginBottom: 0 }}>
                  Case studies-urile cu metrici reale vor fi disponibile după ce cluburile Founding
                  vor folosi Yuvoo pentru 2-3 luni și vor avea rezultate concrete de raportat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-70 pb-70">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <SectionTitle
              title="Case Studies Complete"
              subtitle={`${caseStudies.length} case studies verificate cu metrici reale`}
              className="mb-50"
            />

            <div className="row g-4">
              {caseStudies.map((caseStudy) => (
                <div key={caseStudy.id} className="col-lg-6">
                  <CaseStudiesCard caseStudy={caseStudy} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
