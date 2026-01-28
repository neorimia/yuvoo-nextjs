/**
 * Premium Upgrade Page
 *
 * Protected page for club admins to upgrade to Premium (199 lei/year).
 * Route: /club/dashboard/premium
 */

"use cache: private";

import React from "react";
import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth/session";
import { getClubByAdminUserId } from "@/modules/clubs/clubs.service";
import { premiumClubService } from "@/modules/clubs/premium-club.service";
import ClubNotFoundState from "@/components/features/clubs/ClubNotFoundState";
import PremiumUpgrade from "@/components/features/clubs/PremiumUpgrade";
import { routes } from "@/lib/routes";
import { cacheLife, cacheTag } from "next/cache";
import { redirect } from "next/navigation";
import { UserRoleEnum } from "@/modules/auth/auth.types";

export const metadata: Metadata = {
  title: "Upgrade Premium - Dashboard Club - Yuvoo",
  description: "Upgrade la Premium pentru acces nelimitat la cereri.",
};

export default async function PremiumUpgradePage() {
  // Require authentication
  const session = await requireAuth();

  // Verify user is a club admin
  if (session.dbUser.role !== UserRoleEnum.CLUB_ADMIN) {
    redirect(routes.parent.dashboard);
  }

  // Cache configuration for private cache
  cacheLife("minutes");
  cacheTag(`user-${session.dbUser.id}`);
  cacheTag(`club-dashboard-${session.dbUser.id}`);

  // Fetch club for this admin user
  const club = await getClubByAdminUserId(session.dbUser.id);

  // Show not found state if club doesn't exist
  if (!club) {
    return <ClubNotFoundState />;
  }

  // Check premium status
  const premiumStatus = await premiumClubService.getPremiumStatus(club.id);
  const isPremium = !!(
    premiumStatus?.isPremium &&
    premiumStatus.premiumEndDate &&
    new Date(premiumStatus.premiumEndDate) > new Date()
  );

  return <PremiumUpgrade club={club} isPremium={isPremium} premiumStatus={premiumStatus} />;
}
