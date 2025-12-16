/**
 * Club Search Filters Component
 *
 * Component for filtering and searching sports clubs.
 * Allows filtering by sport, age, location, level, and other criteria.
 */

"use client";

import React, { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { routes } from "@/lib/routes";
import { SPORT_TYPES } from "@/lib/utils/constants";
import type { ClubSearchFilters } from "@/modules/clubs/clubs.types";

interface ClubSearchFiltersProps {
  initialFilters?: Partial<ClubSearchFilters>;
}

// Romanian cities (main cities in Romania)
const ROMANIAN_CITIES = [
  "București",
  "Cluj-Napoca",
  "Timișoara",
  "Iași",
  "Constanța",
  "Craiova",
  "Brașov",
  "Galați",
  "Ploiești",
  "Oradea",
  "Brăila",
  "Arad",
  "Pitești",
  "Sibiu",
  "Bacău",
  "Târgu Mureș",
  "Baia Mare",
  "Buzău",
  "Botoșani",
  "Satu Mare",
] as const;

// Age groups for filtering
const AGE_GROUPS = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] as const;

// Skill levels
const SKILL_LEVELS = [
  { value: "beginner", label: "Începător" },
  { value: "intermediate", label: "Intermediar" },
  { value: "advanced", label: "Avansat" },
] as const;

// Sort options
const SORT_OPTIONS = [
  { value: "name", label: "Nume (A-Z)" },
  { value: "verified", label: "Verificate" },
  { value: "rating", label: "Rating" },
] as const;

