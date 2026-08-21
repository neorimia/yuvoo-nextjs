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
import ItemListSchema from "@/components/SEO/ItemListSchema";
import FaqAccordionItem from "@/components/shared/FaqAccordionItem";
import { doctorsHubFaqItems } from "@/data/doctors-hub-faq-data";
import { getSiteUrl } from "@/lib/seo/site-url";
import { PRE_LAUNCH_RESTRICTIONS_ENABLED } from "@/lib/config/pre-launch";
import PreLaunchPage from "@/components/features/early-access/PreLaunchPage";

/**
 * Generate metadata for doctors listing page
 * Uses base URL without query params as canonical URL
 */
export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = getSiteUrl();

  return {
    title: "Specialiști Pediatri pentru Sportul Copiilor | Yuvoo",
    description:
      "Găsește medici pediatri, ortopedie pediatrică și nutriție verificați pentru consultații despre activitatea sportivă a copilului (4–14 ani). Filtrează după oraș, specialitate și consultații online.",
    keywords: [
      "specialiști pediatri sport copii",
      "ortopedie pediatrică bucurești",
      "medic pediatru sport",
      "consultație sport copii",
      "doctori copii românia",
    ],
    openGraph: {
      title: "Specialiști Pediatri pentru Sportul Copiilor | Yuvoo",
      description:
        "Medici pediatri și specialiști verificați pentru întrebări despre sportul copiilor. Consultații online sau față în față.",
      url: `${baseUrl}${routes.doctors.list}`,
      siteName: "Yuvoo",
      type: "website",
      locale: "ro_RO",
    },
    alternates: {
      canonical: `${baseUrl}${routes.doctors.list}`,
    },
  };
}

interface DoctorsPageProps {
  searchParams: Promise<{
    specialty?: string;
    cityId?: string;
    sectorId?: string;
    countyId?: string;
    verified?: string;
    acceptingNewPatients?: string;
    onlineConsultations?: string;
    sortBy?: string;
    page?: string;
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
  if (PRE_LAUNCH_RESTRICTIONS_ENABLED) {
    return <PreLaunchPage routeType="doctor-portal" />;
  }

  const params = await searchParams;
  const {
    specialty,
    cityId,
    sectorId,
    countyId,
    verified,
    acceptingNewPatients,
    onlineConsultations,
    sortBy,
    page: pageParam,
  } = params;

  const page = pageParam ? parseInt(pageParam, 10) : 1;
  const pageSize = 12;

  // Build filters object from search params
  const filters: DoctorSearchFiltersType = {
    specialty: specialty as DoctorSearchFiltersType["specialty"] | undefined,
    cityId: cityId || undefined,
    sectorId: sectorId || undefined,
    countyId: countyId || undefined,
    verified: verified === "true" ? true : undefined,
    acceptingNewPatients: acceptingNewPatients === "true" ? true : undefined,
    onlineConsultations: onlineConsultations === "true" ? true : undefined,
    sortBy: (sortBy as "name" | "specialty" | "verified") || "verified",
    page: Number.isNaN(page) || page < 1 ? 1 : page,
    pageSize,
  };

  // Fetch doctors with filters
  const result = await searchDoctors(filters);
  const doctors: Doctor[] = result.doctors;
  const totalPages = Math.ceil(result.total / result.pageSize);
  const accordionId = "doctorsHubFaq";

  return (
    <>
      <ItemListSchema items={doctors} type="Doctor" listName="Specialiști Pediatri Verificați" />
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
                title="Specialiști Pediatri pentru Sportul Copiilor"
                subtitle={
                  <>
                    <strong>Cum alegi specialistul potrivit?</strong> Începe cu motivul
                    consultației: evaluare înainte de înscriere la sport, dureri articulare, alergii
                    sau recomandare din{" "}
                    <Link
                      href={routes.quiz.intro}
                      className="text-yuvoo-primary text-decoration-underline"
                    >
                      chestionarul AI
                    </Link>
                    . Filtrează după specialitate (pediatrie, ortopedie pediatrică, nutriție), oraș
                    și consultații online. Badge-ul verificat Yuvoo confirmă documentele
                    profesionale; relația medicală rămâne direct între tine și medic. Explorează și{" "}
                    <Link
                      href={routes.sports.list}
                      className="text-yuvoo-primary text-decoration-underline"
                    >
                      sporturile disponibile
                    </Link>{" "}
                    și{" "}
                    <Link
                      href={routes.clubs.list}
                      className="text-yuvoo-primary text-decoration-underline"
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
      <DoctorsMain
        doctors={doctors}
        pagination={{
          currentPage: result.page,
          totalPages,
          total: result.total,
          pageSize: result.pageSize,
        }}
      />
      <section className="bd-doctors-faq-area pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <SectionTitle
                title="Întrebări frecvente despre specialiști pediatri"
                className="mb-30 text-center"
              />
              <div className="accordion" id={accordionId}>
                {doctorsHubFaqItems.map((item, index) => (
                  <FaqAccordionItem
                    key={item.question}
                    id={`doctors-hub-${index}`}
                    question={item.question}
                    answer={item.answer}
                    isOpen={index === 0}
                    accordionId={accordionId}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
