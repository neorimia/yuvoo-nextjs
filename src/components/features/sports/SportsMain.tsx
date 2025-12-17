/**
 * Sports Main Component
 *
 * Main component for displaying a list of sports with category filtering.
 * Similar structure to ClubsMain but optimized for sports.
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { Sport, SportCategory } from "@/modules/sports/sports.types";
import SportCard from "./SportCard";
import { routes } from "@/lib/routes";

interface SportsMainProps {
  sports: Sport[];
  initialCategory?: SportCategory;
}

const categoryLabels: Record<SportCategory, string> = {
  echipa: "Sporturi de echipă",
  individual: "Sporturi individuale",
  combat: "Sporturi de luptă",
  artistic: "Sporturi artistice",
  altul: "Alte sporturi",
};

const categoryIcons: Record<SportCategory, string> = {
  echipa: "flaticon-friends",
  individual: "flaticon-user",
  combat: "flaticon-karate",
  artistic: "flaticon-color-palette",
  altul: "flaticon-sports",
};

const SportsMain: React.FC<SportsMainProps> = ({ sports, initialCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState<SportCategory | "all">(
    initialCategory || "all"
  );

  // Filter sports by category
  const filteredSports =
    selectedCategory === "all"
      ? sports
      : sports.filter((sport) => sport.category === selectedCategory);

  // Empty state
  if (!sports || sports.length === 0) {
    return (
      <section className="bd-sports-main-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="bd-sports-empty-state">
                <div className="bd-sports-empty-icon">
                  <i className="flaticon-sports"></i>
                </div>
                <h3 className="bd-sports-empty-title">Nu s-au găsit sporturi</h3>
                <p className="bd-sports-empty-text">
                  În prezent nu există sporturi disponibile. Revino mai târziu pentru a explora
                  opțiunile disponibile.
                </p>
                <Link href={routes.quiz.intro} className="bd-btn">
                  <span className="bd-btn-inner">
                    <span className="bd-btn-normal">Începe chestionarul AI</span>
                    <span className="bd-btn-hover">Începe chestionarul AI</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bd-sports-main-area">
      <div className="container">
        {/* Category Filter */}
        <div className="row bd-sports-filter-row">
          <div className="col-12">
            <div className="bd-sports-filter">
              <button
                className={`bd-sports-filter-btn ${selectedCategory === "all" ? "active" : ""}`}
                onClick={() => setSelectedCategory("all")}
                type="button"
              >
                <span className="bd-sports-filter-icon">
                  <i className="flaticon-sports"></i>
                </span>
                <span className="bd-sports-filter-text">Toate</span>
              </button>
              {(["echipa", "individual", "combat", "artistic", "altul"] as SportCategory[]).map(
                (category) => (
                  <button
                    key={category}
                    className={`bd-sports-filter-btn ${selectedCategory === category ? "active" : ""}`}
                    onClick={() => setSelectedCategory(category)}
                    type="button"
                  >
                    <span className="bd-sports-filter-icon">
                      <i className={categoryIcons[category]}></i>
                    </span>
                    <span className="bd-sports-filter-text">{categoryLabels[category]}</span>
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="row bd-sports-results-row">
          <div className="col-12">
            <p className="bd-sports-results-text">
              <span className="bd-sports-results-count">{filteredSports.length}</span>{" "}
              {filteredSports.length === 1 ? "sport găsit" : "sporturi găsite"}
              {selectedCategory !== "all" && (
                <span className="bd-sports-results-category">
                  {" "}
                  în categoria &quot;{categoryLabels[selectedCategory]}&quot;
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Sports Grid */}
        <div className="row bd-sports-grid-row">
          {filteredSports.map((sport, index) => (
            <div key={sport.id} className="col-xl-4 col-lg-4 col-md-6">
              <div
                className="wow fadeInUp"
                data-wow-duration="1s"
                data-wow-delay={`${index * 0.1}s`}
              >
                <SportCard sport={sport} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SportsMain;
