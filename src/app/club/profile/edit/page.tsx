"use cache: private";

import React from "react";
import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth/session";
import { routes } from "@/lib/routes";
import { redirect } from "next/navigation";
import { cacheLife, cacheTag } from "next/cache";
import { getClubByAdminUserId } from "@/modules/clubs/clubs.service";
import ClubProfileEditForm from "@/components/features/clubs/ClubProfileEditForm";
import ClubNotFoundState from "@/components/features/clubs/ClubNotFoundState";

// MIGRATED: Using "use cache: private" for user-specific prefetchable cache
// Private cache allows per-user caching while maintaining prefetching capabilities

export const metadata: Metadata = {
  title: "Editează Profil Club - Yuvoo",
  description: "Actualizează informațiile despre clubul tău pe Yuvoo.",
};

/**
 * Club Profile Edit Page
 *
 * Protected page for club admin to edit club profile.
 * Shows comprehensive form for editing all club information.
 * Uses Next.js 16 Cache Components with "use cache: private" directive.
 * Route: /club/profile/edit
 */
export default async function ClubProfileEditPage() {
  // Require authentication
  const session = await requireAuth();

  // Verify user is a club admin
  if (session.dbUser.role !== "club_admin") {
    redirect(routes.parent.dashboard);
  }

  // Cache configuration for private cache
  // Cache for 2 minutes - profile data changes infrequently
  cacheLife("minutes");
  // Cache tag for user-specific revalidation
  cacheTag(`user-${session.dbUser.id}`);
  cacheTag(`club-profile-${session.dbUser.id}`);

  // Fetch club for this admin user
  const club = await getClubByAdminUserId(session.dbUser.id);

  // Show not found state if club doesn't exist
  if (!club) {
    return <ClubNotFoundState />;
  }

  return (
    <div className="bd-club-dashboard-content">
      {/* Page Header */}
      <div className="mb-5">
        <div className="bd-club-dashboard-header">
          <h1 className="bd-club-dashboard-header-title mb-2">
            <i className="bi bi-pencil-square me-2 text-yuvoo-primary"></i>
            Editează Profilul Clubului
          </h1>
          <p className="bd-club-dashboard-header-subtitle mb-0">
            Actualizează informațiile despre clubul tău
          </p>
        </div>
      </div>

      {/* Profile Edit Form */}
      <div className="bd-club-profile-edit-content">
        <ClubProfileEditForm club={club} />
      </div>
    </div>
  );
}
