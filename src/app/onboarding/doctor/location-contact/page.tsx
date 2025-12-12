/**
 * Doctor Onboarding - Step 4: Location & Contact
 */

import { requireRole } from "@/lib/auth/session";
import Link from "next/link";
import { routes } from "@/lib/routes";

export default async function DoctorLocationContactPage() {
  const _session = await requireRole("doctor");

  return (
    <div className="onboarding-page">
      <h1>Locație și Contact</h1>
      <p>Adaugă adresa cabinetului și informațiile de contact.</p>

      {/* TODO: Add location & contact form */}
      <div className="onboarding-actions">
        <Link href={routes.onboarding.doctor.photo} className="btn btn-primary">
          Continuă
        </Link>
      </div>
    </div>
  );
}
