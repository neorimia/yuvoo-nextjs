import React from "react";
import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth/session";
import { getChildAction } from "@/app/actions/children";
import EditChildForm from "@/components/features/children/EditChildForm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { routes } from "@/lib/routes";

interface EditChildPageProps {
  params: Promise<{ id: string }>;
}

/**
 * Generate static params for edit child pages
 * Returns at least one dummy value for Cache Components compatibility
 */
export async function generateStaticParams() {
  return [{ id: "placeholder" }];
}

/**
 * Generate metadata for edit child page
 * No explicit dynamic data access needed - parent layout makes entire tree dynamic
 */
export async function generateMetadata(_props: EditChildPageProps): Promise<Metadata> {
  return {
    title: "Editează Profil Copil - Yuvoo",
    description: "Editează profilul copilului tău pe Yuvoo.",
  };
}

/**
 * Edit Child Page
 *
 * Protected page for editing child profile.
 * Route: /parent/children/[id]/edit
 *
 * Note: Parent layout already handles cookies() and auth, making this route dynamic
 */
export default async function EditChildPage({ params }: EditChildPageProps) {
  // Check if we're in production build phase
  const isProductionBuild = process.env.NEXT_PHASE === "phase-production-build";

  // Require authentication (layout already called cookies())
  await requireAuth();

  const { id } = await params;

  // During production builds, skip database queries and render with mock data
  if (isProductionBuild) {
    return (
      <section className="bd-children-area pt-120 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="bd-children-content">
                <nav aria-label="breadcrumb" className="mb-4">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link href={routes.parent.dashboard}>Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link href={routes.parent.children.list}>Copiii Mei</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Editează
                    </li>
                  </ol>
                </nav>
                <h1 className="bd-section-title mb-30">Editează Profilul Copilului</h1>
                <p className="text-muted mb-4">Build placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

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
