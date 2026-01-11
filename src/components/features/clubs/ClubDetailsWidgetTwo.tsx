/**
 * Club Details Widget Two Component
 *
 * Second widget component for displaying additional club information.
 * Adapted from Class/ClassDetailsWidgetTwo.tsx
 */

import React from "react";
import Image from "next/image";
import type { Club } from "@/modules/clubs/clubs.types";
import { isPlaceholderUrl } from "@/lib/utils/image-helpers";

interface ClubDetailsWidgetTwoProps {
  club: Club;
}

const ClubDetailsWidgetTwo: React.FC<ClubDetailsWidgetTwoProps> = ({ club }) => {
  const secondaryImage = club.images?.[1] || club.images?.[0] || "/assets/img/placeholder-club.jpg";

  // Build information list based on club data
  const infoItems: string[] = [];

  if (club.schedule && club.schedule.length > 0) {
    infoItems.push("Program și orar de antrenamente");
  }

  if (club.levels && club.levels.length > 0) {
    infoItems.push("Niveluri multiple de pregătire");
  }

  if (club.ageGroups && club.ageGroups.length > 0) {
    infoItems.push(
      `Grupe de vârstă: ${club.ageGroups[0]}-${club.ageGroups[club.ageGroups.length - 1]} ani`
    );
  }

  if (club.verified) {
    infoItems.push("Club verificat și recomandat");
  }

  if (club.pricing) {
    infoItems.push("Informații despre prețuri disponibile");
  }

  // Default items if no specific info
  if (infoItems.length === 0) {
    infoItems.push(
      "Program personalizat pentru fiecare copil",
      "Echipament modern și facilități",
      "Antrenori calificați și experimentați",
      "Mediu sigur și prietenos",
      "Progres monitorizat și raportat"
    );
  }

  return (
    <section className="bd-club-details-widget">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mb-50">
            <div
              className="bd-club-details-thumb p-relative wow fadeInLeft"
              data-wow-duration="1s"
              data-wow-delay=".3s"
            >
              <Image
                src={secondaryImage}
                alt={`${club.name} - imagine suplimentară`}
                width={600}
                height={400}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                unoptimized={isPlaceholderUrl(secondaryImage)}
              />
              <div className="panel wow"></div>
            </div>
          </div>
          <div className="col-lg-6 mb-50">
            <div
              className="bd-club-details-widget-content theme-bg-6 wow fadeInRight"
              data-wow-duration="1s"
              data-wow-delay=".3s"
            >
              <h3 className="bd-club-details-widget-title mb-20">Informații Suplimentare</h3>
              <p className="mb-25">
                {club.description ||
                  "Clubul nostru oferă o experiență completă pentru dezvoltarea copiilor prin sport."}
              </p>
              <div className="bd-club-details-list">
                <ul>
                  {infoItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClubDetailsWidgetTwo;
