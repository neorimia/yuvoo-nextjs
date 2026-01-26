"use client";

import React, { useState } from "react";
import SectionTitle from "@/components/shared/SectionTitle";
import {
  faqCategories,
  getAllCategories,
  type FAQCategory,
} from "@/data/clubs-help-center-faq-data";

/**
 * Help Center Categories Component
 *
 * Category navigation tabs for filtering FAQs.
 */
export default function HelpCenterCategories() {
  const [activeCategory, setActiveCategory] = useState<FAQCategory | "all">("all");
  const categories = getAllCategories();

  const handleCategoryClick = (category: FAQCategory | "all") => {
    setActiveCategory(category);
    // Scroll to FAQ section
    const faqSection = document.getElementById("help-center-faq");
    if (faqSection) {
      faqSection.scrollIntoView({ behavior: "smooth" });
      // Update URL hash
      window.location.hash = category === "all" ? "" : `category=${category}`;
    }
  };

  return (
    <section className="pt-70 pb-50" style={{ backgroundColor: "#F8F9FA" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <SectionTitle
              title="Categorii"
              subtitle="Explorează întrebările pe categorii"
              className="mb-40"
            />

            {/* Category Tabs */}
            <div className="d-flex flex-wrap justify-content-center gap-2 mb-30">
              <button
                onClick={() => handleCategoryClick("all")}
                className={`bd-btn ${activeCategory === "all" ? "" : "bd-btn-border"}`}
                style={{
                  backgroundColor: activeCategory === "all" ? "var(--bd-theme-1)" : "#FFFFFF",
                  color: activeCategory === "all" ? "#FFFFFF" : "var(--bd-theme-1)",
                  border: activeCategory === "all" ? "none" : "2px solid var(--bd-theme-1)",
                }}
              >
                Toate
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`bd-btn ${activeCategory === category ? "" : "bd-btn-border"}`}
                  style={{
                    backgroundColor: activeCategory === category ? "var(--bd-theme-1)" : "#FFFFFF",
                    color: activeCategory === category ? "#FFFFFF" : "var(--bd-theme-1)",
                    border: activeCategory === category ? "none" : "2px solid var(--bd-theme-1)",
                  }}
                >
                  {faqCategories[category].label}
                </button>
              ))}
            </div>

            {/* Category Descriptions */}
            <div className="row g-3">
              {categories.map((category) => (
                <div key={category} className="col-md-4">
                  <div
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: "12px",
                      padding: "20px",
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "all 0.3s",
                      border: "2px solid #E6E6E6",
                    }}
                    onClick={() => handleCategoryClick(category)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--bd-theme-1)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#E6E6E6";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <h5
                      style={{
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#1B1B1B",
                        marginBottom: "8px",
                      }}
                    >
                      {faqCategories[category].label}
                    </h5>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#6B6B6B",
                        marginBottom: 0,
                      }}
                    >
                      {faqCategories[category].description}
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
