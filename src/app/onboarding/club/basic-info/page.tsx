/**
 * Club Admin Onboarding - Step 2: Basic Info
 */

import { requireRole } from "@/lib/auth/session";
import Link from "next/link";
import { routes } from "@/lib/routes";

export default async function ClubBasicInfoPage() {
  const _session = await requireRole("club_admin");

  return (
    <div className="onboarding-page">
      <h1>Informații de bază</h1>
      <p>Spune-ne despre clubul tău.</p>

      {/* TODO: Add basic info form */}
      <div className="onboarding-actions">
        <Link href={routes.onboarding.club.contactSchedule} className="btn btn-primary">
          Continuă
        </Link>
      </div>
    </div>
  );
}
