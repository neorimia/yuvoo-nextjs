/**
 * Doctor Onboarding - Step 3: Bio & Experience
 */

import { requireRole } from "@/lib/auth/session";
import Link from "next/link";
import { routes } from "@/lib/routes";

export default async function DoctorBioExperiencePage() {
  const _session = await requireRole("doctor");

  return (
    <div className="onboarding-page">
      <h1>Biografie și Experiență</h1>
      <p>Descrie experiența și abordarea ta profesională.</p>

      {/* TODO: Add bio & experience form */}
      <div className="onboarding-actions">
        <Link href={routes.onboarding.doctor.locationContact} className="btn btn-primary">
          Continuă
        </Link>
      </div>
    </div>
  );
}
