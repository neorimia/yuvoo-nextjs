/**
 * About Main Component
 *
 * Main component for the About Yuvoo page.
 * Displays Yuvoo's mission, values, and story.
 * Follows Yuvoo design system with proper components and styling.
 */

import React from "react";
import Link from "next/link";
import { routes } from "@/lib/routes";
import SectionTitle from "@/components/shared/SectionTitle";

const AboutMain: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bd-about-area pt-120 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <SectionTitle
                title="Despre Yuvoo"
                subtitle="
                  Platforma AI care transformă modul în care părinții din România găsesc
                  activitățile sportive perfecte pentru copiii lor. Combinăm recomandări AI personalizate,
                  cluburi sportive și rețeaua de specialiști pediatri pentru a oferi o ghidare
                  completă și sigură în alegerile sportive pentru copiii între 4-14 ani."
                className="mb-60"
                animationDelay=".2s"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bd-about-main pt-120 pb-70 theme-bg-7">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <SectionTitle
                title="Misiunea Noastră"
                subtitle="Yuvoo este platforma AI care ajută părinții din România să găsească activitățile sportive perfecte pentru copiii lor (vârste 4-14 ani)"
                className="mb-60"
                animationDelay=".2s"
              />
            </div>
          </div>

          {/* Value Propositions */}
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-40">
              <div
                className="bd-about-value-card text-center wow fadeInUp"
                data-wow-duration="1s"
                data-wow-delay=".4s"
              >
                <div className="bd-about-value-icon mb-25">
                  <i className="fa-solid fa-robot"></i>
                </div>
                <h3 className="bd-about-value-title mb-20">
                  <Link href={routes.quiz.intro} className="text-decoration-none">
                    AI Coach Quiz
                  </Link>
                </h3>
                <p className="bd-about-value-text">
                  <Link
                    href={routes.quiz.intro}
                    className="text-yuvoo-primary text-decoration-underline"
                  >
                    Recomandări personalizate de sporturi
                  </Link>{" "}
                  bazate pe profilul unic al copilului tău, generate cu inteligență artificială.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-40">
              <div
                className="bd-about-value-card text-center wow fadeInUp"
                data-wow-duration="1s"
                data-wow-delay=".5s"
              >
                <div className="bd-about-value-icon mb-25">
                  <i className="fa-solid fa-shield-check"></i>
                </div>
                <h3 className="bd-about-value-title mb-20">
                  <Link href={routes.clubs.list} className="text-decoration-none">
                    Cluburi sportive
                  </Link>
                </h3>
                <p className="bd-about-value-text">
                  <Link
                    href={routes.clubs.list}
                    className="text-yuvoo-primary text-decoration-underline"
                  >
                    Listă curată de cluburi sportive
                  </Link>
                  , cu informații complete despre programe, prețuri și locații.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-40">
              <div
                className="bd-about-value-card text-center wow fadeInUp"
                data-wow-duration="1s"
                data-wow-delay=".6s"
              >
                <div className="bd-about-value-icon mb-25">
                  <i className="fa-solid fa-user-doctor"></i>
                </div>
                <h3 className="bd-about-value-title mb-20">
                  <Link href={routes.doctors.list} className="text-decoration-none">
                    Rețea de Specialiști
                  </Link>
                </h3>
                <p className="bd-about-value-text">
                  <Link
                    href={routes.doctors.list}
                    className="text-yuvoo-primary text-decoration-underline"
                  >
                    Acces la specialiști pediatri relevanți pentru sport
                  </Link>
                  , când recomandările AI indică nevoia de consultare medicală.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bd-about-how-it-works pt-120 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <SectionTitle
                title="Cum Funcționează"
                subtitle="Trei pași simpli pentru a găsi activitățile sportive perfecte pentru copilul tău"
                className="mb-60"
                animationDelay=".2s"
              />
              <div className="row">
                <div className="col-lg-4 col-md-6 mb-30">
                  <div
                    className="bd-about-step-card text-center wow fadeInUp"
                    data-wow-duration="1s"
                    data-wow-delay=".3s"
                  >
                    <div className="bd-about-step-icon-wrapper mb-30">
                      <div className="bd-about-step-number">
                        <span className="bd-about-step-number-inner">1</span>
                      </div>
                    </div>
                    <div className="bd-about-step-content">
                      <h4 className="bd-about-step-title mb-20">
                        <Link href={routes.quiz.intro} className="text-decoration-none">
                          Completează Chestionarul
                        </Link>
                      </h4>
                      <p className="bd-about-step-text">
                        Răspunde la întrebări simple despre copilul tău.{" "}
                        <Link href={routes.quiz.intro} className="text-yuvoo-primary">
                          AI-ul nostru analizează răspunsurile și generează recomandări
                          personalizate
                        </Link>
                        .
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-30">
                  <div
                    className="bd-about-step-card text-center wow fadeInUp"
                    data-wow-duration="1s"
                    data-wow-delay=".4s"
                  >
                    <div className="bd-about-step-icon-wrapper mb-30">
                      <div className="bd-about-step-number">
                        <span className="bd-about-step-number-inner">2</span>
                      </div>
                    </div>
                    <div className="bd-about-step-content">
                      <h4 className="bd-about-step-title mb-20">
                        <Link href={routes.clubs.list} className="text-decoration-none">
                          Descoperă Cluburi
                        </Link>
                      </h4>
                      <p className="bd-about-step-text">
                        <Link href={routes.clubs.list} className="text-yuvoo-primary">
                          Explorează cluburile sportive verificate
                        </Link>{" "}
                        care oferă sporturile recomandate. Filtrează după locație, vârstă și nivel.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-30">
                  <div
                    className="bd-about-step-card text-center wow fadeInUp"
                    data-wow-duration="1s"
                    data-wow-delay=".5s"
                  >
                    <div className="bd-about-step-icon-wrapper mb-30">
                      <div className="bd-about-step-number">
                        <span className="bd-about-step-number-inner">3</span>
                      </div>
                    </div>
                    <div className="bd-about-step-content">
                      <h4 className="bd-about-step-title mb-20">Rezervă și Încearcă</h4>
                      <p className="bd-about-step-text">
                        Rezervă o ședință de probă gratuită sau programează o consultare cu un
                        specialist dacă este recomandat.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bd-about-cta pt-120 pb-70 theme-bg-6">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div
                className="bd-about-cta-card text-center wow fadeInUp"
                data-wow-duration="1s"
                data-wow-delay=".3s"
              >
                <h3 className="bd-about-cta-title mb-20">Gata să începi?</h3>
                <p className="bd-about-cta-text mb-40">
                  Completează chestionarul AI și descoperă sporturile perfecte pentru copilul tău.
                </p>
                <Link href={routes.quiz.intro} className="bd-btn">
                  <span className="bd-btn-inner">
                    <span className="bd-btn-normal">
                      <i className="fa-solid fa-play-circle me-2"></i>
                      Începe Chestionarul
                    </span>
                    <span className="bd-btn-hover">
                      <i className="fa-solid fa-play-circle me-2"></i>
                      Începe Chestionarul
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutMain;
