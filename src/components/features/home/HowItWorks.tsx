import React from "react";

interface IStep {
  id: number;
  icon: string;
  title: string;
  microcopy: string;
}

const steps: IStep[] = [
  {
    id: 1,
    icon: "🤖",
    title: "1. Răspunzi la 6 întrebări rapide",
    microcopy:
      "Doar 3–4 minute. Afli ce sport se potrivește cu personalitatea, nivelul de energie și nevoile copilului.",
  },
  {
    id: 2,
    icon: "🎯",
    title: "2. Primești sporturile potrivite copilului tău",
    microcopy:
      "Algoritmul Yuvoo îți generează o listă personalizată de sporturi + explicații în limbaj simplu.",
  },
  {
    id: 3,
    icon: "🏆",
    title: "3. Găsești cluburi verificate în apropierea ta",
    microcopy:
      "Fiecare club este verificat manual. Vezi program, prețuri, antrenori și poți trimite întrebare direct.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bd-how-it-works-area pt-120 pb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div
              className="bd-section-title-wrapper text-center mb-60 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay=".3s"
            >
              <h2 className="bd-section-title mb-0">Cum te ajută Yuvoo</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {steps.map((step, index) => (
            <div
              className="col-lg-4 col-md-6 mb-40 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay={`${0.4 + index * 0.1}s`}
              key={step.id}
            >
              <div className="bd-how-it-works-item text-center h-100">
                <div className="bd-how-it-works-icon mb-30">
                  <span style={{ fontSize: "64px" }}>{step.icon}</span>
                </div>
                <h4 className="bd-how-it-works-title mb-20">{step.title}</h4>
                <p className="bd-how-it-works-text">{step.microcopy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
