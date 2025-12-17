/**
 * Sports Main Component
 *
 * Main component for displaying a list of sports.
 * Similar structure to ClubsMain.
 */

"use client";

import React, { useState } from "react";
import type { Sport, SportCategory } from "@/modules/sports/sports.types";
import SportCard from "./SportCard";

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
      <section className="bd-sports-area pt-110 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="text-center py-5">
                <div className="mb-4">
                  <i className="flaticon-sports" style={{ fontSize: "4rem", color: "#ccc" }}></i>
                </div>
                <h3 className="mb-3">Nu s-au găsit sporturi</h3>
                <p className="text-muted">În prezent nu există sporturi disponibile.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bd-sports-area pt-110 pb-70">
      <div className="container">
        {/* Category Filter */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="bd-sport-filter">
              <button
                className={`bd-btn ${selectedCategory === "all" ? "active" : ""}`}
                onClick={() => setSelectedCategory("all")}
              >
                <span className="bd-btn-inner">
                  <span className="bd-btn-normal">Toate</span>
                  <span className="bd-btn-hover">Toate</span>
                </span>
              </button>
              {(["echipa", "individual", "combat", "artistic", "altul"] as SportCategory[]).map(
                (category) => (
                  <button
                    key={category}
                    className={`bd-btn ${selectedCategory === category ? "active" : ""}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    <span className="bd-btn-inner">
                      <span className="bd-btn-normal">{categoryLabels[category]}</span>
                      <span className="bd-btn-hover">{categoryLabels[category]}</span>
                    </span>
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="row mb-4">
          <div className="col-12">
            <p className="text-muted">
              {filteredSports.length}{" "}
              {filteredSports.length === 1 ? "sport găsit" : "sporturi găsite"}
            </p>
          </div>
        </div>

        {/* Sports Grid */}
        <div className="row">
          {filteredSports.map((sport, index) => (
            <div key={sport.id} className="col-xl-4 col-lg-4 col-md-6">
              <SportCard sport={sport} delay={`${index * 0.1}s`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SportsMain;
