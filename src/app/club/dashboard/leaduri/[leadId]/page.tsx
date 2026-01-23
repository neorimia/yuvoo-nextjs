/**
 * Lead Detail Page
 *
 * Protected page for club admins to view lead details.
 * Shows paywall if contact info is locked, or full details if unlocked.
 * Route: /club/dashboard/leaduri/[leadId]
 */

"use cache: private";

import React from "react";
import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth/session";
import { getClubByAdminUserId } from "@/modules/clubs/clubs.service";
import { getLeadForClub } from "@/modules/leads/leads.service";
import { premiumClubService } from "@/modules/clubs/premium-club.service";
import ClubNotFoundState from "@/components/features/clubs/ClubNotFoundState";
import LeadDetailView from "@/components/features/clubs/LeadDetailView";
import { routes } from "@/lib/routes";
import { cacheLife, cacheTag } from "next/cache";
import { redirect, notFound } from "next/navigation";
import { UserRoleEnum } from "@/modules/auth/auth.types";
import { getLocationNameById } from "@/lib/db/location-helpers";

interface LeadDetailPageProps {
  params: Promise<{
    leadId: string;
  }>;
}

export async function generateMetadata({ params }: LeadDetailPageProps): Promise<Metadata> {
  const { leadId } = await params;
  return {
    title: `Cerere #${leadId.substring(0, 8)} - Dashboard Club - Yuvoo`,
    description: "Detalii cerere de la părinte.",
  };
}

export default async function LeadDetailPage({ params }: LeadDetailPageProps) {
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

  // Get lead ID
  const { leadId } = await params;

  // Fetch lead for club
  const lead = await getLeadForClub(leadId, club.id);

  // Show 404 if lead not found
  if (!lead) {
    notFound();
  }

  // Check premium status
  const isPremium = await premiumClubService.checkIsPremium(club.id);

  // Check if contact info is visible
  const contactVisible = isPremium || lead.paymentId !== null;

  // Fetch location name
  const locationName = lead.locationId ? await getLocationNameById(lead.locationId) : null;
  const leadWithLocation = {
    ...lead,
    locationName,
  };

  return (
    <LeadDetailView
      _club={club}
      club={club}
      lead={leadWithLocation}
      isPremium={isPremium}
      contactVisible={contactVisible}
    />
  );
}
