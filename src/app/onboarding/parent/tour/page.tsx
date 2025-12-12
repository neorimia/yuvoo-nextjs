/**
 * Parent Onboarding - Step 3: Platform Tour
 *
 * Introduction to platform features.
 */

import { requireRole } from "@/lib/auth/session";
import Link from "next/link";
import { routes } from "@/lib/routes";

export default async function ParentTourPage() {
  const _session = await requireRole("parent");

  return (
    <div className="onboarding-page">
      <h1>Descoperă Yuvoo</h1>
      <p>Află cum funcționează platforma noastră.</p>

      {/* TODO: Add platform tour/features */}
      <div className="onboarding-actions">
        <Link href={routes.onboarding.parent.quizIntro} className="btn btn-primary">
          Continuă
        </Link>
      </div>
    </div>
  );
}
