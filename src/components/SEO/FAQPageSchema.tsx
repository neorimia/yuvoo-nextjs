/**
 * FAQPage Schema Component
 *
 * Generates JSON-LD structured data for FAQPage schema (Schema.org).
 * Used to help search engines understand FAQ content for rich snippets.
 *
 * @see https://schema.org/FAQPage
 */

import React from "react";

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

interface FAQPageSchemaProps {
  faqs: FAQItem[];
}

/**
 * Extract plain text from React.ReactNode for schema
 */
function extractTextFromNode(node: string | React.ReactNode): string {
  if (typeof node === "string") {
    return node;
  }

  if (React.isValidElement(node)) {
    // Extract text from React element and its children
    const extract = (element: React.ReactElement): string => {
      const props = element.props as { children?: React.ReactNode };
      if (typeof props.children === "string") {
        return props.children;
      }
      if (Array.isArray(props.children)) {
        return props.children
          .map((child: React.ReactNode) => {
            if (typeof child === "string") return child;
            if (React.isValidElement(child)) return extract(child);
            return "";
          })
          .join(" ");
      }
      if (React.isValidElement(props.children)) {
        return extract(props.children);
      }
      return "";
    };
    return extract(node);
  }

  return "";
}

export default function FAQPageSchema({ faqs }: FAQPageSchemaProps) {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: typeof faq.answer === "string" ? faq.answer : extractTextFromNode(faq.answer),
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}
