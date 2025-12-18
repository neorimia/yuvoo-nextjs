"use cache: private";

import React from "react";
import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth/session";
import { getClubByAdminUserId, calculateProfileCompleteness } from "@/modules/clubs/clubs.service";
import { bookingsRepository } from "@/modules/bookings/bookings.repository";
import ProfileCompletenessIndicator from "@/components/features/clubs/ProfileCompletenessIndicator";
import VerificationBadge from "@/components/features/clubs/VerificationBadge";
import BookingStatistics from "@/components/features/clubs/BookingStatistics";
import RecentActivityFeed from "@/components/features/clubs/RecentActivityFeed";
import { routes } from "@/lib/routes";
import { cacheLife, cacheTag } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";

// MIGRATED: Using "use cache: private" for user-specific prefetchable cache
// Private cache allows per-user caching while maintaining prefetching capabilities

export const metadata: Metadata = {
  title: "Dashboard Club - Yuvoo",
  description: "Panoul de control pentru cluburi pe Yuvoo.",
};

/**
 * Club Dashboard Page
 *
 * Protected page for club admin dashboard.
 * Shows profile completeness, verification status, booking statistics, and recent activity.
 * Uses Next.js 16 Cache Components with "use cache: private" directive.
 * Route: /club/dashboard
 */
export default async function ClubDashboardPage() {
  // Require authentication
  const session = await requireAuth();

  // Verify user is a club admin
  if (session.dbUser.role !== "club_admin") {
    redirect(routes.parent.dashboard);
  }

  // Cache configuration for private cache
  // Cache for 5 minutes - dashboard data changes frequently
  cacheLife("minutes");
  // Cache tag for user-specific revalidation
  cacheTag(`user-${session.dbUser.id}`);
  cacheTag(`club-dashboard-${session.dbUser.id}`);

  // Fetch club for this admin user
  const club = await getClubByAdminUserId(session.dbUser.id);

  if (!club) {
    // Club not found - redirect to onboarding or profile creation
    return (
      <section className="bd-club-dashboard-area pt-120 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center py-5">
                  <i
                    className="bi bi-exclamation-triangle"
                    style={{ fontSize: "3rem", color: "#ffc107" }}
                  ></i>
                  <h3 className="mt-3 mb-3">Club-ul nu a fost găsit</h3>
                  <p className="text-muted mb-4">
                    Nu ai un profil de club asociat contului tău.
                    <br />
                    Completează procesul de onboarding pentru a crea un profil de club.
                  </p>
                  <Link href={routes.onboarding.club.welcome} className="btn btn-primary">
                    <i className="bi bi-plus-circle me-2"></i>
                    Creează profil club
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Calculate profile completeness
  const profileCompleteness = calculateProfileCompleteness(club);

  // Fetch booking statistics
  const bookingStats = await bookingsRepository.getBookingStatsByClubId(club.id);

  // Fetch recent bookings (last 5)
  const recentBookings = await bookingsRepository.findByClubId(club.id);
  const recentBookingsLimited = recentBookings.slice(0, 5);

  return (
    <section className="bd-club-dashboard-area pt-120 pb-70">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="bd-club-dashboard-content">
              {/* Header */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h1 className="bd-section-title mb-2">Dashboard Club</h1>
                  <p className="text-muted mb-0">
                    Bun venit, <strong>{club.name}</strong>!
                  </p>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <VerificationBadge
                    verified={club.verificationStatus || (club.verified ? "approved" : "pending")}
                    variant="default"
                    size="md"
                  />
                </div>
              </div>

              {/* Profile Completeness */}
              <div className="row mb-4">
                <div className="col-12">
                  <ProfileCompletenessIndicator
                    percentage={profileCompleteness.percentage}
                    completedFields={profileCompleteness.completedFields}
                    totalFields={profileCompleteness.totalFields}
                    missingFields={profileCompleteness.missingFields}
                  />
                </div>
              </div>

              {/* Booking Statistics */}
              <div className="row mb-4">
                <div className="col-12">
                  <h2 className="h4 mb-4">
                    <i className="bi bi-bar-chart me-2"></i>
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
              </div>

              {/* Recent Activity */}
              <div className="row">
                <div className="col-12">
                  <RecentActivityFeed bookings={recentBookingsLimited} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
