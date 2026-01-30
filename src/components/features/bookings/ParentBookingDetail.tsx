/**
 * Parent Booking Detail Component
 *
 * Displays comprehensive booking information for parents.
 * Shows booking details, entity (club/doctor) information, child information,
 * status history, and cancellation option.
 */

"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cancelBookingAction } from "@/app/actions/bookings";
import { routes } from "@/lib/routes";
import { getStatusBadgeConfig } from "@/lib/utils/status-badges";
import { formatDate, formatTime, formatDateTime } from "@/lib/utils/date-formatting";
import type { Booking } from "@/modules/bookings/bookings.types";
import type { Club } from "@/modules/clubs/clubs.types";
import type { Doctor } from "@/modules/doctors/doctors.types";
import type { Child } from "@/modules/children/children.types";

interface ParentBookingDetailProps {
  booking: Booking;
  entity?: Club | Doctor;
  child?: Child;
}

const ParentBookingDetail: React.FC<ParentBookingDetailProps> = ({ booking, entity, child }) => {
  const router = useRouter();
  const [isCancelling, setIsCancelling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [_isPending, startTransition] = useTransition();

  const statusBadge = getStatusBadgeConfig(booking.status);

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
    return booking.type === "club_trial" ? "Ședință de probă" : "Consultație medicală";
  };

  const handleCancel = () => {
    if (!confirm("Ești sigur că vrei să anulezi această rezervare?")) {
      return;
    }

    startTransition(async () => {
      try {
        setIsCancelling(true);
        setError(null);

        const result = await cancelBookingAction(booking.id);

        if (result.success) {
          // Redirect to bookings list
          router.push(routes.parent.bookings);
          router.refresh();
        } else {
          setError(result.error || "Eroare la anularea rezervării");
        }
      } catch (err) {
        console.error("Error cancelling booking:", err);
        setError("Eroare la anularea rezervării. Te rugăm să reîncerci.");
      } finally {
        setIsCancelling(false);
      }
    });
  };

  const canCancel = booking.status !== "cancelled" && booking.status !== "completed";

  return (
    <div className="bd-parent-booking-detail">
      {/* Error Alert */}
      {error && (
        <div className="alert alert-danger mb-4" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          <strong>Eroare:</strong> {error}
        </div>
      )}

      {/* Booking Information Card */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-primary text-white">
          <h3 className="card-title mb-0">
            <i className="bi bi-calendar-check me-2"></i>
            Informații Rezervare
          </h3>
        </div>
        <div className="card-body">
          <div className="row g-4">
            {/* Status */}
            <div className="col-md-6">
              <div className="d-flex align-items-center">
                <i className="bi bi-info-circle text-yuvoo-primary me-2"></i>
                <div>
                  <small className="text-muted d-block">Status</small>
                  <span
                    className={`badge ${statusBadge.class} ${statusBadge.icon ? "d-inline-flex align-items-center" : ""}`}
                  >
                    {statusBadge.icon && <i className={`${statusBadge.icon} me-1`}></i>}
                    {statusBadge.label}
                  </span>
                </div>
              </div>
            </div>

            {/* Booking Type */}
            <div className="col-md-6">
              <div className="d-flex align-items-center">
                <i className="bi bi-tag text-yuvoo-primary me-2"></i>
                <div>
                  <small className="text-muted d-block">Tip Rezervare</small>
                  <strong>{getBookingTypeLabel()}</strong>
                </div>
              </div>
            </div>

            {/* Scheduled Date */}
            <div className="col-md-6">
              <div className="d-flex align-items-center">
                <i className="bi bi-calendar-event text-yuvoo-primary me-2"></i>
                <div>
                  <small className="text-muted d-block">Data</small>
                  <strong>{formatDate(booking.scheduledAt)}</strong>
                </div>
              </div>
            </div>

            {/* Scheduled Time */}
            <div className="col-md-6">
              <div className="d-flex align-items-center">
                <i className="bi bi-clock text-yuvoo-primary me-2"></i>
                <div>
                  <small className="text-muted d-block">Ora</small>
                  <strong>{formatTime(booking.scheduledAt)}</strong>
                </div>
              </div>
            </div>

            {/* Created Date */}
            <div className="col-md-6">
              <div className="d-flex align-items-center">
                <i className="bi bi-calendar-plus text-yuvoo-primary me-2"></i>
                <div>
                  <small className="text-muted d-block">Creată la</small>
                  <strong>{formatDateTime(booking.createdAt)}</strong>
                </div>
              </div>
            </div>

            {/* Updated Date */}
            {booking.updatedAt && booking.updatedAt.getTime() !== booking.createdAt.getTime() && (
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <i className="bi bi-calendar-check text-yuvoo-primary me-2"></i>
                  <div>
                    <small className="text-muted d-block">Actualizată la</small>
                    <strong>{formatDateTime(booking.updatedAt)}</strong>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Notes */}
          {booking.notes && (
            <div className="mt-4 pt-4 border-top">
              <h5 className="mb-3">
                <i className="bi bi-sticky text-yuvoo-primary me-2"></i>
                Observații
              </h5>
              <p className="mb-0">{booking.notes}</p>
            </div>
          )}
        </div>
      </div>

      {/* Entity Information Card */}
      {entity && (
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-light">
            <h3 className="card-title mb-0">
              <i
                className={`bi ${booking.entityType === "club" ? "bi-building" : "bi-person-badge"} me-2`}
              ></i>
              Informații {getEntityTypeLabel()}
            </h3>
          </div>
          <div className="card-body">
            <div className="row g-4">
              <div className="col-12">
                <h4 className="mb-3">
                  <Link href={getEntityLink() || "#"} className="text-decoration-none">
                    {entity.name}
                  </Link>
                </h4>
              </div>

              {/* Contact Information */}
              {entity.contact && (
                <>
                  {entity.contact.phone && (
                    <div className="col-md-6">
                      <div className="d-flex align-items-center">
                        <i className="bi bi-telephone text-yuvoo-primary me-2"></i>
                        <div>
                          <small className="text-muted d-block">Telefon</small>
                          <a href={`tel:${entity.contact.phone}`} className="text-decoration-none">
                            <strong>{entity.contact.phone}</strong>
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  {entity.contact.email && (
                    <div className="col-md-6">
                      <div className="d-flex align-items-center">
                        <i className="bi bi-envelope text-yuvoo-primary me-2"></i>
                        <div>
                          <small className="text-muted d-block">Email</small>
                          <a
                            href={`mailto:${entity.contact.email}`}
                            className="text-decoration-none"
                          >
                            <strong>{entity.contact.email}</strong>
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Club-specific information */}
              {booking.entityType === "club" && (entity as Club).location && (
                <div className="col-12">
                  <div className="d-flex align-items-start">
                    <i className="bi bi-geo-alt text-yuvoo-primary me-2 mt-1"></i>
                    <div>
                      <small className="text-muted d-block">Locație</small>
                      <strong>
                        {(entity as Club).location.address}
                        {(entity as Club).location.city && `, ${(entity as Club).location.city}`}
                      </strong>
                    </div>
                  </div>
                </div>
              )}

              {/* Doctor-specific information */}
              {booking.entityType === "doctor" && (entity as Doctor).specialty && (
                <div className="col-12">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-heart-pulse text-yuvoo-primary me-2"></i>
                    <div>
                      <small className="text-muted d-block">Specialitate</small>
                      <strong>{(entity as Doctor).specialty}</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* View Entity Details Button */}
              <div className="col-12">
                <Link href={getEntityLink() || "#"} className="btn btn-primary">
                  <i className="bi bi-eye me-2"></i>
                  Vezi detalii {getEntityTypeLabel().toLowerCase()}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Child Information Card */}
      {child && (
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-light">
            <h3 className="card-title mb-0">
              <i className="bi bi-person text-yuvoo-primary me-2"></i>
              Informații Copil
            </h3>
          </div>
          <div className="card-body">
            <div className="row g-4">
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <i className="bi bi-person-badge text-yuvoo-primary me-2"></i>
                  <div>
                    <small className="text-muted d-block">Nume</small>
                    <strong>
                      {child.firstName} {child.lastName}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <i className="bi bi-calendar text-yuvoo-primary me-2"></i>
                  <div>
                    <small className="text-muted d-block">Vârstă</small>
                    <strong>{child.age} ani</strong>
                  </div>
                </div>
              </div>

              {/* View Child Details Button */}
              <div className="col-12">
                <Link
                  href={routes.parent.children.detail(child.id)}
                  className="btn btn-outline-primary"
                >
                  <i className="bi bi-eye me-2"></i>
                  Vezi profil copil
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="d-flex gap-3">
            <Link href={routes.parent.bookings} className="btn btn-outline-secondary">
              <i className="bi bi-arrow-left me-2"></i>
              Înapoi la rezervări
            </Link>

            {canCancel && (
              <button onClick={handleCancel} className="btn btn-danger" disabled={isCancelling}>
                {isCancelling ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Se anulează...
                  </>
                ) : (
                  <>
                    <i className="bi bi-x-circle me-2"></i>
                    Anulează Rezervarea
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentBookingDetail;
