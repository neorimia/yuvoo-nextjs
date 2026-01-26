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
import type { PremiumClubStatus } from "@/types/leads";
import ClubDashboardHeader from "./ClubDashboardHeader";
import ProfileCompletenessIndicator from "@/components/shared/ProfileCompletenessIndicator";
import BookingStatistics from "./BookingStatistics";
import RecentActivityFeed from "@/components/shared/RecentActivityFeed";
import PremiumBadge from "./PremiumBadge";
import { routes } from "@/lib/routes";
import { getStatusBadgeConfig } from "@/lib/utils/status-badges";
import { formatDateForActivityFeed, formatDateOnly } from "@/lib/utils/date-formatting";

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
  isPremium?: boolean;
  premiumStatus?: PremiumClubStatus | null;
}

const ClubDashboardContent: React.FC<ClubDashboardContentProps> = ({
  club,
  profileCompleteness,
  bookingStats,
  recentBookings,
  isPremium = false,
  premiumStatus,
}) => {
  return (
    <div className="bd-club-dashboard-content">
      {/* Header */}
      <div className="mb-5">
        <ClubDashboardHeader club={club} />
      </div>

      {/* Premium Status Section */}
      <div className="mb-5">
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start">
              <div className="flex-grow-1">
                <h3 className="card-title mb-3">
                  <i className="bi bi-star-fill text-yuvoo-primary me-2"></i>
                  Status Premium
                </h3>
                {isPremium && premiumStatus ? (
                  <div>
                    <div className="mb-3">
                      <PremiumBadge />{" "}
                      <span className="fw-semibold">Clubul tău are status Premium activ.</span>
                    </div>

                    {/* Subscription Details */}
                    <div className="row g-3">
                      {/* Subscription Type */}
                      {premiumStatus.subscriptionType && (
                        <div className="col-md-6">
                          <div className="d-flex align-items-center">
                            <i className="bi bi-calendar-check text-yuvoo-primary me-2"></i>
                            <div>
                              <small className="text-muted d-block">Plan de abonament</small>
                              <span className="fw-semibold">
                                {premiumStatus.subscriptionType === "MONTHLY"
                                  ? "Plan Lunar"
                                  : "Plan Anual"}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Next Billing Date */}
                      {premiumStatus.nextBillingDate && (
                        <div className="col-md-6">
                          <div className="d-flex align-items-center">
                            <i className="bi bi-credit-card text-yuvoo-primary me-2"></i>
                            <div>
                              <small className="text-muted d-block">Următoarea plată</small>
                              <span className="fw-semibold">
                                {formatDateOnly(premiumStatus.nextBillingDate)}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Premium End Date */}
                      {premiumStatus.premiumEndDate && (
                        <div className="col-md-6">
                          <div className="d-flex align-items-center">
                            <i className="bi bi-calendar-x text-yuvoo-primary me-2"></i>
                            <div>
                              <small className="text-muted d-block">Expiră la</small>
                              <span className="fw-semibold">
                                {formatDateOnly(premiumStatus.premiumEndDate)}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Billing Amount */}
                      {premiumStatus.billingAmount && (
                        <div className="col-md-6">
                          <div className="d-flex align-items-center">
                            <i className="bi bi-cash-coin text-yuvoo-primary me-2"></i>
                            <div>
                              <small className="text-muted d-block">Suma plătită</small>
                              <span className="fw-semibold">
                                {(premiumStatus.billingAmount / 100).toFixed(0)} lei
                                {premiumStatus.subscriptionType === "MONTHLY" ? "/lună" : "/an"}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Upgrade/Manage Link */}
                    <div className="mt-3">
                      <Link href={routes.club.premium} className="btn btn-sm btn-outline-primary">
                        <i className="bi bi-gear me-2"></i>
                        Gestionează abonamentul
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="mb-3 text-muted">
                      Upgradează la Premium pentru acces nelimitat la cereri și beneficii exclusive.
                    </p>
                    <Link href={routes.club.premium} className="btn btn-yuvoo-primary">
                      <i className="bi bi-star-fill me-2"></i>
                      Upgradează la Premium
                    </Link>
                  </div>
                )}
              </div>
              {isPremium && (
                <div className="text-end ms-3">
                  <PremiumBadge size="lg" />
                </div>
              )}
            </div>
          </div>
        </div>
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
