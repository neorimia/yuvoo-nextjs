import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import DoctorsMain from "@/components/features/doctors/DoctorsMain";
import DoctorSearchFilters from "@/components/features/doctors/DoctorSearchFilters";
import { searchDoctors } from "@/modules/doctors/doctors.service";
import { routes } from "@/lib/routes";
import SectionTitle from "@/components/shared/SectionTitle";
import type {
  Doctor,
  DoctorSearchFilters as DoctorSearchFiltersType,
} from "@/modules/doctors/doctors.types";

/**
 * Generate metadata for doctors listing page
 * Uses base URL without query params as canonical URL
 */
export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro";

  return {
    title: "Specialiști Pediatri - Yuvoo",
    description:
      "Găsește specialiști pediatri verificați pentru consultații despre activitățile sportive ale copilului tău.",
    alternates: {
      canonical: `${baseUrl}/doctori`,
    },
  };
}

interface DoctorsPageProps {
  searchParams: Promise<{
    specialty?: string;
    city?: string;
    district?: string;
    verified?: string;
    acceptingNewPatients?: string;
    onlineConsultations?: string;
    sortBy?: string;
  }>;
}

/**
 * Doctors Listing Page
 *
 * Public page displaying all pediatric specialists.
 * Supports filtering by specialty, city, district, and other criteria.
 * SEO-friendly route: /doctori
 */
export default async function DoctorsPage({ searchParams }: DoctorsPageProps) {
  const params = await searchParams;
  const { specialty, city, district, verified, acceptingNewPatients, onlineConsultations, sortBy } =
    params;

  // Build filters object from search params
  const filters: DoctorSearchFiltersType = {
    specialty: specialty as DoctorSearchFiltersType["specialty"] | undefined,
    city: city || undefined,
    district: district || undefined,
    verified: verified === "true" ? true : undefined,
    acceptingNewPatients: acceptingNewPatients === "true" ? true : undefined,
    onlineConsultations: onlineConsultations === "true" ? true : undefined,
    sortBy: (sortBy as "name" | "specialty" | "verified") || "verified",
  };

  // Fetch doctors with filters
  const result = await searchDoctors(filters);
  const doctors: Doctor[] = result.doctors;

  return (
    <>
      <BreadcrumbOne
        title="Specialiști Pediatri"
        subTitle="Doctori"
        items={[
          { name: "Yuvoo", url: routes.home },
          { name: "Doctori", url: routes.doctors.list }, // Current page
        ]}
      />
      <section className="bd-doctors-intro-area pt-120 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <SectionTitle
                title="Specialiști Pediatri Verificați"
                subtitle={
                  <>
                    Găsește specialiști pediatri verificați pentru consultații despre activitățile
                    sportive ale copilului tău. Dacă{" "}
                    <Link
                      href={routes.quiz.intro}
                      className="text-primary text-decoration-underline"
                    >
                      chestionarul AI
                    </Link>{" "}
                    recomandă consultarea unui specialist, vei găsi recomandări personalizate în
                    rezultate. Explorează și{" "}
                    <Link
                      href={routes.sports.list}
                      className="text-primary text-decoration-underline"
                    >
                      sporturile disponibile
                    </Link>{" "}
                    și{" "}
                    <Link
                      href={routes.clubs.list}
                      className="text-primary text-decoration-underline"
                    >
                      cluburile verificate
                    </Link>
                    .
                  </>
                }
                className="text-center mb-50"
                animationDelay=".2s"
              />
            </div>
          </div>
        </div>
      </section>
      <DoctorSearchFilters initialFilters={filters} />
      <DoctorsMain doctors={doctors} />
    </>
  );
}
