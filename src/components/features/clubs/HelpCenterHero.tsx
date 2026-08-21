"use client";

import React, { useState } from "react";
import SectionTitle from "@/components/shared/SectionTitle";

/**
 * Help Center Hero Component
 *
 * Hero section with search functionality for the Help Center page.
 */
export default function HelpCenterHero() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Scroll to FAQ section and highlight search results
      const faqSection = document.getElementById("help-center-faq");
      if (faqSection) {
        faqSection.scrollIntoView({ behavior: "smooth" });
        // Trigger search in FAQ component via URL hash
        window.location.hash = `search=${encodeURIComponent(searchQuery)}`;
      }
    }
  };

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
                  title="Ajutor & Întrebări Frecvente"
                  subtitle="Găsește răspunsuri la toate întrebările despre Yuvoo"
                  className="mb-30"
                />
                <p
                  style={{
                    fontSize: "16px",
                    color: "#6B6B6B",
                    marginBottom: "30px",
                  }}
                >
                  Caută în întrebările frecvente sau explorează categoriile de mai jos pentru a găsi
                  răspunsurile pe care le cauți.
                </p>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="mb-0">
                  <div
                    style={{
                      maxWidth: "600px",
                      margin: "0 auto",
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Caută întrebări sau răspunsuri..."
                      style={{
                        flex: 1,
                        padding: "14px 20px",
                        fontSize: "16px",
                        border: "2px solid #E6E6E6",
                        borderRadius: "8px",
                        color: "#1B1B1B",
                      }}
                    />
                    <button type="submit" className="bd-btn" style={{ whiteSpace: "nowrap" }}>
                      <span className="bd-btn-inner">
                        <span className="bd-btn-normal">Caută</span>
                        <span className="bd-btn-hover">Caută</span>
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
