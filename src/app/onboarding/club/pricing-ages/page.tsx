/**
 * Club Admin Onboarding - Step 4: Pricing & Age Groups
 */

import { requireRole } from "@/lib/auth/session";
import Link from "next/link";
import { routes } from "@/lib/routes";

export default async function ClubPricingAgesPage() {
  const _session = await requireRole("club_admin");

  return (
    <div className="onboarding-page">
      <h1>Prețuri și Vârste</h1>
      <p>Configurează prețurile și grupele de vârstă.</p>

      {/* TODO: Add pricing & ages form */}
      <div className="onboarding-actions">
        <Link href={routes.onboarding.club.photos} className="btn btn-primary">
          Continuă
        </Link>
      </div>
    </div>
  );
}
