"use client";

import React from "react";
import Image from "next/image";
import type { CaseStudy } from "@/data/case-studies-data";

/**
 * Case Studies Card Component
 *
 * Individual case study card with detailed metrics and results.
 */
interface CaseStudiesCardProps {
  caseStudy: CaseStudy;
}

export default function CaseStudiesCard({ caseStudy }: CaseStudiesCardProps) {
  return (
    <div
      className="wow fadeInUp"
      data-wow-duration="1s"
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "16px",
        padding: "40px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.06)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Club Logo */}
      {caseStudy.logo && (
        <div style={{ marginBottom: "20px" }}>
          <Image
            src={caseStudy.logo}
            alt={`${caseStudy.clubName} logo`}
            width={120}
            height={40}
            style={{ objectFit: "contain" }}
          />
        </div>
      )}

      {/* Club Info */}
      <div style={{ marginBottom: "20px" }}>
        <h3
          style={{
            fontSize: "24px",
            fontWeight: 700,
            color: "#1B1B1B",
            marginBottom: "8px",
          }}
        >
          {caseStudy.clubName}
        </h3>
        <p
          style={{
            fontSize: "14px",
            color: "#6B6B6B",
            marginBottom: 0,
          }}
        >
          {caseStudy.location} · {caseStudy.sport}
          {caseStudy.author && ` · ${caseStudy.author}`}
        </p>
      </div>

      {/* Quote */}
      <p
        style={{
          fontSize: "16px",
          lineHeight: "1.8",
          color: "#424242",
          marginBottom: "20px",
          fontStyle: "italic",
          flex: 1,
        }}
      >
        &quot;{caseStudy.quote}&quot;
      </p>

      {/* Metrics Highlight */}
      <div
        style={{
          backgroundColor: "#EBFFFE",
          borderRadius: "12px",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <h4
          style={{
            fontSize: "18px",
            fontWeight: 600,
            color: "var(--bd-theme-1)",
            marginBottom: "15px",
          }}
        >
          📊 Metrici
        </h4>
        <div className="row g-3">
          <div className="col-6">
            <div style={{ fontSize: "14px", color: "#424242" }}>
              <strong>{caseStudy.metrics.leadsPerMonth}</strong> lead-uri/lună
            </div>
          </div>
          <div className="col-6">
            <div style={{ fontSize: "14px", color: "#424242" }}>
              <strong>{caseStudy.metrics.conversionRate}%</strong> conversie
            </div>
          </div>
          <div className="col-6">
            <div style={{ fontSize: "14px", color: "#424242" }}>
              <strong>{caseStudy.metrics.costPerLead.toFixed(2)} lei</strong> cost/lead
            </div>
          </div>
          <div className="col-6">
            <div style={{ fontSize: "14px", color: "#424242" }}>
              <strong>{caseStudy.metrics.enrollmentsPerMonth}</strong> înscrieri/lună
            </div>
          </div>
          {caseStudy.metrics.monthlySavings && (
            <div className="col-12">
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "var(--bd-theme-1)",
                }}
              >
                💰 Economisire: {caseStudy.metrics.monthlySavings.toFixed(0)} lei/lună
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Before/After Comparison */}
      {caseStudy.beforeAfter && (
        <div
          style={{
            backgroundColor: "#F8F9FA",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          <h4
            style={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#1B1B1B",
              marginBottom: "15px",
            }}
          >
            Comparație Înainte/După
          </h4>
          <div className="row g-3">
            <div className="col-6">
              <div style={{ fontSize: "13px", color: "#6B6B6B", marginBottom: "5px" }}>
                Înainte ({caseStudy.beforeAfter.before.source})
              </div>
              <div style={{ fontSize: "14px", color: "#424242" }}>
                <div>
                  {caseStudy.beforeAfter.before.leadsPerMonth} lead-uri ·{" "}
                  {caseStudy.beforeAfter.before.conversionRate}% conversie
                </div>
                <div>
                  {caseStudy.beforeAfter.before.costPerMonth} lei/lună ·{" "}
                  {caseStudy.beforeAfter.before.costPerLead.toFixed(2)} lei/lead
                </div>
              </div>
            </div>
            <div className="col-6">
              <div
                style={{
                  fontSize: "13px",
                  color: "var(--bd-theme-1)",
                  marginBottom: "5px",
                  fontWeight: 600,
                }}
              >
                După ({caseStudy.beforeAfter.after.source})
              </div>
              <div style={{ fontSize: "14px", color: "#424242" }}>
                <div>
                  {caseStudy.beforeAfter.after.leadsPerMonth} lead-uri ·{" "}
                  {caseStudy.beforeAfter.after.conversionRate}% conversie
                </div>
                <div>
                  {caseStudy.beforeAfter.after.costPerMonth} lei/lună ·{" "}
                  {caseStudy.beforeAfter.after.costPerLead.toFixed(2)} lei/lead
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {caseStudy.results.length > 0 && (
        <div style={{ marginBottom: "20px" }}>
          <h4
            style={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#1B1B1B",
              marginBottom: "12px",
            }}
          >
            Rezultate Concrete
          </h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {caseStudy.results.map((result, index) => (
              <li
                key={index}
                style={{
                  fontSize: "14px",
                  color: "#424242",
                  marginBottom: "8px",
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
                {result}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Verified Badge */}
      {caseStudy.isVerified && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "12px",
            color: "var(--bd-theme-1)",
            fontWeight: 600,
            marginTop: "auto",
          }}
        >
          <span>✓</span>
          <span>Verificat</span>
        </div>
      )}
    </div>
  );
}
