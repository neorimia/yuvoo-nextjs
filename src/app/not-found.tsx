import React from "react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import error from "../../public/assets/img/bg/error-404.svg";
import { routes } from "@/lib/routes";

const ErrorPageMain = async () => {
  // Make page dynamic by accessing headers() before Sentry can wrap it
  // This prevents crypto.randomUUID() errors during prerendering
  await headers();

  return (
    <section className="bd-erro-area pt-120 pb-120">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-6">
            <div className="bd-section-title-wrapper mb-45">
              <h2 className="bd-section-title mb-0">Pagina nu a fost găsită</h2>
              <p className="mb-4">
                Ne pare rău, dar pagina pe care o cauți nu există sau a fost mutată. Te ajutăm să
                găsești ceea ce cauți!
              </p>
              <p className="text-muted">
                Poți explora sporturile disponibile, descoperi cluburi sportive sau începe
                chestionarul nostru AI pentru a primi recomandări personalizate pentru copilul tău.
              </p>
            </div>

            {/* Quick Navigation Links */}
            <div className="bd-error-links mb-40">
              <h3 className="h5 mb-3">Link-uri utile:</h3>
              <div className="row g-3">
                <div className="col-md-6">
                  <Link
                    href={routes.home}
                    className="d-flex align-items-center text-decoration-none text-dark"
                  >
                    <i className="bi bi-house-door me-2"></i>
                    <span>Acasă</span>
                  </Link>
                </div>
                <div className="col-md-6">
                  <Link
                    href={routes.sports.list}
                    className="d-flex align-items-center text-decoration-none text-dark"
                  >
                    <i className="bi bi-trophy me-2"></i>
                    <span>Sporturi</span>
                  </Link>
                </div>
                <div className="col-md-6">
                  <Link
                    href={routes.clubs.list}
                    className="d-flex align-items-center text-decoration-none text-dark"
                  >
                    <i className="bi bi-building me-2"></i>
                    <span>Cluburi</span>
                  </Link>
                </div>
                <div className="col-md-6">
                  <Link
                    href={routes.doctors.list}
                    className="d-flex align-items-center text-decoration-none text-dark"
                  >
                    <i className="bi bi-heart-pulse me-2"></i>
                    <span>Doctori</span>
                  </Link>
                </div>
                <div className="col-md-6">
                  <Link
                    href={routes.quiz.intro}
                    className="d-flex align-items-center text-decoration-none text-dark"
                  >
                    <i className="bi bi-question-circle me-2"></i>
                    <span>Chestionar AI</span>
                  </Link>
                </div>
                <div className="col-md-6">
                  <Link
                    href={routes.contact}
                    className="d-flex align-items-center text-decoration-none text-dark"
                  >
                    <i className="bi bi-envelope me-2"></i>
                    <span>Contact</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Primary CTA */}
            <div className="bd-error-btn">
              <Link href={routes.home} className="bd-btn">
                <span className="bd-btn-inner">
                  <span className="bd-btn-normal d-flex align-items-center">
                    <i className="bi bi-house-door me-2"></i>
                    Înapoi la pagina principală
                  </span>
                  <span className="bd-btn-hover d-flex align-items-center">
                    <i className="bi bi-house-door me-2"></i>
                    Înapoi la pagina principală
                  </span>
                </span>
              </Link>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="bd-error-thumb-wrapper">
              <div className="bd-error-thumb">
                <Image
                  src={error}
                  style={{ width: "100%", height: "100%" }}
                  alt="Pagina nu a fost găsită"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorPageMain;
