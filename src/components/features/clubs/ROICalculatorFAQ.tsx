"use client";

import React from "react";
import SectionTitle from "@/components/shared/SectionTitle";
import FaqAccordionItem from "@/components/shared/FaqAccordionItem";

/**
 * ROI Calculator FAQ Component
 *
 * Displays frequently asked questions about the ROI calculator and calculations.
 * Part of the ROI Calculator standalone page.
 */

const faqData = [
  {
    id: "roi1",
    question: "Cum sunt calculate estimările?",
    answer:
      "Estimările se bazează pe date reale de la cluburi Yuvoo și pe statistici din industrie. Conversia mai mare pentru Yuvoo (60-80% vs. 15-25%) se datorează pre-calificării părinților prin quiz AI.",
  },
  {
    id: "roi2",
    question: "Pot verifica datele?",
    answer:
      "Da, toate datele sunt transparente și verificabile. Poți vedea case studies reale de la cluburi Yuvoo pe pagina 'Povești de Succes' pentru dovezi concrete.",
  },
  {
    id: "roi3",
    question: "Ce se întâmplă dacă rezultatele mele sunt diferite?",
    answer:
      "Calculatorul oferă estimări bazate pe medii. Rezultatele tale pot varia în funcție de sport, locație și alți factori. Contactează-ne pentru o analiză personalizată.",
  },
  {
    id: "roi4",
    question: "De ce conversia este mai mare cu Yuvoo?",
    answer:
      "Părinții care contactează cluburile prin Yuvoo au deja completat un quiz AI și știu că sportul tău este potrivit pentru copilul lor. Această pre-calificare crește semnificativ rata de conversie.",
  },
];

export default function ROICalculatorFAQ() {
  const accordionId = "roiCalculatorFaqAccordion";

  return (
    <div className="row justify-content-center">
      <div className="col-lg-10">
        <SectionTitle title="Întrebări Frecvente despre Calculator ROI" className="mb-50" />
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
  );
}
