/**
 * Booking List Component
 *
 * Displays a list of user bookings with entity and child information.
 * Handles loading states, empty states, and booking cancellation.
 */

"use client";

import React, { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BookingCard from "./BookingCard";
import { getBookingsAction, cancelBookingAction } from "@/app/actions/bookings";
import { getClubByIdAction } from "@/app/actions/clubs";
import { getDoctorByIdAction } from "@/app/actions/doctors";
import { getChildAction } from "@/app/actions/children";
import type { Booking } from "@/modules/bookings/bookings.types";
import type { Club } from "@/modules/clubs/clubs.types";
import type { Doctor } from "@/modules/doctors/doctors.types";
import type { Child } from "@/modules/children/children.types";

interface BookingWithDetails extends Booking {
  entity?: Club | Doctor;
  child?: Child;
}

const BookingList: React.FC = () => {
  const [bookings, setBookings] = useState<BookingWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [_isPending, startTransition] = useTransition();

  // Fetch bookings and related data
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const bookingsData = await getBookingsAction();

        // Fetch entity and child details for each booking
        const bookingsWithDetails = await Promise.all(
          bookingsData.map(async (booking) => {
            const [entity, child] = await Promise.all([
              // Fetch entity (club or doctor) by ID
              booking.entityType === "club"
                ? getClubByIdAction(booking.entityId).catch(() => null)
                : getDoctorByIdAction(booking.entityId).catch(() => null),
              // Fetch child if exists
              booking.childId
                ? getChildAction(booking.childId).catch(() => null)
                : Promise.resolve(null),
            ]);

            return {
              ...booking,
              entity: entity || undefined,
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

  const handleCancel = (bookingId: string) => {
    if (!confirm("Ești sigur că vrei să anulezi această rezervare?")) {
      return;
    }

    startTransition(async () => {
      try {
        setCancellingId(bookingId);
        const result = await cancelBookingAction(bookingId);

        if (result.success) {
          // Remove cancelled booking from list
          setBookings((prev) => prev.filter((b) => b.id !== bookingId));
          router.refresh();
        } else {
          alert(result.error || "Eroare la anularea rezervării");
        }
      } catch (err) {
        console.error("Error cancelling booking:", err);
        alert("Eroare la anularea rezervării. Te rugăm să reîncerci.");
      } finally {
        setCancellingId(null);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Se încarcă...</span>
        </div>
        <p className="mt-3 text-muted">Se încarcă rezervările...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <i className="bi bi-exclamation-triangle me-2"></i>
        <strong>Eroare:</strong> {error}
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-5">
        <i className="bi bi-calendar-x display-1 text-muted mb-3"></i>
        <h4 className="mb-3">Nu ai rezervări</h4>
        <p className="text-muted mb-4">
          Încearcă să rezervi o ședință de probă la un club sau o consultație la un doctor.
        </p>
        <Link href="/cluburi" className="btn btn-primary me-2">
          <i className="bi bi-search me-2"></i>
          Caută cluburi
        </Link>
        <Link href="/doctori" className="btn btn-outline-primary">
          <i className="bi bi-search me-2"></i>
          Caută doctori
        </Link>
      </div>
    );
  }

  // Group bookings by status
  const upcomingBookings = bookings.filter(
    (b) =>
      b.status !== "cancelled" && b.status !== "completed" && new Date(b.scheduledAt) >= new Date()
  );
  const pastBookings = bookings.filter(
    (b) => b.status === "completed" || new Date(b.scheduledAt) < new Date()
  );
  const cancelledBookings = bookings.filter((b) => b.status === "cancelled");

  return (
    <div className="bd-booking-list">
      {upcomingBookings.length > 0 && (
        <div className="mb-5">
          <h3 className="h5 mb-4">
            <i className="bi bi-calendar-check text-primary me-2"></i>
            Rezervări viitoare ({upcomingBookings.length})
          </h3>
          {upcomingBookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              entity={booking.entity}
              child={booking.child}
              onCancel={handleCancel}
              isCancelling={cancellingId === booking.id}
            />
          ))}
        </div>
      )}

      {pastBookings.length > 0 && (
        <div className="mb-5">
          <h3 className="h5 mb-4">
            <i className="bi bi-calendar-event text-muted me-2"></i>
            Rezervări trecute ({pastBookings.length})
          </h3>
          {pastBookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              entity={booking.entity}
              child={booking.child}
            />
          ))}
        </div>
      )}

      {cancelledBookings.length > 0 && (
        <div className="mb-5">
          <h3 className="h5 mb-4">
            <i className="bi bi-calendar-x text-muted me-2"></i>
            Rezervări anulate ({cancelledBookings.length})
          </h3>
          {cancelledBookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              entity={booking.entity}
              child={booking.child}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingList;
