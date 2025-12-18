/**
 * Profile Completeness Indicator Component
 *
 * Displays a progress bar showing how complete the club profile is.
 * Shows percentage and missing fields.
 * Follows Yuvoo design system with proper typography, colors, and spacing.
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
  const getProgressColorClass = () => {
    if (percentage >= 100) return "bd-profile-completeness-progress-complete";
    if (percentage >= 75) return "bd-profile-completeness-progress-good";
    if (percentage >= 50) return "bd-profile-completeness-progress-warning";
    return "bd-profile-completeness-progress-low";
  };

  const getBadgeColorClass = () => {
    if (percentage >= 100) return "bd-profile-completeness-badge-complete";
    if (percentage >= 75) return "bd-profile-completeness-badge-good";
    if (percentage >= 50) return "bd-profile-completeness-badge-warning";
    return "bd-profile-completeness-badge-low";
  };

  return (
    <div className="card border-0 shadow-sm bd-profile-completeness-card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="bd-profile-completeness-title mb-0">
            <i className="bi bi-person-check me-2 text-yuvoo-primary"></i>
            Completitudine Profil
          </h5>
          <span className={`badge bd-profile-completeness-badge ${getBadgeColorClass()}`}>
            {percentage}%
          </span>
        </div>

        <div className="bd-profile-completeness-progress progress mb-3">
          <div
            className={`progress-bar bd-profile-completeness-progress-bar ${getProgressColorClass()}`}
            role="progressbar"
            style={{ width: `${percentage}%` }}
            aria-valuenow={percentage}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            {percentage}%
          </div>
        </div>

        <p className="bd-profile-completeness-description mb-2">
          {completedFields} din {totalFields} câmpuri completate
        </p>

        {missingFields.length > 0 && (
          <div className="mt-3">
            <p className="bd-profile-completeness-missing-title mb-2">Câmpuri lipsă:</p>
            <ul className="list-unstyled bd-profile-completeness-missing-list mb-3">
              {missingFields.slice(0, 5).map((field, index) => (
                <li key={index} className="bd-profile-completeness-missing-item">
                  <i className="bi bi-dash-circle me-2"></i>
                  {field}
                </li>
              ))}
              {missingFields.length > 5 && (
                <li className="bd-profile-completeness-missing-item">
                  <i className="bi bi-three-dots me-2"></i>
                  și încă {missingFields.length - 5} câmpuri
                </li>
              )}
            </ul>
            <Link
              href={routes.club.profileEdit}
              className="btn btn-sm btn-outline-primary bd-profile-completeness-cta-btn"
            >
              <i className="bi bi-pencil me-2"></i>
              Completează profilul
            </Link>
          </div>
        )}

        {missingFields.length === 0 && (
          <div className="bd-profile-completeness-success-alert alert mb-0">
            <i className="bi bi-check-circle me-2"></i>
            Profilul tău este complet!
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCompletenessIndicator;
