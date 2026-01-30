/**
 * Doctor Search Filters Component
 *
 * Component for filtering and searching pediatric specialists.
 * Allows filtering by specialty, location, availability, and other criteria.
 */

"use client";

import React, { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { routes } from "@/lib/routes";
import type { DoctorSearchFilters } from "@/modules/doctors/doctors.types";
import { LocationSelector } from "@/components/shared/LocationSelector";

interface DoctorSearchFiltersProps {
  initialFilters?: Partial<DoctorSearchFilters>;
}

// Doctor specialties with Romanian labels
const DOCTOR_SPECIALTIES = [
  { value: "orthopedist", label: "Ortopedie pediatrică" },
  { value: "nutritionist", label: "Nutriție pediatrică" },
  { value: "psychologist", label: "Psihologie pediatrică" },
  { value: "general", label: "Medic pediatru" },
] as const;

// Sort options
const SORT_OPTIONS = [
  { value: "name", label: "Nume (A-Z)" },
  { value: "specialty", label: "Specialitate" },
  { value: "verified", label: "Verificați" },
] as const;

const DoctorSearchFiltersComponent: React.FC<DoctorSearchFiltersProps> = ({ initialFilters }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Initialize state from URL params or initial filters
  const [filters, setFilters] = useState<Partial<DoctorSearchFilters>>({
    specialty:
      (searchParams.get("specialty") as DoctorSearchFilters["specialty"]) ||
      initialFilters?.specialty ||
      undefined,
    cityId: searchParams.get("cityId") || initialFilters?.cityId || "",
    sectorId: searchParams.get("sectorId") || initialFilters?.sectorId || "",
    verified: searchParams.get("verified") === "true" || initialFilters?.verified || false,
    sortBy:
      (searchParams.get("sortBy") as "name" | "specialty" | "verified") ||
      initialFilters?.sortBy ||
      "verified",
  });

  // Additional filters not in DoctorSearchFilters type but useful for UI
  const [acceptingNewPatients, setAcceptingNewPatients] = useState<boolean>(
    searchParams.get("acceptingNewPatients") === "true" || false
  );
  const [onlineConsultations, setOnlineConsultations] = useState<boolean>(
    searchParams.get("onlineConsultations") === "true" || false
  );

  // Update URL with new filters
  const updateFilters = (newFilters: Partial<DoctorSearchFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);

    // Build URL search params
    const params = new URLSearchParams();
    if (updatedFilters.specialty) params.set("specialty", updatedFilters.specialty);
    if (updatedFilters.cityId) params.set("cityId", updatedFilters.cityId);
    if (updatedFilters.sectorId) params.set("sectorId", updatedFilters.sectorId);
    if (updatedFilters.verified) params.set("verified", "true");
    if (acceptingNewPatients) params.set("acceptingNewPatients", "true");
    if (onlineConsultations) params.set("onlineConsultations", "true");
    if (updatedFilters.sortBy && updatedFilters.sortBy !== "verified") {
      params.set("sortBy", updatedFilters.sortBy);
    }

    startTransition(() => {
      router.push(`${routes.doctors.list}?${params.toString()}`);
    });
  };

  // Update additional filters
  const updateAdditionalFilters = (
    field: "acceptingNewPatients" | "onlineConsultations",
    value: boolean
  ) => {
    if (field === "acceptingNewPatients") {
      setAcceptingNewPatients(value);
    } else {
      setOnlineConsultations(value);
    }

    // Build URL search params
    const params = new URLSearchParams();
    if (filters.specialty) params.set("specialty", filters.specialty);
    if (filters.cityId) params.set("cityId", filters.cityId);
    if (filters.sectorId) params.set("sectorId", filters.sectorId);
    if (filters.verified) params.set("verified", "true");
    if (field === "acceptingNewPatients" ? value : acceptingNewPatients) {
      params.set("acceptingNewPatients", "true");
    }
    if (field === "onlineConsultations" ? value : onlineConsultations) {
      params.set("onlineConsultations", "true");
    }
    if (filters.sortBy && filters.sortBy !== "verified") {
      params.set("sortBy", filters.sortBy);
    }

    startTransition(() => {
      router.push(`${routes.doctors.list}?${params.toString()}`);
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      specialty: undefined,
      cityId: "",
      sectorId: "",
      verified: false,
      sortBy: "verified",
    });
    setAcceptingNewPatients(false);
    setOnlineConsultations(false);

    startTransition(() => {
      router.push(routes.doctors.list);
    });
  };

  // Count active filters
  const activeFiltersCount = [
    filters.specialty,
    filters.cityId,
    filters.sectorId,
    filters.verified,
    acceptingNewPatients,
    onlineConsultations,
    filters.sortBy && filters.sortBy !== "verified",
  ].filter(Boolean).length;

  return (
    <section className="bd-doctor-filters-area pt-70 pb-50">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="bd-doctor-filters-wrapper">
              <div className="bd-doctor-filters-header mb-4">
                <h3 className="bd-section-title mb-3">Filtrează Doctorii</h3>
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
                {/* Specialty Filter */}
                <div className="col-lg-3 col-md-6">
                  <label htmlFor="filter-specialty" className="form-label">
                    <i className="flaticon-doctor me-2"></i>
                    Specialitate
                  </label>
                  <select
                    id="filter-specialty"
                    className="form-select"
                    value={filters.specialty || ""}
                    onChange={(e) =>
                      updateFilters({
                        specialty: (e.target.value ||
                          undefined) as DoctorSearchFilters["specialty"],
                      })
                    }
                    disabled={isPending}
                  >
                    <option value="">Toate specialitățile</option>
                    {DOCTOR_SPECIALTIES.map((specialty) => (
                      <option key={specialty.value} value={specialty.value}>
                        {specialty.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* City Filter */}
                <div className="col-lg-3 col-md-6">
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

                {/* Sector Filter (only when city is selected) */}
                {filters.cityId && (
                  <div className="col-lg-3 col-md-6">
                    <LocationSelector
                      type="sector"
                      value={filters.sectorId}
                      onChange={(sectorId) => updateFilters({ sectorId: sectorId || undefined })}
                      parentId={filters.cityId}
                      label={
                        <>
                          <i className="flaticon-map me-2"></i>
                          Sector
                        </>
                      }
                      id="filter-sector"
                      disabled={isPending}
                      placeholder="Toate sectoarele"
                    />
                  </div>
                )}

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
                        sortBy: e.target.value as "name" | "specialty" | "verified",
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
                      Doar doctori verificați
                    </label>
                  </div>
                </div>

                {/* Accepting New Patients Checkbox */}
                <div className="col-lg-3 col-md-6">
                  <div className="form-check mt-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="filter-accepting"
                      checked={acceptingNewPatients}
                      onChange={(e) =>
                        updateAdditionalFilters("acceptingNewPatients", e.target.checked)
                      }
                      disabled={isPending}
                    />
                    <label className="form-check-label" htmlFor="filter-accepting">
                      <i className="flaticon-user me-2"></i>
                      Acceptă pacienți noi
                    </label>
                  </div>
                </div>

                {/* Online Consultations Checkbox */}
                <div className="col-lg-3 col-md-6">
                  <div className="form-check mt-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="filter-online"
                      checked={onlineConsultations}
                      onChange={(e) =>
                        updateAdditionalFilters("onlineConsultations", e.target.checked)
                      }
                      disabled={isPending}
                    />
                    <label className="form-check-label" htmlFor="filter-online">
                      <i className="flaticon-video me-2"></i>
                      Consultații online
                    </label>
                  </div>
                </div>
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

export default DoctorSearchFiltersComponent;
