"use client";

import React from "react";
import SectionTitle from "@/components/shared/SectionTitle";
import FaqAccordionItem from "@/components/shared/FaqAccordionItem";
import { doctorsFaqItems } from "@/data/doctors-faq-data";
import Link from "next/link";
import { routes } from "@/lib/routes";

/**
 * Doctors Landing FAQ Section
 *
 * Displays frequently asked questions in an accordion format.
 * Part of the doctors landing page (/pentru-doctori).
 */
export default function DoctorsLandingFAQ() {
  const accordionId = "doctorsFaqAccordion";

  return (
    <section className="bd-doctors-landing-faq pt-120 pb-70">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-9">
            {/* Section Title */}
            <SectionTitle title="Întrebări frecvente" className="mb-50" animationDelay=".3s" />

            {/* FAQ Accordion */}
            <div className="wow fadeInUp" data-wow-duration="1s" data-wow-delay=".4s">
              <div className="accordion" id={accordionId}>
                {doctorsFaqItems.map((faq, index) => (
                  <FaqAccordionItem
                    key={`doctorsFaq${index + 1}`}
                    id={`doctorsFaq${index + 1}`}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={index === 0}
                    accordionId={accordionId}
                  />
                ))}
              </div>
              {/* Link to FAQ page */}
              <div className="text-center wow fadeInUp" data-wow-duration="1s" data-wow-delay=".5s">
                <Link href={routes.faq} className="bd-btn mt-4">
                  <span className="bd-btn-inner">
                    <span className="bd-btn-normal">Vezi toate întrebările</span>
                    <span className="bd-btn-hover">Vezi toate întrebările</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
