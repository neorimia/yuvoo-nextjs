/**
 * Club Schedule Component
 *
 * Component for displaying club training schedules.
 * Adapted from Class/LearningSchedule.tsx
 */

import React from "react";
import type { Club } from "@/modules/clubs/clubs.types";

interface ClubScheduleProps {
  club: Club;
}

const ClubSchedule: React.FC<ClubScheduleProps> = ({ club }) => {
  // Day order for sorting
  const dayOrder: Record<string, number> = {
    Luni: 1,
    Marți: 2,
    Miercuri: 3,
    Joi: 4,
    Vineri: 5,
    Sâmbătă: 6,
    Duminică: 7,
  };

  // Format time display - handle both old format (time) and new format (startTime/endTime)
  const formatTime = (item: {
    day: string;
    time?: string;
    startTime?: string;
    endTime?: string;
  }): string => {
    // New format with startTime and endTime
    if (item.startTime && item.endTime) {
      return `${item.startTime} - ${item.endTime}`;
    }
    // Old format with time (backward compatibility)
    if (item.time) {
      return item.time;
    }
    return "";
  };

  // Process schedule - handle both old and new formats
  let schedule: { day: string; time: string }[] = [];

  if (club.schedule && club.schedule.length > 0) {
    schedule = club.schedule
      .map((item) => ({
        day: item.day,
        time: formatTime(
          item as { day: string; time?: string; startTime?: string; endTime?: string }
        ),
      }))
      .filter((item) => item.time) // Filter out empty times
      .sort((a, b) => {
        // Sort by day order
        const orderA = dayOrder[a.day] || 99;
        const orderB = dayOrder[b.day] || 99;
        return orderA - orderB;
      });
  }

  // If no schedule, show message instead of default
  const hasSchedule = schedule.length > 0;

  // Split schedule into two columns if more than 3 items
  const midPoint = Math.ceil(schedule.length / 2);
  const leftColumn = schedule.slice(0, midPoint);
  const rightColumn = schedule.slice(midPoint);

  return (
    <section className="bd-routine-area pb-70">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div
              className="bd-section-title-wrapper text-center mb-55 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay=".2s"
            >
              <h2 className="bd-section-title mb-0">Program de Antrenamente</h2>
              <p>
                Programul nostru este adaptat pentru a oferi cea mai bună experiență
                <br />
                pentru copiii din toate grupele de vârstă.
              </p>
            </div>
          </div>
        </div>

        {!hasSchedule ? (
          <div className="row">
            <div className="col-12">
              <div
                className="bd-routine-empty text-center wow fadeInUp"
                data-wow-duration="1s"
                data-wow-delay=".3s"
              >
                <div className="py-5">
                  <i className="flaticon-calendar" style={{ fontSize: "3rem", color: "#ccc" }}></i>
                  <h4 className="mt-3 mb-2">Program indisponibil</h4>
                  <p className="text-muted">
                    Programul de antrenamente nu este disponibil momentan.
                    <br />
                    Contactează clubul pentru mai multe informații.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className={rightColumn.length > 0 ? "col-lg-6" : "col-lg-8 offset-lg-2"}>
              <div
                className="bd-routine-table mb-50 wow fadeInLeft"
                data-wow-duration="1s"
                data-wow-delay=".3s"
              >
                <table className="table table-striped table-hover">
                  <thead className="table-primary">
                    <tr>
                      <th scope="col" style={{ width: "40%" }}>
                        <i className="flaticon-calendar me-2"></i>Zi
                      </th>
                      <th scope="col" style={{ width: "60%" }}>
                        <i className="flaticon-clock me-2"></i>Orar
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {leftColumn.map((item, index) => (
                      <tr key={`left-${index}`}>
                        <td>
                          <strong>{item.day}</strong>
                        </td>
                        <td>{item.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {rightColumn.length > 0 && (
              <div className="col-lg-6">
                <div
                  className="bd-routine-table mb-50 wow fadeInRight"
                  data-wow-duration="1s"
                  data-wow-delay=".3s"
                >
                  <table className="table table-striped table-hover">
                    <thead className="table-primary">
                      <tr>
                        <th scope="col" style={{ width: "40%" }}>
                          <i className="flaticon-calendar me-2"></i>Zi
                        </th>
                        <th scope="col" style={{ width: "60%" }}>
                          <i className="flaticon-clock me-2"></i>Orar
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {rightColumn.map((item, index) => (
                        <tr key={`right-${index}`}>
                          <td>
                            <strong>{item.day}</strong>
                          </td>
                          <td>{item.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ClubSchedule;
