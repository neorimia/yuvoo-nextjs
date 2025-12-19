/**
 * Booking Card Component
 *
 * Reusable component for displaying booking/consultation cards.
 * Works for both club bookings and doctor consultations.
 * Shows booking details, child info, and action buttons.
 */

"use client";

import React from "react";

export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";
export type BookingType = "club_trial" | "doctor_consultation";

export interface BookingCardChild {
  firstName: string;
  lastName: string;
  age: number;
}

export interface BookingCardProps {
  /**
   * Booking/consultation ID
   */
  id: string;
  /**
   * Scheduled date and time
   */
  scheduledAt: Date;
  /**
   * Current status
   */
  status: BookingStatus;
  /**
   * Type of booking (club_trial or consultation)
   */
  type: BookingType;
  /**
   * Optional notes
   */
  notes?: string;
  /**
   * Optional child information
   */
  child?: BookingCardChild;
  /**
   * Created date
   */
  createdAt: Date;
  /**
   * Updated date
   */
  updatedAt: Date;
  /**
   * Callback when confirm action is triggered
   */
  onConfirm?: (id: string) => void;
  /**
   * Callback when cancel action is triggered
   */
  onCancel?: (id: string) => void;
  /**
   * Callback when complete action is triggered
   */
  onComplete?: (id: string) => void;
  /**
   * Callback when view details action is triggered
   */
  onViewDetails?: (id: string) => void;
  /**
   * Whether an action is currently processing
   */
  isProcessing?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * BookingCard Component
 *
 * Displays a booking/consultation card with:
 * - Booking ID and status badge
 * - Scheduled date and time
 * - Child information (if available)
 * - Notes (if available)
 * - Action buttons (confirm, cancel, complete, view details)
 * - Creation and update timestamps
 *
 * @example
 * ```tsx
 * <BookingCard
 *   id={booking.id}
 *   scheduledAt={booking.scheduledAt}
 *   status={booking.status}
 *   type="club_trial"
 *   child={{ firstName: "Ion", lastName: "Popescu", age: 8 }}
 *   onConfirm={handleConfirm}
 *   onCancel={handleCancel}
 * />
 * ```
 */
const BookingCard: React.FC<BookingCardProps> = ({
  id,
  scheduledAt,
  status,
  type,
  notes,
  child,
  createdAt,
  updatedAt,
  onConfirm,
  onCancel,
  onComplete,
  onViewDetails,
  isProcessing = false,
  className = "",
}) => {
  // Date formatting functions (will be extracted to utility in Phase 3)
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

  // Status badge configuration (will use utility from Phase 2)
  const getStatusBadge = (status: BookingStatus) => {
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
    return type === "club_trial" ? "Ședință de probă" : "Consultație";
  };

  const isUpcoming = new Date(scheduledAt) >= new Date();
  const canConfirm = status === "pending" && isUpcoming;
  const canCancel = status !== "cancelled" && status !== "completed";
  const canComplete = status === "confirmed" && isUpcoming;

  return (
    <div className={`card shadow-sm mb-4 bd-booking-card ${className}`}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h5 className="card-title mb-1">
              Rezervare #{id.slice(0, 8)}
              {getStatusBadge(status)}
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
                <strong>{formatDate(scheduledAt)}</strong>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex align-items-center">
              <i className="bi bi-clock text-primary me-2"></i>
              <div>
                <small className="text-muted d-block">Ora</small>
                <strong>{formatTime(scheduledAt)}</strong>
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

        {notes && (
          <div className="mb-3">
            <small className="text-muted d-block mb-1">Observații</small>
            <p className="mb-0 small">{notes}</p>
          </div>
        )}

        <div className="d-flex gap-2 flex-wrap">
          {onViewDetails && (
            <button
              onClick={() => onViewDetails(id)}
              className="btn btn-outline-primary btn-sm"
              disabled={isProcessing}
            >
              <i className="bi bi-eye me-1"></i>
              Vezi detalii
            </button>
          )}
          {canConfirm && onConfirm && (
            <button
              onClick={() => onConfirm(id)}
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
              onClick={() => onComplete(id)}
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
              onClick={() => onCancel(id)}
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
            Creată: {new Date(createdAt).toLocaleDateString("ro-RO")}
            {updatedAt.getTime() !== createdAt.getTime() && (
              <span className="ms-2">
                • Actualizată: {new Date(updatedAt).toLocaleDateString("ro-RO")}
              </span>
            )}
          </small>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
