import React from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { requireAuth } from "@/lib/auth/session";
import BookingList from "@/components/features/bookings/BookingList";

// MIGRATED: Removed export const dynamic = 'force-dynamic' (incompatible with Cache Components)
// This page uses requireAuth() which accesses cookies, so it remains dynamic by default
// Explicitly accessing cookies() to ensure route is dynamic during build

export const metadata: Metadata = {
  title: "Rezervări - Yuvoo",
  description: "Gestionează rezervările tale pe Yuvoo.",
};

/**
 * Bookings List Page
 *
 * Protected page for managing bookings.
 * Route: /parent/bookings
 */
export default async function BookingsPage() {
  // Explicitly access cookies to ensure route is dynamic (prevents prerender errors)
  await cookies();
  await requireAuth();

  return (
    <section className="bd-bookings-area pt-120 pb-70">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="bd-bookings-content">
              <h1 className="bd-section-title mb-30">Rezervările Mele</h1>
              <BookingList />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
