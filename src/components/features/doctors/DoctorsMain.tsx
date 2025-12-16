/**
 * Doctors Main Component
 *
 * Main component for displaying a list of doctors.
 * Adapted from Teacher/TeachersMain.tsx
 */

"use client";

import React from "react";
import Link from "next/link";
import { routes } from "@/lib/routes";
import type { Doctor } from "@/modules/doctors/doctors.types";
import DoctorCard from "./DoctorCard";

interface DoctorsMainProps {
  doctors: Doctor[];
}

const DoctorsMain: React.FC<DoctorsMainProps> = ({ doctors }) => {
  // Empty state
  if (!doctors || doctors.length === 0) {
    return (
      <section className="bd-teacher-area pt-120 pb-80">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="text-center py-5">
                <div className="mb-4">
                  <i className="flaticon-doctor" style={{ fontSize: "4rem", color: "#ccc" }}></i>
                </div>
                <h3 className="mb-3">Nu s-au găsit doctori</h3>
                <p className="text-muted mb-4">
                  În prezent nu există doctori disponibili care să corespundă criteriilor tale.
                  <br />
                  Încearcă să modifici filtrele sau revino mai târziu.
                </p>
                <Link href={routes.doctors.list} className="bd-btn">
                  <span className="bd-btn-inner">
                    <span className="bd-btn-normal">Vezi toți doctorii</span>
                    <span className="bd-btn-hover">Vezi toți doctorii</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bd-teacher-area pt-120 pb-80">
      <div className="container">
        {/* Results count */}
        <div className="row mb-4">
          <div className="col-12">
            <p className="text-muted mb-0">
              {doctors.length} {doctors.length === 1 ? "doctor găsit" : "doctori găsiți"}
            </p>
          </div>
        </div>

        <div className="row">
          {doctors.map((doctor, index) => (
            <div className="col-xl-3 col-lg-4 col-sm-6" key={doctor.id}>
              <DoctorCard doctor={doctor} variant="listing" delay={`.${(index + 1) * 2}s`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctorsMain;
