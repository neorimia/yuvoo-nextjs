/**
 * Club Admin Onboarding - Step 6: Verification
 */

import { requireRole } from "@/lib/auth/session";
import Link from "next/link";
import { routes } from "@/lib/routes";

export default async function ClubVerificationPage() {
  const _session = await requireRole("club_admin");

  return (
    <div className="onboarding-page">
      <h1>Verificare</h1>
      <p>Încarcă documentele pentru verificare.</p>

      {/* TODO: Add verification document upload */}
      <div className="onboarding-actions">
        <Link href={routes.onboarding.club.complete} className="btn btn-primary">
          Finalizează
        </Link>
      </div>
    </div>
  );
}
