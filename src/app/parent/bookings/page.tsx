import React from "react";
import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

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
  await requireAuth();

  return (
    <section className="bd-bookings-area pt-120 pb-70">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="bd-bookings-content">
              <h1 className="bd-section-title mb-30">Rezervările Mele</h1>
              {/* TODO: Add bookings list component */}
              <div className="bd-bookings-placeholder">
                <p>Lista de rezervări va fi adăugată aici.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
