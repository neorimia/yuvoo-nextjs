/**
 * Recent Activity Feed Component
 *
 * Displays recent booking activity for the club.
 */

import React from "react";
import Link from "next/link";
import { routes } from "@/lib/routes";
import type { Booking } from "@/modules/bookings/bookings.types";

interface RecentActivityFeedProps {
  bookings: Booking[];
}

const RecentActivityFeed: React.FC<RecentActivityFeedProps> = ({ bookings }) => {
  const getStatusBadge = (status: Booking["status"]) => {
    const config = {
      pending: { label: "În așteptare", class: "bg-warning text-dark" },
      confirmed: { label: "Confirmată", class: "bg-success text-white" },
      completed: { label: "Finalizată", class: "bg-info text-white" },
      cancelled: { label: "Anulată", class: "bg-danger text-white" },
    };

    const statusConfig = config[status] || config.pending;

    return <span className={`badge ${statusConfig.class}`}>{statusConfig.label}</span>;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("ro-RO", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  if (bookings.length === 0) {
    return (
      <div className="card border-0 shadow-sm">
        <div className="card-body text-center py-5">
          <i className="bi bi-inbox" style={{ fontSize: "3rem", color: "#ccc" }}></i>
          <p className="text-muted mt-3 mb-0">Nu există activitate recentă</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="card-title mb-0">
            <i className="bi bi-clock-history me-2"></i>
            Activitate Recentă
          </h5>
          <Link href={routes.club.bookings} className="btn btn-sm btn-outline-primary">
            Vezi toate
          </Link>
        </div>

        <div className="list-group list-group-flush">
          {bookings.map((booking) => (
            <div key={booking.id} className="list-group-item border-0 border-bottom px-0 py-3">
              <div className="d-flex justify-content-between align-items-start">
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center mb-2">
                    <h6 className="mb-0 me-2">Rezervare #{booking.id.slice(0, 8)}</h6>
                    {getStatusBadge(booking.status)}
                  </div>
                  <p className="text-muted small mb-1">
                    <i className="bi bi-calendar-event me-2"></i>
                    {formatDate(booking.scheduledAt)}
                  </p>
                  {booking.notes && (
                    <p className="text-muted small mb-0">
                      <i className="bi bi-chat-left-text me-2"></i>
                      {booking.notes}
                    </p>
                  )}
                </div>
                <Link
                  href={`${routes.club.bookings}?id=${booking.id}`}
                  className="btn btn-sm btn-outline-secondary"
                >
                  <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentActivityFeed;
