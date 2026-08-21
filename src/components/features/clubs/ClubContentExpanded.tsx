/**
 * Club Content Expanded Component
 *
 * Displays comprehensive expanded content for club detail pages.
 * Includes: introduction, about, programs, benefits, location, contact info, and internal links.
 * Server Component - can be used in SSG pages.
 */

import React from "react";
import Link from "next/link";
import type { ClubExpandedContent } from "@/lib/content/club-expanded-content";
import SectionTitle from "@/components/shared/SectionTitle";

interface ClubContentExpandedProps {
  content: ClubExpandedContent;
}

const ClubContentExpanded: React.FC<ClubContentExpandedProps> = ({ content }) => {
  return (
    <section className="bd-club-expanded-content-area container pb-70">
      {/* Introduction Section */}
      <div className="row g-4">
        <div className="col-12">
          <div
            className="bd-club-expanded-content-intro theme-bg-6 wow fadeInUp"
            data-wow-duration="1s"
            data-wow-delay=".2s"
          >
            <p className="bd-club-expanded-content-intro-text">{content.geoSummary}</p>
            <p className="bd-club-expanded-content-intro-text mt-3">{content.introduction}</p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="row g-4">
        <div className="col-12">
          <div
            className="bd-club-expanded-about theme-bg-6 wow fadeInUp"
            data-wow-duration="1s"
            data-wow-delay=".3s"
          >
            <SectionTitle title={content.about.title} className="mb-4" animationDelay=".3s" />
            <div className="bd-club-expanded-about-content">
              <p>{content.about.content}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Programs Section */}
      <div className="row g-4">
        <div className="col-12">
          <div
            className="bd-club-expanded-programs theme-bg-6 wow fadeInUp"
            data-wow-duration="1s"
            data-wow-delay=".4s"
          >
            <SectionTitle title={content.programs.title} className="mb-4" animationDelay=".4s" />
            <div className="bd-club-expanded-programs-content">
              <p>{content.programs.content}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="row g-4">
        <div className="col-12">
          <SectionTitle
            title={content.benefits.title}
            className="mt-20 mb-4"
            animationDelay=".5s"
          />
          <div className="bd-club-benefits-grid">
            {content.benefits.items.map((benefit, index) => (
              <div
                key={index}
                className="bd-club-benefit-item wow fadeInUp"
                data-wow-duration="1s"
                data-wow-delay={`${0.6 + index * 0.1}s`}
              >
                <div className="bd-club-benefit-icon">
                  <i className="fa-solid fa-check"></i>
                </div>
                <div className="bd-club-benefit-content">
                  <h4 className="bd-club-benefit-title">{benefit.title}</h4>
                  <p className="bd-club-benefit-description">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Location Section */}
      <div className="row g-4">
        <div className="col-12">
          <div
            className="bd-club-expanded-location theme-bg-6 wow fadeInUp"
            data-wow-duration="1s"
            data-wow-delay=".7s"
          >
            <SectionTitle title={content.location.title} className="mb-4" animationDelay=".7s" />
            <div className="bd-club-expanded-location-content">
              <p>{content.location.content}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="row g-4">
        <div className="col-12">
          <div
            className="bd-club-expanded-contact theme-bg-6 wow fadeInUp"
            data-wow-duration="1s"
            data-wow-delay=".8s"
          >
            <SectionTitle title={content.contactInfo.title} className="mb-4" animationDelay=".8s" />
            <div className="bd-club-expanded-contact-content">
              <p>{content.contactInfo.content}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Internal Links Section - Sport */}
      <div className="row g-4">
        <div className="col-12">
          <div
            className="bd-club-internal-links theme-bg-7 wow fadeInUp"
            data-wow-duration="1s"
            data-wow-delay=".9s"
          >
            <div className="bd-club-internal-links-content text-center">
              <h3 className="bd-club-internal-links-title">Află mai multe despre acest sport</h3>
              <p className="bd-club-internal-links-description">
                Descoperă informații detaliate despre sport, beneficiile pentru copii și recomandări
                de la specialiști.
              </p>
              <Link href={content.internalLinks.sportLink} className="bd-btn">
                <span className="bd-btn-inner">
                  <span className="bd-btn-normal">
                    <i className="fa-solid fa-info-circle me-2"></i>
                    {content.internalLinks.sportLinkText}
                  </span>
                  <span className="bd-btn-hover">
                    <i className="fa-solid fa-info-circle me-2"></i>
                    {content.internalLinks.sportLinkText}
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Internal Links Section - Doctors */}
      {/*<div className="row g-4">*/}
      {/*  <div className="col-12">*/}
      {/*    <div*/}
      {/*      className="bd-club-internal-links theme-bg-6 wow fadeInUp"*/}
      {/*      data-wow-duration="1s"*/}
      {/*      data-wow-delay="1s"*/}
      {/*    >*/}
      {/*      <div className="bd-club-internal-links-content text-center">*/}
      {/*        <h3 className="bd-club-internal-links-title">Consultă specialiști pediatri</h3>*/}
      {/*        <p className="bd-club-internal-links-description">*/}
      {/*          Găsește specialiști pediatri verificați pentru consultații despre activitățile*/}
      {/*          sportive ale copilului tău. Ortopedie, nutriție sau psihologie pediatrică - totul*/}
      {/*          pentru sănătatea și dezvoltarea optimă a copilului prin sport.*/}
      {/*        </p>*/}
      {/*        <Link href={content.internalLinks.doctorsLink} className="bd-btn bd-btn-outline">*/}
      {/*          <span className="bd-btn-inner">*/}
      {/*            <span className="bd-btn-normal">*/}
      {/*              <i className="fa-solid fa-user-doctor me-2"></i>*/}
      {/*              {content.internalLinks.doctorsLinkText}*/}
      {/*            </span>*/}
      {/*            <span className="bd-btn-hover">*/}
      {/*              <i className="fa-solid fa-user-doctor me-2"></i>*/}
      {/*              {content.internalLinks.doctorsLinkText}*/}
      {/*            </span>*/}
      {/*          </span>*/}
      {/*        </Link>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </section>
  );
};

export default ClubContentExpanded;
