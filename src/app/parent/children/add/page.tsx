import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { requireAuth } from "@/lib/auth/session";
import { routes } from "@/lib/routes";
import ParentAddChildForm from "@/components/features/children/ParentAddChildForm";

export const metadata: Metadata = {
  title: "Adaugă copil - Yuvoo",
  description: "Adaugă profilul copilului tău pe Yuvoo.",
};

export default async function AddChildPage() {
  await cookies();
  await requireAuth();

  return (
    <section className="bd-children-area pb-70">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="mb-4">
              <Link href={routes.parent.children.list} className="btn btn-link ps-0">
                <i className="bi bi-arrow-left me-1" aria-hidden="true" />
                Înapoi la copii
              </Link>
            </div>
            <h1 className="bd-section-title mb-2">Adaugă copil</h1>
            <p className="text-muted mb-4">
              Completează datele copilului pentru recomandări personalizate și rezervări.
            </p>
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4 p-md-5">
                <ParentAddChildForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
