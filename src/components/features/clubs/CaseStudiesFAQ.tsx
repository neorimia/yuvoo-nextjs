"use client";

import React from "react";
import SectionTitle from "@/components/shared/SectionTitle";
import FaqAccordionItem from "@/components/shared/FaqAccordionItem";

/**
 * Case Studies FAQ Component
 *
 * Frequently asked questions specific to case studies.
 */
const faqData = [
  {
    id: "case1",
    question: "De unde provin aceste case studies?",
    answer:
      "Toate case studies-urile provin de la cluburi reale care folosesc Yuvoo. Metricile sunt verificate și aprobate de fiecare club. Nu folosim date fictive sau estimate.",
  },
  {
    id: "case2",
    question: "Pot vedea case studies pentru sportul meu?",
    answer:
      "Da, case studies-urile sunt organizate pe sporturi. Când adăugăm case studies noi, le categorizăm pentru a fi ușor de găsit. Dacă nu există încă case studies pentru sportul tău, contactează-ne pentru a discuta despre rezultatele tale potențiale.",
  },
  {
    id: "case3",
    question: "Cum pot deveni un case study?",
    answer:
      "După ce folosești Yuvoo pentru 2-3 luni și ai rezultate concrete, te contactăm pentru a discuta despre includerea ta ca case study. Dacă ești interesat, poți ne contacta direct pentru a discuta despre procesul.",
  },
  {
    id: "case4",
    question: "Sunt toate datele reale?",
    answer:
      "Da, toate metricile și rezultatele prezentate în case studies sunt reale și verificate. Fiecare club a aprobat utilizarea numelui, logo-ului și metricilor înainte de publicare.",
  },
];

export default function CaseStudiesFAQ() {
  const accordionId = "caseStudiesFaqAccordion";

  return (
    <section className="pt-70 pb-70" style={{ backgroundColor: "#F8F9FA" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <SectionTitle title="Întrebări Frecvente despre Case Studies" className="mb-50" />
            <div className="accordion" id={accordionId}>
              {faqData.map((faq, index) => (
                <FaqAccordionItem
                  key={faq.id}
                  id={faq.id}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={index === 0}
                  accordionId={accordionId}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
