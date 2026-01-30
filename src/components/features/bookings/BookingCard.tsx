/**
 * Booking Card Component
 *
 * Displays a single booking in a card format.
 * Shows booking details, entity (club/doctor) info, and actions.
 */

"use client";

import React from "react";
import Link from "next/link";
import { routes } from "@/lib/routes";
import type { Booking } from "@/modules/bookings/bookings.types";
import type { Club } from "@/modules/clubs/clubs.types";
import type { Doctor } from "@/modules/doctors/doctors.types";
import type { Child } from "@/modules/children/children.types";

interface BookingCardProps {
  booking: Booking;
  entity?: Club | Doctor;
  child?: Child;
  onCancel?: (bookingId: string) => void;
  isCancelling?: boolean;
}

const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  entity,
  child,
  onCancel,
  isCancelling = false,
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
      confirmed: { label: "Confirmată", class: "bg-success" },
      cancelled: { label: "Anulată", class: "bg-secondary" },
      completed: { label: "Finalizată", class: "bg-info" },
    };

    const config = statusConfig[status] || statusConfig.pending;

    return <span className={`badge ${config.class} ms-2`}>{config.label}</span>;
  };

  const getEntityLink = () => {
    if (!entity) return null;

    if (booking.entityType === "club") {
      return routes.clubs.detail((entity as Club).slug);
    } else {
      return routes.doctors.detail((entity as Doctor).slug);
    }
  };

  const getEntityTypeLabel = () => {
    return booking.entityType === "club" ? "Club" : "Doctor";
  };

  const getBookingTypeLabel = () => {
    return booking.type === "club_trial" ? "Ședință de probă" : "Consultație";
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h5 className="card-title mb-1">
              {entity ? (
                <Link href={getEntityLink() || "#"} className="text-decoration-none">
                  {entity.name}
                </Link>
              ) : (
                <span className="text-muted">Încărcare...</span>
              )}
            </h5>
            <p className="text-muted mb-0 small">
              {getEntityTypeLabel()} • {getBookingTypeLabel()}
              {getStatusBadge(booking.status)}
            </p>
          </div>
        </div>

        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <div className="d-flex align-items-center">
              <i className="bi bi-calendar-event text-yuvoo-primary me-2"></i>
              <div>
                <small className="text-muted d-block">Data</small>
                <strong>{formatDate(booking.scheduledAt)}</strong>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex align-items-center">
              <i className="bi bi-clock text-yuvoo-primary me-2"></i>
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
              <i className="bi bi-person text-yuvoo-primary me-2"></i>
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

        {entity && (
          <div className="mb-3">
            {entity.contact?.phone && (
              <div className="d-flex align-items-center mb-2">
                <i className="bi bi-telephone text-yuvoo-primary me-2"></i>
                <small>
                  <a href={`tel:${entity.contact.phone}`} className="text-decoration-none">
                    {entity.contact.phone}
                  </a>
                </small>
              </div>
            )}
            {entity.contact?.email && (
              <div className="d-flex align-items-center">
                <i className="bi bi-envelope text-yuvoo-primary me-2"></i>
                <small>
                  <a href={`mailto:${entity.contact.email}`} className="text-decoration-none">
                    {entity.contact.email}
                  </a>
                </small>
              </div>
            )}
          </div>
        )}

        <div className="d-flex gap-2">
          <Link
            href={routes.parent.bookingsDetails(booking.id)}
            className="btn btn-outline-primary btn-sm"
          >
            <i className="bi bi-info-circle me-1"></i>
            Detalii
          </Link>
          {entity && (
            <Link href={getEntityLink() || "#"} className="btn btn-outline-secondary btn-sm">
              <i className="bi bi-eye me-1"></i>
              Vezi {getEntityTypeLabel().toLowerCase()}
            </Link>
          )}
          {booking.status !== "cancelled" && booking.status !== "completed" && onCancel && (
            <button
              onClick={() => onCancel(booking.id)}
              className="btn btn-outline-danger btn-sm"
              disabled={isCancelling}
            >
              {isCancelling ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-1"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Se anulează...
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
          </small>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
