import React from "react";
import { routes } from "@/lib/routes";
import Link from "next/link";
import SectionTitle from "@/components/shared/SectionTitle";

/**
 * HowItWorks Component
 *
 * Displays the 3-step process of how Yuvoo helps parents find the right sports for their children.
 * Uses Flaticon icons and follows the design system.
 */

interface IStep {
  id: number;
  icon: string;
  title: string;
  microcopy: string;
  link?: string;
}

const steps: IStep[] = [
  {
    id: 1,
    icon: "flaticon-reading",
    title: "1. Răspunzi la întrebări rapide",
    microcopy:
      "Doar 3–4 minute pentru a completa chestionarul AI. Afli ce sport se potrivește cu personalitatea, nivelul de energie și nevoile copilului tău.",
    link: routes.quiz.intro,
  },
  {
    id: 2,
    icon: "flaticon-presentation",
    title: "2. Primești recomandări personalizate",
    microcopy:
      "Algoritmul Yuvoo analizează răspunsurile și îți generează o listă personalizată de sporturi cu explicații detaliate în limbaj simplu.",
  },
  {
    id: 3,
    icon: "flaticon-location-pin",
    title: "3. Găsești cluburi verificate aproape de tine",
    microcopy:
      "Fiecare club este verificat manual de echipa noastră. Vezi program, prețuri, antrenori și poți trimite întrebări direct cluburilor.",
    link: routes.clubs.list,
  },
];

const HowItWorks = () => {
  return (
    <section className="bd-how-it-works-area">
      <div className="container">
        <div className="row bd-how-it-works-title-row">
          <div className="col-lg-8">
            <SectionTitle
              title="Cum funcționează Yuvoo"
              subtitle="Trei pași simpli pentru a găsi sportul perfect pentru copilul tău"
              className="bd-how-it-works-title-wrapper"
              titleClassName="bd-how-it-works-section-title"
              subtitleClassName="bd-how-it-works-section-text"
            />
          </div>
        </div>
        <div className="row bd-how-it-works-cards-row">
          {steps.map((step) => {
            const content = (
              <>
                <div className="bd-how-it-works-icon">
                  <i className={step.icon}></i>
                </div>
                <div className="bd-how-it-works-content">
                  <h4 className="bd-how-it-works-title">{step.title}</h4>
                  <p className="bd-how-it-works-text">{step.microcopy}</p>
                </div>
              </>
            );

            const animationDelay = `${0.1 * step.id}s`;

            if (step.link) {
              return (
                <div className="col-lg-4 col-md-6 col-sm-10 bd-how-it-works-card-col" key={step.id}>
                  <Link href={step.link} className="bd-how-it-works-link">
                    <div
                      className="bd-how-it-works-card bd-how-it-works-card-link wow fadeInUp"
                      data-wow-duration="1s"
                      data-wow-delay={animationDelay}
                    >
                      {content}
                    </div>
                  </Link>
                </div>
              );
            }

            return (
              <div className="col-lg-4 col-md-6 col-sm-10 bd-how-it-works-card-col" key={step.id}>
                <div
                  className="bd-how-it-works-card wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay={animationDelay}
                >
                  {content}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
