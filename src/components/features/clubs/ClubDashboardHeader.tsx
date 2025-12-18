/**
 * Club Dashboard Header Component
 *
 * Displays the dashboard header with title, welcome message, and verification badge.
 * Follows Yuvoo design system with proper typography, colors, and spacing.
 */

import React from "react";
import type { Club } from "@/modules/clubs/clubs.types";
import VerificationBadge from "./VerificationBadge";

interface ClubDashboardHeaderProps {
  club: Club;
}

const ClubDashboardHeader: React.FC<ClubDashboardHeaderProps> = ({ club }) => {
  const verificationStatus = club.verificationStatus || (club.verified ? "approved" : "pending");

  return (
    <div className="bd-club-dashboard-header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-5">
      <div className="flex-grow-1">
        <h1 className="bd-club-dashboard-header-title mb-2">Dashboard Club</h1>
        <p className="bd-club-dashboard-header-subtitle mb-0">
          Bun venit, <strong className="text-yuvoo-primary">{club.name}</strong>!
        </p>
      </div>
      <div className="d-flex align-items-center gap-3 flex-shrink-0">
        <VerificationBadge verified={verificationStatus} variant="default" size="md" />
      </div>
    </div>
  );
};

export default ClubDashboardHeader;
