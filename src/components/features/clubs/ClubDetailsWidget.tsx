/**
 * Club Details Widget Component
 *
 * Widget component for displaying club information on detail pages.
 * Adapted from Class/ClassDetailsWidget.tsx
 */

import Link from "next/link";
import React from "react";
import Image from "next/image";
import type { Club } from "@/modules/clubs/clubs.types";
import { routes } from "@/lib/routes";

interface ClubDetailsWidgetProps {
  club: Club;
}

const ClubDetailsWidget: React.FC<ClubDetailsWidgetProps> = ({ club }) => {
  const mainImage = club.images?.[0] || "/assets/img/placeholder-club.jpg";

  return (
    <section className="bd-club-details-widget pb-70">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mb-50">
            <div
              className="bd-club-details-widget-content theme-bg-6 wow fadeInLeft"
              data-wow-duration="1s"
              data-wow-delay=".3s"
            >
              <h3 className="bd-club-details-widget-title mb-20">Despre Clubul Nostru</h3>
              <p className="mb-25">{club.description}</p>
              <p className="mb-25">
                Oferim un mediu sigur și stimulativ pentru dezvoltarea copiilor prin sport.
                Programele noastre sunt adaptate vârstei și nivelului fiecărui copil, asigurând o
                experiență plăcută și educativă.
              </p>
              <div className="bd-club-details-btn">
                <Link href={routes.about} className="bd-btn">
                  <span className="bd-btn-inner">
                    <span className="bd-btn-normal">Află mai multe</span>
                    <span className="bd-btn-hover">Află mai multe</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6 mb-50">
            <div
              className="bd-club-details-slider p-relative wow fadeInRight"
              data-wow-duration="1s"
              data-wow-delay=".3s"
            >
              <div className="bd-club-details-slider-thumb p-relative">
                <Image
                  src={mainImage}
                  alt={club.name}
                  width={600}
                  height={400}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div className="panel-2 wow"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClubDetailsWidget;
