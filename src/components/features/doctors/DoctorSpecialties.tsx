/**
 * Doctor Specialties Component
 *
 * Displays medical specialties and credentials.
 * Adapted from Teacher/TeacherSkills.tsx
 */

import React from "react";
import type { Doctor } from "@/modules/doctors/doctors.types";

interface DoctorSpecialtiesProps {
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

const DoctorSpecialties: React.FC<DoctorSpecialtiesProps> = ({ doctor }) => {
  const primarySpecialty = getSpecialtyDisplayName(doctor.specialty);
  const secondarySpecialties = doctor.credentials || [];

  return (
    <div className="col-lg-6 mb-50">
      <div
        className="bd-teacher-widget theme-bg-6 wow fadeInLeft"
        data-wow-duration="1s"
        data-wow-delay=".3s"
      >
        <div className="bd-teacher-widget-content">
          <h4 className="bd-teacher-widget-title-2 mb-25">Specializări Medicale:</h4>
          <div className="bd-teacher-skill-wrap">
            <div className="bd-teacher-skill mb-30">
              <div className="bd-teacher-skill-content">
                <span>{primarySpecialty}</span>
                <span>Specialitate principală</span>
              </div>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: "100%" }}
                  aria-valuenow={100}
                  aria-valuemin={0}
                  aria-valuemax={100}
                ></div>
              </div>
            </div>
            {secondarySpecialties.length > 0 && (
              <div className="mt-3">
                <h5 className="mb-3">Calificări:</h5>
                <ul className="list-unstyled">
                  {secondarySpecialties.map((credential, index) => (
                    <li key={index} className="mb-2">
                      <i className="flaticon-check me-2 text-success"></i>
                      {credential}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorSpecialties;
