"use client";

import React from "react";
import SectionTitle from "@/components/shared/SectionTitle";
import { getAggregateMetrics, getVerifiedCaseStudies } from "@/data/case-studies-data";

/**
 * Case Studies Metrics Component
 *
 * Displays aggregate metrics from all verified case studies.
 */
export default function CaseStudiesMetrics() {
  const verifiedCaseStudies = getVerifiedCaseStudies();
  const metrics = getAggregateMetrics();

  // If no case studies, show placeholder message
  if (verifiedCaseStudies.length === 0) {
    return (
      <section className="pt-70 pb-70" style={{ backgroundColor: "#F8F9FA" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <p style={{ fontSize: "16px", color: "#6B6B6B" }}>
                Case studies-urile vor fi adăugate după ce cluburile Founding vor folosi Yuvoo
                pentru 2-3 luni și vor avea rezultate concrete de raportat.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-70 pb-70" style={{ backgroundColor: "#F8F9FA" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <SectionTitle
              title="Metrici Agregate"
              subtitle={`Bazate pe ${verifiedCaseStudies.length} case studies verificate`}
              className="mb-50"
            />

            <div className="row g-4">
              <div className="col-md-4">
                <div
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "16px",
                    padding: "30px",
                    textAlign: "center",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.06)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "48px",
                      fontWeight: 700,
                      color: "var(--bd-theme-1)",
                      marginBottom: "10px",
                    }}
                  >
                    {metrics.avgLeadsPerMonth.toFixed(1)}
                  </div>
                  <div style={{ fontSize: "16px", color: "#424242", fontWeight: 600 }}>
                    Lead-uri/lună (medie)
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "16px",
                    padding: "30px",
                    textAlign: "center",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.06)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "48px",
                      fontWeight: 700,
                      color: "var(--bd-theme-1)",
                      marginBottom: "10px",
                    }}
                  >
                    {metrics.avgConversionRate.toFixed(1)}%
                  </div>
                  <div style={{ fontSize: "16px", color: "#424242", fontWeight: 600 }}>
                    Rata de conversie (medie)
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div
                  style={{
                    backgroundColor: "#EBFFFE",
                    borderRadius: "16px",
                    padding: "30px",
                    textAlign: "center",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.06)",
                    border: "2px solid var(--bd-theme-1)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "48px",
                      fontWeight: 700,
                      color: "var(--bd-theme-1)",
                      marginBottom: "10px",
                    }}
                  >
                    {metrics.avgCostPerLead.toFixed(2)} lei
                  </div>
                  <div style={{ fontSize: "16px", color: "#424242", fontWeight: 600 }}>
                    Cost/lead (medie)
                  </div>
                </div>
              </div>

              {metrics.totalMonthlySavings > 0 && (
                <div className="col-md-6">
                  <div
                    style={{
                      backgroundColor: "#FFF6EB",
                      borderRadius: "16px",
                      padding: "30px",
                      textAlign: "center",
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.06)",
                      border: "2px solid var(--bd-theme-2)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "48px",
                        fontWeight: 700,
                        color: "var(--bd-theme-2)",
                        marginBottom: "10px",
                      }}
                    >
                      {metrics.totalMonthlySavings.toFixed(0)} lei
                    </div>
                    <div style={{ fontSize: "16px", color: "#424242", fontWeight: 600 }}>
                      Economii totale/lună
                    </div>
                  </div>
                </div>
              )}

              {metrics.totalTimeSavedHours > 0 && (
                <div className="col-md-6">
                  <div
                    style={{
                      backgroundColor: "#FFF6EB",
                      borderRadius: "16px",
                      padding: "30px",
                      textAlign: "center",
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.06)",
                      border: "2px solid var(--bd-theme-2)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "48px",
                        fontWeight: 700,
                        color: "var(--bd-theme-2)",
                        marginBottom: "10px",
                      }}
                    >
                      {metrics.totalTimeSavedHours.toFixed(0)} ore
                    </div>
                    <div style={{ fontSize: "16px", color: "#424242", fontWeight: 600 }}>
                      Timp economisit total/lună
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
