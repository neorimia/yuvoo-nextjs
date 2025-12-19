import React from "react";
import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth/session";
import { UserRoleEnum } from "@/modules/auth/auth.types";
import { redirect } from "next/navigation";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Setări - Yuvoo",
  description: "Gestionează setările contului tău de doctor pe Yuvoo.",
};

/**
 * Doctor Settings Page
 *
 * Protected page for doctor account settings.
 * Route: /doctor/settings
 */
export default async function DoctorSettingsPage() {
  // Require authentication
  const session = await requireAuth();

  // Verify user is a doctor
  if (session.dbUser.role !== UserRoleEnum.DOCTOR) {
    redirect(routes.parent.dashboard);
  }

  return (
    <section className="bd-doctor-settings-area pt-120 pb-70">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="bd-doctor-settings-content">
              <h1 className="bd-section-title mb-30">Setări</h1>
              <p className="mb-40">Pagină în curs de dezvoltare...</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
