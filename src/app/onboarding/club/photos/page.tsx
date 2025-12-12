/**
 * Club Admin Onboarding - Step 5: Photos
 */

import { requireRole } from "@/lib/auth/session";
import Link from "next/link";
import { routes } from "@/lib/routes";

export default async function ClubPhotosPage() {
  const _session = await requireRole("club_admin");

  return (
    <div className="onboarding-page">
      <h1>Fotografii</h1>
      <p>Încarcă fotografii ale clubului tău.</p>

      {/* TODO: Add photo upload */}
      <div className="onboarding-actions">
        <Link href={routes.onboarding.club.verification} className="btn btn-primary">
          Continuă
        </Link>
      </div>
    </div>
  );
}
