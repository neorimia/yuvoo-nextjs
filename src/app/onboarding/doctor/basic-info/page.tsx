/**
 * Doctor Onboarding - Step 2: Basic Info
 */

import { requireRole } from "@/lib/auth/session";
import Link from "next/link";
import { routes } from "@/lib/routes";

export default async function DoctorBasicInfoPage() {
  const _session = await requireRole("doctor");

  return (
    <div className="onboarding-page">
      <h1>Informații de bază</h1>
      <p>Spune-ne despre tine și specialitatea ta.</p>

      {/* TODO: Add basic info form */}
      <div className="onboarding-actions">
        <Link href={routes.onboarding.doctor.bioExperience} className="btn btn-primary">
          Continuă
        </Link>
      </div>
    </div>
  );
}
