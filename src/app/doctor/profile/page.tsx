import React from "react";
import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth/session";
import { UserRoleEnum } from "@/modules/auth/auth.types";
import { redirect } from "next/navigation";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Profil Doctor - Yuvoo",
  description: "Gestionează profilul tău de doctor pe Yuvoo.",
};

/**
 * Doctor Profile Page
 *
 * Protected page for doctor profile management.
 * Route: /doctor/profile
 */
export default async function DoctorProfilePage() {
  // Require authentication
  const session = await requireAuth();

  // Verify user is a doctor
  if (session.dbUser.role !== UserRoleEnum.DOCTOR) {
    redirect(routes.parent.dashboard);
  }

  return (
    <section className="bd-doctor-profile-area pt-120 pb-70">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="bd-doctor-profile-content">
              <h1 className="bd-section-title mb-30">Profil Doctor</h1>
              <p className="mb-40">Pagină în curs de dezvoltare...</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
