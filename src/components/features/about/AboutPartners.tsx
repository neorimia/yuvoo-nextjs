/**
 * About Partners Component
 *
 * Displays partners section on the About page.
 * Server Component - can be used in SSG pages.
 */

import React from "react";
import Image from "next/image";
import { partners } from "@/data/partners-data";
import SectionTitle from "@/components/shared/SectionTitle";
import { isPlaceholderUrl } from "@/lib/utils/image-helpers";

/**
 * Get category icon
 */
function getCategoryIcon(type: string): string {
  const iconMap: Record<string, string> = {
    medical: "fa-solid fa-user-doctor",
    sports: "fa-solid fa-football",
    technology: "fa-solid fa-microchip",
    education: "fa-solid fa-graduation-cap",
  };
  return iconMap[type] || "fa-solid fa-handshake";
}

const AboutPartners: React.FC = () => {
  // Group partners by category
  const partnersByCategory = partners.reduce(
    (acc, partner) => {
      const category = partner.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(partner);
      return acc;
    },
    {} as Record<string, typeof partners>
  );

  return (
    <section className="bd-about-partners-area pt-120 pb-70 theme-bg-6">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <SectionTitle
              title="Partenerii Noștri"
              subtitle="Colaborăm cu instituții de încredere și organizații recunoscute pentru a oferi cele mai bune servicii"
              className="text-center mb-60"
              animationDelay=".2s"
            />
          </div>
        </div>

        {Object.entries(partnersByCategory).map(([category, categoryPartners], categoryIndex) => (
          <div key={category} className="bd-about-partners-category mb-70">
            <div className="row mb-40">
              <div className="col-12">
                <div className="text-center">
                  <div className="bd-about-partners-category-icon mb-3">
                    <i
                      className={getCategoryIcon(categoryPartners[0].type)}
                      style={{ fontSize: "2.5rem", color: "var(--bd-theme-1)" }}
                    ></i>
                  </div>
                  <h3 className="bd-about-partners-category-title">{category}</h3>
                </div>
              </div>
            </div>
            <div className="row">
              {categoryPartners.map((partner, index) => (
                <div key={partner.id} className="col-lg-4 col-md-6 mb-30">
                  <div
                    className="bd-about-partners-card text-center wow fadeInUp"
                    data-wow-duration="1s"
                    data-wow-delay={`${0.2 + (categoryIndex * 0.3 + index * 0.1)}s`}
                  >
                    {partner.website ? (
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bd-about-partners-link"
                      >
                        <div className="bd-about-partners-logo mb-20">
                          <Image
                            src={partner.logo}
                            alt={partner.name}
                            width={200}
                            height={120}
                            className="bd-about-partners-image"
                            style={{
                              width: "100%",
                              height: "auto",
                              maxHeight: "120px",
                              objectFit: "contain",
                            }}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            unoptimized={isPlaceholderUrl(partner.logo)}
                          />
                        </div>
                        <h4 className="bd-about-partners-name mb-3">{partner.name}</h4>
                        <p className="bd-about-partners-description">{partner.description}</p>
                      </a>
                    ) : (
                      <>
                        <div className="bd-about-partners-logo mb-20">
                          <Image
                            src={partner.logo}
                            alt={partner.name}
                            width={200}
                            height={120}
                            className="bd-about-partners-image"
                            style={{
                              width: "100%",
                              height: "auto",
                              maxHeight: "120px",
                              objectFit: "contain",
                            }}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            unoptimized={isPlaceholderUrl(partner.logo)}
                          />
                        </div>
                        <h4 className="bd-about-partners-name mb-3">{partner.name}</h4>
                        <p className="bd-about-partners-description">{partner.description}</p>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutPartners;
