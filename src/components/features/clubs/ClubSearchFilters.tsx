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
import { normalizeSportName, getSportDisplayName } from "@/lib/utils/sport-normalization";
import type { ClubSearchFilters } from "@/modules/clubs/clubs.types";
import { LocationSelector } from "@/components/shared/LocationSelector";

interface ClubSearchFiltersProps {
  initialFilters?: Partial<ClubSearchFilters>;
}

// Age groups for filtering
const AGE_GROUPS = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] as const;

// Skill levels
const _SKILL_LEVELS = [
  { value: "beginner", label: "Începător" },
  { value: "intermediate", label: "Intermediar" },
  { value: "advanced", label: "Avansat" },
] as const;

// Sort options
const _SORT_OPTIONS = [
  { value: "name", label: "Nume (A-Z)" },
  { value: "verified", label: "Verificate" },
  { value: "rating", label: "Rating" },
] as const;

const ClubSearchFiltersComponent: React.FC<ClubSearchFiltersProps> = ({ initialFilters }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Initialize state from URL params or initial filters
  // Normalize sport ID from URL to match database format
  const sportParam = searchParams.get("sport");
  const normalizedSportId = sportParam ? normalizeSportName(sportParam) : undefined;

  const [filters, setFilters] = useState<Partial<ClubSearchFilters>>({
    sportId: normalizedSportId || initialFilters?.sportId || "",
    age: searchParams.get("age") ? parseInt(searchParams.get("age")!) : initialFilters?.age,
    countyId: searchParams.get("countyId") || initialFilters?.countyId || "",
    cityId: searchParams.get("cityId") || initialFilters?.cityId || "",
    sectorId: searchParams.get("sectorId") || initialFilters?.sectorId || "",
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
    // Normalize sport ID if provided
    const normalizedNewFilters = { ...newFilters };
    if (normalizedNewFilters.sportId) {
      normalizedNewFilters.sportId = normalizeSportName(normalizedNewFilters.sportId);
    }

    const updatedFilters = { ...filters, ...normalizedNewFilters };
    setFilters(updatedFilters);

    // Build URL search params
    const params = new URLSearchParams();
    if (updatedFilters.sportId) params.set("sport", updatedFilters.sportId);
    if (updatedFilters.age) params.set("age", updatedFilters.age.toString());
    if (updatedFilters.countyId) params.set("countyId", updatedFilters.countyId);
    if (updatedFilters.cityId) params.set("cityId", updatedFilters.cityId);
    if (updatedFilters.sectorId) params.set("sectorId", updatedFilters.sectorId);
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
      countyId: "",
      cityId: "",
      sectorId: "",
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
    filters.countyId,
    filters.cityId,
    filters.sectorId,
    filters.level,
    filters.verified,
    filters.featured,
    filters.sortBy && filters.sortBy !== "verified",
  ].filter(Boolean).length;

  return (
    <section className="bd-club-filters-area pb-50">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="bd-club-filters-wrapper">
              <div className="bd-club-filters-header">
                <h3 className="bd-section-title">Filtrează Cluburile</h3>
                {activeFiltersCount > 0 && (
                  <div className="d-flex align-items-center gap-3">
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
                <div className="col-lg-2 col-md-6">
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
                        {getSportDisplayName(sport)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Age Filter */}
                <div className="col-lg-2 col-md-6">
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

                {/* County Filter */}
                <div className="col-lg-2 col-md-6">
                  <LocationSelector
                    type="county"
                    value={filters.countyId}
                    onChange={(countyId) => {
                      // Clear city and sector when county changes
                      updateFilters({
                        countyId: countyId || undefined,
                        cityId:
                          countyId === "loc_county_bucuresti" ? "loc_city_bucuresti" : undefined,
                        sectorId: undefined,
                      });
                    }}
                    label={
                      <>
                        <i className="flaticon-location me-2"></i>
                        Județ
                      </>
                    }
                    id="filter-county"
                    disabled={isPending}
                    placeholder="Toate județele"
                  />
                </div>

                {/* City Filter */}
                {filters.countyId !== "loc_county_bucuresti" && (
                  <div className="col-lg-2 col-md-6">
                    <LocationSelector
                      type="city"
                      value={filters.cityId}
                      onChange={(cityId) => {
                        // Clear sector when city changes
                        updateFilters({
                          cityId: cityId || undefined,
                          sectorId: undefined,
                        });
                      }}
                      parentId={filters.countyId}
                      label={
                        <>
                          <i className="flaticon-location me-2"></i>
                          Oraș
                        </>
                      }
                      id="filter-city"
                      disabled={isPending}
                      placeholder="Toate orașele"
                    />
                  </div>
                )}

                {/* Sector Filter (only for Bucharest) */}
                {filters.countyId === "loc_county_bucuresti" && (
                  <div className="col-lg-2 col-md-6">
                    <LocationSelector
                      type="sector"
                      value={filters.sectorId}
                      onChange={(sectorId) => updateFilters({ sectorId: sectorId || undefined })}
                      parentId={filters.cityId}
                      label={
                        <>
                          <i className="flaticon-location me-2"></i>
                          Sector
                        </>
                      }
                      id="filter-sector"
                      disabled={isPending}
                      placeholder="Toate sectoarele"
                    />
                  </div>
                )}

                {/* Level Filter */}
                {/* <div className="col-lg-2 col-md-6">
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
                </div> */}

                {/* Sort By */}
                {/* <div className="col-lg-3 col-md-6">
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
                </div> */}

                {/* Verified Checkbox */}
                {/* <div className="col-lg-3 col-md-6">
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
                </div> */}

                {/* Featured Checkbox */}
                {/* <div className="col-lg-3 col-md-6">
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
                </div> */}
              </div>

              {isPending && (
                <div className="mt-3 text-center">
                  <div
                    className="spinner-border spinner-border-sm text-yuvoo-primary"
                    role="status"
                  >
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
