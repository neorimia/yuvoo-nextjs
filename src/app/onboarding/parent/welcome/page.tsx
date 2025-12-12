/**
 * Parent Onboarding - Step 1: Welcome
 *
 * Welcome screen for parent onboarding flow.
 */

import { requireRole } from "@/lib/auth/session";
import Link from "next/link";
import { routes } from "@/lib/routes";

export default async function ParentWelcomePage() {
  const _session = await requireRole("parent");

  return (
    <div className="onboarding-page">
      <h1>Bun venit la Yuvoo!</h1>
      <p>Hai să începem configurarea contului tău de părinte.</p>

      <div className="onboarding-actions">
        <Link href={routes.onboarding.parent.addChild} className="btn btn-primary">
          Continuă
        </Link>
      </div>
    </div>
  );
}
