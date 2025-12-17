import React from "react";

/**
 * FaqAccordionItem Component
 *
 * Reusable accordion item component for FAQ sections.
 * Uses Bootstrap accordion structure with custom styling.
 */

interface FaqAccordionItemProps {
  id: string;
  question: string;
  answer: string;
  isOpen?: boolean;
  accordionId: string;
}

const FaqAccordionItem: React.FC<FaqAccordionItemProps> = ({
  id,
  question,
  answer,
  isOpen = false,
  accordionId,
}) => {
  const headingId = `heading${id}`;
  const collapseId = `collapse${id}`;

  return (
    <div className="accordion-item bd-faq-accordion-item">
      <h2 className="accordion-header" id={headingId}>
        <button
          className={`accordion-button ${isOpen ? "" : "collapsed"}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${collapseId}`}
          aria-expanded={isOpen ? "true" : "false"}
          aria-controls={collapseId}
        >
          <span className="bd-faq-question-text">{question}</span>
        </button>
      </h2>
      <div
        id={collapseId}
        className={`accordion-collapse collapse ${isOpen ? "show" : ""}`}
        aria-labelledby={headingId}
        data-bs-parent={`#${accordionId}`}
      >
        <div className="accordion-body">
          <p className="bd-faq-answer-text">{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default FaqAccordionItem;
