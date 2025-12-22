import React from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { requireAuth } from "@/lib/auth/session";
import { getEmailPreferencesAction } from "@/app/actions/email";
import EmailPreferencesForm from "@/components/features/settings/EmailPreferencesForm";

export const metadata: Metadata = {
  title: "Preferințe Email - Yuvoo",
  description: "Gestionează preferințele tale de email și notificări.",
};

/**
 * Email Preferences Page
 *
 * Protected page for managing email notification preferences.
 * Route: /parent/email-preferences
 */
export default async function EmailPreferencesPage() {
  // Explicitly access cookies to ensure route is dynamic
  await cookies();
  const session = await requireAuth();

  // Fetch current email preferences
  const preferencesResult = await getEmailPreferencesAction(session.dbUser.id);
  const initialPreferences = preferencesResult.success
    ? (preferencesResult.preferences as {
        quizResults?: boolean;
        clubUpdates?: boolean;
        doctorUpdates?: boolean;
        newsletter?: boolean;
        marketing?: boolean;
        unsubscribed?: boolean;
      })
    : undefined;

  return (
    <section className="bd-settings-area pt-120 pb-70">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="bd-settings-content">
              <h1 className="bd-section-title mb-30">Preferințe Email</h1>
              <p
                className="mb-4"
                style={{ color: "#424242", fontSize: "16px", lineHeight: "26px" }}
              >
                Alege ce tipuri de emailuri dorești să primești de la Yuvoo. Poți modifica aceste
                setări oricând.
              </p>

              {initialPreferences?.unsubscribed && (
                <div className="alert alert-warning mb-4" role="alert">
                  <strong>Ești dezabonat de la emailuri.</strong> Activează preferințele de mai jos
                  pentru a începe să primești din nou emailuri.
                </div>
              )}

              <div className="row">
                <div className="col-lg-8 col-xl-6">
                  <EmailPreferencesForm initialPreferences={initialPreferences} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
