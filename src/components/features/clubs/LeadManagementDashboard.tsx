/**
 * Lead Management Dashboard Component
 *
 * Server component for displaying leads list with filters and pagination.
 * Shows leads for a club with status filtering and pagination.
 */

import React from "react";
import Link from "next/link";
import type { Club } from "@/modules/clubs/clubs.types";
import type { Lead } from "@/types/leads";

interface LeadWithLocationName extends Lead {
  locationName?: string | null;
}
import { routes } from "@/lib/routes";
import { LeadStatus } from "@/types/leads";
import { formatDistanceToNow } from "date-fns";
import { ro } from "date-fns/locale";

interface LeadManagementDashboardProps {
  club: Club;
  _club: Club;
  leads: LeadWithLocationName[];
  total: number;
  page: number;
  pageSize: number;
  currentStatus?: LeadStatus;
  isPremium: boolean;
  newLeadsCount: number;
}

const LeadManagementDashboard: React.FC<LeadManagementDashboardProps> = ({
  _club,
  leads,
  total,
  page,
  pageSize,
  currentStatus,
  isPremium,
  newLeadsCount,
}) => {
  const totalPages = Math.ceil(total / pageSize);

  // Status badge styling
  const getStatusBadge = (status: LeadStatus) => {
    const badges = {
      [LeadStatus.NOU]: { class: "badge bg-primary", label: "Nou" },
      [LeadStatus.IN_ASTEPTARE]: { class: "badge bg-warning text-dark", label: "În așteptare" },
      [LeadStatus.ACCEPTAT]: { class: "badge bg-success", label: "Acceptat" },
      [LeadStatus.EXPIRAT]: { class: "badge bg-secondary", label: "Expirat" },
    };
    return badges[status] || badges[LeadStatus.NOU];
  };

  // Format date
  const formatDate = (date: Date) => {
    return formatDistanceToNow(date, { addSuffix: true, locale: ro });
  };

  return (
    <div className="bd-lead-management-dashboard">
      {/* Header */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <div>
            <h1 className="bd-dashboard-section-title mb-2">
              <i className="bi bi-inbox me-2"></i>
              Cereri de la părinți
            </h1>
            <p className="text-muted mb-0">
              Gestionează cererile de interes primite de la părinți pentru clubul tău.
            </p>
          </div>
          {!isPremium && (
            <Link href={routes.club.premium} className="btn btn-outline-primary">
              <i className="bi bi-star-fill me-2"></i>
              Upgrade la Premium
            </Link>
          )}
        </div>
      </div>

      {/* Premium Badge */}
      {isPremium && (
        <div className="alert alert-info mb-4">
          <i className="bi bi-check-circle-fill me-2"></i>
          <strong>Club Premium:</strong> Ai acces nelimitat la toate cererile.
        </div>
      )}

      {/* Filters */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="d-flex gap-2 flex-wrap align-items-center">
            <span className="fw-semibold">Filtrează după status:</span>
            <Link
              href={routes.club.leads.list}
              className={`btn btn-sm ${!currentStatus ? "btn-primary" : "btn-outline-primary"}`}
            >
              Toate ({total})
            </Link>
            <Link
              href={`${routes.club.leads.list}?status=nou`}
              className={`btn btn-sm ${currentStatus === LeadStatus.NOU ? "btn-primary" : "btn-outline-primary"}`}
            >
              Nou
              {newLeadsCount > 0 && <span className="badge bg-danger ms-2">{newLeadsCount}</span>}
            </Link>
            <Link
              href={`${routes.club.leads.list}?status=in_asteptare`}
              className={`btn btn-sm ${currentStatus === LeadStatus.IN_ASTEPTARE ? "btn-primary" : "btn-outline-primary"}`}
            >
              În așteptare
            </Link>
            <Link
              href={`${routes.club.leads.list}?status=acceptat`}
              className={`btn btn-sm ${currentStatus === LeadStatus.ACCEPTAT ? "btn-primary" : "btn-outline-primary"}`}
            >
              Acceptat
            </Link>
            <Link
              href={`${routes.club.leads.list}?status=expirat`}
              className={`btn btn-sm ${currentStatus === LeadStatus.EXPIRAT ? "btn-primary" : "btn-outline-primary"}`}
            >
              Expirat
            </Link>
          </div>
        </div>
      </div>

      {/* Leads List */}
      {leads.length === 0 ? (
        <div className="card">
          <div className="card-body text-center py-5">
            <i className="bi bi-inbox display-4 text-muted mb-3"></i>
            <h3 className="mb-3">Nu ai cereri</h3>
            <p className="text-muted">
              {currentStatus
                ? `Nu există cereri cu statusul "${getStatusBadge(currentStatus as LeadStatus).label}".`
                : "Nu ai primit încă cereri de la părinți."}
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="card">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Sport</th>
                      <th>Vârsta copilului</th>
                      <th>Locație</th>
                      <th>Status</th>
                      <th>Creată</th>
                      <th>Acțiuni</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => {
                      const statusBadge = getStatusBadge(lead.status);
                      return (
                        <tr key={lead.id}>
                          <td>
                            <strong>{lead.sportType || "N/A"}</strong>
                          </td>
                          <td>{lead.childAge} ani</td>
                          <td>{lead.locationName || lead.locationId || "N/A"}</td>
                          <td>
                            <span className={statusBadge.class}>{statusBadge.label}</span>
                          </td>
                          <td>
                            <small className="text-muted">{formatDate(lead.createdAt)}</small>
                          </td>
                          <td>
                            <Link
                              href={routes.club.leads.detail(lead.id)}
                              className="btn btn-sm btn-outline-primary"
                            >
                              Vezi detalii
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav aria-label="Paginare cereri" className="mt-4">
              <ul className="pagination justify-content-center">
                {page > 1 && (
                  <li className="page-item">
                    <Link
                      className="page-link"
                      href={`${routes.club.leads.list}?page=${page - 1}${currentStatus ? `&status=${currentStatus}` : ""}`}
                    >
                      Anterior
                    </Link>
                  </li>
                )}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                  if (
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= page - 2 && pageNum <= page + 2)
                  ) {
                    return (
                      <li key={pageNum} className={`page-item ${pageNum === page ? "active" : ""}`}>
                        <Link
                          className="page-link"
                          href={`${routes.club.leads.list}?page=${pageNum}${currentStatus ? `&status=${currentStatus}` : ""}`}
                        >
                          {pageNum}
                        </Link>
                      </li>
                    );
                  } else if (pageNum === page - 3 || pageNum === page + 3) {
                    return (
                      <li key={pageNum} className="page-item disabled">
                        <span className="page-link">...</span>
                      </li>
                    );
                  }
                  return null;
                })}
                {page < totalPages && (
                  <li className="page-item">
                    <Link
                      className="page-link"
                      href={`${routes.club.leads.list}?page=${page + 1}${currentStatus ? `&status=${currentStatus}` : ""}`}
                    >
                      Următor
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          )}
        </>
      )}
    </div>
  );
};

export default LeadManagementDashboard;
