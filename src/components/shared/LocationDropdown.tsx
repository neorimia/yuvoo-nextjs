/**
 * Location Dropdown Component
 *
 * Reusable two-level dropdown for selecting Romanian locations (county → city/sector).
 * Replaces text input fields for location selection throughout the application.
 *
 * Features:
 * - County selection (first level)
 * - City selection filtered by county (second level)
 * - Special case: When București county is selected, shows Bucharest sectors instead of cities
 * - Proper error handling and validation
 * - Full accessibility support
 * - Bootstrap 5.3.3 styling
 */

"use client";

import { useState, useEffect, useMemo } from "react";
import { counties, getCitiesByCounty, getBucharestSectors } from "@/lib/db/locations-data";

export interface LocationDropdownProps {
  value?: string; // Current selected location (format: "City Name, County Name")
  onChange: (location: string) => void; // Callback with selected location string
  label?: string; // Optional custom label (default: "Locația ta")
  required?: boolean; // Whether field is required
  disabled?: boolean; // Whether field is disabled
  error?: string | null; // Error message to display
  id?: string; // HTML id attribute
  name?: string; // HTML name attribute
  className?: string; // Additional CSS classes
  placeholder?: {
    county?: string; // Default: "Selectează județul"
    city?: string; // Default: "Selectează orașul"
  };
  showHelpText?: boolean; // Whether to show help text (default: true)
  helpText?: string; // Custom help text
}

/**
 * Parse location string to extract county and city
 * Format: "City Name, County Name"
 */
function parseLocationString(location: string): { countyId: string | null; cityId: string | null } {
  if (!location || !location.trim()) {
    return { countyId: null, cityId: null };
  }

  const parts = location.split(",").map((p) => p.trim());
  if (parts.length !== 2) {
    return { countyId: null, cityId: null };
  }

  const [cityName, countyName] = parts;

  // Find county by name
  const county = counties.find((c) => c.name === countyName);
  if (!county) {
    return { countyId: null, cityId: null };
  }

  // Special handling for Bucharest - check for sectors
  if (county.id === "loc_county_bucuresti") {
    const sectors = getBucharestSectors();
    const sector = sectors.find((s) => s.name === cityName);
    return {
      countyId: county.id,
      cityId: sector?.id || null,
    };
  }

  // For other counties, find city by name and parent (county)
  const cities = getCitiesByCounty(county.id);
  const city = cities.find((c) => c.name === cityName);

  return {
    countyId: county.id,
    cityId: city?.id || null,
  };
}

/**
 * Location Dropdown Component
 *
 * Two-level dropdown for selecting Romanian locations.
 */
