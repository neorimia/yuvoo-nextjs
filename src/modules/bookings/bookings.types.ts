/**
 * Bookings Types
 *
 * TypeScript types for booking domain.
 */

export type BookingType = "club_trial" | "doctor_consultation";
export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

export interface Booking {
  id: string;
  userId: string;
  childId?: string; // Optional for doctor consultations
  type: BookingType;
  status: BookingStatus;
  entityId: string; // Club ID or Doctor ID
  entityType: "club" | "doctor";
  scheduledAt: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateBookingInput {
  userId: string;
  childId?: string;
  type: BookingType;
  entityId: string;
  entityType: "club" | "doctor";
  scheduledAt: Date;
  notes?: string;
}

export interface UpdateBookingInput {
  scheduledAt?: Date;
  notes?: string;
  status?: BookingStatus;
}
