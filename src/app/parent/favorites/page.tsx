import React from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { requireAuth } from "@/lib/auth/session";

// MIGRATED: Removed export const dynamic = 'force-dynamic' (incompatible with Cache Components)
// This page uses requireAuth() which accesses cookies, so it remains dynamic by default
// Explicitly accessing cookies() to ensure route is dynamic during build

export const metadata: Metadata = {
  title: "Favorite - Yuvoo",
  description: "Cluburile și doctorii tăi favoriți pe Yuvoo.",
};

/**
 * Favorites Page
 *
 * Protected page for managing favorites.
 * Route: /parent/favorites
 */
export default async function FavoritesPage() {
  // Explicitly access cookies to ensure route is dynamic (prevents prerender errors)
  await cookies();
  await requireAuth();

  return (
    <section className="bd-favorites-area pt-120 pb-70">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="bd-favorites-content">
              <h1 className="bd-section-title mb-30">Favorite</h1>
              {/* TODO: Add favorites component */}
              <div className="bd-favorites-placeholder">
                <p>Lista de favorite va fi adăugată aici.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
