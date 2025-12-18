"use cache: private";

import React from "react";
import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth/session";
import { getClubByAdminUserId, calculateProfileCompleteness } from "@/modules/clubs/clubs.service";
import { bookingsRepository } from "@/modules/bookings/bookings.repository";
import ClubNotFoundState from "@/components/features/clubs/ClubNotFoundState";
import ClubDashboardContent from "@/components/features/clubs/ClubDashboardContent";
import { routes } from "@/lib/routes";
import { cacheLife, cacheTag } from "next/cache";
import { redirect } from "next/navigation";

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

  // Show not found state if club doesn't exist
  if (!club) {
    return <ClubNotFoundState />;
  }

  // Calculate profile completeness
  const profileCompleteness = calculateProfileCompleteness(club);

  // Fetch booking statistics
  const bookingStats = await bookingsRepository.getBookingStatsByClubId(club.id);

  // Fetch recent bookings (last 5)
  const recentBookings = await bookingsRepository.findByClubId(club.id);
  const recentBookingsLimited = recentBookings.slice(0, 5);

  return (
    <ClubDashboardContent
      club={club}
      profileCompleteness={profileCompleteness}
      bookingStats={bookingStats}
      recentBookings={recentBookingsLimited}
    />
  );
}
