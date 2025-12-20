/**
 * Club Booking Card Component
 *
 * Wrapper component for club booking cards.
 * Uses the shared BookingCard component with club-specific configuration.
 */

"use client";

import React from "react";
import BookingCard from "@/components/shared/BookingCard";
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
  // Booking type is already compatible with shared component

  return (
    <BookingCard
      id={booking.id}
      scheduledAt={booking.scheduledAt}
      status={booking.status}
      type={booking.type}
      notes={booking.notes}
      child={
        child
          ? {
              firstName: child.firstName,
              lastName: child.lastName,
              age: child.age,
            }
          : undefined
      }
      createdAt={booking.createdAt}
      updatedAt={booking.updatedAt}
      onConfirm={onConfirm}
      onCancel={onCancel}
      onComplete={onComplete}
      onViewDetails={onViewDetails ? () => onViewDetails(booking) : undefined}
      isProcessing={isProcessing}
      className="bd-club-booking-card"
    />
  );
};

export default ClubBookingCard;
