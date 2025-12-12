/**
 * Doctor Onboarding - Step 7: Availability
 */

import { requireRole } from "@/lib/auth/session";
import Link from "next/link";
import { routes } from "@/lib/routes";

export default async function DoctorAvailabilityPage() {
  const _session = await requireRole("doctor");

  return (
    <div className="onboarding-page">
      <h1>Disponibilitate</h1>
      <p>Configurează programul tău de consultații.</p>

      {/* TODO: Add availability calendar */}
      <div className="onboarding-actions">
        <Link href={routes.onboarding.doctor.complete} className="btn btn-primary">
          Finalizează
        </Link>
      </div>
    </div>
  );
}
