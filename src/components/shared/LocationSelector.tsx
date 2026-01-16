/**
 * Location Selector Component
 *
 * Reusable dropdown component for selecting locations (cities or sectors) by ID.
 * Fetches locations from the API endpoint.
 *
 * Features:
 * - City selection (all cities or filtered by county)
 * - Sector selection (for Bucharest, filtered by city)
 * - Loading states
 * - Error handling
 * - Bootstrap 5.3.3 styling
 */

"use client";

import { useState, useEffect, type ReactNode } from "react";

export interface LocationSelectorProps {
  value?: string; // locationId (cityId or sectorId)
  onChange: (locationId: string | null) => void;
  type: "city" | "sector";
  parentId?: string; // Required for sector selection (cityId), optional for city selection (countyId)
  label?: ReactNode; // Optional label (if not provided, no label is rendered)
  required?: boolean;
  disabled?: boolean;
  id?: string;
  className?: string;
  placeholder?: string;
  error?: string | null;
}

interface Location {
  id: string;
  name: string;
  type: "city" | "sector" | "county";
}

export function LocationSelector({
  value,
  onChange,
  type,
  parentId,
  label,
  required = false,
  disabled = false,
  id,
  className = "",
  placeholder,
  error = null,
}: LocationSelectorProps) {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLocations() {
      setLoading(true);
      setFetchError(null);

      try {
        // Build API URL with query parameters
        const params = new URLSearchParams();
        params.set("type", type);
        if (parentId) {
          params.set("parentId", parentId);
        }

        const response = await fetch(`/api/locations?${params.toString()}`);
        if (!response.ok) {
          throw new Error("Failed to fetch locations");
        }

        const data = await response.json();
        setLocations(data);
      } catch (err) {
        console.error("Error fetching locations:", err);
        setFetchError("Eroare la încărcarea locațiilor");
      } finally {
        setLoading(false);
      }
    }

    fetchLocations();
  }, [type, parentId]);

  const displayError = error || fetchError;
  const defaultPlaceholder =
    placeholder || (type === "sector" ? "Selectează sectorul" : "Selectează orașul");

  const selectId = id || `location-selector-${type}`;
  const errorId = `${selectId}-error`;

  return (
    <div className={className}>
      {label && (
        <label htmlFor={selectId} className="form-label">
          {label}
          {required && <span className="text-danger ms-1">*</span>}
        </label>
      )}
      <select
        id={selectId}
        value={value || ""}
        onChange={(e) => onChange(e.target.value || null)}
        required={required}
        disabled={disabled || loading || (type === "sector" && !parentId)}
        className={`form-select ${displayError ? "is-invalid" : ""} ${
          loading || (type === "sector" && !parentId) ? "bg-light" : ""
        }`}
        aria-label={typeof label === "string" ? label : label ? String(label) : undefined}
        aria-describedby={displayError ? errorId : undefined}
        aria-invalid={displayError ? "true" : "false"}
        aria-required={required}
      >
        <option value="">{defaultPlaceholder}</option>
        {locations.map((loc) => (
          <option key={loc.id} value={loc.id}>
            {loc.name}
          </option>
        ))}
      </select>
      {displayError && (
        <div id={errorId} className="invalid-feedback d-block" role="alert">
          {displayError}
        </div>
      )}
      {loading && (
        <div className="form-text">
          <span className="spinner-border spinner-border-sm me-2" role="status">
            <span className="visually-hidden">Se încarcă...</span>
          </span>
          Se încarcă locațiile...
        </div>
      )}
    </div>
  );
}
