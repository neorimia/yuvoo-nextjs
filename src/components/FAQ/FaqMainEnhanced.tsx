/**
 * FAQ Main Enhanced Component
 *
 * Enhanced FAQ component with category support.
 * Displays FAQs organized by categories using accordion items.
 * Server Component - can be used in SSG pages.
 */

import React from "react";
import { faqCategories } from "@/data/faq-data";
import SectionTitle from "@/components/shared/SectionTitle";
import FaqAccordionItem from "@/components/shared/FaqAccordionItem";

const FaqMainEnhanced: React.FC = () => {
  return (
    <section className="bd-faq-area pt-120 pb-70">
      <div className="container">
        {faqCategories.map((category, categoryIndex) => {
          const accordionId = `faqCategory${categoryIndex}`;
          const categorySlug = category.name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");

          return (
            <div key={categoryIndex} className="bd-faq-category mb-70">
              <div className="row">
                <div className="col-12">
                  <SectionTitle
                    title={category.name}
                    className="mb-40"
                    animationDelay={`${0.2 + categoryIndex * 0.1}s`}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-10 offset-lg-1">
                  <div
                    className="bd-faq-category-content wow fadeInUp"
                    data-wow-duration="1s"
                    data-wow-delay={`${0.3 + categoryIndex * 0.1}s`}
                  >
                    <div className="bd-faq-accordion">
                      <div className="accordion" id={accordionId}>
                        {category.items.map((item, itemIndex) => (
                          <FaqAccordionItem
                            key={`${categorySlug}-${itemIndex}`}
                            id={`${categorySlug}-${itemIndex}`}
                            question={item.question}
                            answer={item.answer}
                            isOpen={categoryIndex === 0 && itemIndex === 0}
                            accordionId={accordionId}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FaqMainEnhanced;
