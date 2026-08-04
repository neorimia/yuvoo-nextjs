/**
 * Guest Lead Access Page
 *
 * Deprecated paywall — contact is now free.
 * Shows parent contact info for clubs accessing old email links.
 * Route: /cereri/[leadId]/plata-guest
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { leadsRepository } from "@/modules/leads/leads.repository";
import { clubsRepository } from "@/modules/clubs/clubs.repository";
import { getLocationNameById } from "@/lib/db/location-helpers";
import { routes } from "@/lib/routes";

interface GuestPaymentPageProps {
  params: Promise<{
    leadId: string;
  }>;
}

export async function generateStaticParams() {
  return [{ leadId: "placeholder-lead-id" }];
}

export async function generateMetadata({ params }: GuestPaymentPageProps): Promise<Metadata> {
  await params;
  return {
    title: `Cerere de la părinte - Yuvoo`,
    description: "Date de contact părinte — contact gratuit între părinți și cluburi.",
  };
}

export default async function GuestPaymentPage({ params }: GuestPaymentPageProps) {
  const { leadId } = await params;
  const isProductionBuild = process.env.NEXT_PHASE === "phase-production-build";

  if (isProductionBuild && leadId === "placeholder-lead-id") {
    return null;
  }

  const lead = await leadsRepository.findById(leadId);
  if (!lead) {
    notFound();
  }

  const isExpired = new Date(lead.expiresAt) < new Date();
  const club = await clubsRepository.getClubById(lead.clubId);
  if (!club) {
    notFound();
  }

  const locationName = lead.locationId ? await getLocationNameById(lead.locationId) : null;

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
                  Această cerere a expirat. Cererile expiră după 5 zile dacă nu sunt răspunse.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header bg-success text-white">
              <h1 className="h4 mb-0">Contact gratuit — cerere de la părinte</h1>
            </div>
            <div className="card-body">
              <p className="text-muted mb-4">
                Nu mai este nevoie de plată. Contactul cu părinții este gratuit pe Yuvoo.
              </p>
              <p>
                <strong>Club:</strong> {club.name}
                <br />
                <strong>Sport:</strong> {lead.sportType || club.sportName}
                <br />
                <strong>Vârsta copilului:</strong> {lead.childAge} ani
                {locationName && (
                  <>
                    <br />
                    <strong>Locație:</strong> {locationName}
                  </>
                )}
              </p>
              <hr />
              <h2 className="h5 mb-3">Date de contact părinte</h2>
              <p>
                <strong>Nume:</strong> {lead.parentName}
                <br />
                <strong>Email:</strong>{" "}
                <a href={`mailto:${lead.parentEmail}`}>{lead.parentEmail}</a>
                {lead.parentPhone && (
                  <>
                    <br />
                    <strong>Telefon:</strong>{" "}
                    <a href={`tel:${lead.parentPhone}`}>{lead.parentPhone}</a>
                  </>
                )}
              </p>
              {lead.message && (
                <p className="mt-3">
                  <strong>Mesaj:</strong> {lead.message}
                </p>
              )}
              <div className="d-flex gap-2 flex-wrap mt-4">
                <a href={`mailto:${lead.parentEmail}`} className="btn btn-yuvoo-primary">
                  Contactează părintele
                </a>
                <Link href={routes.login} className="btn btn-outline-secondary">
                  Autentificare club
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
