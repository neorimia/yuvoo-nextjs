"use client";

import React, { useState, useMemo } from "react";

/**
 * Clubs Landing ROI Calculator Component
 *
 * Interactive ROI calculator that allows clubs to calculate ROI and compare costs
 * between Yuvoo Premium and Google/Facebook ads.
 * Part of the clubs landing page (/pentru-cluburi).
 */
export default function ClubsLandingROICalculator() {
  const [leadsPerMonth, setLeadsPerMonth] = useState<number>(10);
  const [conversionRate, setConversionRate] = useState<number>(15);
  const [adsCostPerMonth, setAdsCostPerMonth] = useState<number>(500);

  // Calculate ROI
  const calculations = useMemo(() => {
    // Google/Facebook Ads calculations
    const adsLeadsPerMonth = leadsPerMonth;
    const adsConversionsPerMonth = Math.round((adsLeadsPerMonth * conversionRate) / 100);
    const adsCostPerLead = adsCostPerMonth > 0 ? adsCostPerMonth / adsLeadsPerMonth : 0;
    const adsCostPerConversion =
      adsConversionsPerMonth > 0 ? adsCostPerMonth / adsConversionsPerMonth : 0;

    // Yuvoo Premium calculations (assumed higher conversion rate due to pre-qualification)
    // Industry data suggests pre-qualified leads convert 3-4x better
    const yuvooConversionRate = Math.min(conversionRate * 3, 80); // Cap at 80%
    const yuvooLeadsPerMonth = leadsPerMonth; // Same number of leads
    const yuvooConversionsPerMonth = Math.round((yuvooLeadsPerMonth * yuvooConversionRate) / 100);
    const yuvooCostPerMonth = 99; // Premium monthly cost
    const yuvooCostPerLead = yuvooLeadsPerMonth > 0 ? yuvooCostPerMonth / yuvooLeadsPerMonth : 0;
    const yuvooCostPerConversion =
      yuvooConversionsPerMonth > 0 ? yuvooCostPerMonth / yuvooConversionsPerMonth : 0;

    // Savings calculations
    const monthlySavings = adsCostPerMonth - yuvooCostPerMonth;
    const costPerConversionSavings = adsCostPerConversion - yuvooCostPerConversion;
    const additionalConversions = yuvooConversionsPerMonth - adsConversionsPerMonth;
    const timeSavedHours = Math.round(adsLeadsPerMonth * 0.5); // Assume 30 min per unqualified lead

    return {
      ads: {
        leadsPerMonth: adsLeadsPerMonth,
        conversionsPerMonth: adsConversionsPerMonth,
        costPerMonth: adsCostPerMonth,
        costPerLead: adsCostPerLead,
        costPerConversion: adsCostPerConversion,
        conversionRate: conversionRate,
      },
      yuvoo: {
        leadsPerMonth: yuvooLeadsPerMonth,
        conversionsPerMonth: yuvooConversionsPerMonth,
        costPerMonth: yuvooCostPerMonth,
        costPerLead: yuvooCostPerLead,
        costPerConversion: yuvooCostPerConversion,
        conversionRate: yuvooConversionRate,
      },
      savings: {
        monthlySavings,
        costPerConversionSavings,
        additionalConversions,
        timeSavedHours,
      },
    };
  }, [leadsPerMonth, conversionRate, adsCostPerMonth]);

  return (
    <div
      className="wow fadeInUp"
      data-wow-duration="1s"
      data-wow-delay=".6s"
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "16px",
        padding: "40px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.06)",
        marginBottom: "40px",
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
        💡 Calculează ROI-ul tău cu Yuvoo
      </h3>
      <p
        style={{
          fontSize: "16px",
          color: "#6B6B6B",
          marginBottom: "30px",
          textAlign: "center",
        }}
      >
        Completează datele tale actuale și vezi cât poți economisi cu lead-uri pre-calificate
      </p>

      {/* Input Section */}
      <div className="row g-4 mb-40">
        <div className="col-md-4">
          <label
            htmlFor="leads-per-month"
            style={{
              fontSize: "16px",
              fontWeight: 600,
              color: "#1B1B1B",
              marginBottom: "10px",
              display: "block",
            }}
          >
            Câte lead-uri primești pe lună din Google/Facebook?
          </label>
          <input
            id="leads-per-month"
            type="number"
            min="0"
            max="1000"
            value={leadsPerMonth}
            onChange={(e) => setLeadsPerMonth(parseInt(e.target.value) || 0)}
            style={{
              width: "100%",
              padding: "12px 16px",
              fontSize: "16px",
              border: "2px solid #E6E6E6",
              borderRadius: "8px",
              color: "#1B1B1B",
            }}
          />
        </div>
        <div className="col-md-4">
          <label
            htmlFor="conversion-rate"
            style={{
              fontSize: "16px",
              fontWeight: 600,
              color: "#1B1B1B",
              marginBottom: "10px",
              display: "block",
            }}
          >
            Câte se convertesc în înscrieri? (%)
          </label>
          <input
            id="conversion-rate"
            type="number"
            min="0"
            max="100"
            value={conversionRate}
            onChange={(e) => setConversionRate(parseInt(e.target.value) || 0)}
            style={{
              width: "100%",
              padding: "12px 16px",
              fontSize: "16px",
              border: "2px solid #E6E6E6",
              borderRadius: "8px",
              color: "#1B1B1B",
            }}
          />
        </div>
        <div className="col-md-4">
          <label
            htmlFor="ads-cost"
            style={{
              fontSize: "16px",
              fontWeight: 600,
              color: "#1B1B1B",
              marginBottom: "10px",
              display: "block",
            }}
          >
            Cât plătești pe lună pentru ads? (lei)
          </label>
          <input
            id="ads-cost"
            type="number"
            min="0"
            max="10000"
            value={adsCostPerMonth}
            onChange={(e) => setAdsCostPerMonth(parseInt(e.target.value) || 0)}
            style={{
              width: "100%",
              padding: "12px 16px",
              fontSize: "16px",
              border: "2px solid #E6E6E6",
              borderRadius: "8px",
              color: "#1B1B1B",
            }}
          />
        </div>
      </div>

      {/* Results Section */}
      <div className="row g-4 mb-30">
        {/* Google/Facebook Ads Column */}
        <div className="col-md-6">
          <div
            style={{
              backgroundColor: "#F8F9FA",
              borderRadius: "12px",
              padding: "24px",
              height: "100%",
              border: "2px solid #E6E6E6",
            }}
          >
            <h4
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#1B1B1B",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              Google/Facebook Ads
            </h4>
            <div style={{ fontSize: "14px", color: "#424242", lineHeight: "1.8" }}>
              <div style={{ marginBottom: "12px" }}>
                <strong>Lead-uri/lună:</strong> {calculations.ads.leadsPerMonth}
              </div>
              <div style={{ marginBottom: "12px" }}>
                <strong>Conversie:</strong> {calculations.ads.conversionRate}% (
                {calculations.ads.conversionsPerMonth} înscrieri)
              </div>
              <div style={{ marginBottom: "12px" }}>
                <strong>Cost/lună:</strong> {calculations.ads.costPerMonth} lei
              </div>
              <div style={{ marginBottom: "12px" }}>
                <strong>Cost/lead:</strong> {calculations.ads.costPerLead.toFixed(2)} lei
              </div>
              <div>
                <strong>Cost/conversie:</strong>{" "}
                {calculations.ads.costPerConversion > 0
                  ? `${calculations.ads.costPerConversion.toFixed(2)} lei`
                  : "N/A"}
              </div>
            </div>
          </div>
        </div>

        {/* Yuvoo Premium Column */}
        <div className="col-md-6">
          <div
            style={{
              backgroundColor: "#EBFFFE",
              borderRadius: "12px",
              padding: "24px",
              height: "100%",
              border: "2px solid var(--bd-theme-1)",
            }}
          >
            <h4
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "var(--bd-theme-1)",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              Yuvoo Premium
            </h4>
            <div style={{ fontSize: "14px", color: "#424242", lineHeight: "1.8" }}>
              <div style={{ marginBottom: "12px" }}>
                <strong>Lead-uri/lună:</strong> {calculations.yuvoo.leadsPerMonth} (pre-calificate)
              </div>
              <div style={{ marginBottom: "12px" }}>
                <strong>Conversie:</strong> {calculations.yuvoo.conversionRate.toFixed(1)}% (
                {calculations.yuvoo.conversionsPerMonth} înscrieri)
              </div>
              <div style={{ marginBottom: "12px" }}>
                <strong>Cost/lună:</strong> {calculations.yuvoo.costPerMonth} lei
              </div>
              <div style={{ marginBottom: "12px" }}>
                <strong>Cost/lead:</strong> {calculations.yuvoo.costPerLead.toFixed(2)} lei
              </div>
              <div>
                <strong>Cost/conversie:</strong>{" "}
                {calculations.yuvoo.costPerConversion > 0
                  ? `${calculations.yuvoo.costPerConversion.toFixed(2)} lei`
                  : "N/A"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Savings Summary */}
      {calculations.savings.monthlySavings > 0 && (
        <div
          style={{
            backgroundColor: "#FFF6EB",
            borderRadius: "12px",
            padding: "24px",
            border: "2px solid var(--bd-theme-2)",
            marginBottom: "20px",
          }}
        >
          <h4
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#1B1B1B",
              marginBottom: "15px",
              textAlign: "center",
            }}
          >
            💰 Economii cu Yuvoo Premium
          </h4>
          <div className="row g-3">
            <div className="col-md-6">
              <div style={{ fontSize: "16px", color: "#424242" }}>
                <strong style={{ color: "var(--bd-theme-1)" }}>
                  {calculations.savings.monthlySavings.toFixed(2)} lei/lună
                </strong>{" "}
                economisiți
              </div>
            </div>
            <div className="col-md-6">
              <div style={{ fontSize: "16px", color: "#424242" }}>
                <strong style={{ color: "var(--bd-theme-1)" }}>
                  +{calculations.savings.additionalConversions} înscrieri
                </strong>{" "}
                suplimentare/lună
              </div>
            </div>
            <div className="col-md-6">
              <div style={{ fontSize: "16px", color: "#424242" }}>
                <strong style={{ color: "var(--bd-theme-1)" }}>
                  {calculations.savings.timeSavedHours} ore
                </strong>{" "}
                economisiți (timp pe lead-uri necalificate)
              </div>
            </div>
            <div className="col-md-6">
              <div style={{ fontSize: "16px", color: "#424242" }}>
                <strong style={{ color: "var(--bd-theme-1)" }}>
                  {(calculations.savings.monthlySavings * 12).toFixed(2)} lei/an
                </strong>{" "}
                economisiți
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Break-even Info */}
      <div
        style={{
          backgroundColor: "#F8F9FA",
          borderRadius: "8px",
          padding: "16px",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "14px", color: "#6B6B6B", marginBottom: 0 }}>
          <strong>Break-even:</strong> Cu Yuvoo Premium (99,99 RON/lună), ai nevoie de doar{" "}
          <strong style={{ color: "var(--bd-theme-1)" }}>~3-4 leaduri/lună</strong> pentru ca
          investiția să se plătească singură.
        </p>
      </div>
    </div>
  );
}
