/**
 * Club Admin Onboarding - Step 1: Welcome
 */

import { requireRole } from "@/lib/auth/session";
import Link from "next/link";
import { routes } from "@/lib/routes";

export default async function ClubWelcomePage() {
  const _session = await requireRole("club_admin");

  return (
    <div className="onboarding-page">
      <h1>Bun venit pe Yuvoo!</h1>
      <p>Hai să configurăm profilul clubului tău.</p>

      <div className="onboarding-actions">
        <Link href={routes.onboarding.club.basicInfo} className="btn btn-primary">
          Începe
        </Link>
      </div>
    </div>
  );
}
