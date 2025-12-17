import React from "react";
import { faqItems } from "@/data/faq-data";
import { routes } from "@/lib/routes";
import SectionTitle from "@/components/shared/SectionTitle";
import FaqAccordionItem from "@/components/shared/FaqAccordionItem";
import ViewAllLink from "@/components/shared/ViewAllLink";

/**
 * HomeFaq Component
 *
 * Displays frequently asked questions on the home page.
 * Uses the full FAQ data from faq-data.ts and shows top 6 most relevant questions.
 * Includes a link to the full FAQ page.
 * Uses reusable FaqAccordionItem component and follows the design system.
 */

const HomeFaq = () => {
  // Show top 6 most relevant FAQs on home page
  const topFaqs = faqItems.slice(0, 6);
  const accordionId = "homeFaqAccordion";

  return (
    <section className="bd-home-faq-area">
      <div className="container">
        <div className="row bd-home-faq-title-row">
          <div className="col-lg-8">
            <SectionTitle
              title="Întrebări frecvente"
              subtitle="Răspunsuri la cele mai comune întrebări despre platforma Yuvoo și cum te poate ajuta să găsești sportul perfect pentru copilul tău"
              className="bd-home-faq-title-wrapper"
              titleClassName="bd-home-faq-section-title"
              subtitleClassName="bd-home-faq-section-text"
            />
          </div>
        </div>
        <div className="row bd-home-faq-content-row">
          <div className="col-lg-8">
            <div
              className="bd-home-faq-content wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay=".4s"
            >
              <div className="bd-home-faq-accordion">
                <div className="accordion" id={accordionId}>
                  {topFaqs.map((item, index) => (
                    <FaqAccordionItem
                      key={`home-faq-${index}`}
                      id={`home-faq-${index}`}
                      question={item.question}
                      answer={item.answer}
                      isOpen={index === 0}
                      accordionId={accordionId}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="row justify-content-center bd-home-faq-view-all-row">
              <ViewAllLink href={routes.faq} text="Vezi toate întrebările" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeFaq;
