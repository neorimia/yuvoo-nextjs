"use cache";

import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import MedicalBusinessSchema from "@/components/SEO/MedicalBusinessSchema";
import PersonSchema from "@/components/SEO/PersonSchema";
import DoctorDetailsMain from "@/components/features/doctors/DoctorDetailsMain";
import DoctorAvailability from "@/components/features/doctors/DoctorAvailability";
import DoctorAppointmentFormSection from "@/components/features/doctors/DoctorAppointmentFormSection";
import DoctorContentExpanded from "@/components/features/doctors/DoctorContentExpanded";
import { getDoctorBySlug } from "@/modules/doctors/doctors.service";
import { routes } from "@/lib/routes";
import { cacheTag } from "next/cache";
import type { Doctor } from "@/modules/doctors/doctors.types";
import { generateDoctorExpandedContent } from "@/lib/content/doctor-expanded-content";
import { generateDoctorMetadata } from "@/lib/seo/doctor-metadata";

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
  const { slug } = await params;

  // Fetch doctor data
  const doctor: Doctor | null = await getDoctorBySlug(slug);

  // If doctor not found, return 404
  if (!doctor) {
    notFound();
  }

  // Cache tag for revalidation
  cacheTag(`doctor-${doctor.id}`);
  cacheTag(`doctor-slug-${slug}`);

  // Generate expanded content for SEO (600-900 words)
  const expandedContent = generateDoctorExpandedContent(doctor);

  return (
    <>
      <MedicalBusinessSchema doctor={doctor} />
      <PersonSchema doctor={doctor} />
      <BreadcrumbOne
        title={doctor.name}
        subTitle="Doctori"
        items={[
          { name: "Yuvoo", url: routes.home },
          { name: "Doctori", url: routes.doctors.list },
          { name: doctor.name, url: routes.doctors.detail(slug) }, // Current page
        ]}
      />
      <DoctorDetailsMain doctor={doctor} />
      <DoctorAvailability doctor={doctor} />
      {/* Expanded Content Section for SEO (600-900 words) */}
      <DoctorContentExpanded content={expandedContent} />
      <DoctorAppointmentFormSection doctor={doctor} />
    </>
  );
}

/**
 * Generate metadata for SEO with location keywords
 */
export async function generateMetadata({ params }: DoctorDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  // Fetch doctor for metadata
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
