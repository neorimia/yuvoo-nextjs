/**
 * Parent Onboarding - Step 2: Add Child Profile
 *
 * Form to add first child profile.
 */

import { requireRole } from "@/lib/auth/session";
import Link from "next/link";
import { routes } from "@/lib/routes";

export default async function ParentAddChildPage() {
  const _session = await requireRole("parent");

  return (
    <div className="onboarding-page">
      <h1>Adaugă profilul copilului</h1>
      <p>Creează primul profil pentru copilul tău.</p>

      {/* TODO: Add child profile form */}
      <div className="onboarding-actions">
        <Link href={routes.onboarding.parent.tour} className="btn btn-primary">
          Continuă
        </Link>
      </div>
    </div>
  );
}
