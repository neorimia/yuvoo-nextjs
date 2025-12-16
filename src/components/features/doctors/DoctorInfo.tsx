/**
 * Doctor Info Component
 *
 * Displays professional information about a doctor.
 * Adapted from Teacher/TeacherInfo.tsx
 */

import React from "react";
import type { Doctor } from "@/modules/doctors/doctors.types";

interface DoctorInfoProps {
  doctor: Doctor;
}

const DoctorInfo: React.FC<DoctorInfoProps> = ({ doctor }) => {
  return (
    <div className="col-lg-6 mb-50">
      <div
        className="bd-teacher-widget theme-bg-6 wow fadeInRight"
        data-wow-duration="1s"
        data-wow-delay=".3s"
      >
        <div className="bd-teacher-widget-content">
          <h4 className="bd-teacher-widget-title-2 mb-15">Informații Profesionale:</h4>
          <div className="bd-teacher-widget-info-wrap">
            {doctor.contact?.email && (
              <div className="bd-teacher-widget-info">
                <p>Email:</p>
                <p>
                  <a href={`mailto:${doctor.contact.email}`}>{doctor.contact.email}</a>
                </p>
              </div>
            )}
            {doctor.credentials && doctor.credentials.length > 0 && (
              <div className="bd-teacher-widget-info">
                <p>Calificări:</p>
                <p>{doctor.credentials.join(", ")}</p>
              </div>
            )}
            {doctor.location && (
              <div className="bd-teacher-widget-info">
                <p>Locație:</p>
                <p>
                  {doctor.location.city}
                  {doctor.location.district && `, ${doctor.location.district}`}
                </p>
                {doctor.location.address && (
                  <p className="small text-muted mt-1">{doctor.location.address}</p>
                )}
              </div>
            )}
            {doctor.contact?.phone && (
              <div className="bd-teacher-widget-info">
                <p>Telefon:</p>
                <p>
                  <a href={`tel:${doctor.contact.phone}`}>{doctor.contact.phone}</a>
                </p>
              </div>
            )}
            {doctor.contact?.website && (
              <div className="bd-teacher-widget-info">
                <p>Website:</p>
                <p>
                  <a href={doctor.contact.website} target="_blank" rel="noreferrer">
                    {doctor.contact.website}
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorInfo;
