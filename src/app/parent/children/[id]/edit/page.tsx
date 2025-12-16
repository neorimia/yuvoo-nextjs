import React from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { requireAuth } from "@/lib/auth/session";
import { getChildAction } from "@/app/actions/children";
import EditChildForm from "@/components/features/children/EditChildForm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { routes } from "@/lib/routes";

// MIGRATED: Removed export const dynamic = 'force-dynamic' (incompatible with Cache Components)
// This page uses requireAuth() which accesses cookies, so it remains dynamic by default
// Explicitly accessing cookies() to ensure route is dynamic during build

export const metadata: Metadata = {
  title: "Editează Profil Copil - Yuvoo",
  description: "Editează profilul copilului tău pe Yuvoo.",
};

interface EditChildPageProps {
  params: Promise<{ id: string }>;
}

/**
 * Edit Child Page
 *
 * Protected page for editing child profile.
 * Route: /parent/children/[id]/edit
 */
export default async function EditChildPage({ params }: EditChildPageProps) {
  // Explicitly access cookies to ensure route is dynamic (prevents prerender errors)
  await cookies();
  await requireAuth();

  const { id } = await params;
  const child = await getChildAction(id);

  if (!child) {
    notFound();
  }

  return (
    <section className="bd-children-area pt-120 pb-70">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="bd-children-content">
              {/* Breadcrumb */}
              <nav aria-label="breadcrumb" className="mb-4">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href={routes.parent.dashboard}>Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link href={routes.parent.children.list}>Copiii Mei</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link href={routes.parent.children.detail(id)}>
                      {child.firstName} {child.lastName}
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Editează
                  </li>
                </ol>
              </nav>

              <h1 className="bd-section-title mb-30">Editează Profilul Copilului</h1>
              <p className="text-muted mb-4">
                Actualizează informațiile despre {child.firstName} {child.lastName}.
              </p>

              <div className="row">
                <div className="col-lg-8 col-xl-6">
                  <EditChildForm child={child} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
