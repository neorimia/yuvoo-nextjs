/**
 * Pay-Per-Lead Payment Page
 *
 * Protected page for club admins to pay for unlocking a lead (3€).
 * Route: /club/dashboard/leaduri/[leadId]/plata
 */

"use cache: private";

import React from "react";
import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth/session";
import { getClubByAdminUserId } from "@/modules/clubs/clubs.service";
import { getLeadForClub } from "@/modules/leads/leads.service";
import { premiumClubService } from "@/modules/clubs/premium-club.service";
import ClubNotFoundState from "@/components/features/clubs/ClubNotFoundState";
import PayPerLeadPayment from "@/components/features/clubs/PayPerLeadPayment";
import { routes } from "@/lib/routes";
import { cacheLife, cacheTag } from "next/cache";
import { redirect, notFound } from "next/navigation";
import { UserRoleEnum } from "@/modules/auth/auth.types";

interface PayPerLeadPaymentPageProps {
  params: Promise<{
    leadId: string;
  }>;
}

export async function generateMetadata({ params }: PayPerLeadPaymentPageProps): Promise<Metadata> {
  const { leadId } = await params;
  return {
    title: `Plată cerere #${leadId.substring(0, 8)} - Dashboard Club - Yuvoo`,
    description: "Plătește pentru a debloca datele de contact ale părintelui.",
  };
}

export default async function PayPerLeadPaymentPage({ params }: PayPerLeadPaymentPageProps) {
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

  // Check if already paid/premium
  const isPremium = await premiumClubService.checkIsPremium(club.id);
  const contactVisible = isPremium || lead.paymentId !== null;

  // Redirect to lead detail if already unlocked
  if (contactVisible) {
    redirect(routes.club.leads.detail(leadId));
  }

  return <PayPerLeadPayment club={club} lead={lead} />;
}
