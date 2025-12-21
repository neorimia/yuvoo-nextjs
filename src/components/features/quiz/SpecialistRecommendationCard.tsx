"use client";

/**
 * Specialist Recommendation Card Component
 *
 * Displays a specialist recommendation from the AI Coach Quiz.
 * Shows the recommended specialty, reason, priority, and links to find doctors.
 */

import React, { useState } from "react";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { getSpecialtyDisplayName, getPriorityDisplayName } from "@/lib/utils/specialist-display";
import { getRecommendedDoctorsAction } from "@/app/actions/doctors";
import DoctorCard from "@/components/features/doctors/DoctorCard";
import type { SpecialistRecommendation } from "@/modules/quiz/quiz.types";
import type { Doctor } from "@/modules/doctors/doctors.types";

interface SpecialistRecommendationCardProps {
  recommendation: SpecialistRecommendation;
  className?: string;
}

export default function SpecialistRecommendationCard({
  recommendation,
  className = "",
}: SpecialistRecommendationCardProps) {
  const [recommendedDoctors, setRecommendedDoctors] = useState<Doctor[]>([]);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [showDoctors, setShowDoctors] = useState(false);

  if (!recommendation.needed) {
    return null;
  }

  const specialtyName = getSpecialtyDisplayName(recommendation.specialty);
  const priorityName = recommendation.priority
    ? getPriorityDisplayName(recommendation.priority)
    : null;

  // Load recommended doctors when user clicks to view
  const handleViewDoctors = async () => {
    if (recommendedDoctors.length > 0) {
      setShowDoctors(!showDoctors);
      return;
    }

    setLoadingDoctors(true);
    try {
      const result = await getRecommendedDoctorsAction(recommendation.specialty, undefined, 5);
      setRecommendedDoctors(result.doctors);
      setShowDoctors(true);
    } catch (error) {
      console.error("Error loading recommended doctors:", error);
    } finally {
      setLoadingDoctors(false);
    }
  };

  // Priority badge colors
  const getPriorityBadgeClass = (priority?: "high" | "medium" | "low") => {
    switch (priority) {
      case "high":
        return "bg-danger";
      case "medium":
        return "bg-warning text-dark";
      case "low":
        return "bg-info";
      default:
        return "bg-secondary";
    }
  };

  // Specialty icon mapping
  const getSpecialtyIcon = (specialty: SpecialistRecommendation["specialty"]) => {
    switch (specialty) {
      case "orthopedist":
        return "bi-heart-pulse";
      case "nutritionist":
        return "bi-apple";
      case "psychologist":
        return "bi-brain";
      case "general":
        return "bi-person-badge";
      default:
        return "bi-hospital";
    }
  };

  return (
    <div className={`bd-specialist-recommendation-card card mb-4 ${className}`}>
      <div className="card-body">
        <div className="d-flex align-items-start mb-3">
          <div className="flex-shrink-0 me-3">
            <div className="bd-specialist-icon-wrapper bg-primary bg-opacity-10 rounded-circle p-3">
              <i
                className={`bi ${getSpecialtyIcon(recommendation.specialty)} text-primary fs-3`}
              ></i>
            </div>
          </div>
          <div className="flex-grow-1">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <h5 className="card-title mb-0">
                <i className="bi bi-stethoscope me-2"></i>
                Recomandare Specialist: {specialtyName}
              </h5>
              {priorityName && (
                <span className={`badge ${getPriorityBadgeClass(recommendation.priority)}`}>
                  {priorityName}
                </span>
              )}
            </div>
            <p className="text-muted mb-3">{recommendation.reason}</p>
          </div>
        </div>

        <div className="alert alert-info d-flex align-items-start mb-3" role="alert">
          <i className="bi bi-info-circle me-2 mt-1"></i>
          <div>
            <strong>De ce este recomandat acest specialist?</strong>
            <p className="mb-0 small">
              Pe baza răspunsurilor tale, am identificat că ar putea fi utilă o consultație cu un
              specialist în {specialtyName.toLowerCase()} pentru a asigura cel mai bun început
              pentru copilul tău în activitățile sportive.
            </p>
          </div>
        </div>

        <div className="d-flex gap-2 flex-wrap">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleViewDoctors}
            disabled={loadingDoctors}
          >
            {loadingDoctors ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Se încarcă...
              </>
            ) : (
              <>
                <i className="bi bi-search me-2"></i>
                {showDoctors ? "Ascunde" : "Vezi"} {specialtyName} Recomandați
              </>
            )}
          </button>
          <Link
            href={routes.doctors.list + `?specialty=${recommendation.specialty}`}
            className="btn btn-outline-primary"
          >
            <i className="bi bi-list-ul me-2"></i>
            Vezi toți doctorii
          </Link>
        </div>

        {/* Recommended Doctors List */}
        {showDoctors && recommendedDoctors.length > 0 && (
          <div className="mt-4 pt-4 border-top">
            <h6 className="mb-3">
              <i className="bi bi-heart-pulse-fill text-primary me-2"></i>
              {specialtyName} Recomandați ({recommendedDoctors.length})
            </h6>
            <div className="row g-3">
              {recommendedDoctors.map((doctor) => (
                <div key={doctor.id} className="col-12 col-md-6">
                  <DoctorCard doctor={doctor} variant="compact" />
                </div>
              ))}
            </div>
            <div className="mt-3 text-center">
              <Link
                href={routes.doctors.list + `?specialty=${recommendation.specialty}`}
                className="btn btn-sm btn-outline-primary"
              >
                Vezi toți {specialtyName.toLowerCase()} disponibili
              </Link>
            </div>
          </div>
        )}

        {showDoctors && recommendedDoctors.length === 0 && !loadingDoctors && (
          <div className="mt-4 pt-4 border-top">
            <div className="alert alert-info mb-0" role="alert">
              <i className="bi bi-info-circle me-2"></i>
              Nu s-au găsit {specialtyName.toLowerCase()} disponibili în acest moment. Te rugăm să
              verifici din nou mai târziu.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
