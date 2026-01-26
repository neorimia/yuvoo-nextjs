"use client";

import React from "react";
import SectionTitle from "@/components/shared/SectionTitle";

/**
 * ROI Calculator Comparison Component
 *
 * Displays a detailed comparison table between Yuvoo Premium and Google/Facebook Ads.
 * Part of the ROI Calculator standalone page.
 */
export default function ROICalculatorComparison() {
  return (
    <div className="row justify-content-center">
      <div className="col-lg-10">
        <SectionTitle
          title="Comparație Yuvoo vs. Google/Facebook Ads"
          subtitle="Vezi diferențele clare între cele două abordări"
          className="mb-50"
        />

        <div className="table-responsive">
          <table className="table table-bordered" style={{ backgroundColor: "#FFFFFF" }}>
            <thead>
              <tr>
                <th style={{ width: "25%" }}>Metrică</th>
                <th style={{ width: "37.5%", backgroundColor: "#EBFFFE" }}>Yuvoo Premium</th>
                <th style={{ width: "37.5%" }}>Google/Facebook Ads</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Cost lunar</strong>
                </td>
                <td style={{ backgroundColor: "#EBFFFE" }}>
                  <strong style={{ color: "var(--bd-theme-1)" }}>99 lei/lună</strong>
                </td>
                <td>Variabil (500-2000+ lei/lună)</td>
              </tr>
              <tr>
                <td>
                  <strong>Tip lead-uri</strong>
                </td>
                <td style={{ backgroundColor: "#EBFFFE" }}>
                  <strong>Pre-calificați prin AI</strong>
                </td>
                <td>Generice (fără filtrare)</td>
              </tr>
              <tr>
                <td>
                  <strong>Conversie medie</strong>
                </td>
                <td style={{ backgroundColor: "#EBFFFE" }}>
                  <strong style={{ color: "var(--bd-theme-1)" }}>60-80%</strong>
                </td>
                <td>15-25%</td>
              </tr>
              <tr>
                <td>
                  <strong>Cost per lead</strong>
                </td>
                <td style={{ backgroundColor: "#EBFFFE" }}>
                  <strong style={{ color: "var(--bd-theme-1)" }}>~10 lei</strong>
                  <br />
                  <small>(99 lei / 10 lead-uri)</small>
                </td>
                <td>50-200 lei/lead</td>
              </tr>
              <tr>
                <td>
                  <strong>Cost per înscriere</strong>
                </td>
                <td style={{ backgroundColor: "#EBFFFE" }}>
                  <strong style={{ color: "var(--bd-theme-1)" }}>~12-16 lei</strong>
                </td>
                <td>200-800 lei/înscriere</td>
              </tr>
              <tr>
                <td>
                  <strong>Timp economisit</strong>
                </td>
                <td style={{ backgroundColor: "#EBFFFE" }}>
                  <strong style={{ color: "var(--bd-theme-1)" }}>~5-10 ore/lună</strong>
                </td>
                <td>0 ore (același timp pe lead-uri necalificate)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          className="mt-40 p-4"
          style={{
            backgroundColor: "#EBFFFE",
            borderRadius: "12px",
            border: "2px solid var(--bd-theme-1)",
          }}
        >
          <p style={{ fontSize: "18px", fontWeight: 600, marginBottom: "10px" }}>💡 Concluzie</p>
          <p style={{ marginBottom: 0 }}>
            Cu Yuvoo Premium, economisești <strong>400-1900 lei/lună</strong> și{" "}
            <strong>5-10 ore de timp</strong>, obținând în același timp lead-uri de calitate
            superioară cu conversie de 3-4x mai mare.
          </p>
        </div>
      </div>
    </div>
  );
}
