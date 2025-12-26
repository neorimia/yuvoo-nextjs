"use client";
import React from "react";
import SectionTitle from "@/components/shared/SectionTitle";
import StepCard from "@/components/shared/StepCard";

/**
 * Doctors Landing Collaboration Section
 *
 * Displays the 5-step collaboration process.
 * Part of the doctors landing page (/pentru-doctori).
 */
export default function DoctorsLandingCollaboration() {
  const steps = [
    {
      id: 1,
      icon: "fa-solid fa-user-plus",
      title: "Creezi un cont profesional",
      description: "Înregistrare rapidă cu datele tale profesionale",
    },
    {
      id: 2,
      icon: "fa-solid fa-user-edit",
      title: "Completezi profilul",
      description: "Specializare, experiență pediatrică relevantă",
    },
    {
      id: 3,
      icon: "fa-solid fa-check",
      title: "Profilul este verificat manual",
      description: "Echipa Yuvoo verifică calificările și experiența",
    },
    {
      id: 4,
      icon: "fa-solid fa-medal",
      title: "Primești badge-ul Verified Pediatric Expert",
      description: "Badge de verificare pentru credibilitate",
    },
    {
      id: 5,
      icon: "fa-solid fa-eye",
      title: "Apari ca expert în platformă",
      description: "Vizibilitate profesională, nu publicitate",
    },
  ];

  return (
    <section
      className="bd-doctors-landing-collaboration pt-120 pb-70"
      style={{ backgroundColor: "#FFF6EB" }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Section Title */}
            <SectionTitle
              title="Cum funcționează colaborarea"
              className="mb-50"
              animationDelay=".3s"
            />

            {/* 5-Step Process */}
            <div className="row g-4 mb-50 justify-content-center">
              {steps.map((step) => (
                <StepCard
                  key={step.id}
                  stepNumber={step.id}
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                  animationDelay={`${0.4 + (step.id - 1) * 0.1}s`}
                  columnClasses="col-md-6"
                  variant="custom"
                />
              ))}
            </div>

            {/* Emphasis Statement */}
            <div
              className="wow fadeInUp text-center"
              data-wow-duration="1s"
              data-wow-delay=".9s"
              style={{
                marginTop: "40px",
                padding: "30px",
                backgroundColor: "#FFFFFF",
                borderRadius: "16px",
                border: "2px solid var(--bd-theme-1)",
              }}
            >
              <p
                style={{
                  fontSize: "22px",
                  fontWeight: 600,
                  color: "#1B1B1B",
                  marginBottom: 0,
                  lineHeight: "1.5",
                }}
              >
                Niciun profil nu este afișat public fără verificare.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
