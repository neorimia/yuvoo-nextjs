/**
 * Club Dashboard Content Component
 *
 * Main content component for club dashboard.
 * Displays profile completeness, booking statistics, and recent activity.
 */

import React from "react";
import type { Club } from "@/modules/clubs/clubs.types";
import type { Booking } from "@/modules/bookings/bookings.types";
import ClubDashboardHeader from "./ClubDashboardHeader";
import ProfileCompletenessIndicator from "./ProfileCompletenessIndicator";
import BookingStatistics from "./BookingStatistics";
import RecentActivityFeed from "./RecentActivityFeed";

interface ProfileCompleteness {
  percentage: number;
  completedFields: number;
  totalFields: number;
  missingFields: string[];
}

interface BookingStats {
  total: number;
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
}

interface ClubDashboardContentProps {
  club: Club;
  profileCompleteness: ProfileCompleteness;
  bookingStats: BookingStats;
  recentBookings: Booking[];
}

const ClubDashboardContent: React.FC<ClubDashboardContentProps> = ({
  club,
  profileCompleteness,
  bookingStats,
  recentBookings,
}) => {
  return (
    <div className="bd-club-dashboard-content">
      {/* Header */}
      <div className="mb-5">
        <ClubDashboardHeader club={club} />
      </div>

      {/* Profile Completeness */}
      <div className="mb-5">
        <ProfileCompletenessIndicator
          percentage={profileCompleteness.percentage}
          completedFields={profileCompleteness.completedFields}
          totalFields={profileCompleteness.totalFields}
          missingFields={profileCompleteness.missingFields}
        />
      </div>

      {/* Booking Statistics */}
      <div className="mb-5">
        <h2 className="bd-dashboard-section-title mb-4">
          <i className="bi bi-bar-chart"></i>
          Statistici Rezervări
        </h2>
        <BookingStatistics
          total={bookingStats.total}
          pending={bookingStats.pending}
          confirmed={bookingStats.confirmed}
          completed={bookingStats.completed}
          cancelled={bookingStats.cancelled}
        />
      </div>

      {/* Recent Activity */}
      <div className="mb-4">
        <RecentActivityFeed bookings={recentBookings} />
      </div>
    </div>
  );
};

export default ClubDashboardContent;
