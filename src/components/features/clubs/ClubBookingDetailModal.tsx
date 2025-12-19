/**
 * Club Booking Detail Modal Component
 *
 * Wrapper component for club booking detail modal.
 * Uses the shared BookingDetailModal component with club-specific configuration.
 */

"use client";

import React from "react";
import BookingDetailModal from "@/components/shared/BookingDetailModal";
import type { Booking } from "@/modules/bookings/bookings.types";
import type { Child } from "@/modules/children/children.types";
import type { AuthUser } from "@/modules/auth/auth.types";

interface ClubBookingDetailModalProps {
  booking: Booking | null;
  child?: Child;
  parent?: AuthUser | null;
  onConfirm?: (bookingId: string) => void;
  onCancel?: (bookingId: string) => void;
  onComplete?: (bookingId: string) => void;
  isProcessing?: boolean;
}

const ClubBookingDetailModal: React.FC<ClubBookingDetailModalProps> = ({
  booking,
  child,
  parent,
  onConfirm,
  onCancel,
  onComplete,
  isProcessing = false,
}) => {
  return (
    <BookingDetailModal
      booking={
        booking
          ? {
              id: booking.id,
              scheduledAt: booking.scheduledAt,
              status: booking.status,
              type: booking.type,
              notes: booking.notes,
              createdAt: booking.createdAt,
              updatedAt: booking.updatedAt,
            }
          : null
      }
      child={
        child
          ? {
              firstName: child.firstName,
              lastName: child.lastName,
              age: child.age,
              gender: child.gender === "other" ? null : child.gender,
              dateOfBirth: child.dateOfBirth,
            }
          : undefined
      }
      parent={
        parent
          ? {
              email: parent.email,
              name: parent.name,
              firstName: parent.firstName,
              lastName: parent.lastName,
              phone: parent.phone,
            }
          : null
      }
      onConfirm={onConfirm}
      onCancel={onCancel}
      onComplete={onComplete}
      isProcessing={isProcessing}
      modalId="clubBookingDetailModal"
    />
  );
};

export default ClubBookingDetailModal;
