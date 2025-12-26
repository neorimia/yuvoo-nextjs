import React from "react";
import EarlyAccessForm from "./EarlyAccessForm";

interface PreLaunchPageProps {
  routeType: "quiz" | "auth" | "dashboard" | "club-portal" | "doctor-portal" | "onboarding";
}

/**
 * Pre-Launch Page Component
 *
 * Displays a polished "In Development" page for restricted routes.
 * Shows context-specific messaging and includes waitlist email capture form.
 * Used when PRE_LAUNCH_RESTRICTIONS_ENABLED is true.
 */
export default function PreLaunchPage({ routeType }: PreLaunchPageProps) {
  const messages = {
    quiz: {
      title: "Quiz-ul AI este în dezvoltare",
      description:
        "Completează formularul de mai jos pentru acces prioritar când quiz-ul AI va fi disponibil. Vei primi recomandări personalizate pentru sportul potrivit copilului tău.",
    },
    auth: {
      title: "Platforma este în dezvoltare",
      description:
        "Completează formularul de mai jos pentru a fi notificat când platforma va fi disponibilă. Vei fi printre primii care pot crea cont și începe să folosești Yuvoo.",
    },
    dashboard: {
      title: "Panoul de control este în dezvoltare",
      description:
        "Completează formularul de mai jos pentru acces prioritar când panoul de control va fi disponibil. Vei putea gestiona profilul, copiii și rezervările.",
    },
    "club-portal": {
      title: "Portalul clubului este în dezvoltare",
      description:
        "Completează formularul de mai jos pentru acces prioritar când portalul clubului va fi disponibil. Vei putea gestiona profilul, copiii și rezervările.",
    },
    "doctor-portal": {
      title: "Portalul medicului este în dezvoltare",
      description:
        "Completează formularul de mai jos pentru acces prioritar când portalul medicului va fi disponibil. Vei putea gestiona profilul, copiii și rezervările.",
    },
    onboarding: {
      title: "Onboarding-ul este în dezvoltare",
      description:
        "Completează formularul de mai jos pentru acces prioritar când onboarding-ul va fi disponibil. Vei putea gestiona profilul, copiii și rezervările.",
    },
  };

  const message = messages[routeType];

  return (
    <section
      className="bd-hero-area bd-hero-area-3 fix"
      style={{ paddingTop: "120px", paddingBottom: "120px" }}
    >
      <div className="bd-gradient-bg"></div>
      <div className="container">
        <div className="bd-hero-inner-3">
          <div className="row align-items-center">
            <div className="col-lg-8 col-md-10 col-lg-12 mx-auto">
              <div className="bd-hero-content text-center">
                <h1
                  className="bd-hero-title wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay=".3s"
                  style={{ marginBottom: "30px" }}
                >
                  {message.title}
                </h1>
                <p
                  className="wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay=".5s"
                  style={{
                    fontSize: "18px",
                    lineHeight: "30px",
                    color: "#424242",
                    marginBottom: "40px",
                    maxWidth: "700px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  {message.description}
                </p>
                <div
                  className="wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay=".7s"
                  style={{
                    maxWidth: "500px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    backgroundColor: "#FFFFFF",
                    padding: "40px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <EarlyAccessForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
