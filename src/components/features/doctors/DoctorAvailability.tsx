/**
 * Doctor Availability Component
 *
 * Displays doctor's availability schedule/calendar.
 * Adapted from Teacher/TeacherTimeTable.tsx for availability display.
 */

"use client";

import React from "react";
import type { Doctor } from "@/modules/doctors/doctors.types";

interface DoctorAvailabilityProps {
  doctor: Doctor;
  schedule?: Array<{
    day: string;
    timeSlots: Array<{ start: string; end: string; available: boolean }>;
  }>;
}

const DoctorAvailability: React.FC<DoctorAvailabilityProps> = ({ doctor, schedule }) => {
  // Default schedule if not provided
  const defaultSchedule = schedule || [
    { day: "Luni", timeSlots: [] },
    { day: "Marți", timeSlots: [] },
    { day: "Miercuri", timeSlots: [] },
    { day: "Joi", timeSlots: [] },
    { day: "Vineri", timeSlots: [] },
  ];

  return (
    <section className="bd-routine-2-area pb-120">
      <div className="container">
        <div className="row">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div
                className="bd-section-title-wrapper text-center mb-55 wow fadeInUp"
                data-wow-duration="1s"
                data-wow-delay=".3s"
              >
                <h2 className="bd-section-title mb-0">Disponibilitate</h2>
                <p>
                  Programul de consultații pentru {doctor.name}
                  <br />
                  Contactează pentru a programa o consultație.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="bd-routine-2-wrapper wow fadeInUp"
          data-wow-duration="1s"
          data-wow-delay=".3s"
        >
          <div className="row">
            <div className="col-12">
              <div className="bd-routine-2">
                <div className="table-responsive d-none d-md-block">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col" className="clr-4">
                          Luni
                        </th>
                        <th scope="col" className="clr-5">
                          Marți
                        </th>
                        <th scope="col" className="clr-4">
                          Miercuri
                        </th>
                        <th scope="col" className="clr-5">
                          Joi
                        </th>
                        <th scope="col" className="clr-4">
                          Vineri
                        </th>
                        <th scope="col" className="clr-5">
                          Sâmbătă
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[0, 1, 2, 3, 4, 5].map((rowIndex) => (
                        <tr key={rowIndex}>
                          {["Luni", "Marți", "Miercuri", "Joi", "Vineri", "Sâmbătă"].map(
                            (day, dayIndex) => {
                              const daySchedule = defaultSchedule.find((s) => s.day === day);
                              const timeSlot = daySchedule?.timeSlots[rowIndex];
                              return (
                                <td
                                  key={dayIndex}
                                  className={timeSlot?.available ? "clr-1" : "clr-5"}
                                >
                                  {timeSlot?.available && (
                                    <>
                                      {timeSlot.start} - {timeSlot.end}
                                      <span> Disponibil</span>
                                    </>
                                  )}
                                </td>
                              );
                            }
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="bd-routine-list-wrap d-md-none">
                  {defaultSchedule.map((daySchedule, index) => (
                    <div className="bd-routine-list" key={index}>
                      <h4 className="bd-routine-day">{daySchedule.day}</h4>
                      <ul>
                        {daySchedule.timeSlots.length > 0 ? (
                          daySchedule.timeSlots.map((slot, slotIndex) => (
                            <li key={slotIndex}>
                              <span className="class-title">Consultație</span>
                              <span>
                                {slot.start} - {slot.end}
                              </span>
                            </li>
                          ))
                        ) : (
                          <li>
                            <span className="class-title">Nu sunt programări disponibile</span>
                          </li>
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {doctor.acceptingNewPatients !== false && (
          <div className="row mt-4">
            <div className="col-12 text-center">
              <div className="alert alert-info" role="alert">
                <i className="flaticon-check me-2"></i>
                <strong>Acceptă pacienți noi</strong> - Contactează pentru a programa o consultație.
              </div>
            </div>
          </div>
        )}
        {doctor.onlineConsultations === true && (
          <div className="row mt-2">
            <div className="col-12 text-center">
              <div className="alert alert-success" role="alert">
                <i className="flaticon-video me-2"></i>
                <strong>Consultații online disponibile</strong> - Programează o consultație video.
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DoctorAvailability;
