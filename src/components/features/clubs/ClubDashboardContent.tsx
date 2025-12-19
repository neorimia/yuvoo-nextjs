/**
 * Club Dashboard Content Component
 *
 * Main content component for club dashboard.
 * Displays profile completeness, booking statistics, and recent activity.
 */

import React from "react";
import Link from "next/link";
import type { Club } from "@/modules/clubs/clubs.types";
import type { Booking } from "@/modules/bookings/bookings.types";
import ClubDashboardHeader from "./ClubDashboardHeader";
import ProfileCompletenessIndicator from "@/components/shared/ProfileCompletenessIndicator";
import BookingStatistics from "./BookingStatistics";
import RecentActivityFeed from "@/components/shared/RecentActivityFeed";
import { routes } from "@/lib/routes";
import { getStatusBadgeConfig } from "@/lib/utils/status-badges";
import { formatDateForActivityFeed } from "@/lib/utils/date-formatting";

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
          profileType="club"
          editRoute={routes.club.profile}
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
        <RecentActivityFeed
          items={recentBookings}
          title="Activitate Recentă"
          viewAllRoute={routes.club.bookings}
          viewAllLabel="Vezi toate"
          renderItem={(booking) => {
            // Status badge configuration using utility
            const getStatusBadge = (status: Booking["status"]) => {
              const config = getStatusBadgeConfig(status, "custom");
              return <span className={config.class}>{config.label}</span>;
            };

            // Date formatting using utility

            return (
              <div className="d-flex justify-content-between align-items-start">
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center mb-2">
                    <h6 className="bd-activity-feed-booking-title mb-0 me-2">
                      Rezervare #{booking.id.slice(0, 8)}
                    </h6>
                    {getStatusBadge(booking.status)}
                  </div>
                  <p className="bd-activity-feed-date mb-1">
                    <i className="bi bi-calendar-event me-2"></i>
                    {formatDateForActivityFeed(booking.scheduledAt)}
                  </p>
                  {booking.notes && (
                    <p className="bd-activity-feed-notes mb-0">
                      <i className="bi bi-chat-left-text me-2"></i>
                      {booking.notes}
                    </p>
                  )}
                </div>
                <Link
                  href={`${routes.club.bookings}?id=${booking.id}`}
                  className="btn btn-sm btn-outline-secondary bd-activity-feed-detail-btn"
                >
                  <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            );
          }}
          getItemId={(booking) => booking.id}
          getItemDate={(booking) => booking.scheduledAt}
        />
      </div>
    </div>
  );
};

export default ClubDashboardContent;
