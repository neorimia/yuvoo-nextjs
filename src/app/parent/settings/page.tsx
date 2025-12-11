import React from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { requireAuth } from "@/lib/auth/session";

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

  return (
    <section className="bd-settings-area pt-120 pb-70">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="bd-settings-content">
              <h1 className="bd-section-title mb-30">Setări Cont</h1>
              {/* TODO: Add settings component */}
              <div className="bd-settings-placeholder">
                <p>Formularul de setări va fi adăugat aici.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
