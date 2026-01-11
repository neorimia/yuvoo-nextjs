import React from "react";
import { routes } from "@/lib/routes";
import SectionTitle from "@/components/shared/SectionTitle";
import StepCard from "@/components/shared/StepCard";

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
    title: "3. Găsești cluburi sportive aproape de tine",
    microcopy: "Vezi program, prețuri, antrenori și poți trimite întrebări direct cluburilor.",
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
          {steps.map((step) => (
            <StepCard
              key={step.id}
              icon={step.icon}
              title={step.title}
              description={step.microcopy}
              link={step.link}
              animationDelay={`${0.1 * step.id}s`}
              variant="how-it-works"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
