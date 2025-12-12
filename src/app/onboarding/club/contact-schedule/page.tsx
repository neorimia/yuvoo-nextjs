/**
 * Club Admin Onboarding - Step 3: Contact & Schedule
 */

import { requireRole } from "@/lib/auth/session";
import Link from "next/link";
import { routes } from "@/lib/routes";

export default async function ClubContactSchedulePage() {
  const _session = await requireRole("club_admin");

  return (
    <div className="onboarding-page">
      <h1>Contact și Program</h1>
      <p>Adaugă informațiile de contact și programul de funcționare.</p>

      {/* TODO: Add contact & schedule form */}
      <div className="onboarding-actions">
        <Link href={routes.onboarding.club.pricingAges} className="btn btn-primary">
          Continuă
        </Link>
      </div>
    </div>
  );
}
