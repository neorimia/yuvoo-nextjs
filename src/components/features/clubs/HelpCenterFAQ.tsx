"use client";

import React, { useState, useEffect } from "react";
import SectionTitle from "@/components/shared/SectionTitle";
import FaqAccordionItem from "@/components/shared/FaqAccordionItem";
import {
  helpCenterFaqItems,
  searchFaqs,
  type FAQCategory,
} from "@/data/clubs-help-center-faq-data";

/**
 * Help Center FAQ Component
 *
 * Displays FAQs with filtering by category and search functionality.
 */
export default function HelpCenterFAQ() {
  const [activeCategory, setActiveCategory] = useState<FAQCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedFaqs, setDisplayedFaqs] = useState(helpCenterFaqItems);

  useEffect(() => {
    // Handle URL hash for category or search
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash.includes("category=")) {
        const category = hash.split("category=")[1] as FAQCategory;
        setActiveCategory(category);
      } else if (hash.includes("search=")) {
        const query = decodeURIComponent(hash.split("search=")[1]);
        setSearchQuery(query);
      }
    }
  }, []);

  useEffect(() => {
    let filtered = helpCenterFaqItems;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = searchFaqs(searchQuery);
    }

    // Apply category filter
    if (activeCategory !== "all") {
      filtered = filtered.filter((faq) => faq.category === activeCategory);
    }

    setDisplayedFaqs(filtered);
  }, [activeCategory, searchQuery]);

  const accordionId = "helpCenterFaqAccordion";

  return (
    <section id="help-center-faq" className="pt-70 pb-70">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <SectionTitle
              title={
                searchQuery.trim()
                  ? `Rezultate căutare pentru "${searchQuery}"`
                  : activeCategory !== "all"
                    ? `Întrebări: ${helpCenterFaqItems.find((f) => f.category === activeCategory)?.category || ""}`
                    : "Toate Întrebările Frecvente"
              }
              subtitle={
                displayedFaqs.length > 0
                  ? `${displayedFaqs.length} întrebări găsite`
                  : "Nu s-au găsit întrebări care să corespundă criteriilor tale"
              }
              className="mb-50"
            />

            {displayedFaqs.length > 0 ? (
              <div className="accordion" id={accordionId}>
                {displayedFaqs.map((faq, index) => (
                  <FaqAccordionItem
                    key={faq.id}
                    id={faq.id}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={index === 0 && !searchQuery.trim()}
                    accordionId={accordionId}
                  />
                ))}
              </div>
            ) : (
              <div
                style={{
                  backgroundColor: "#F8F9FA",
                  borderRadius: "12px",
                  padding: "40px",
                  textAlign: "center",
                }}
              >
                <p style={{ fontSize: "16px", color: "#6B6B6B", marginBottom: 0 }}>
                  Nu s-au găsit întrebări care să corespundă criteriilor tale. Încearcă să modifici
                  căutarea sau explorează alte categorii.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
