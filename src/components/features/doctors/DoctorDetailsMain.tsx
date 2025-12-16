/**
 * Doctor Details Main Component
 *
 * Main component for displaying doctor details.
 * Adapted from Teacher/TeacherDetailsMain.tsx
 * Server Component - can be used in SSG pages.
 */

import React from "react";
import Image from "next/image";
import type { Doctor } from "@/modules/doctors/doctors.types";
import VerificationBadge from "../clubs/VerificationBadge";
import DoctorInfo from "./DoctorInfo";
import DoctorSpecialties from "./DoctorSpecialties";
import { isPlaceholderUrl } from "@/lib/utils/image-helpers";

interface DoctorDetailsMainProps {
  doctor: Doctor;
}

/**
 * Get Romanian display name for specialty
 */
function getSpecialtyDisplayName(specialty: string): string {
  const specialtyMap: Record<string, string> = {
    orthopedist: "Ortopedie pediatrică",
    nutritionist: "Nutriție pediatrică",
    psychologist: "Psihologie pediatrică",
    general: "Medic pediatru",
  };
  return specialtyMap[specialty] || specialty;
}

const DoctorDetailsMain: React.FC<DoctorDetailsMainProps> = ({ doctor }) => {
  const doctorImage = doctor.image || "/assets/img/placeholder-doctor.jpg";
  const specialtyDisplay = getSpecialtyDisplayName(doctor.specialty);

  return (
    <section className="bd-teacher-widget-area pb-70 pt-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mb-50">
            <div
              className="bd-teacher-widget wow fadeInLeft"
              data-wow-duration="1s"
              data-wow-delay=".3s"
            >
              <div className="bd-teacher-widget-thumb p-relative">
                <Image
                  src={doctorImage}
                  alt={doctor.name}
                  width={500}
                  height={600}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  unoptimized={isPlaceholderUrl(doctorImage)}
                />
                <div className="panel wow"></div>
                {doctor.verified && (
                  <div className="position-absolute top-0 end-0 m-3">
                    <VerificationBadge verified={doctor.verified} />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-6 mb-50">
            <div
              className="bd-teacher-widget theme-bg-6 wow fadeInRight"
              data-wow-duration="1s"
              data-wow-delay=".3s"
            >
              <div className="bd-teacher-widget-content">
                <h3 className="bd-teacher-widget-title">{doctor.name}</h3>
                <span className="bd-teacher-widget-tag">{specialtyDisplay}</span>
                {doctor.description && (
                  <>
                    <p>{doctor.description}</p>
                    {doctor.description.length > 200 && (
                      <p>
                        Specializat în evaluarea și tratamentul problemelor de sănătate legate de
                        sportul copiilor, oferă consultații personalizate pentru dezvoltarea optimă
                        a copilului tău prin activități sportive sigure și adaptate.
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          <DoctorSpecialties doctor={doctor} />
          <DoctorInfo doctor={doctor} />
        </div>
      </div>
    </section>
  );
};

export default DoctorDetailsMain;
