/**
 * Parent Booking Detail Page
 *
 * Displays detailed information about a specific booking.
 * Shows booking information, club/doctor details, child information, and cancellation option.
 * Route: /parent/bookings/[id]
 */

import React from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { requireAuth } from "@/lib/auth/session";
import { getBookingAction } from "@/app/actions/bookings";
import { getClubByIdAction } from "@/app/actions/clubs";
import { getDoctorByIdAction } from "@/app/actions/doctors";
import { getChildAction } from "@/app/actions/children";
import ParentBookingDetail from "@/components/features/bookings/ParentBookingDetail";
import { routes } from "@/lib/routes";

// Explicitly accessing cookies() to ensure route is dynamic during build
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Detalii Rezervare - Yuvoo",
  description: "Detalii despre rezervarea ta pe Yuvoo.",
};

interface BookingDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * Generate static params for SSG
 * Returns at least one value to satisfy Cache Components requirement.
 */
export async function generateStaticParams() {
  // Return placeholder to satisfy Cache Components requirement
  // In production, this would fetch all booking IDs
  return [{ id: "example-booking" }];
}

/**
 * Parent Booking Detail Page
 *
 * Protected page for viewing booking details.
 * Fetches booking, entity (club/doctor), and child information.
 */
export default async function ParentBookingDetailPage({ params }: BookingDetailPageProps) {
  // Explicitly access cookies to ensure route is dynamic (prevents prerender errors)
  await cookies();

  // Require authentication
  const session = await requireAuth();

  const { id } = await params;

  // Fetch booking
  const booking = await getBookingAction(id);

  // Verify booking exists and belongs to current user
  if (!booking || booking.userId !== session.dbUser.id) {
    redirect(routes.parent.bookings);
  }

  // Fetch entity (club or doctor) and child information
  const [entity, child] = await Promise.all([
    booking.entityType === "club"
      ? getClubByIdAction(booking.entityId).catch(() => null)
      : getDoctorByIdAction(booking.entityId).catch(() => null),
    booking.childId ? getChildAction(booking.childId).catch(() => null) : Promise.resolve(null),
  ]);

  return (
    <section className="bd-booking-detail-area pt-120 pb-70">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="bd-booking-detail-content">
              <h1 className="bd-section-title mb-30">Detalii Rezervare</h1>
              <ParentBookingDetail
                booking={booking}
                entity={entity || undefined}
                child={child || undefined}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
