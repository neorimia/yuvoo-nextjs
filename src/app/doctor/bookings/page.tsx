import React from "react";
import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth/session";
import { UserRoleEnum } from "@/modules/auth/auth.types";
import { redirect } from "next/navigation";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Consultații - Yuvoo",
  description: "Gestionează consultațiile tale pe Yuvoo.",
};

/**
 * Doctor Bookings Page
 *
 * Protected page for doctor bookings/consultations management.
 * Route: /doctor/bookings
 */
export default async function DoctorBookingsPage() {
  // Require authentication
  const session = await requireAuth();

  // Verify user is a doctor
  if (session.dbUser.role !== UserRoleEnum.DOCTOR) {
    redirect(routes.parent.dashboard);
  }

  return (
    <section className="bd-doctor-bookings-area pt-120 pb-70">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="bd-doctor-bookings-content">
              <h1 className="bd-section-title mb-30">Consultații</h1>
              <p className="mb-40">Pagină în curs de dezvoltare...</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
