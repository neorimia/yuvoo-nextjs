/**
 * Parent Profile Page
 *
 * Displays and allows editing of parent profile information.
 * Route: /parent/profile
 */

import React from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { requireAuth } from "@/lib/auth/session";
import { getProfileAction } from "@/app/actions/settings";
import SettingsForm from "@/components/features/settings/SettingsForm";

// MIGRATED: Removed export const dynamic = 'force-dynamic' (incompatible with Cache Components)

export const metadata: Metadata = {
  title: "Profil - Yuvoo",
  description: "Gestionează profilul tău pe Yuvoo.",
};

/**
 * Profile Page
 *
 * Protected page for viewing and editing parent profile.
 * Route: /parent/profile
 */
export default async function ProfilePage() {
  // Explicitly access cookies to ensure route is dynamic (prevents prerender errors)
  await cookies();
  await requireAuth();

  // Fetch profile data
  const profileResult = await getProfileAction();
  const initialData =
    profileResult.success && profileResult.profile
      ? {
          firstName: profileResult.profile.firstName || "",
          lastName: profileResult.profile.lastName || "",
          phone: profileResult.profile.phone || "",
          email: profileResult.profile.email,
        }
      : undefined;

  return (
    <section className="bd-profile-area pt-120 pb-70">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="bd-profile-content">
              <h1 className="bd-section-title mb-30">Profilul Meu</h1>
              <div className="row">
                <div className="col-lg-8 col-xl-6">
                  <div className="card shadow-sm">
                    <div className="card-header bg-light">
                      <h3 className="card-title mb-0">
                        <i className="bi bi-person-circle me-2"></i>
                        Informații Personale
                      </h3>
                    </div>
                    <div className="card-body">
                      {/* Email Display (read-only) */}
                      {initialData && (
                        <div className="mb-4 pb-4 border-bottom">
                          <div className="d-flex align-items-center">
                            <i className="bi bi-envelope text-primary me-2"></i>
                            <div>
                              <small className="text-muted d-block">Email</small>
                              <strong>{initialData.email}</strong>
                              <small className="text-muted d-block mt-1">
                                Email-ul nu poate fi modificat
                              </small>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Profile Form */}
                      <SettingsForm initialData={initialData} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
