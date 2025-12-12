/**
 * Parent Onboarding - Step 4: Quiz Introduction
 *
 * CTA to start AI Coach Quiz or skip to dashboard.
 */

import { requireRole } from "@/lib/auth/session";
import Link from "next/link";
import { routes } from "@/lib/routes";

export default async function ParentQuizIntroPage() {
  const _session = await requireRole("parent");

  return (
    <div className="onboarding-page">
      <h1>Descoperă sporturile potrivite</h1>
      <p>Completează chestionarul nostru AI pentru recomandări personalizate.</p>

      <div className="onboarding-actions">
        <Link href={routes.quiz.intro} className="btn btn-primary">
          Începe Chestionarul
        </Link>
        <Link href={routes.onboarding.parent.complete} className="btn btn-secondary">
          Mai Târziu
        </Link>
      </div>
    </div>
  );
}
