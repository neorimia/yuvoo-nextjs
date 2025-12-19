/**
 * Booking Detail Modal Component
 *
 * Reusable component for displaying booking/consultation details in a Bootstrap modal.
 * Works for both club bookings and doctor consultations.
 * Shows booking details, child info, parent contact info, and actions.
 */

"use client";

import React, { useEffect, useRef } from "react";
import type { BookingStatus, BookingType } from "./BookingCard";

export interface BookingDetailModalParent {
  email: string;
  name?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
}

export interface BookingDetailModalChild {
  firstName: string;
  lastName: string;
  age: number;
  gender?: "male" | "female" | "other" | null;
  dateOfBirth?: Date;
}

export interface BookingDetailModalData {
  id: string;
  scheduledAt: Date;
  status: BookingStatus;
  type: BookingType;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BookingDetailModalProps {
  /**
   * Booking/consultation data (null to hide modal)
   */
  booking: BookingDetailModalData | null;
  /**
   * Optional child information
   */
  child?: BookingDetailModalChild;
  /**
   * Optional parent/user contact information
   */
  parent?: BookingDetailModalParent | null;
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
   * Whether an action is currently processing
   */
  isProcessing?: boolean;
  /**
   * Modal ID (for Bootstrap modal instance)
   */
  modalId?: string;
}

interface BootstrapModal {
  show: () => void;
  hide: () => void;
  dispose: () => void;
}

/**
 * BookingDetailModal Component
 *
 * Displays a Bootstrap modal with detailed booking/consultation information:
 * - Booking ID and status
 * - Booking type and schedule
 * - Child information (if available)
 * - Parent contact information (if available)
 * - Notes (if available)
 * - Creation and update timestamps
 * - Action buttons (confirm, cancel, complete)
 *
 * @example
 * ```tsx
 * <BookingDetailModal
 *   booking={bookingData}
 *   child={childData}
 *   parent={parentData}
 *   onConfirm={handleConfirm}
 *   onCancel={handleCancel}
 * />
 * ```
 */
const BookingDetailModal: React.FC<BookingDetailModalProps> = ({
  booking,
  child,
  parent,
  onConfirm,
  onCancel,
  onComplete,
  isProcessing = false,
  modalId = "bookingDetailModal",
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const modalInstanceRef = useRef<BootstrapModal | null>(null);

  // Initialize Bootstrap modal
  useEffect(() => {
    if (!modalRef.current) return;

    const initModal = async () => {
      try {
        // Dynamically import Bootstrap
        const bootstrap = await import("bootstrap/dist/js/bootstrap.bundle.min");

        if (bootstrap && bootstrap.Modal) {
          // Dispose existing instance if any
          const existingInstance = bootstrap.Modal.getInstance(modalRef.current!);
          if (existingInstance) {
            existingInstance.dispose();
          }

          // Create new modal instance
          const modal = new bootstrap.Modal(modalRef.current!, {
            backdrop: true,
            keyboard: true,
            focus: true,
          });

          modalInstanceRef.current = modal;

          // Show modal when booking is set
          if (booking) {
            modal.show();
          }
        } else {
          console.error("Bootstrap Modal not found");
        }
      } catch (error) {
        console.error("Error initializing Bootstrap modal:", error);
      }
    };

    initModal();

    // Cleanup on unmount
    return () => {
      if (modalInstanceRef.current) {
        modalInstanceRef.current.dispose();
      }
    };
  }, [booking]);

  if (!booking) return null;

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

  const formatDateTime = (date: Date) => {
    return new Date(date).toLocaleString("ro-RO", {
      year: "numeric",
      month: "long",
      day: "numeric",
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

    return <span className={`badge ${config.class}`}>{config.label}</span>;
  };

  const getBookingTypeLabel = () => {
    return booking.type === "club_trial" ? "Ședință de probă" : "Consultație";
  };

  const isUpcoming = new Date(booking.scheduledAt) >= new Date();
  const canConfirm = booking.status === "pending" && isUpcoming;
  const canCancel = booking.status !== "cancelled" && booking.status !== "completed";
  const canComplete = booking.status === "confirmed" && isUpcoming;

  return (
    <div
      ref={modalRef}
      className="modal fade"
      id={modalId}
      tabIndex={-1}
      aria-labelledby={`${modalId}Label`}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`${modalId}Label`}>
              <i className="bi bi-calendar-check me-2 text-yuvoo-primary"></i>
              Detalii Rezervare
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {/* Booking ID and Status */}
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="mb-0">ID Rezervare</h6>
                <code className="text-muted">{booking.id}</code>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <h6 className="mb-0">Status</h6>
                {getStatusBadge(booking.status)}
              </div>
            </div>

            <hr />

            {/* Booking Type and Schedule */}
            <div className="mb-4">
              <h6 className="mb-3">
                <i className="bi bi-info-circle me-2 text-yuvoo-primary"></i>
                Informații Rezervare
              </h6>
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="d-flex align-items-start">
                    <i className="bi bi-tag text-primary me-2 mt-1"></i>
                    <div>
                      <small className="text-muted d-block">Tip</small>
                      <strong>{getBookingTypeLabel()}</strong>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-start">
                    <i className="bi bi-calendar-event text-primary me-2 mt-1"></i>
                    <div>
                      <small className="text-muted d-block">Data</small>
                      <strong>{formatDate(booking.scheduledAt)}</strong>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-start">
                    <i className="bi bi-clock text-primary me-2 mt-1"></i>
                    <div>
                      <small className="text-muted d-block">Ora</small>
                      <strong>{formatTime(booking.scheduledAt)}</strong>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-start">
                    <i className="bi bi-hourglass-split text-primary me-2 mt-1"></i>
                    <div>
                      <small className="text-muted d-block">Tip</small>
                      <strong>{isUpcoming ? "Viitoare" : "Trecută"}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr />

            {/* Child Information */}
            {child && (
              <>
                <div className="mb-4">
                  <h6 className="mb-3">
                    <i className="bi bi-person me-2 text-yuvoo-primary"></i>
                    Informații Copil
                  </h6>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="d-flex align-items-start">
                        <i className="bi bi-person-badge text-primary me-2 mt-1"></i>
                        <div>
                          <small className="text-muted d-block">Nume complet</small>
                          <strong>
                            {child.firstName} {child.lastName}
                          </strong>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex align-items-start">
                        <i className="bi bi-calendar3 text-primary me-2 mt-1"></i>
                        <div>
                          <small className="text-muted d-block">Vârstă</small>
                          <strong>{child.age} ani</strong>
                        </div>
                      </div>
                    </div>
                    {child.gender && (
                      <div className="col-md-6">
                        <div className="d-flex align-items-start">
                          <i className="bi bi-gender-ambiguous text-primary me-2 mt-1"></i>
                          <div>
                            <small className="text-muted d-block">Gen</small>
                            <strong>
                              {child.gender === "male"
                                ? "Băiat"
                                : child.gender === "female"
                                  ? "Fată"
                                  : "Nespecificat"}
                            </strong>
                          </div>
                        </div>
                      </div>
                    )}
                    {child.dateOfBirth && (
                      <div className="col-md-6">
                        <div className="d-flex align-items-start">
                          <i className="bi bi-calendar-date text-primary me-2 mt-1"></i>
                          <div>
                            <small className="text-muted d-block">Data nașterii</small>
                            <strong>
                              {new Date(child.dateOfBirth).toLocaleDateString("ro-RO")}
                            </strong>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <hr />
              </>
            )}

            {/* Parent Contact Information */}
            {parent && (
              <>
                <div className="mb-4">
                  <h6 className="mb-3">
                    <i className="bi bi-telephone me-2 text-yuvoo-primary"></i>
                    Contact Părinte
                  </h6>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="d-flex align-items-start">
                        <i className="bi bi-person text-primary me-2 mt-1"></i>
                        <div>
                          <small className="text-muted d-block">Nume</small>
                          <strong>
                            {parent.firstName && parent.lastName
                              ? `${parent.firstName} ${parent.lastName}`
                              : parent.name || "N/A"}
                          </strong>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex align-items-start">
                        <i className="bi bi-envelope text-primary me-2 mt-1"></i>
                        <div>
                          <small className="text-muted d-block">Email</small>
                          <strong>
                            <a href={`mailto:${parent.email}`} className="text-decoration-none">
                              {parent.email}
                            </a>
                          </strong>
                        </div>
                      </div>
                    </div>
                    {parent.phone && (
                      <div className="col-md-6">
                        <div className="d-flex align-items-start">
                          <i className="bi bi-telephone text-primary me-2 mt-1"></i>
                          <div>
                            <small className="text-muted d-block">Telefon</small>
                            <strong>
                              <a href={`tel:${parent.phone}`} className="text-decoration-none">
                                {parent.phone}
                              </a>
                            </strong>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <hr />
              </>
            )}

            {/* Notes */}
            {booking.notes && (
              <>
                <div className="mb-4">
                  <h6 className="mb-3">
                    <i className="bi bi-chat-left-text me-2 text-yuvoo-primary"></i>
                    Observații
                  </h6>
                  <div className="alert alert-light">
                    <p className="mb-0">{booking.notes}</p>
                  </div>
                </div>
                <hr />
              </>
            )}

            {/* Timestamps */}
            <div className="mb-3">
              <h6 className="mb-3">
                <i className="bi bi-clock-history me-2 text-yuvoo-primary"></i>
                Istoric
              </h6>
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="d-flex align-items-start">
                    <i className="bi bi-plus-circle text-primary me-2 mt-1"></i>
                    <div>
                      <small className="text-muted d-block">Creată</small>
                      <strong>{formatDateTime(booking.createdAt)}</strong>
                    </div>
                  </div>
                </div>
                {booking.updatedAt.getTime() !== booking.createdAt.getTime() && (
                  <div className="col-md-6">
                    <div className="d-flex align-items-start">
                      <i className="bi bi-pencil text-primary me-2 mt-1"></i>
                      <div>
                        <small className="text-muted d-block">Actualizată</small>
                        <strong>{formatDateTime(booking.updatedAt)}</strong>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              disabled={isProcessing}
            >
              Închide
            </button>
            {canConfirm && onConfirm && (
              <button
                type="button"
                className="btn btn-success"
                onClick={() => {
                  onConfirm(booking.id);
                  modalInstanceRef.current?.hide();
                }}
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
                type="button"
                className="btn btn-info text-white"
                onClick={() => {
                  onComplete(booking.id);
                  modalInstanceRef.current?.hide();
                }}
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
                type="button"
                className="btn btn-outline-danger"
                onClick={() => {
                  onCancel(booking.id);
                  modalInstanceRef.current?.hide();
                }}
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
        </div>
      </div>
    </div>
  );
};

export default BookingDetailModal;
