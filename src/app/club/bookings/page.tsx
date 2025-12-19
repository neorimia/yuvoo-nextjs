"use cache: private";

import React from "react";
import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth/session";
import { routes } from "@/lib/routes";
import { redirect } from "next/navigation";
import { cacheLife, cacheTag } from "next/cache";
import ClubBookingList from "@/components/features/clubs/ClubBookingList";
import DashboardPageLayout from "@/components/shared/DashboardPageLayout";
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
    <DashboardPageLayout
      icon="bi-calendar-check"
      title="Rezervări"
      subtitle="Gestionează toate rezervările pentru clubul tău"
      variant="club"
      contentClassName="bd-club-bookings-content"
    >
      <ClubBookingList />
    </DashboardPageLayout>
  );
}
