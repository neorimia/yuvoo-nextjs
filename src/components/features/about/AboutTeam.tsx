/**
 * About Team Component
 *
 * Displays team members section on the About page.
 * Server Component - can be used in SSG pages.
 */

import React from "react";
import Image from "next/image";
import { teamMembers } from "@/data/team-data";
import SectionTitle from "@/components/shared/SectionTitle";
import { isPlaceholderUrl } from "@/lib/utils/image-helpers";

const AboutTeam: React.FC = () => {
  return (
    <section className="bd-about-team-area pt-120 pb-70">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <SectionTitle
              title="Echipa Yuvoo"
              subtitle="Oamenii din spatele platformei care te ajută să găsești sportul perfect pentru copilul tău"
              className="text-center mb-60"
              animationDelay=".2s"
            />
          </div>
        </div>
        <div className="row">
          {teamMembers.map((member, index) => (
            <div key={member.id} className="col-lg-3 col-md-6 mb-50">
              <div
                className="bd-about-team-card text-center wow fadeInUp"
                data-wow-duration="1s"
                data-wow-delay={`${0.2 + index * 0.1}s`}
              >
                <div className="bd-about-team-thumb mb-25">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="bd-about-team-image"
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "16px",
                      objectFit: "cover",
                    }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    unoptimized={isPlaceholderUrl(member.image)}
                  />
                </div>
                <div className="bd-about-team-content">
                  <h4 className="bd-about-team-name mb-2">{member.name}</h4>
                  <p className="bd-about-team-role mb-3">{member.role}</p>
                  <p className="bd-about-team-bio mb-3">{member.bio}</p>
                  {member.credentials && member.credentials.length > 0 && (
                    <div className="bd-about-team-credentials mb-3">
                      {member.credentials.map((cred, idx) => (
                        <span key={idx} className="badge bg-yuvoo-primary me-2 mb-2">
                          {cred}
                        </span>
                      ))}
                    </div>
                  )}
                  {member.socialLinks && member.socialLinks.length > 0 && (
                    <div className="bd-about-team-social">
                      {member.socialLinks.map((social, idx) => (
                        <a
                          key={idx}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bd-about-team-social-link me-2"
                          aria-label={`${member.name} - ${social.platform}`}
                        >
                          <i className={social.icon}></i>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;
