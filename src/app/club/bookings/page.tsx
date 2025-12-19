"use cache: private";

import React from "react";
import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth/session";
import { routes } from "@/lib/routes";
import { redirect } from "next/navigation";
import { cacheLife, cacheTag } from "next/cache";
import ClubBookingList from "@/components/features/clubs/ClubBookingList";
import { UserRoleEnum } from "@/modules/auth/auth.types";

// MIGRATED: Using "use cache: private" for user-specific prefetchable cache
// Private cache allows per-user caching while maintaining prefetching capabilities

export const metadata: Metadata = {
  title: "Rezervări Club - Yuvoo",
  description: "Gestionează rezervările pentru clubul tău pe Yuvoo.",
};

/**
 * Club Bookings Page
 *
 * Protected page for club admin to manage bookings.
 * Shows all bookings for the club with filtering and management actions.
 * Uses Next.js 16 Cache Components with "use cache: private" directive.
 * Route: /club/bookings
 */
export default async function ClubBookingsPage() {
  // Require authentication
  const session = await requireAuth();

  // Verify user is a club admin
  if (session.dbUser.role !== UserRoleEnum.CLUB_ADMIN) {
    redirect(routes.parent.dashboard);
  }

  // Cache configuration for private cache
  // Cache for 2 minutes - booking data changes frequently
  cacheLife("minutes");
  // Cache tag for user-specific revalidation
  cacheTag(`user-${session.dbUser.id}`);
  cacheTag(`club-bookings-${session.dbUser.id}`);

  return (
    <div className="bd-club-dashboard-content">
      {/* Page Header */}
      <div className="mb-5">
        <div className="bd-club-dashboard-header">
          <h1 className="bd-club-dashboard-header-title mb-2">
            <i className="bi bi-calendar-check me-2 text-yuvoo-primary"></i>
            Rezervări
          </h1>
          <p className="bd-club-dashboard-header-subtitle mb-0">
            Gestionează toate rezervările pentru clubul tău
          </p>
        </div>
      </div>

      {/* Bookings List */}
      <div className="bd-club-bookings-content">
        <ClubBookingList />
      </div>
    </div>
  );
}
