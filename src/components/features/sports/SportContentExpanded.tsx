/**
 * Sport Content Expanded Component
 *
 * Displays comprehensive expanded content for sport detail pages.
 * Includes: introduction, benefits, age recommendations, equipment guide, FAQ, and internal links.
 * Server Component - can be used in SSG pages.
 */

import React from "react";
import Link from "next/link";
import type { SportExpandedContent } from "@/data/sport-expanded-content";
import SectionTitle from "@/components/shared/SectionTitle";
import FaqAccordionItem from "@/components/shared/FaqAccordionItem";

interface SportContentExpandedProps {
  content: SportExpandedContent;
}

const SportContentExpanded: React.FC<SportContentExpandedProps> = ({ content }) => {
  return (
    <section className="bd-sport-expanded-content-area container">
      {/* Introduction Section */}
      <div className="row g-4">
        <div className="col-12">
          <div
            className="bd-sport-expanded-content-intro theme-bg-6 wow fadeInUp"
            data-wow-duration="1s"
            data-wow-delay=".2s"
          >
            <p className="bd-sport-expanded-content-intro-text">{content.introduction}</p>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="row g-4">
        <div className="col-12">
          <SectionTitle title={content.benefits.title} className="mb-50" animationDelay=".3s" />
          <div className="bd-sport-benefits-grid">
            {content.benefits.items.map((benefit, index) => (
              <div
                key={index}
                className="bd-sport-benefit-item wow fadeInUp"
                data-wow-duration="1s"
                data-wow-delay={`${0.4 + index * 0.1}s`}
              >
                <div className="bd-sport-benefit-icon">
                  <i className="fa-solid fa-check"></i>
                </div>
                <div className="bd-sport-benefit-content">
                  <h4 className="bd-sport-benefit-title">{benefit.title}</h4>
                  <p className="bd-sport-benefit-description">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Age Recommendations Section */}
      <div className="row g-4">
        <div className="col-12">
          <div
            className="bd-sport-age-recommendations theme-bg-6 wow fadeInUp"
            data-wow-duration="1s"
            data-wow-delay=".4s"
          >
            <SectionTitle
              title={content.ageRecommendations.title}
              className="mb-4"
              animationDelay=".4s"
            />
            <div className="bd-sport-age-content">
              <p>{content.ageRecommendations.content}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Equipment Guide Section */}
      <div className="row g-4">
        <div className="col-12">
          <div
            className="bd-sport-equipment-guide theme-bg-6 wow fadeInUp"
            data-wow-duration="1s"
            data-wow-delay=".5s"
          >
            <SectionTitle
              title={content.equipmentGuide.title}
              className="mb-4"
              animationDelay=".5s"
            />
            <div className="bd-sport-equipment-content">
              <p>{content.equipmentGuide.content}</p>
            </div>
            <div className="bd-sport-equipment-list">
              {content.equipmentGuide.items.map((item, index) => (
                <div
                  key={index}
                  className={`bd-sport-equipment-item ${item.essential ? "essential" : "optional"}`}
                >
                  <div className="bd-sport-equipment-item-header">
                    <h5 className="bd-sport-equipment-item-name">{item.name}</h5>
                    {item.essential && <span className="bd-sport-equipment-badge">Esențial</span>}
                    {!item.essential && (
                      <span className="bd-sport-equipment-badge optional">Opțional</span>
                    )}
                  </div>
                  <p className="bd-sport-equipment-item-description">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      {content.faq && content.faq.length > 0 && (
        <div className="row g-4">
          <div className="col-12">
            <div
              className="bd-sport-faq-section theme-bg-6 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay=".6s"
            >
              <SectionTitle title="Întrebări frecvente" className="mb-4" animationDelay=".6s" />
              <div
                className="accordion bd-sport-faq-accordion"
                id={`sportFaqAccordion-${content.sportId}`}
              >
                {content.faq.map((faqItem, index) => (
                  <div key={index} className="bd-sport-faq-accordion-item">
                    <FaqAccordionItem
                      key={index}
                      id={`${content.sportId}-${index}`}
                      question={faqItem.question}
                      answer={faqItem.answer}
                      isOpen={index === 0}
                      accordionId={`sportFaqAccordion-${content.sportId}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Internal Links Section */}
      <div className="row g-4">
        <div className="col-12">
          <div
            className="bd-sport-internal-links theme-bg-7 wow fadeInUp"
            data-wow-duration="1s"
            data-wow-delay=".7s"
          >
            <div className="bd-sport-internal-links-content text-center">
              <h3 className="bd-sport-internal-links-title">
                Găsește cluburi sportive pentru acest sport
              </h3>
              <p className="bd-sport-internal-links-description">
                Explorează cluburile sportive de Yuvoo care oferă programe de calitate pentru acest
                sport.
              </p>
              <Link href={content.internalLinks.clubsLink} className="bd-btn">
                <span className="bd-btn-inner">
                  <span className="bd-btn-normal">
                    <i className="fa-solid fa-users me-2"></i>
                    {content.internalLinks.clubsLinkText}
                  </span>
                  <span className="bd-btn-hover">
                    <i className="fa-solid fa-users me-2"></i>
                    {content.internalLinks.clubsLinkText}
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SportContentExpanded;
