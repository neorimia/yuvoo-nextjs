/**
 * Profile Completeness Indicator Component
 *
 * Reusable component for displaying profile completeness progress.
 * Works for both club and doctor profiles.
 * Shows percentage, completed fields, and missing fields with link to edit page.
 * Follows Yuvoo design system with proper typography, colors, and spacing.
 */

import React from "react";
import Link from "next/link";

export interface ProfileCompletenessIndicatorProps {
  /**
   * Completion percentage (0-100)
   */
  percentage: number;
  /**
   * Number of completed fields
   */
  completedFields: number;
  /**
   * Total number of fields
   */
  totalFields: number;
  /**
   * Array of missing field names
   */
  missingFields: string[];
  /**
   * Type of profile (club or doctor) for context-specific text
   */
  profileType?: "club" | "doctor";
  /**
   * Route to the profile edit page
   */
  editRoute: string;
}

/**
 * ProfileCompletenessIndicator Component
 *
 * Displays a progress bar showing profile completeness with:
 * - Percentage badge
 * - Progress bar with color coding
 * - Completed fields count
 * - Missing fields list (up to 5)
 * - Link to edit profile page
 * - Success message when complete
 *
 * @example
 * ```tsx
 * <ProfileCompletenessIndicator
 *   percentage={75}
 *   completedFields={15}
 *   totalFields={20}
 *   missingFields={["Logo", "Descriere", "Program"]}
 *   profileType="club"
 *   editRoute={routes.club.profile}
 * />
 * ```
 */
const ProfileCompletenessIndicator: React.FC<ProfileCompletenessIndicatorProps> = ({
  percentage,
  completedFields,
  totalFields,
  missingFields,
  profileType = "club",
  editRoute,
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

  // Context-specific text based on profile type
  const profileLabel = profileType === "doctor" ? "profilului doctorului" : "profilului clubului";
  const buttonText =
    profileType === "doctor" ? "Completează profilul doctorului" : "Completează profilul";

  return (
    <div className="card border-0 shadow-sm bd-profile-completeness-card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="bd-profile-completeness-title mb-0">
            <i className="bi bi-person-check me-2 text-yuvoo-primary"></i>
            Completarea {profileLabel}
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
              href={editRoute}
              className="btn btn-sm btn-outline-primary bd-profile-completeness-cta-btn"
            >
              <i className="bi bi-pencil me-2"></i>
              {buttonText}
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
