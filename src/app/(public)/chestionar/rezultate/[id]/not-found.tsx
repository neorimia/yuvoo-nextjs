import React from "react";
import Link from "next/link";
import { routes } from "@/lib/routes";

/**
 * Quiz Results Not Found Page
 *
 * Displayed when quiz results are not found or invalid.
 */
export default function QuizResultsNotFound() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6 text-center">
          <div className="mb-4">
            <i className="bi bi-exclamation-triangle text-warning" style={{ fontSize: "4rem" }}></i>
          </div>
          <h1 className="h2 mb-3">Rezultatele nu au fost găsite</h1>
          <p className="text-muted mb-4">
            Rezultatele chestionarului pe care le cauți nu există sau au fost șterse. Te rugăm să
            verifici linkul sau să completezi din nou chestionarul.
          </p>
          <div className="d-flex gap-3 justify-content-center">
            <Link href={routes.quiz.intro} className="btn btn-primary">
              <i className="bi bi-arrow-left me-2"></i>
              Înapoi la chestionar
            </Link>
            <Link href={routes.home} className="btn btn-outline-secondary">
              Acasă
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
