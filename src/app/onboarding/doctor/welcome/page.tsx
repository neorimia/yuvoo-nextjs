/**
 * Doctor Onboarding - Step 1: Welcome
 */

import { requireRole } from "@/lib/auth/session";
import Link from "next/link";
import { routes } from "@/lib/routes";

export default async function DoctorWelcomePage() {
  const _session = await requireRole("doctor");

  return (
    <div className="onboarding-page">
      <h1>Bun venit pe Yuvoo!</h1>
      <p>Hai să configurăm profilul tău de medic specialist.</p>

      <div className="onboarding-actions">
        <Link href={routes.onboarding.doctor.basicInfo} className="btn btn-primary">
          Începe
        </Link>
      </div>
    </div>
  );
}
