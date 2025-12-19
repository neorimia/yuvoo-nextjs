/**
 * Parent Saved Items Page
 *
 * Displays saved clubs and doctors (favorites).
 * Route: /parent/saved
 */

import React from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { requireAuth } from "@/lib/auth/session";
import FavoritesList from "@/components/features/favorites/FavoritesList";

// Explicitly accessing cookies() to ensure route is dynamic during build
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Salvate - Yuvoo",
  description: "Cluburile și doctorii tăi salvați pe Yuvoo.",
};

/**
 * Saved Items Page
 *
 * Protected page for managing saved items (favorites).
 * Route: /parent/saved
 * Note: This page uses the same FavoritesList component as /parent/favorites
 */
export default async function SavedItemsPage() {
  // Explicitly access cookies to ensure route is dynamic (prevents prerender errors)
  await cookies();
  await requireAuth();

  return (
    <section className="bd-saved-items-area pt-120 pb-70">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="bd-saved-items-content">
              <h1 className="bd-section-title mb-30">Elemente Salvate</h1>
              <FavoritesList />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
