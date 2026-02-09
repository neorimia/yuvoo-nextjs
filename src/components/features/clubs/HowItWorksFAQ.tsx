"use client";

import React from "react";
import SectionTitle from "@/components/shared/SectionTitle";
import FaqAccordionItem from "@/components/shared/FaqAccordionItem";

/**
 * How It Works FAQ Component
 *
 * Frequently asked questions specific to how Yuvoo works.
 */
const faqData = [
  {
    id: "how1",
    question: "Cât durează procesul de verificare?",
    answer:
      "Procesul complet de verificare durează 1-2 săptămâni. În call-ul inițial de 15 minute, configurăm împreună profilul complet. Apoi echipa noastră verifică toate aspectele (identitate legală, instalații, calificări antrenori, protocoale de siguranță) și te ține la curent cu progresul.",
  },
  {
    id: "how2",
    question: "Ce informații primesc despre fiecare lead?",
    answer:
      "Pentru fiecare lead primești: numele părinților, numele copilului, vârsta copilului, sportul recomandat, motivul recomandării, locația, și date de contact. Toate informațiile necesare pentru a răspunde eficient.",
  },
  {
    id: "how3",
    question: "Cum funcționează sistemul de plată?",
    answer:
      "Ai două opțiuni: Pay-per-lead (3€ per cerere, plată unică prin Stripe) sau Premium (99,99 RON/lună sau 999,99 RON/an pentru acces nelimitat). Dacă primești mai mult de 3 cereri pe lună, Premium este mai avantajos. Toate plățile sunt procesate securizat prin Stripe.",
  },
  {
    id: "how4",
    question: "Ce se întâmplă dacă un lead expiră?",
    answer:
      "Lead-urile expiră după 5 zile dacă nu sunt acceptate. După expirare, lead-ul nu mai este disponibil. Pentru a evita expirarea, verifică dashboard-ul zilnic sau activează notificările pe email.",
  },
  {
    id: "how5",
    question: "Pot actualiza profilul clubului după verificare?",
    answer:
      "Da, poți actualiza profilul clubului oricând din dashboard. Modificările sunt aprobate automat pentru informații de bază (program, prețuri, descriere). Pentru modificări majore (sporturi, locație), poate fi necesară o re-verificare parțială.",
  },
  {
    id: "how6",
    question: "Cum funcționează algoritmul de matching?",
    answer:
      "Algoritmul nostru AI analizează răspunsurile părinților din quiz și le compară cu caracteristicile sporturilor și cerințele cluburilor. Sistemul filtrează automat cluburile care nu acceptă vârsta copilului sau nu oferă sportul recomandat, astfel încât părintele vede doar opțiuni relevante.",
  },
];

export default function HowItWorksFAQ() {
  const accordionId = "howItWorksFaqAccordion";

  return (
    <section className="pt-70 pb-70">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <SectionTitle title="Întrebări Frecvente despre Cum Funcționează" className="mb-50" />
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
