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
import DashboardPageLayout from "@/components/shared/DashboardPageLayout";
import { UserRoleEnum } from "@/modules/auth/auth.types";

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
 * Route: /club/profile
 */
export default async function ClubProfileEditPage() {
  // Require authentication
  const session = await requireAuth();

  // Verify user is a club admin
  if (session.dbUser.role !== UserRoleEnum.CLUB_ADMIN) {
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
    <DashboardPageLayout
      icon="bi-pencil-square"
      title="Editează Profilul Clubului"
      subtitle="Actualizează informațiile despre clubul tău"
      variant="club"
      contentClassName="bd-club-profile-edit-content"
    >
      <ClubProfileEditForm club={club} />
    </DashboardPageLayout>
  );
}
