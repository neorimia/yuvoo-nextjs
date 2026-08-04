/**
 * Pay-Per-Lead Payment Page
 *
 * Deprecated: contact is now free. Redirects to lead detail.
 * Route: /club/dashboard/leaduri/[leadId]/plata
 */

import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth/session";
import { getClubByAdminUserId } from "@/modules/clubs/clubs.service";
import { getLeadForClub } from "@/modules/leads/leads.service";
import ClubNotFoundState from "@/components/features/clubs/ClubNotFoundState";
import { routes } from "@/lib/routes";
import { redirect, notFound } from "next/navigation";
import { UserRoleEnum } from "@/modules/auth/auth.types";

interface PayPerLeadPaymentPageProps {
  params: Promise<{
    leadId: string;
  }>;
}

export async function generateStaticParams() {
  return [{ leadId: "placeholder-lead-id" }];
}

export async function generateMetadata({ params }: PayPerLeadPaymentPageProps): Promise<Metadata> {
  const { leadId } = await params;
  const isProductionBuild = process.env.NEXT_PHASE === "phase-production-build";

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

export default async function PayPerLeadPaymentPage({ params }: PayPerLeadPaymentPageProps) {
  const { leadId } = await params;
  const isProductionBuild = process.env.NEXT_PHASE === "phase-production-build";

  if (isProductionBuild && leadId === "placeholder-lead-id") {
    return null;
  }

  const session = await requireAuth();

  if (session.dbUser.role !== UserRoleEnum.CLUB_ADMIN) {
    redirect(routes.parent.dashboard);
  }

  const club = await getClubByAdminUserId(session.dbUser.id);

  if (!club) {
    return <ClubNotFoundState />;
  }

  const lead = await getLeadForClub(leadId, club.id);

  if (!lead) {
    notFound();
  }

  redirect(routes.club.leads.detail(leadId));
}
