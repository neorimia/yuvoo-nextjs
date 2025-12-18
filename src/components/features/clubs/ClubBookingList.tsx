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

type StatusFilter = "all" | "pending" | "confirmed" | "completed" | "cancelled";
type DateFilter = "all" | "upcoming" | "past";

const ClubBookingList: React.FC = () => {
  const [bookings, setBookings] = useState<BookingWithDetails[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<BookingWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [selectedParent, setSelectedParent] = useState<AuthUser | null>(null);
  const router = useRouter();
  const [_isPending, startTransition] = useTransition();

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

  // Apply filters
  useEffect(() => {
    let filtered = [...bookings];

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((b) => b.status === statusFilter);
    }

    // Apply date filter
    if (dateFilter === "upcoming") {
      filtered = filtered.filter((b) => new Date(b.scheduledAt) >= new Date());
    } else if (dateFilter === "past") {
      filtered = filtered.filter((b) => new Date(b.scheduledAt) < new Date());
    }

    setFilteredBookings(filtered);
  }, [bookings, statusFilter, dateFilter]);

  const handleConfirm = (bookingId: string) => {
    if (!confirm("Ești sigur că vrei să confirmi această rezervare?")) {
      return;
    }

    startTransition(async () => {
      try {
        setProcessingId(bookingId);
        const result = await confirmBookingAction(bookingId);

        if (result.success) {
          // Update booking status in local state
          setBookings((prev) =>
            prev.map((b) => (b.id === bookingId ? { ...b, status: "confirmed" } : b))
          );
          router.refresh();
        } else {
          alert(result.error || "Eroare la confirmarea rezervării");
        }
      } catch (err) {
        console.error("Error confirming booking:", err);
        alert("Eroare la confirmarea rezervării. Te rugăm să reîncerci.");
      } finally {
        setProcessingId(null);
      }
    });
  };

  const handleCancel = (bookingId: string) => {
    if (!confirm("Ești sigur că vrei să anulezi această rezervare?")) {
      return;
    }

    startTransition(async () => {
      try {
        setProcessingId(bookingId);
        const result = await cancelBookingByClubAction(bookingId);

        if (result.success) {
          // Update booking status in local state
          setBookings((prev) =>
            prev.map((b) => (b.id === bookingId ? { ...b, status: "cancelled" } : b))
          );
          router.refresh();
        } else {
          alert(result.error || "Eroare la anularea rezervării");
        }
      } catch (err) {
        console.error("Error cancelling booking:", err);
        alert("Eroare la anularea rezervării. Te rugăm să reîncerci.");
      } finally {
        setProcessingId(null);
      }
    });
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
    if (!confirm("Ești sigur că vrei să marchezi această rezervare ca finalizată?")) {
      return;
    }

    startTransition(async () => {
      try {
        setProcessingId(bookingId);
        const result = await updateBookingStatusAction(bookingId, "completed");

        if (result.success) {
          // Update booking status in local state
          setBookings((prev) =>
            prev.map((b) => (b.id === bookingId ? { ...b, status: "completed" } : b))
          );
          router.refresh();
        } else {
          alert(result.error || "Eroare la actualizarea rezervării");
        }
      } catch (err) {
        console.error("Error completing booking:", err);
        alert("Eroare la actualizarea rezervării. Te rugăm să reîncerci.");
      } finally {
        setProcessingId(null);
      }
    });
  };

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
                <option value="all">Toate ({bookings.length})</option>
                <option value="pending">
                  În așteptare ({bookings.filter((b) => b.status === "pending").length})
                </option>
                <option value="confirmed">
                  Confirmate ({bookings.filter((b) => b.status === "confirmed").length})
                </option>
                <option value="completed">
                  Finalizate ({bookings.filter((b) => b.status === "completed").length})
                </option>
                <option value="cancelled">
                  Anulate ({bookings.filter((b) => b.status === "cancelled").length})
                </option>
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
    </div>
  );
};

export default ClubBookingList;
