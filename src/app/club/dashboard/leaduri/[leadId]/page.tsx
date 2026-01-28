/**
 * Lead Detail Page
 *
 * Protected page for club admins to view lead details.
 * Shows paywall if contact info is locked, or full details if unlocked.
 * Route: /club/dashboard/leaduri/[leadId]
 *
 * Note: This is a protected route that requires authentication, so it's always dynamic.
 * We don't use "use cache: private" here because it requires request context.
 */

import React from "react";
import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth/session";
import { getClubByAdminUserId } from "@/modules/clubs/clubs.service";
import { getLeadForClub } from "@/modules/leads/leads.service";
import { premiumClubService } from "@/modules/clubs/premium-club.service";
import ClubNotFoundState from "@/components/features/clubs/ClubNotFoundState";
import LeadDetailView from "@/components/features/clubs/LeadDetailView";
import { routes } from "@/lib/routes";
import { redirect, notFound } from "next/navigation";
import { UserRoleEnum } from "@/modules/auth/auth.types";
import { getLocationNameById } from "@/lib/db/location-helpers";
import { trackEventServer } from "@/lib/analytics/tracking-server";
import { PostHogEvents, PostHogProperties } from "@/lib/analytics/events";

interface LeadDetailPageProps {
  params: Promise<{
    leadId: string;
  }>;
}

/**
 * Generate static params - returns placeholder to satisfy Cache Components requirement
 * This is a protected route that should be dynamic at runtime
 */
export async function generateStaticParams() {
  return [{ leadId: "placeholder-lead-id" }];
}

export async function generateMetadata({ params }: LeadDetailPageProps): Promise<Metadata> {
  const { leadId } = await params;
  const isProductionBuild = process.env.NEXT_PHASE === "phase-production-build";

  // During build with placeholder, return static metadata
  if (isProductionBuild && leadId === "placeholder-lead-id") {
    return {
      title: `Cerere - Dashboard Club - Yuvoo`,
      description: "Detalii cerere de la părinte.",
    };
  }

  return {
    title: `Cerere #${leadId.substring(0, 8)} - Dashboard Club - Yuvoo`,
    description: "Detalii cerere de la părinte.",
  };
}

export default async function LeadDetailPage({ params }: LeadDetailPageProps) {
  const { leadId } = await params;
  const isProductionBuild = process.env.NEXT_PHASE === "phase-production-build";

  // During build, render placeholder for placeholder lead ID
  if (isProductionBuild && leadId === "placeholder-lead-id") {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card">
              <div className="card-body text-center py-5">
                <h2 className="mb-3">Detalii Cerere</h2>
                <p className="text-muted">Build placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Require authentication
  const session = await requireAuth();

  // Verify user is a club admin
  if (session.dbUser.role !== UserRoleEnum.CLUB_ADMIN) {
    redirect(routes.parent.dashboard);
  }

  // Fetch club for this admin user
  const club = await getClubByAdminUserId(session.dbUser.id);

  // Show not found state if club doesn't exist
  if (!club) {
    return <ClubNotFoundState />;
  }

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

  // Track lead view (non-blocking)
  try {
    await trackEventServer(PostHogEvents.LEAD_VIEWED, {
      distinctId: session.dbUser.id,
      [PostHogProperties.LEAD_ID]: leadId,
      [PostHogProperties.CLUB_ID]: club.id,
      [PostHogProperties.LEAD_STATUS]: lead.status,
      [PostHogProperties.LEAD_PAYMENT_METHOD]: lead.paymentMethod || null,
    });
  } catch (error) {
    // Log but don't throw - tracking failures shouldn't block page load
    console.error("[Lead Detail Page] Error tracking lead view:", error);
  }

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
