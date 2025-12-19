/**
 * Doctor Dashboard Content Component
 *
 * Main content component for doctor dashboard.
 * Displays profile completeness, consultation statistics, and recent activity.
 */

import React from "react";
import Link from "next/link";
import type { Doctor } from "@/modules/doctors/doctors.types";
import type { Booking } from "@/modules/bookings/bookings.types";
import DashboardHeader from "@/components/shared/DashboardHeader";
import ProfileCompletenessIndicator from "@/components/shared/ProfileCompletenessIndicator";
import StatisticsCards, { type StatItem } from "@/components/shared/StatisticsCards";
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

interface ConsultationStats {
  total: number;
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
}

interface DoctorDashboardContentProps {
  doctor: Doctor;
  profileCompleteness: ProfileCompleteness;
  consultationStats: ConsultationStats;
  recentConsultations: Booking[];
}

const DoctorDashboardContent: React.FC<DoctorDashboardContentProps> = ({
  doctor,
  profileCompleteness,
  consultationStats,
  recentConsultations,
}) => {
  // Prepare statistics for StatisticsCards
  const stats: StatItem[] = [
    {
      label: "Total",
      value: consultationStats.total,
      icon: "bi-calendar-check",
      variant: "total",
    },
    {
      label: "În așteptare",
      value: consultationStats.pending,
      icon: "bi-clock",
      variant: "pending",
    },
    {
      label: "Confirmate",
      value: consultationStats.confirmed,
      icon: "bi-check-circle",
      variant: "confirmed",
    },
    {
      label: "Finalizate",
      value: consultationStats.completed,
      icon: "bi-check2-all",
      variant: "completed",
    },
    {
      label: "Anulate",
      value: consultationStats.cancelled,
      icon: "bi-x-circle",
      variant: "cancelled",
    },
  ];

  return (
    <div className="bd-doctor-dashboard-content">
      {/* Header */}
      <div className="mb-5">
        <DashboardHeader
          title="Dashboard Doctor"
          subtitle={`Bun venit, ${doctor.name}!`}
          entityName={doctor.name}
          verificationStatus={doctor.verificationStatus || "pending"}
          variant="doctor"
        />
      </div>

      {/* Profile Completeness */}
      <div className="mb-5">
        <ProfileCompletenessIndicator
          percentage={profileCompleteness.percentage}
          completedFields={profileCompleteness.completedFields}
          totalFields={profileCompleteness.totalFields}
          missingFields={profileCompleteness.missingFields}
          profileType="doctor"
          editRoute={routes.doctor.profile}
        />
      </div>

      {/* Consultation Statistics */}
      <div className="mb-5">
        <h2 className="bd-dashboard-section-title mb-4">
          <i className="bi bi-bar-chart"></i>
          Statistici Consultații
        </h2>
        <StatisticsCards
          stats={stats}
          viewAllRoute={routes.doctor.bookings}
          viewAllLabel="Vezi toate consultațiile"
          cardClassPrefix="bd-consultation-stat"
        />
      </div>

      {/* Recent Activity */}
      <div className="mb-4">
        <RecentActivityFeed
          items={recentConsultations}
          title="Activitate Recentă"
          viewAllRoute={routes.doctor.bookings}
          viewAllLabel="Vezi toate"
          renderItem={(consultation) => {
            // Status badge configuration using utility
            const getStatusBadge = (status: Booking["status"]) => {
              const config = getStatusBadgeConfig(status, "custom");
              return <span className={config.class}>{config.label}</span>;
            };

            return (
              <div className="d-flex justify-content-between align-items-start">
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center mb-2">
                    <h6 className="bd-activity-feed-booking-title mb-0 me-2">
                      Consultație #{consultation.id.slice(0, 8)}
                    </h6>
                    {getStatusBadge(consultation.status)}
                  </div>
                  <p className="bd-activity-feed-date mb-1">
                    <i className="bi bi-calendar-event me-2"></i>
                    {formatDateForActivityFeed(consultation.scheduledAt)}
                  </p>
                  {consultation.notes && (
                    <p className="bd-activity-feed-notes mb-0">
                      <i className="bi bi-chat-left-text me-2"></i>
                      {consultation.notes}
                    </p>
                  )}
                </div>
                <Link
                  href={`${routes.doctor.bookings}?id=${consultation.id}`}
                  className="btn btn-sm btn-outline-secondary bd-activity-feed-detail-btn"
                >
                  <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            );
          }}
          getItemId={(consultation) => consultation.id}
          getItemDate={(consultation) => consultation.scheduledAt}
        />
      </div>
    </div>
  );
};

export default DoctorDashboardContent;
