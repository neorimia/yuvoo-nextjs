/**
 * Lead Management Dashboard Page
 *
 * Protected page for club admins to view and manage leads.
 * Shows paginated list of leads with filters and status badges.
 * Route: /club/dashboard/leaduri
 */

"use cache: private";

import React from "react";
import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth/session";
import { getClubByAdminUserId } from "@/modules/clubs/clubs.service";
import { getLeadsForClubDashboard } from "@/modules/leads/leads.service";
import { premiumClubService } from "@/modules/clubs/premium-club.service";
import ClubNotFoundState from "@/components/features/clubs/ClubNotFoundState";
import LeadManagementDashboard from "@/components/features/clubs/LeadManagementDashboard";
import { routes } from "@/lib/routes";
import { cacheLife, cacheTag } from "next/cache";
import { redirect } from "next/navigation";
import { UserRoleEnum } from "@/modules/auth/auth.types";
import { getLocationNamesByIds } from "@/lib/db/location-helpers";
import { LeadStatus } from "@/types/leads";

export const metadata: Metadata = {
  title: "Cereri - Dashboard Club - Yuvoo",
  description: "Gestionează cererile de la părinți pe Yuvoo.",
};

interface LeadManagementPageProps {
  searchParams: Promise<{
    status?: string;
    page?: string;
  }>;
}

export default async function LeadManagementPage({ searchParams }: LeadManagementPageProps) {
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

  // Get search params
  const params = await searchParams;
  const status = params.status as LeadStatus | undefined;
  const page = parseInt(params.page || "1", 10);
  const pageSize = 20;

  // Fetch leads for club
  const leadsData = await getLeadsForClubDashboard(club.id, {
    status: status as LeadStatus | undefined,
    page,
    pageSize,
  });

  // Fetch location names for leads
  const locationIds = leadsData.leads
    .map((lead) => lead.locationId)
    .filter((id): id is string => !!id);
  const locationNames = await getLocationNamesByIds(locationIds);
  const leadsWithLocationNames = leadsData.leads.map((lead) => ({
    ...lead,
    locationName: lead.locationId ? locationNames.get(lead.locationId) || null : null,
  }));

  // Check premium status
  const isPremium = await premiumClubService.checkIsPremium(club.id);

  // Count new leads (for badge)
  const newLeadsCount = await getLeadsForClubDashboard(club.id, {
    status: LeadStatus.NOU,
    page: 1,
    pageSize: 1,
  });

  return (
    <LeadManagementDashboard
      _club={club}
      club={club}
      leads={leadsWithLocationNames}
      total={leadsData.total}
      page={leadsData.page}
      pageSize={leadsData.pageSize}
      currentStatus={status}
      isPremium={isPremium}
      newLeadsCount={newLeadsCount.total}
    />
  );
}
