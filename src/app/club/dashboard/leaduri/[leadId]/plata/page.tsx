/**
 * Pay-Per-Lead Payment Page
 *
 * Protected page for club admins to pay for unlocking a lead (3€).
 * Route: /club/dashboard/leaduri/[leadId]/plata
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
import PayPerLeadPayment from "@/components/features/clubs/PayPerLeadPayment";
import { routes } from "@/lib/routes";
import { redirect, notFound } from "next/navigation";
import { UserRoleEnum } from "@/modules/auth/auth.types";

interface PayPerLeadPaymentPageProps {
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

export async function generateMetadata({ params }: PayPerLeadPaymentPageProps): Promise<Metadata> {
  const { leadId } = await params;
  const isProductionBuild = process.env.NEXT_PHASE === "phase-production-build";

  // During build with placeholder, return static metadata
  if (isProductionBuild && leadId === "placeholder-lead-id") {
    return {
      title: `Plată cerere - Dashboard Club - Yuvoo`,
      description: "Plătește pentru a debloca datele de contact ale părintelui.",
    };
  }

  return {
    title: `Plată cerere #${leadId.substring(0, 8)} - Dashboard Club - Yuvoo`,
    description: "Plătește pentru a debloca datele de contact ale părintelui.",
  };
}

export default async function PayPerLeadPaymentPage({ params }: PayPerLeadPaymentPageProps) {
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
                <h2 className="mb-3">Plată Cerere</h2>
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

  // Check if already paid/premium
  const isPremium = await premiumClubService.checkIsPremium(club.id);
  const contactVisible = isPremium || lead.paymentId !== null;

  // Redirect to lead detail if already unlocked
  if (contactVisible) {
    redirect(routes.club.leads.detail(leadId));
  }

  return <PayPerLeadPayment club={club} lead={lead} />;
}
