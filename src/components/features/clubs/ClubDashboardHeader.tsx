/**
 * Club Dashboard Header Component
 *
 * Wrapper component for club dashboard header.
 * Uses the shared DashboardHeader component with club-specific configuration.
 */

import React from "react";
import type { Club } from "@/modules/clubs/clubs.types";
import DashboardHeader from "@/components/shared/DashboardHeader";

interface ClubDashboardHeaderProps {
  club: Club;
}

const ClubDashboardHeader: React.FC<ClubDashboardHeaderProps> = ({ club }) => {
  const verificationStatus = club.verificationStatus;

  return (
    <DashboardHeader
      title="Dashboard Club"
      entityName={club.name}
      verificationStatus={verificationStatus}
      variant="club"
    />
  );
};

export default ClubDashboardHeader;
