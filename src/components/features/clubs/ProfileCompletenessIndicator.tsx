/**
 * Profile Completeness Indicator Component
 *
 * Displays a progress bar showing how complete the club profile is.
 * Shows percentage and missing fields.
 */

import React from "react";
import Link from "next/link";
import { routes } from "@/lib/routes";

interface ProfileCompletenessIndicatorProps {
  percentage: number;
  completedFields: number;
  totalFields: number;
  missingFields: string[];
}

const ProfileCompletenessIndicator: React.FC<ProfileCompletenessIndicatorProps> = ({
  percentage,
  completedFields,
  totalFields,
  missingFields,
}) => {
  const getProgressColor = () => {
    if (percentage >= 100) return "bg-success";
    if (percentage >= 75) return "bg-info";
    if (percentage >= 50) return "bg-warning";
    return "bg-danger";
  };

  const getProgressTextColor = () => {
    if (percentage >= 100) return "text-success";
    if (percentage >= 75) return "text-info";
    if (percentage >= 50) return "text-warning";
    return "text-danger";
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title mb-0">
            <i className="bi bi-person-check me-2"></i>
            Completitudine Profil
          </h5>
          <span className={`badge ${getProgressTextColor()}`}>{percentage}%</span>
        </div>

        <div className="progress mb-3" style={{ height: "1.5rem" }}>
          <div
            className={`progress-bar ${getProgressColor()}`}
            role="progressbar"
            style={{ width: `${percentage}%` }}
            aria-valuenow={percentage}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            {percentage}%
          </div>
        </div>

        <p className="text-muted small mb-2">
          {completedFields} din {totalFields} câmpuri completate
        </p>

        {missingFields.length > 0 && (
          <div className="mt-3">
            <p className="small fw-bold mb-2">Câmpuri lipsă:</p>
            <ul className="list-unstyled small mb-3">
              {missingFields.slice(0, 5).map((field, index) => (
                <li key={index} className="text-muted">
                  <i className="bi bi-dash-circle me-2"></i>
                  {field}
                </li>
              ))}
              {missingFields.length > 5 && (
                <li className="text-muted">
                  <i className="bi bi-three-dots me-2"></i>
                  și încă {missingFields.length - 5} câmpuri
                </li>
              )}
            </ul>
            <Link href={routes.club.profileEdit} className="btn btn-sm btn-outline-primary">
              <i className="bi bi-pencil me-2"></i>
              Completează profilul
            </Link>
          </div>
        )}

        {missingFields.length === 0 && (
          <div className="alert alert-success small mb-0">
            <i className="bi bi-check-circle me-2"></i>
            Profilul tău este complet!
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCompletenessIndicator;