export default function LocationDropdown({
  value,
  onChange,
  label = "Locația ta",
  required = false,
  disabled = false,
  error = null,
  id = "location",
  name = "location",
  className = "",
  placeholder = {},
  showHelpText = true,
  helpText,
}: LocationDropdownProps) {
  const [selectedCountyId, setSelectedCountyId] = useState<string>("");
  const [selectedCityId, setSelectedCityId] = useState<string>("");
  const [validationError, setValidationError] = useState<string | null>(null);

  // Parse initial value
  useEffect(() => {
    if (value && value.trim()) {
      const parsed = parseLocationString(value);
      if (parsed.countyId && parsed.cityId) {
        setSelectedCountyId(parsed.countyId);
        setSelectedCityId(parsed.cityId);
      }
    }
  }, [value]);

  // Check if Bucharest county is selected
  const isBucharest = selectedCountyId === "loc_county_bucuresti";

  // Get cities/sectors filtered by selected county (deduplicated by ID)
  // Special case: For Bucharest, show sectors instead of cities
  const availableCities = useMemo(() => {
    if (!selectedCountyId) {
      return [];
    }

    // Special handling for Bucharest - show sectors instead of cities
    if (isBucharest) {
      const sectors = getBucharestSectors();
      // Deduplicate sectors by ID
      return Array.from(new Map(sectors.map((sector) => [sector.id, sector])).values());
    }

    // For other counties, show cities
    const cities = getCitiesByCounty(selectedCountyId);
    // Deduplicate cities by ID (handle data issues where same city appears twice)
    const uniqueCities = Array.from(new Map(cities.map((city) => [city.id, city])).values());
    return uniqueCities;
  }, [selectedCountyId, isBucharest]);

  // Get selected county object
  const selectedCounty = counties.find((c) => c.id === selectedCountyId);

  // Handle county change
  const handleCountyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountyId = e.target.value;
    setSelectedCountyId(newCountyId);
    setSelectedCityId(""); // Reset city when county changes
    setValidationError(null);

    // Clear onChange if county is cleared
    if (!newCountyId) {
      onChange("");
    }
  };

  // Handle city/sector change
  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCityId = e.target.value;
    setSelectedCityId(newCityId);
    setValidationError(null);

    if (newCityId && selectedCounty) {
      const selectedItem = availableCities.find((c) => c.id === newCityId);
      if (selectedItem) {
        // Format: "City Name, County Name" or "Sector X, București" for Bucharest
        const locationString = `${selectedItem.name}, ${selectedCounty.name}`;
        onChange(locationString);
      }
    } else {
      onChange("");
    }
  };

  // Validate on blur or form submission
  const validate = () => {
    if (required && (!selectedCountyId || !selectedCityId)) {
      const errorMessage = isBucharest
        ? "Te rugăm să selectezi județul și sectorul"
        : "Te rugăm să selectezi județul și orașul";
      setValidationError(errorMessage);
      return false;
    }
    setValidationError(null);
    return true;
  };

  const displayError = error || validationError;
  const countyPlaceholder = placeholder.county || "Selectează județul";
  const cityPlaceholder =
    placeholder.city || (isBucharest ? "Selectează sectorul" : "Selectează orașul");
  const defaultHelpText = "Vom folosi această informație pentru a-ți recomanda cluburi locale.";
  const finalHelpText = helpText || defaultHelpText;

  // Generate unique IDs for accessibility
  const countyId = `${id}-county`;
  const cityId = `${id}-city`;
  const errorId = `${id}-error`;
  const helpId = `${id}-help`;

  return (
    <div className={className}>
      {/* Label */}
      <label htmlFor={countyId} className="form-label fw-semibold">
        {label}
        {required && <span className="text-danger ms-1">*</span>}
      </label>

      {/* County Dropdown */}
      <div className="mb-2">
        <select
          id={countyId}
          name={`${name}-county`}
          value={selectedCountyId}
          onChange={handleCountyChange}
          onBlur={validate}
          disabled={disabled}
          className={`form-select ${displayError ? "is-invalid" : ""}`}
          aria-label="Selectează județul"
          aria-describedby={displayError ? errorId : helpId}
          aria-invalid={displayError ? "true" : "false"}
          aria-required={required}
        >
          <option value="">{countyPlaceholder}</option>
          {counties.map((county) => (
            <option key={county.id} value={county.id}>
              {county.name}
            </option>
          ))}
        </select>
      </div>

      {/* City/Sector Dropdown */}
      <div className="mb-2">
        <select
          id={cityId}
          name={`${name}-city`}
          value={selectedCityId}
          onChange={handleCityChange}
          onBlur={validate}
          disabled={disabled || !selectedCountyId}
          className={`form-select ${displayError ? "is-invalid" : ""} ${
            !selectedCountyId ? "bg-light" : ""
          }`}
          aria-label={isBucharest ? "Selectează sectorul" : "Selectează orașul"}
          aria-describedby={displayError ? errorId : helpId}
          aria-invalid={displayError ? "true" : "false"}
          aria-required={required}
          aria-disabled={!selectedCountyId}
        >
          <option value="">{cityPlaceholder}</option>
          {availableCities.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* Error Message */}
      {displayError && (
        <div id={errorId} className="invalid-feedback d-block" role="alert" aria-live="polite">
          {displayError}
        </div>
      )}

      {/* Help Text */}
      {showHelpText && !displayError && (
        <div id={helpId} className="form-text">
          {finalHelpText}
        </div>
      )}
    </div>
  );
}