const ClubSearchFiltersComponent: React.FC<ClubSearchFiltersProps> = ({ initialFilters }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Initialize state from URL params or initial filters
  const [filters, setFilters] = useState<Partial<ClubSearchFilters>>({
    sportId: searchParams.get("sport") || initialFilters?.sportId || "",
    age: searchParams.get("age") ? parseInt(searchParams.get("age")!) : initialFilters?.age,
    city: searchParams.get("city") || initialFilters?.city || "",
    district: searchParams.get("district") || initialFilters?.district || "",
    level: searchParams.get("level") || initialFilters?.level || "",
    verified: searchParams.get("verified") === "true" || initialFilters?.verified || false,
    featured: searchParams.get("featured") === "true" || initialFilters?.featured || false,
    sortBy:
      (searchParams.get("sortBy") as "name" | "verified" | "rating") ||
      initialFilters?.sortBy ||
      "verified",
  });

  // Update URL with new filters
  const updateFilters = (newFilters: Partial<ClubSearchFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);

    // Build URL search params
    const params = new URLSearchParams();
    if (updatedFilters.sportId) params.set("sport", updatedFilters.sportId);
    if (updatedFilters.age) params.set("age", updatedFilters.age.toString());
    if (updatedFilters.city) params.set("city", updatedFilters.city);
    if (updatedFilters.district) params.set("district", updatedFilters.district);
    if (updatedFilters.level) params.set("level", updatedFilters.level);
    if (updatedFilters.verified) params.set("verified", "true");
    if (updatedFilters.featured) params.set("featured", "true");
    if (updatedFilters.sortBy && updatedFilters.sortBy !== "verified") {
      params.set("sortBy", updatedFilters.sortBy);
    }

    // Preserve quiz context if present
    if (searchParams.get("quiz")) {
      params.set("quiz", searchParams.get("quiz")!);
    }

    startTransition(() => {
      router.push(`${routes.clubs.list}?${params.toString()}`);
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      sportId: "",
      age: undefined,
      city: "",
      district: "",
      level: "",
      verified: false,
      featured: false,
      sortBy: "verified",
    });

    const params = new URLSearchParams();
    if (searchParams.get("quiz")) {
      params.set("quiz", searchParams.get("quiz")!);
    }

    startTransition(() => {
      router.push(`${routes.clubs.list}?${params.toString()}`);
    });
  };

  // Count active filters
  const activeFiltersCount = [
    filters.sportId,
    filters.age,
    filters.city,
    filters.district,
    filters.level,
    filters.verified,
    filters.featured,
    filters.sortBy && filters.sortBy !== "verified",
  ].filter(Boolean).length;

  return (
    <section className="bd-club-filters-area pt-70 pb-50">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="bd-club-filters-wrapper">
              <div className="bd-club-filters-header mb-4">
                <h3 className="bd-section-title mb-3">Filtrează Cluburile</h3>
                {activeFiltersCount > 0 && (
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <span className="text-muted">
                      {activeFiltersCount}{" "}
                      {activeFiltersCount === 1 ? "filtru activ" : "filtre active"}
                    </span>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                      onClick={clearFilters}
                      disabled={isPending}
                    >
                      <i className="bi bi-x-circle me-1"></i>
                      Șterge filtrele
                    </button>
                  </div>
                )}
              </div>

              <div className="row g-3">
                {/* Sport Filter */}
                <div className="col-lg-3 col-md-6">
                  <label htmlFor="filter-sport" className="form-label">
                    <i className="flaticon-sports me-2"></i>
                    Sport
                  </label>
                  <select
                    id="filter-sport"
                    className="form-select"
                    value={filters.sportId || ""}
                    onChange={(e) => updateFilters({ sportId: e.target.value || undefined })}
                    disabled={isPending}
                  >
                    <option value="">Toate sporturile</option>
                    {SPORT_TYPES.map((sport) => (
                      <option key={sport} value={sport}>
                        {sport.charAt(0).toUpperCase() + sport.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Age Filter */}
                <div className="col-lg-3 col-md-6">
                  <label htmlFor="filter-age" className="form-label">
                    <i className="flaticon-calendar me-2"></i>
                    Vârstă
                  </label>
                  <select
                    id="filter-age"
                    className="form-select"
                    value={filters.age || ""}
                    onChange={(e) =>
                      updateFilters({ age: e.target.value ? parseInt(e.target.value) : undefined })
                    }
                    disabled={isPending}
                  >
                    <option value="">Toate vârstele</option>
                    {AGE_GROUPS.map((age) => (
                      <option key={age} value={age}>
                        {age} ani
                      </option>
                    ))}
                  </select>
                </div>

                {/* City Filter */}
                <div className="col-lg-3 col-md-6">
                  <label htmlFor="filter-city" className="form-label">
                    <i className="flaticon-location me-2"></i>
                    Oraș
                  </label>
                  <select
                    id="filter-city"
                    className="form-select"
                    value={filters.city || ""}
                    onChange={(e) => updateFilters({ city: e.target.value || undefined })}
                    disabled={isPending}
                  >
                    <option value="">Toate orașele</option>
                    {ROMANIAN_CITIES.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Level Filter */}
                <div className="col-lg-3 col-md-6">
                  <label htmlFor="filter-level" className="form-label">
                    <i className="flaticon-star me-2"></i>
                    Nivel
                  </label>
                  <select
                    id="filter-level"
                    className="form-select"
                    value={filters.level || ""}
                    onChange={(e) => updateFilters({ level: e.target.value || undefined })}
                    disabled={isPending}
                  >
                    <option value="">Toate nivelurile</option>
                    {SKILL_LEVELS.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort By */}
                <div className="col-lg-3 col-md-6">
                  <label htmlFor="filter-sort" className="form-label">
                    <i className="flaticon-sort me-2"></i>
                    Sortează după
                  </label>
                  <select
                    id="filter-sort"
                    className="form-select"
                    value={filters.sortBy || "verified"}
                    onChange={(e) =>
                      updateFilters({
                        sortBy: e.target.value as "name" | "verified" | "rating",
                      })
                    }
                    disabled={isPending}
                  >
                    {SORT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Verified Checkbox */}
                <div className="col-lg-3 col-md-6">
                  <div className="form-check mt-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="filter-verified"
                      checked={filters.verified || false}
                      onChange={(e) => updateFilters({ verified: e.target.checked })}
                      disabled={isPending}
                    />
                    <label className="form-check-label" htmlFor="filter-verified">
                      <i className="flaticon-check me-2"></i>
                      Doar cluburi verificate
                    </label>
                  </div>
                </div>

                {/* Featured Checkbox */}
                <div className="col-lg-3 col-md-6">
                  <div className="form-check mt-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="filter-featured"
                      checked={filters.featured || false}
                      onChange={(e) => updateFilters({ featured: e.target.checked })}
                      disabled={isPending}
                    />
                    <label className="form-check-label" htmlFor="filter-featured">
                      <i className="flaticon-star me-2"></i>
                      Doar cluburi recomandate
                    </label>
                  </div>
                </div>
              </div>

              {isPending && (
                <div className="mt-3 text-center">
                  <div className="spinner-border spinner-border-sm text-primary" role="status">
                    <span className="visually-hidden">Se încarcă...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClubSearchFiltersComponent;
