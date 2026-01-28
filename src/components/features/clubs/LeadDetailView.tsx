/**
 * Lead Detail View Component
 *
 * Server component for displaying lead details.
 * Shows paywall if contact info is locked, or full details if unlocked.
 */

import React from "react";
import Link from "next/link";
import type { Club } from "@/modules/clubs/clubs.types";
import type { LeadWithRelations } from "@/types/leads";
import { routes } from "@/lib/routes";
import { LeadStatus } from "@/types/leads";
import { formatDistanceToNow, format } from "date-fns";
import { ro } from "date-fns/locale";

interface LeadWithLocationName extends LeadWithRelations {
  locationName?: string | null;
}

interface LeadDetailViewProps {
  club: Club;
  _club: Club;
  lead: LeadWithLocationName;
  isPremium: boolean;
  contactVisible: boolean;
}

const LeadDetailView: React.FC<LeadDetailViewProps> = ({
  _club,
  lead,
  isPremium,
  contactVisible,
}) => {
  // Status badge styling
  const getStatusBadge = (status: LeadWithRelations["status"]) => {
    const badges = {
      nou: { class: "badge bg-primary", label: "Nou" },
      in_asteptare: { class: "badge bg-warning text-dark", label: "În așteptare" },
      acceptat: { class: "badge bg-success", label: "Acceptat" },
      expirat: { class: "badge bg-secondary", label: "Expirat" },
    };
    return badges[status] || badges[LeadStatus.NOU];
  };

  const statusBadge = getStatusBadge(lead.status);

  // Calculate time until expiration
  const expiresIn = formatDistanceToNow(lead.expiresAt, { addSuffix: false, locale: ro });
  const isExpired = new Date(lead.expiresAt) < new Date();

  return (
    <div className="bd-lead-detail-view">
      {/* Header */}
      <div className="mb-4">
        <Link href={routes.club.leads.list} className="btn btn-link text-decoration-none mb-3">
          <i className="bi bi-arrow-left me-2"></i>
          Înapoi la cereri
        </Link>
        <div className="d-flex justify-content-between align-items-start flex-wrap">
          <div>
            <h1 className="bd-dashboard-section-title mb-2">Detalii cerere</h1>
            <p className="text-muted mb-0">Informații despre cererea de la părinte</p>
          </div>
          <span className={statusBadge.class}>{statusBadge.label}</span>
        </div>
      </div>

      <div className="row">
        {/* Lead Information */}
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-info-circle me-2"></i>
                Informații cerere
              </h5>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-6">
                  <strong>Sport:</strong>
                  <p>{lead.sportType || "N/A"}</p>
                </div>
                <div className="col-md-6">
                  <strong>Vârsta copilului:</strong>
                  <p>{lead.childAge} ani</p>
                </div>
              </div>
              {lead.locationId && (
                <div className="row mb-3">
                  <div className="col-md-6">
                    <strong>Locație:</strong>
                    <p>{lead.locationName || lead.locationId}</p>
                  </div>
                </div>
              )}
              {lead.message && (
                <div className="mb-3">
                  <strong>Mesaj:</strong>
                  <p className="mb-0">{lead.message}</p>
                </div>
              )}
              <div className="row">
                <div className="col-md-6">
                  <strong>Creată:</strong>
                  <p className="mb-0">
                    {format(lead.createdAt, "dd MMMM yyyy, HH:mm", { locale: ro })}
                  </p>
                </div>
                <div className="col-md-6">
                  <strong>Expiră:</strong>
                  <p className={`mb-0 ${isExpired ? "text-danger" : ""}`}>
                    {format(lead.expiresAt, "dd MMMM yyyy, HH:mm", { locale: ro })}
                    {!isExpired && <small className="text-muted ms-2">(în {expiresIn})</small>}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          {contactVisible ? (
            <div className="card mb-4">
              <div className="card-header bg-success text-white">
                <h5 className="mb-0">
                  <i className="bi bi-person-check me-2"></i>
                  Date de contact părinte
                </h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <strong>Nume părinte:</strong>
                    <p className="mb-0">{lead.parentName}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>Email:</strong>
                    <p className="mb-0">
                      <a href={`mailto:${lead.parentEmail}`}>{lead.parentEmail}</a>
                    </p>
                  </div>
                  {lead.parentPhone && (
                    <div className="col-md-6 mb-3">
                      <strong>Telefon:</strong>
                      <p className="mb-0">
                        <a href={`tel:${lead.parentPhone}`}>{lead.parentPhone}</a>
                      </p>
                    </div>
                  )}
                </div>
                <div className="alert alert-success mt-3 mb-0">
                  <i className="bi bi-check-circle-fill me-2"></i>
                  {isPremium
                    ? "Ai acces la toate cererile ca membru Premium."
                    : "Ai deblocat această cerere prin plată."}
                </div>
              </div>
            </div>
          ) : (
            <div className="card mb-4 border-warning">
              <div className="card-header bg-warning">
                <h5 className="mb-0">
                  <i className="bi bi-lock me-2"></i>
                  Date de contact blocate
                </h5>
              </div>
              <div className="card-body">
                <p className="mb-4">
                  Pentru a vedea datele de contact ale părintelui, ai două opțiuni:
                </p>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="card h-100 border-primary">
                      <div className="card-body">
                        <h5 className="card-title">
                          <i className="bi bi-credit-card me-2"></i>
                          Opțiunea A — Plătește per cerere
                        </h5>
                        <p className="card-text">
                          <strong>3 €</strong> pentru această cerere
                        </p>
                        <p className="card-text small text-muted">
                          Plătești o singură dată pentru această cerere și vei vedea datele de
                          contact.
                        </p>
                        <Link
                          href={routes.club.leads.payment(lead.id)}
                          className="btn btn-primary w-100"
                        >
                          Plătește 3 €
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card h-100 border-success">
                      <div className="card-body">
                        <h5 className="card-title">
                          <i className="bi bi-star-fill me-2"></i>
                          Opțiunea B — Upgrade Premium
                        </h5>
                        <p className="card-text">
                          <strong>99 lei/lună</strong> sau <strong>990 lei/an</strong>
                        </p>
                        <p className="card-text small text-muted">
                          Acces nelimitat la toate cererile, badge &quot;Verificat Yuvoo&quot;,
                          afișare prioritară și multe altele. Abonament cu reînnoire automată prin
                          Stripe Subscriptions.
                        </p>
                        <Link href={routes.club.premium} className="btn btn-success w-100">
                          Upgrade la Premium
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="col-lg-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-clock-history me-2"></i>
                Status cerere
              </h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <strong>Status:</strong>
                <div className="mt-2">
                  <span className={statusBadge.class}>{statusBadge.label}</span>
                </div>
              </div>
              {lead.acceptedAt && (
                <div className="mb-3">
                  <strong>Acceptată:</strong>
                  <p className="mb-0">
                    {format(lead.acceptedAt, "dd MMMM yyyy, HH:mm", { locale: ro })}
                  </p>
                </div>
              )}
              {lead.paymentMethod && (
                <div className="mb-3">
                  <strong>Metodă de plată:</strong>
                  <p className="mb-0">
                    {lead.paymentMethod === "pay_per_lead" ? "Plată per cerere" : "Premium"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetailView;
