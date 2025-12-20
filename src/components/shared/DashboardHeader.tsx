/**
 * Dashboard Header Component
 *
 * Reusable dashboard header component for club and doctor portals.
 * Displays title, welcome message, and verification badge.
 * Follows Yuvoo design system with proper typography, colors, and spacing.
 */

import React from "react";
import VerificationBadge from "@/components/features/clubs/VerificationBadge";
import type { VerificationStatus } from "@/components/features/clubs/VerificationBadge";

export interface DashboardHeaderProps {
  /**
   * Main title of the dashboard page
   */
  title: string;
  /**
   * Optional subtitle text
   */
  subtitle?: string;
  /**
   * Name of the entity (club name or doctor name)
   */
  entityName: string;
  /**
   * Verification status of the entity
   */
  verificationStatus: VerificationStatus;
  /**
   * Variant type for entity-specific styling
   */
  variant?: "club" | "doctor";
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * DashboardHeader Component
 *
 * Displays a consistent header across dashboard pages with:
 * - Title and subtitle
 * - Welcome message with entity name
 * - Verification badge
 *
 * @example
 * ```tsx
 * <DashboardHeader
 *   title="Dashboard Club"
 *   subtitle="Bun venit!"
 *   entityName="Club Sportiv Fotbal"
 *   verificationStatus="approved"
 *   variant="club"
 * />
 * ```
 */
const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  subtitle,
  entityName,
  verificationStatus,
  variant = "club",
  className = "",
}) => {
  // Determine CSS classes based on variant
  const headerClasses =
    variant === "doctor" ? "bd-doctor-dashboard-header" : "bd-club-dashboard-header";

  return (
    <div className={`${headerClasses} w-100  mb-4 mb-md-5 ${className}`}>
      <div className="flex-grow-1 w-100 w-md-auto">
        <h1 className={`${headerClasses}-title mb-2 mb-md-2`}>{title}</h1>
        {subtitle ? (
          <p className={`${headerClasses}-subtitle mb-0`}>{subtitle}</p>
        ) : (
          <p className={`${headerClasses}-subtitle mb-0`}>
            Bun venit, <strong className="text-yuvoo-primary text-break">{entityName}</strong>!
          </p>
        )}
      </div>
      <div className="d-flex align-items-center gap-2 gap-md-3 flex-shrink-0 w-100 w-md-auto justify-content-start justify-content-md-end">
        <VerificationBadge verified={verificationStatus} variant="default" size="md" />
      </div>
    </div>
  );
};

export default DashboardHeader;
