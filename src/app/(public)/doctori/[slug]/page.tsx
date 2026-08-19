"use cache";

import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import MedicalBusinessSchema from "@/components/SEO/MedicalBusinessSchema";
import DoctorDetailsMain from "@/components/features/doctors/DoctorDetailsMain";
import DoctorAvailability from "@/components/features/doctors/DoctorAvailability";
import DoctorAppointmentFormSection from "@/components/features/doctors/DoctorAppointmentFormSection";
import DoctorContentExpanded from "@/components/features/doctors/DoctorContentExpanded";
import { getDoctorBySlug } from "@/modules/doctors/doctors.service";
import { routes } from "@/lib/routes";
import { cacheLife, cacheTag } from "next/cache";
import type { Doctor } from "@/modules/doctors/doctors.types";
import { generateDoctorExpandedContent } from "@/lib/content/doctor-expanded-content";
import { generateDoctorMetadata } from "@/lib/seo/doctor-metadata";
import PostHogViewTracking from "@/components/analytics/PostHogViewTracking";
import { PostHogEvents } from "@/lib/analytics/events";
import { PRE_LAUNCH_RESTRICTIONS_ENABLED } from "@/lib/config/pre-launch";
import PreLaunchPage from "@/components/features/early-access/PreLaunchPage";

interface DoctorDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Generate static params for SSG
 * Returns at least one value to satisfy Cache Components requirement.
 * TODO: When repository is implemented, fetch all doctor slugs here.
 */
export async function generateStaticParams() {
  // TODO: When repository is implemented, fetch all doctor slugs
  // const doctors = await doctorsRepository.findAll();
  // return doctors.map((doctor) => ({ slug: doctor.slug }));

  // For now, return placeholder to satisfy Cache Components requirement
  return [{ slug: "example-doctor" }];
}

/**
 * Doctor Detail Page (SSG)
 *
 * Public page displaying details for a specific pediatric specialist.
 * Uses Next.js 16 Cache Components with "use cache" directive.
 * SEO-friendly route: /doctori/[slug]
 */
export default async function DoctorDetailPage({ params }: DoctorDetailPageProps) {
  if (PRE_LAUNCH_RESTRICTIONS_ENABLED) {
    return <PreLaunchPage routeType="doctor-portal" />;
  }

  const { slug } = await params;

  // Check if we're in production build phase
  const isProductionBuild = process.env.NEXT_PHASE === "phase-production-build";

  // During production builds, skip database queries and use mock doctor
  // At runtime, ISR will fetch actual doctor
  const doctor: Doctor | null = isProductionBuild ? null : await getDoctorBySlug(slug);

  // If doctor not found, return 404 (only at runtime)
  if (!isProductionBuild && !doctor) {
    notFound();
  }

  // During build, render placeholder
  if (isProductionBuild) {
    return (
      <>
        <BreadcrumbOne
          title="Doctor Placeholder"
          subTitle="Doctori"
          items={[
            { name: "Yuvoo", url: routes.home },
            { name: "Doctori", url: routes.doctors.list },
            { name: "Doctor Placeholder", url: routes.doctors.detail(slug) },
          ]}
        />
        <section className="bd-doctor-details-area pt-120 pb-70">
          <div className="container">
            <h1>Doctor Placeholder</h1>
            <p>Build placeholder</p>
          </div>
        </section>
      </>
    );
  }

  // Cache configuration (only at runtime)
  // Cache for 1 hour - doctor details change infrequently
  cacheLife("hours");
  // Cache tags for revalidation
  cacheTag(`doctor-${doctor!.id}`);
  cacheTag(`doctor-slug-${slug}`);
  cacheTag("doctors-list");

  // Generate expanded content for SEO (600-900 words)
  const expandedContent = generateDoctorExpandedContent(doctor!);

  return (
    <>
      <PostHogViewTracking
        eventName={PostHogEvents.DOCTOR_VIEWED}
        entityId={doctor!.id}
        entityType="doctor"
        entitySlug={slug}
      />
      <MedicalBusinessSchema doctor={doctor!} />
      <BreadcrumbOne
        title={doctor!.name}
        subTitle="Doctori"
        items={[
          { name: "Yuvoo", url: routes.home },
          { name: "Doctori", url: routes.doctors.list },
          { name: doctor!.name, url: routes.doctors.detail(slug) }, // Current page
        ]}
      />
      <DoctorDetailsMain doctor={doctor!} />
      <DoctorAvailability doctor={doctor!} />
      {/* Expanded Content Section for SEO (600-900 words) */}
      <DoctorContentExpanded content={expandedContent} />
      <DoctorAppointmentFormSection doctor={doctor!} />
    </>
  );
}

/**
 * Generate metadata for SEO with location keywords
 */
export async function generateMetadata({ params }: DoctorDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  // Check if we're in production build phase
  const isProductionBuild = process.env.NEXT_PHASE === "phase-production-build";

  // During build, return generic metadata
  if (isProductionBuild) {
    return {
      title: "Specialist Pediatric - Yuvoo",
      description: "Specialist pediatric cu experiență în sport pentru copii.",
    };
  }

  // Fetch doctor for metadata (only at runtime)
  const doctor = await getDoctorBySlug(slug);

  if (!doctor) {
    return {
      title: "Doctor negăsit - Yuvoo",
      description: "Specialistul pediatric căutat nu a fost găsit.",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro";

  // Use enhanced metadata with location keywords
  return generateDoctorMetadata(doctor, baseUrl);
}
