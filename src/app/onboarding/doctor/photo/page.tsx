/**
 * Doctor Onboarding - Step 5: Photo
 */

import { requireRole } from "@/lib/auth/session";
import Link from "next/link";
import { routes } from "@/lib/routes";

export default async function DoctorPhotoPage() {
  const _session = await requireRole("doctor");

  return (
    <div className="onboarding-page">
      <h1>Fotografie de profil</h1>
      <p>Încarcă o fotografie profesională.</p>

      {/* TODO: Add photo upload */}
      <div className="onboarding-actions">
        <Link href={routes.onboarding.doctor.verification} className="btn btn-primary">
          Continuă
        </Link>
      </div>
    </div>
  );
}
