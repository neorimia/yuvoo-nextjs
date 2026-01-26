/**
 * Guest Lead Payment Page
 *
 * Public page for clubs without accounts to pay for lead access.
 * No authentication required.
 * Route: /cereri/[leadId]/plata-guest
 */

"use cache";

import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { leadsRepository } from "@/modules/leads/leads.repository";
import { clubsRepository } from "@/modules/clubs/clubs.repository";
import { getLocationNameById } from "@/lib/db/location-helpers";
import GuestLeadPayment from "@/components/features/clubs/GuestLeadPayment";
import { cacheLife, cacheTag } from "next/cache";

interface GuestPaymentPageProps {
  params: Promise<{
    leadId: string;
  }>;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Plată cerere - Yuvoo`,
    description: "Plătește pentru a accesa informațiile de contact ale părintelui.",
  };
}

export default async function GuestPaymentPage({ params }: GuestPaymentPageProps) {
  // Cache configuration for public cache
  cacheLife("minutes");
  cacheTag(`lead-${(await params).leadId}`);

  const { leadId } = await params;

  // Fetch lead (no authentication required)
  const lead = await leadsRepository.findById(leadId);
  if (!lead) {
    notFound();
  }

  // Check if lead is expired
  const isExpired = new Date(lead.expiresAt) < new Date();
  if (isExpired) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-warning">
              <div className="card-body text-center py-5">
                <i
                  className="bi bi-exclamation-triangle-fill text-warning"
                  style={{ fontSize: "3rem" }}
                ></i>
                <h2 className="mt-3 mb-3">Cerere expirată</h2>
                <p className="text-muted">
                  Această cerere a expirat. Cererile expiră după 5 zile dacă nu sunt acceptate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Check if lead is already paid (prevent duplicate payments)
  if (lead.paymentId) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-success">
              <div className="card-body text-center py-5">
                <i
                  className="bi bi-check-circle-fill text-success"
                  style={{ fontSize: "3rem" }}
                ></i>
                <h2 className="mt-3 mb-3">Cerere deja deblocată</h2>
                <p className="text-muted">
                  Această cerere a fost deja deblocată. Dacă ai plătit, vei primi informațiile de
                  contact pe email.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fetch club information
  const club = await clubsRepository.getClubById(lead.clubId);
  if (!club) {
    notFound();
  }

  // Fetch location name
  const locationName = lead.locationId ? await getLocationNameById(lead.locationId) : null;

  const leadWithLocation = {
    ...lead,
    locationName,
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <GuestLeadPayment lead={leadWithLocation} club={club} />
        </div>
      </div>
    </div>
  );
}
