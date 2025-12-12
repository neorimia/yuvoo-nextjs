/**
 * Doctor Onboarding - Step 6: Verification
 */

import { requireRole } from "@/lib/auth/session";
import Link from "next/link";
import { routes } from "@/lib/routes";

export default async function DoctorVerificationPage() {
  const _session = await requireRole("doctor");

  return (
    <div className="onboarding-page">
      <h1>Verificare</h1>
      <p>Încarcă documentele profesionale pentru verificare.</p>

      {/* TODO: Add verification document upload */}
      <div className="onboarding-actions">
        <Link href={routes.onboarding.doctor.availability} className="btn btn-primary">
          Continuă
        </Link>
      </div>
    </div>
  );
}
