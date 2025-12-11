import React from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { requireAuth } from "@/lib/auth/session";

// MIGRATED: Removed export const dynamic = 'force-dynamic' (incompatible with Cache Components)
// This page uses requireAuth() which accesses cookies, so it remains dynamic by default
// Explicitly accessing cookies() to ensure route is dynamic during build

export const metadata: Metadata = {
  title: "Dashboard - Yuvoo",
  description: "Panoul de control pentru părinți pe Yuvoo.",
};

/**
 * Parent Dashboard Page
 *
 * Protected page for parent dashboard.
 * Route: /parent/dashboard
 */
export default async function ParentDashboardPage() {
  // Explicitly access cookies to ensure route is dynamic (prevents prerender errors)
  await cookies();
  // Require authentication
  const session = await requireAuth();

  return (
    <section className="bd-parent-dashboard-area pt-120 pb-70">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="bd-parent-dashboard-content">
              <h1 className="bd-section-title mb-30">Dashboard Părinte</h1>
              <p className="mb-40">Bun venit, {session.dbUser?.firstName || "Utilizator"}!</p>
              {/* TODO: Add dashboard components */}
              <div className="bd-dashboard-placeholder">
                <p>Componentele dashboard-ului vor fi adăugate aici.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
