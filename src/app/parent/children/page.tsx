import React from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { requireAuth } from "@/lib/auth/session";
import ChildrenList from "@/components/features/children/ChildrenList";

// MIGRATED: Removed export const dynamic = 'force-dynamic' (incompatible with Cache Components)
// This page uses requireAuth() which accesses cookies, so it remains dynamic by default
// Explicitly accessing cookies() to ensure route is dynamic during build

export const metadata: Metadata = {
  title: "Copii - Yuvoo",
  description: "Gestionează profilurile copiilor tăi pe Yuvoo.",
};

/**
 * Children List Page
 *
 * Protected page for managing children profiles.
 * Route: /parent/children
 */
export default async function ChildrenPage() {
  // Explicitly access cookies to ensure route is dynamic (prevents prerender errors)
  await cookies();
  await requireAuth();

  return (
    <section className="bd-children-area pt-120 pb-70">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="bd-children-content">
              <h1 className="bd-section-title mb-30">Copiii Mei</h1>
              <ChildrenList />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
