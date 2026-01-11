/**
 * Doctor Content Expanded Component
 *
 * Displays comprehensive expanded content for doctor detail pages.
 * Includes: introduction, about, specialty, services, benefits, location, and contact info.
 * Server Component - can be used in SSG pages.
 */

import React from "react";
import Link from "next/link";
import type { DoctorExpandedContent } from "@/lib/content/doctor-expanded-content";
import SectionTitle from "@/components/shared/SectionTitle";

interface DoctorContentExpandedProps {
  content: DoctorExpandedContent;
}

const DoctorContentExpanded: React.FC<DoctorContentExpandedProps> = ({ content }) => {
  return (
    <section className="bd-doctor-expanded-content-area container pt-70 pb-70">
      {/* Introduction Section */}
      <div className="row g-4">
        <div className="col-12">
          <div
            className="bd-doctor-expanded-content-intro theme-bg-6 wow fadeInUp"
            data-wow-duration="1s"
            data-wow-delay=".2s"
          >
            <p className="bd-doctor-expanded-content-intro-text">{content.introduction}</p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="row g-4">
        <div className="col-12">
          <div
            className="bd-doctor-expanded-about theme-bg-6 wow fadeInUp"
            data-wow-duration="1s"
            data-wow-delay=".3s"
          >
            <SectionTitle title={content.about.title} className="mb-4" animationDelay=".3s" />
            <div className="bd-doctor-expanded-about-content">
              <p>{content.about.content}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Specialty Section */}
      <div className="row g-4">
        <div className="col-12">
          <div
            className="bd-doctor-expanded-specialty theme-bg-6 wow fadeInUp"
            data-wow-duration="1s"
            data-wow-delay=".4s"
          >
            <SectionTitle title={content.specialty.title} className="mb-4" animationDelay=".4s" />
            <div className="bd-doctor-expanded-specialty-content">
              <p>{content.specialty.content}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="row g-4">
        <div className="col-12">
          <SectionTitle title={content.services.title} className="mb-50" animationDelay=".5s" />
          <div className="bd-doctor-services-grid">
            {content.services.items.map((service, index) => (
              <div
                key={index}
                className="bd-doctor-service-item wow fadeInUp"
                data-wow-duration="1s"
                data-wow-delay={`${0.6 + index * 0.1}s`}
              >
                <div className="bd-doctor-service-icon">
                  <i className="fa-solid fa-stethoscope"></i>
                </div>
                <div className="bd-doctor-service-content">
                  <h4 className="bd-doctor-service-title">{service.title}</h4>
                  <p className="bd-doctor-service-description">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="row g-4">
        <div className="col-12">
          <div
            className="bd-doctor-expanded-benefits theme-bg-6 wow fadeInUp"
            data-wow-duration="1s"
            data-wow-delay=".8s"
          >
            <SectionTitle title={content.benefits.title} className="mb-4" animationDelay=".8s" />
            <div className="bd-doctor-expanded-benefits-content">
              <p>{content.benefits.content}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Location Section */}
      <div className="row g-4">
        <div className="col-12">
          <div
            className="bd-doctor-expanded-location theme-bg-6 wow fadeInUp"
            data-wow-duration="1s"
            data-wow-delay=".9s"
          >
            <SectionTitle title={content.location.title} className="mb-4" animationDelay=".9s" />
            <div className="bd-doctor-expanded-location-content">
              <p>{content.location.content}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="row g-4">
        <div className="col-12">
          <div
            className="bd-doctor-expanded-contact theme-bg-6 wow fadeInUp"
            data-wow-duration="1s"
            data-wow-delay="1s"
          >
            <SectionTitle title={content.contactInfo.title} className="mb-4" animationDelay="1s" />
            <div className="bd-doctor-expanded-contact-content">
              <p>{content.contactInfo.content}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Internal Links Section - Sports */}
      <div className="row g-4">
        <div className="col-12">
          <div
            className="bd-doctor-internal-links theme-bg-7 wow fadeInUp"
            data-wow-duration="1s"
            data-wow-delay="1.1s"
          >
            <div className="bd-doctor-internal-links-content text-center">
              <h3 className="bd-doctor-internal-links-title">Explorează sporturi pentru copii</h3>
              <p className="bd-doctor-internal-links-description">
                Descoperă peste 15 sporturi disponibile pentru copii și găsește activitatea sportivă
                potrivită pentru dezvoltarea optimă a copilului tău.
              </p>
              <Link href={content.internalLinks.sportsLink} className="bd-btn">
                <span className="bd-btn-inner">
                  <span className="bd-btn-normal">
                    <i className="fa-solid fa-football me-2"></i>
                    {content.internalLinks.sportsLinkText}
                  </span>
                  <span className="bd-btn-hover">
                    <i className="fa-solid fa-football me-2"></i>
                    {content.internalLinks.sportsLinkText}
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Internal Links Section - Clubs */}
      <div className="row g-4">
        <div className="col-12">
          <div
            className="bd-doctor-internal-links theme-bg-6 wow fadeInUp"
            data-wow-duration="1s"
            data-wow-delay="1.2s"
          >
            <div className="bd-doctor-internal-links-content text-center">
              <h3 className="bd-doctor-internal-links-title">Găsește cluburi sportive</h3>
              <p className="bd-doctor-internal-links-description">
                Explorează cluburile sportive de Yuvoo care oferă programe de calitate pentru copiii
                tăi. Cluburi cu antrenori calificați și programe adaptate pe vârstă.
              </p>
              <Link href={content.internalLinks.clubsLink} className="bd-btn bd-btn-outline">
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

export default DoctorContentExpanded;
