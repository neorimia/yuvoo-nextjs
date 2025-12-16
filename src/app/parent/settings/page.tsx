import React from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { requireAuth } from "@/lib/auth/session";
import { getProfileAction } from "@/app/actions/settings";
import SettingsForm from "@/components/features/settings/SettingsForm";

// MIGRATED: Removed export const dynamic = 'force-dynamic' (incompatible with Cache Components)
// This page uses requireAuth() which accesses cookies, so it remains dynamic by default
// Explicitly accessing cookies() to ensure route is dynamic during build

export const metadata: Metadata = {
  title: "Setări - Yuvoo",
  description: "Gestionează setările contului tău Yuvoo.",
};

/**
 * Settings Page
 *
 * Protected page for account settings.
 * Route: /parent/settings
 */
export default async function SettingsPage() {
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
    <section className="bd-settings-area pt-120 pb-70">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="bd-settings-content">
              <h1 className="bd-section-title mb-30">Setări Cont</h1>
              <div className="row">
                <div className="col-lg-8 col-xl-6">
                  <SettingsForm initialData={initialData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
