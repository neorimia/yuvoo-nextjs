/**
 * Search Results Component
 *
 * Unified search component for clubs, doctors, and sports.
 * Handles search query, filtering, and displaying results.
 */

"use client";

import React, { useState, useEffect, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { searchClubsAction } from "@/app/actions/clubs";
import { searchDoctorsAction } from "@/app/actions/doctors";
import { getAllSports } from "@/modules/sports/sports.service";
import ClubCard from "@/components/features/clubs/ClubCard";
import DoctorCard from "@/components/features/doctors/DoctorCard";
import SportCard from "@/components/features/sports/SportCard";
import type { Club } from "@/modules/clubs/clubs.types";
import type { Doctor } from "@/modules/doctors/doctors.types";
import type { Sport } from "@/modules/sports/sports.types";

type SearchType = "all" | "clubs" | "doctors" | "sports";

const SearchResults: React.FC = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const type = (searchParams.get("type") as SearchType) || "all";

  const [clubs, setClubs] = useState<Club[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [sports, setSports] = useState<Sport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [_isPending, _startTransition] = useTransition();

  // Perform search
  useEffect(() => {
    const performSearch = async () => {
      if (!query.trim()) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const searchLower = query.toLowerCase();

        // Search based on type
        // Note: Full text search needs to be added to search services
        // For now, we'll fetch all and filter client-side for MVP
        if (type === "all" || type === "clubs") {
          const clubsResult = await searchClubsAction({
            page: 1,
            pageSize: 50, // Get more results to filter client-side
          });
          // Filter clubs by query (name, description, city)
          const filtered = clubsResult.clubs.filter(
            (club) =>
              club.name.toLowerCase().includes(searchLower) ||
              club.description?.toLowerCase().includes(searchLower) ||
              club.location.city.toLowerCase().includes(searchLower) ||
              club.sportName.toLowerCase().includes(searchLower)
          );
          setClubs(filtered.slice(0, 10));
        }

        if (type === "all" || type === "doctors") {
          const doctorsResult = await searchDoctorsAction({
            page: 1,
            pageSize: 50, // Get more results to filter client-side
          });
          // Filter doctors by query (name, specialty, city, bio)
          const filtered = doctorsResult.doctors.filter(
            (doctor) =>
              doctor.name.toLowerCase().includes(searchLower) ||
              doctor.specialty.toLowerCase().includes(searchLower) ||
              doctor.location.city.toLowerCase().includes(searchLower) ||
              doctor.description?.toLowerCase().includes(searchLower)
          );
          setDoctors(filtered.slice(0, 10));
        }

        if (type === "all" || type === "sports") {
          const allSports = await getAllSports({ search: query });
          setSports(allSports);
        }
      } catch (err) {
        console.error("Error performing search:", err);
        setError("Eroare la căutare. Te rugăm să reîncerci.");
      } finally {
        setIsLoading(false);
      }
    };

    performSearch();
  }, [query, type]);

  // Loading state
  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-yuvoo-primary" role="status">
          <span className="visually-hidden">Se caută...</span>
        </div>
        <p className="mt-3 text-muted">Se caută rezultate pentru &quot;{query}&quot;...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <i className="bi bi-exclamation-circle me-2"></i>
        {error}
      </div>
    );
  }

  // Empty query state
  if (!query.trim()) {
    return (
      <div className="text-center py-5">
        <div className="mb-4">
          <i className="bi bi-search" style={{ fontSize: "4rem", color: "#ccc" }}></i>
        </div>
        <h3 className="mb-3">Caută pe Yuvoo</h3>
        <p className="text-muted mb-4">
          Introdu un termen de căutare pentru a găsi cluburi, doctori sau sporturi.
        </p>
        <div className="d-flex gap-3 justify-content-center flex-wrap">
          <Link href={routes.clubs.list} className="btn btn-primary">
            <i className="bi bi-building me-2"></i>
            Vezi toate cluburile
          </Link>
          {/* <Link href={routes.doctors.list} className="btn btn-outline-primary">
            <i className="bi bi-person-badge me-2"></i>
            Vezi toți doctorii
          </Link> */}
          <Link href={routes.sports.list} className="btn btn-outline-primary">
            <i className="bi bi-trophy me-2"></i>
            Vezi toate sporturile
          </Link>
        </div>
      </div>
    );
  }

  const totalResults = clubs.length + doctors.length + sports.length;

  // No results state
  if (totalResults === 0) {
    return (
      <div className="text-center py-5">
        <div className="mb-4">
          <i className="bi bi-search" style={{ fontSize: "4rem", color: "#ccc" }}></i>
        </div>
        <h3 className="mb-3">Nu s-au găsit rezultate</h3>
        <p className="text-muted mb-4">
          Nu am găsit rezultate pentru &quot;{query}&quot;. Încearcă cu alți termeni de căutare.
        </p>
        <div className="d-flex gap-3 justify-content-center flex-wrap">
          <Link href={routes.clubs.list} className="btn btn-primary">
            <i className="bi bi-building me-2"></i>
            Vezi toate cluburile
          </Link>
          {/* <Link href={routes.doctors.list} className="btn btn-outline-primary">
            <i className="bi bi-person-badge me-2"></i>
            Vezi toți doctorii
          </Link> */}
        </div>
      </div>
    );
  }

  return (
    <div className="bd-search-results">
      {/* Results summary */}
      <div className="mb-4">
        <p className="text-muted">
          {totalResults} {totalResults === 1 ? "rezultat găsit" : "rezultate găsite"} pentru &quot;
          {query}&quot;
        </p>
      </div>

      {/* Club Results */}
      {(type === "all" || type === "clubs") && clubs.length > 0 && (
        <div className="mb-5">
          <h2 className="mb-4">
            <i className="bi bi-building me-2"></i>
            Cluburi ({clubs.length})
          </h2>
          <div className="row">
            {clubs.map((club) => (
              <div key={club.id} className="col-xl-4 col-lg-4 col-md-6 mb-4">
                <ClubCard club={club} variant="listing" />
              </div>
            ))}
          </div>
          {clubs.length >= 10 && (
            <div className="text-center mt-4">
              <Link
                href={`${routes.clubs.list}?search=${encodeURIComponent(query)}`}
                className="btn btn-outline-primary"
              >
                Vezi toate cluburile
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Doctor Results */}
      {(type === "all" || type === "doctors") && doctors.length > 0 && (
        <div className="mb-5">
          <h2 className="mb-4">
            <i className="bi bi-person-badge me-2"></i>
            Doctori ({doctors.length})
          </h2>
          <div className="row">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="col-xl-4 col-lg-4 col-md-6 mb-4">
                <DoctorCard doctor={doctor} variant="listing" />
              </div>
            ))}
          </div>
          {/* {doctors.length >= 10 && (
            <div className="text-center mt-4">
              <Link
                href={`${routes.doctors.list}?search=${encodeURIComponent(query)}`}
                className="btn btn-outline-primary"
              >
                Vezi toți doctorii
              </Link>
            </div>
          )} */}
        </div>
      )}

      {/* Sport Results */}
      {(type === "all" || type === "sports") && sports.length > 0 && (
        <div className="mb-5">
          <h2 className="mb-4">
            <i className="bi bi-trophy me-2"></i>
            Sporturi ({sports.length})
          </h2>
          <div className="row">
            {sports.map((sport) => (
              <div key={sport.id} className="col-xl-4 col-lg-4 col-md-6 mb-4">
                <SportCard sport={sport} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
