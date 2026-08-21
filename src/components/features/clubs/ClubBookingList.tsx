/**
 * Club Booking List Component
 *
 * Displays a list of bookings for a club with filtering by status and date.
 * Handles booking confirmation and cancellation by club admin.
 */

"use client";

import React, { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import ClubBookingCard from "./ClubBookingCard";
import ClubBookingDetailModal from "./ClubBookingDetailModal";
import ConfirmActionModal from "@/components/shared/ConfirmActionModal";
import { useEntityFilters, type StatusFilter, type DateFilter } from "@/hooks/useEntityFilters";
import {
  getClubBookingsAction,
  confirmBookingAction,
  cancelBookingByClubAction,
  updateBookingStatusAction,
  getParentUserAction,
} from "@/app/actions/bookings";
import { getChildAction } from "@/app/actions/children";
import type { Booking } from "@/modules/bookings/bookings.types";
import type { Child } from "@/modules/children/children.types";
import type { AuthUser } from "@/modules/auth/auth.types";

interface BookingWithDetails extends Booking {
  child?: Child;
}

type BookingActionType = "confirm" | "cancel" | "complete";

interface PendingBookingAction {
  bookingId: string;
  type: BookingActionType;
}

const BOOKING_ACTION_CONFIG: Record<
  BookingActionType,
  {
    title: string;
    message: string;
    confirmLabel: string;
    confirmVariant: "primary" | "danger" | "success";
  }
> = {
  confirm: {
    title: "Confirmă rezervarea",
    message: "Ești sigur că vrei să confirmi această rezervare?",
    confirmLabel: "Confirmă",
    confirmVariant: "primary",
  },
  cancel: {
    title: "Anulează rezervarea",
    message: "Ești sigur că vrei să anulezi această rezervare?",
    confirmLabel: "Anulează rezervarea",
    confirmVariant: "danger",
  },
  complete: {
    title: "Finalizează rezervarea",
    message: "Ești sigur că vrei să marchezi această rezervare ca finalizată?",
    confirmLabel: "Marchează finalizată",
    confirmVariant: "success",
  },
};

const ClubBookingList: React.FC = () => {
  const [bookings, setBookings] = useState<BookingWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [selectedParent, setSelectedParent] = useState<AuthUser | null>(null);
  const [pendingAction, setPendingAction] = useState<PendingBookingAction | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const router = useRouter();
  const [_isPending, startTransition] = useTransition();

  // Use entity filters hook
  const {
    statusFilter,
    dateFilter,
    filteredItems: filteredBookings,
    setStatusFilter,
    setDateFilter,
    statusCounts,
  } = useEntityFilters({
    items: bookings,
    getStatus: (booking) => booking.status,
    getDate: (booking) => booking.scheduledAt,
  });

  // Fetch bookings and related data
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const bookingsData = await getClubBookingsAction();

        // Fetch child details for each booking
        const bookingsWithDetails = await Promise.all(
          bookingsData.map(async (booking) => {
            const child = booking.childId
              ? await getChildAction(booking.childId).catch(() => null)
              : null;

            return {
              ...booking,
              child: child || undefined,
            };
          })
        );

        // Sort bookings by scheduled date (upcoming first)
        bookingsWithDetails.sort((a, b) => {
          const dateA = new Date(a.scheduledAt).getTime();
          const dateB = new Date(b.scheduledAt).getTime();
          return dateA - dateB;
        });

        setBookings(bookingsWithDetails);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Eroare la încărcarea rezervărilor. Te rugăm să reîncerci.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleConfirm = (bookingId: string) => {
    setActionError(null);
    setPendingAction({ bookingId, type: "confirm" });
  };

  const handleCancel = (bookingId: string) => {
    setActionError(null);
    setPendingAction({ bookingId, type: "cancel" });
  };

  const handleViewDetails = async (booking: Booking) => {
    setSelectedBooking(booking);

    // Fetch parent information
    try {
      const parent = await getParentUserAction(booking.userId);
      setSelectedParent(parent);
    } catch (err) {
      console.error("Error fetching parent info:", err);
      setSelectedParent(null);
    }
  };

  const handleComplete = (bookingId: string) => {
    setActionError(null);
    setPendingAction({ bookingId, type: "complete" });
  };

  const executePendingAction = () => {
    if (!pendingAction) {
      return;
    }

    const { bookingId, type } = pendingAction;

    startTransition(async () => {
      try {
        setProcessingId(bookingId);
        setActionError(null);

        let result: { success: boolean; error?: string };
        let nextStatus: Booking["status"];

        if (type === "confirm") {
          result = await confirmBookingAction(bookingId);
          nextStatus = "confirmed";
        } else if (type === "cancel") {
          result = await cancelBookingByClubAction(bookingId);
          nextStatus = "cancelled";
        } else {
          result = await updateBookingStatusAction(bookingId, "completed");
          nextStatus = "completed";
        }

        if (result.success) {
          setBookings((prev) =>
            prev.map((b) => (b.id === bookingId ? { ...b, status: nextStatus } : b))
          );
          setPendingAction(null);
          router.refresh();
        } else {
          setActionError(
            result.error ||
              (type === "confirm"
                ? "Eroare la confirmarea rezervării"
                : type === "cancel"
                  ? "Eroare la anularea rezervării"
                  : "Eroare la actualizarea rezervării")
          );
        }
      } catch (err) {
        console.error("Error processing booking action:", err);
        setActionError("Eroare la procesarea rezervării. Te rugăm să reîncerci.");
      } finally {
        setProcessingId(null);
      }
    });
  };

  const pendingActionConfig = pendingAction ? BOOKING_ACTION_CONFIG[pendingAction.type] : null;

  if (isLoading) {
    return (
      <div className="bd-club-booking-list-loading text-center py-5">
        <div className="spinner-border text-yuvoo-primary" role="status">
          <span className="visually-hidden">Se încarcă...</span>
        </div>
        <p className="mt-3 text-muted">Se încarcă rezervările...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bd-club-booking-list-error alert alert-danger" role="alert">
        <i className="bi bi-exclamation-triangle me-2"></i>
        <strong>Eroare:</strong> {error}
      </div>
    );
  }

  return (
    <div className="bd-club-booking-list">
      {actionError && (
        <div className="alert alert-danger mb-4" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {actionError}
        </div>
      )}
      {/* Filters */}
      <div className="bd-club-booking-filters card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h6 className="bd-club-booking-filters-title mb-3">
            <i className="bi bi-funnel me-2 text-yuvoo-primary"></i>
            Filtrează rezervările
          </h6>
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="statusFilter" className="bd-club-booking-filter-label form-label">
                <i className="bi bi-tag me-2"></i>
                Status
              </label>
              <select
                id="statusFilter"
                className="bd-club-booking-filter-select form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              >
                <option value="all">Toate ({statusCounts.all})</option>
                <option value="pending">În așteptare ({statusCounts.pending})</option>
                <option value="confirmed">Confirmate ({statusCounts.confirmed})</option>
                <option value="completed">Finalizate ({statusCounts.completed})</option>
                <option value="cancelled">Anulate ({statusCounts.cancelled})</option>
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="dateFilter" className="bd-club-booking-filter-label form-label">
                <i className="bi bi-calendar me-2"></i>
                Perioadă
              </label>
              <select
                id="dateFilter"
                className="bd-club-booking-filter-select form-select"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value as DateFilter)}
              >
                <option value="all">Toate</option>
                <option value="upcoming">Viitoare</option>
                <option value="past">Trecute</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="bd-club-booking-results-count mb-4">
        <p className="bd-club-booking-results-text mb-0">
          <i className="bi bi-list-check me-2 text-yuvoo-primary"></i>
          Afișare <strong>{filteredBookings.length}</strong> din <strong>{bookings.length}</strong>{" "}
          rezervări
        </p>
      </div>

      {/* Bookings list */}
      {filteredBookings.length === 0 ? (
        <div className="bd-club-booking-empty text-center py-5">
          <div className="bd-club-booking-empty-icon mb-4">
            <i className="bi bi-calendar-x"></i>
          </div>
          <h4 className="bd-club-booking-empty-title mb-3">Nu există rezervări</h4>
          <p className="bd-club-booking-empty-text text-muted">
            {statusFilter !== "all" || dateFilter !== "all"
              ? "Nu există rezervări care să corespundă filtrelor selectate."
              : "Nu există rezervări pentru acest club."}
          </p>
        </div>
      ) : (
        <div className="bd-club-booking-cards">
          {filteredBookings.map((booking) => (
            <ClubBookingCard
              key={booking.id}
              booking={booking}
              child={booking.child}
              onConfirm={handleConfirm}
              onCancel={handleCancel}
              onComplete={handleComplete}
              onViewDetails={handleViewDetails}
              isProcessing={processingId === booking.id}
            />
          ))}
        </div>
      )}

      {/* Booking Detail Modal */}
      <ClubBookingDetailModal
        booking={selectedBooking}
        child={
          selectedBooking ? bookings.find((b) => b.id === selectedBooking.id)?.child : undefined
        }
        parent={selectedParent}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        onComplete={handleComplete}
        isProcessing={processingId === selectedBooking?.id}
      />

      {pendingAction && pendingActionConfig && (
        <ConfirmActionModal
          show
          title={pendingActionConfig.title}
          message={pendingActionConfig.message}
          confirmLabel={pendingActionConfig.confirmLabel}
          confirmVariant={pendingActionConfig.confirmVariant}
          isLoading={processingId === pendingAction.bookingId}
          onConfirm={executePendingAction}
          onCancel={() => setPendingAction(null)}
        />
      )}
    </div>
  );
};

export default ClubBookingList;
