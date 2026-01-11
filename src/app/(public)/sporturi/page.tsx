"use cache";

import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import SportsMain from "@/components/features/sports/SportsMain";
import { getAllSports } from "@/modules/sports/sports.service";
import { routes } from "@/lib/routes";
import { cacheLife, cacheTag } from "next/cache";
import SectionTitle from "@/components/shared/SectionTitle";
import FaqAccordionItem from "@/components/shared/FaqAccordionItem";
import { sportsFaqItems } from "@/data/sports-faq-data";
import ItemListSchema from "@/components/SEO/ItemListSchema";

export const metadata: Metadata = {
  title: "Sporturi pentru Copii - Descoperă Sportul Perfect | Yuvoo",
  description:
    "Explorează peste 15 sporturi disponibile pentru copii (4-14 ani) pe platforma Yuvoo. Găsește sportul potrivit pentru copilul tău cu ajutorul recomandărilor AI și al cluburilor. Înot, fotbal, gimnastică, karate, dans și multe altele.",
  keywords: [
    "sporturi copii",
    "activități sportive copii",
    "sporturi pentru copii București",
    "cluburi sportive copii",
    "sport potrivit copil",
    "sporturi vârstă 4-14 ani",
  ],
  openGraph: {
    title: "Sporturi pentru Copii - Descoperă Sportul Perfect | Yuvoo",
    description:
      "Explorează peste 15 sporturi disponibile pentru copii pe platforma Yuvoo. Găsește sportul potrivit cu ajutorul recomandărilor AI și al cluburilor.",
    url: `${process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro"}/sporturi`,
    siteName: "Yuvoo",
    type: "website",
    locale: "ro_RO",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro"}/assets/img/logo/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Sporturi pentru Copii - Yuvoo - Peste 15 sporturi disponibile",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sporturi pentru Copii - Descoperă Sportul Perfect | Yuvoo",
    description:
      "Explorează peste 15 sporturi disponibile pentru copii pe platforma Yuvoo. Găsește sportul potrivit cu ajutorul recomandărilor AI și al cluburilor.",
    images: [
      `${process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro"}/assets/img/logo/og-image.jpg`,
    ],
  },
  alternates: {
    canonical: "/sporturi",
  },
};

/**
 * Sports Listing Page
 *
 * Public page displaying all available sports with expanded intro and FAQ section.
 * Uses Next.js 16 Cache Components with "use cache" directive.
 * SEO-friendly route: /sporturi
 */
export default async function SportsPage() {
  // Fetch all sports
  const sports = await getAllSports();

  // Cache configuration
  // Cache for 1 hour - sports list changes infrequently
  cacheLife("hours");
  // Cache tag for revalidation
  cacheTag("sports-list");

  const accordionId = "sportsFaqAccordion";

  return (
    <>
      <ItemListSchema items={sports} type="Sport" listName="Sporturi Disponibile pentru Copii" />
      <BreadcrumbOne
        title="Sporturi"
        subTitle="Sporturi"
        items={[
          { name: "Yuvoo", url: routes.home },
          { name: "Sporturi", url: routes.sports.list }, // Current page
        ]}
      />
      <section className="bd-sports-intro-area">
        <div className="container">
          <div className="row bd-sports-intro-title-row">
            <div className="col-lg-10">
              <SectionTitle
                title="Sporturi Disponibile pentru Copii"
                subtitle="Explorează peste 15 sporturi diferite adaptate pentru copiii cu vârste între 4 și 14 ani. Fiecare sport oferă beneficii unice pentru dezvoltarea fizică, mentală și socială a copilului tău."
                className="bd-sports-intro-title-wrapper"
                titleClassName="bd-sports-intro-section-title"
                subtitleClassName="bd-sports-intro-section-text"
              />
            </div>
          </div>
          <div className="row bd-sports-intro-content-row">
            <div className="col-lg-6">
              <div
                className="bd-sports-intro-card wow fadeInLeft"
                data-wow-duration="1s"
                data-wow-delay=".3s"
              >
                <div className="bd-sports-intro-icon">
                  <i className="flaticon-sports"></i>
                </div>
                <h3 className="bd-sports-intro-card-title">Găsește Sportul Potrivit</h3>
                <p className="bd-sports-intro-card-text">
                  <Link
                    href={routes.quiz.intro}
                    className="text-yuvoo-primary text-decoration-underline"
                  >
                    Folosește chestionarul nostru AI
                  </Link>{" "}
                  pentru a primi recomandări personalizate bazate pe profilul copilului tău. Sau
                  explorează manual toate sporturile disponibile și descoperă opțiunile care se
                  potrivesc cel mai bine. După ce alegi un sport,{" "}
                  <Link
                    href={routes.clubs.list}
                    className="text-yuvoo-primary text-decoration-underline"
                  >
                    găsește cluburi sportive
                  </Link>{" "}
                  care îl oferă.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div
                className="bd-sports-intro-card wow fadeInRight"
                data-wow-duration="1s"
                data-wow-delay=".4s"
              >
                <div className="bd-sports-intro-icon">
                  <i className="flaticon-certificate"></i>
                </div>
                <h3 className="bd-sports-intro-card-title">Cluburi sportive</h3>
                <p className="bd-sports-intro-card-text">
                  <Link
                    href={routes.clubs.list}
                    className="text-yuvoo-primary text-decoration-underline"
                  >
                    Toate cluburile sportive.
                  </Link>{" "}
                  Găsește cluburi aproape de tine, vezi programe, prețuri și rezervă o probă
                  gratuită direct din platformă.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SportsMain sports={sports} />
      <section className="bd-sports-faq-area">
        <div className="container">
          <div className="row bd-sports-faq-title-row">
            <div className="col-lg-8">
              <SectionTitle
                title="Întrebări frecvente despre sporturi"
                subtitle="Răspunsuri la cele mai comune întrebări despre alegerea și practicarea sporturilor pentru copii"
                className="bd-sports-faq-title-wrapper"
                titleClassName="bd-sports-faq-section-title"
                subtitleClassName="bd-sports-faq-section-text"
              />
            </div>
          </div>
          <div className="row bd-sports-faq-content-row">
            <div className="col-lg-8">
              <div
                className="bd-sports-faq-content wow fadeInUp"
                data-wow-duration="1s"
                data-wow-delay=".4s"
              >
                <div className="bd-sports-faq-accordion">
                  <div className="accordion" id={accordionId}>
                    {sportsFaqItems.map((item, index) => (
                      <FaqAccordionItem
                        key={`sports-faq-${index}`}
                        id={`sports-faq-${index}`}
                        question={item.question}
                        answer={item.answer}
                        isOpen={index === 0}
                        accordionId={accordionId}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
