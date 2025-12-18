/**
 * Club Booking Card Component
 *
 * Displays a single booking in a card format for club admins.
 * Shows booking details, child info, and actions (confirm, cancel, complete).
 */

"use client";

import React from "react";
import type { Booking } from "@/modules/bookings/bookings.types";
import type { Child } from "@/modules/children/children.types";

interface ClubBookingCardProps {
  booking: Booking;
  child?: Child;
  onConfirm?: (bookingId: string) => void;
  onCancel?: (bookingId: string) => void;
  onComplete?: (bookingId: string) => void;
  onViewDetails?: (booking: Booking) => void;
  isProcessing?: boolean;
}

const ClubBookingCard: React.FC<ClubBookingCardProps> = ({
  booking,
  child,
  onConfirm,
  onCancel,
  onComplete,
  onViewDetails,
  isProcessing = false,
}) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("ro-RO", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("ro-RO", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status: Booking["status"]) => {
    const statusConfig = {
      pending: { label: "În așteptare", class: "bg-warning text-dark" },
      confirmed: { label: "Confirmată", class: "bg-success text-white" },
      cancelled: { label: "Anulată", class: "bg-secondary text-white" },
      completed: { label: "Finalizată", class: "bg-info text-white" },
    };

    const config = statusConfig[status] || statusConfig.pending;

    return <span className={`badge ${config.class} ms-2`}>{config.label}</span>;
  };

  const getBookingTypeLabel = () => {
    return booking.type === "club_trial" ? "Ședință de probă" : "Consultație";
  };

  const isUpcoming = new Date(booking.scheduledAt) >= new Date();
  const canConfirm = booking.status === "pending" && isUpcoming;
  const canCancel = booking.status !== "cancelled" && booking.status !== "completed";
  const canComplete = booking.status === "confirmed" && isUpcoming;

  return (
    <div className="card shadow-sm mb-4 bd-club-booking-card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h5 className="card-title mb-1">
              Rezervare #{booking.id.slice(0, 8)}
              {getStatusBadge(booking.status)}
            </h5>
            <p className="text-muted mb-0 small">{getBookingTypeLabel()}</p>
          </div>
        </div>

        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <div className="d-flex align-items-center">
              <i className="bi bi-calendar-event text-primary me-2"></i>
              <div>
                <small className="text-muted d-block">Data</small>
                <strong>{formatDate(booking.scheduledAt)}</strong>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex align-items-center">
              <i className="bi bi-clock text-primary me-2"></i>
              <div>
                <small className="text-muted d-block">Ora</small>
                <strong>{formatTime(booking.scheduledAt)}</strong>
              </div>
            </div>
          </div>
        </div>

        {child && (
          <div className="mb-3">
            <div className="d-flex align-items-center">
              <i className="bi bi-person text-primary me-2"></i>
              <div>
                <small className="text-muted d-block">Copil</small>
                <strong>
                  {child.firstName} {child.lastName} ({child.age} ani)
                </strong>
              </div>
            </div>
          </div>
        )}

        {booking.notes && (
          <div className="mb-3">
            <small className="text-muted d-block mb-1">Observații</small>
            <p className="mb-0 small">{booking.notes}</p>
          </div>
        )}

        <div className="d-flex gap-2 flex-wrap">
          {onViewDetails && (
            <button
              onClick={() => onViewDetails(booking)}
              className="btn btn-outline-primary btn-sm"
              disabled={isProcessing}
            >
              <i className="bi bi-eye me-1"></i>
              Vezi detalii
            </button>
          )}
          {canConfirm && onConfirm && (
            <button
              onClick={() => onConfirm(booking.id)}
              className="btn btn-success btn-sm"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-1"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Se procesează...
                </>
              ) : (
                <>
                  <i className="bi bi-check-circle me-1"></i>
                  Confirmă
                </>
              )}
            </button>
          )}

          {canComplete && onComplete && (
            <button
              onClick={() => onComplete(booking.id)}
              className="btn btn-info btn-sm text-white"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-1"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Se procesează...
                </>
              ) : (
                <>
                  <i className="bi bi-check2-all me-1"></i>
                  Marchează ca finalizată
                </>
              )}
            </button>
          )}

          {canCancel && onCancel && (
            <button
              onClick={() => onCancel(booking.id)}
              className="btn btn-outline-danger btn-sm"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-1"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Se procesează...
                </>
              ) : (
                <>
                  <i className="bi bi-x-circle me-1"></i>
                  Anulează
                </>
              )}
            </button>
          )}
        </div>

        <div className="mt-3 pt-3 border-top">
          <small className="text-muted">
            Creată: {new Date(booking.createdAt).toLocaleDateString("ro-RO")}
            {booking.updatedAt.getTime() !== booking.createdAt.getTime() && (
              <span className="ms-2">
                • Actualizată: {new Date(booking.updatedAt).toLocaleDateString("ro-RO")}
              </span>
            )}
          </small>
        </div>
      </div>
    </div>
  );
};

export default ClubBookingCard;
