/**
 * About Main Component
 *
 * Main component for the About Yuvoo page.
 * Displays Yuvoo's mission, values, and story.
 */

import React from "react";
import Link from "next/link";
import { routes } from "@/lib/routes";

const AboutMain: React.FC = () => {
  return (
    <section className="bd-about-main pt-120 pb-70">
      <div className="container">
        {/* Mission Section */}
        <div className="row mb-5">
          <div className="col-lg-8 mx-auto">
            <div className="text-center mb-5">
              <h2 className="bd-section-title mb-4">Misiunea Noastră</h2>
              <p className="lead">
                Yuvoo este platforma AI care ajută părinții din România să găsească activitățile
                sportive perfecte pentru copiii lor (vârste 4-14 ani).
              </p>
            </div>
          </div>
        </div>

        {/* Value Propositions */}
        <div className="row mb-5">
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100 text-center p-4">
              <div className="mb-3">
                <i
                  className="bi bi-robot"
                  style={{ fontSize: "3rem", color: "var(--bd-theme-1)" }}
                ></i>
              </div>
              <h3 className="h5 mb-3">AI Coach Quiz</h3>
              <p className="text-muted">
                Recomandări personalizate de sporturi bazate pe profilul unic al copilului tău,
                generate cu inteligență artificială.
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100 text-center p-4">
              <div className="mb-3">
                <i
                  className="bi bi-shield-check"
                  style={{ fontSize: "3rem", color: "var(--bd-theme-1)" }}
                ></i>
              </div>
              <h3 className="h5 mb-3">Cluburi Verificate</h3>
              <p className="text-muted">
                Listă curată de cluburi sportive verificate, cu informații complete despre programe,
                prețuri și locații.
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100 text-center p-4">
              <div className="mb-3">
                <i
                  className="bi bi-heart-pulse"
                  style={{ fontSize: "3rem", color: "var(--bd-theme-1)" }}
                ></i>
              </div>
              <h3 className="h5 mb-3">Rețea de Specialiști</h3>
              <p className="text-muted">
                Acces la specialiști pediatri relevanți pentru sport, când recomandările AI indică
                nevoia de consultare medicală.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="row mb-5">
          <div className="col-lg-10 mx-auto">
            <h2 className="bd-section-title text-center mb-5">Cum Funcționează</h2>
            <div className="row">
              <div className="col-md-4 mb-4">
                <div className="text-center">
                  <div className="mb-3">
                    <span
                      className="badge bg-primary rounded-circle d-inline-flex align-items-center justify-content-center"
                      style={{ width: "60px", height: "60px", fontSize: "1.5rem" }}
                    >
                      1
                    </span>
                  </div>
                  <h4 className="h5 mb-3">Completează Chestionarul</h4>
                  <p className="text-muted">
                    Răspunde la 6 întrebări simple despre copilul tău. AI-ul nostru analizează
                    răspunsurile și generează recomandări personalizate.
                  </p>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="text-center">
                  <div className="mb-3">
                    <span
                      className="badge bg-primary rounded-circle d-inline-flex align-items-center justify-content-center"
                      style={{ width: "60px", height: "60px", fontSize: "1.5rem" }}
                    >
                      2
                    </span>
                  </div>
                  <h4 className="h5 mb-3">Descoperă Cluburi</h4>
                  <p className="text-muted">
                    Explorează cluburile sportive verificate care oferă sporturile recomandate.
                    Filtrează după locație, vârstă și nivel.
                  </p>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="text-center">
                  <div className="mb-3">
                    <span
                      className="badge bg-primary rounded-circle d-inline-flex align-items-center justify-content-center"
                      style={{ width: "60px", height: "60px", fontSize: "1.5rem" }}
                    >
                      3
                    </span>
                  </div>
                  <h4 className="h5 mb-3">Rezervă și Încearcă</h4>
                  <p className="text-muted">
                    Rezervă o ședință de probă gratuită sau programează o consultare cu un
                    specialist dacă este recomandat.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="card bg-light text-center p-5">
              <h3 className="mb-3">Gata să începi?</h3>
              <p className="text-muted mb-4">
                Completează chestionarul AI și descoperă sporturile perfecte pentru copilul tău.
              </p>
              <Link href={routes.quiz.intro} className="btn btn-primary btn-lg">
                <i className="bi bi-play-circle me-2"></i>
                Începe Chestionarul
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMain;
