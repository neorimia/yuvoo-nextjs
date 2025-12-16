/**
 * Doctor Appointment Form Section Component
 *
 * Wrapper component for the appointment booking form that provides
 * a section layout consistent with other doctor detail sections.
 * Server Component wrapper for the client DoctorAppointmentForm.
 */

import React from "react";
import DoctorAppointmentForm from "./DoctorAppointmentForm";
import type { Doctor } from "@/modules/doctors/doctors.types";

interface DoctorAppointmentFormSectionProps {
  doctor: Doctor;
}

const DoctorAppointmentFormSection: React.FC<DoctorAppointmentFormSectionProps> = ({ doctor }) => {
  return (
    <section className="bd-booking-form-section pt-110 pb-70">
      <div className="container">
        <div className="row justify-center">
          <div className="col-xl-8 col-lg-10">
            <div
              className="bd-booking-form-wrapper wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay=".3s"
            >
              <DoctorAppointmentForm
                doctorId={doctor.id}
                doctorName={doctor.name}
                onlineConsultations={doctor.onlineConsultations}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorAppointmentFormSection;
