import React from "react";
import type { Metadata } from "next";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import SectionTitle from "@/components/shared/SectionTitle";
import { routes, externalLinks } from "@/lib/routes";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ajutor - Ghid de utilizare Yuvoo | Suport și Asistență",
  description:
    "Ghid complet de utilizare pentru platforma Yuvoo. Află cum să folosești chestionarul AI, cum să găsești cluburi verificate, cum să contactezi specialiști pediatri și multe altele. Suport și asistență pentru părinți.",
  keywords: [
    "ajutor Yuvoo",
    "ghid utilizare Yuvoo",
    "suport Yuvoo",
    "asistență Yuvoo",
    "cum folosesc Yuvoo",
    "tutorial Yuvoo",
    "instrucțiuni platformă sport copii",
    "ajutor chestionar AI",
  ],
  openGraph: {
    title: "Ajutor - Ghid de utilizare Yuvoo | Suport și Asistență",
    description:
      "Ghid complet de utilizare pentru platforma Yuvoo. Află cum să folosești chestionarul AI, cum să găsești cluburi verificate și cum să contactezi specialiști pediatri.",
    type: "website",
    url: `${process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro"}/ajutor`,
    siteName: "Yuvoo",
    locale: "ro_RO",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ajutor - Ghid de utilizare Yuvoo",
    description:
      "Ghid complet de utilizare pentru platforma Yuvoo. Suport și asistență pentru părinți.",
  },
  alternates: {
    canonical: "/ajutor",
  },
};

interface HelpSection {
  id: number;
  icon: string;
  title: string;
  description: string | React.ReactNode;
  link?: string;
  items?: string[];
}

const helpSections: HelpSection[] = [
  {
    id: 1,
    icon: "fa-solid fa-question-circle",
    title: "Primii pași pe Yuvoo",
    description: (
      <>
        Află cum să începi să folosești platforma Yuvoo pentru a găsi activitățile sportive
        potrivite pentru copilul tău. Începe cu{" "}
        <Link href={routes.quiz.intro} className="text-primary text-decoration-underline">
          chestionarul AI
        </Link>{" "}
        pentru recomandări personalizate.
      </>
    ),
    link: routes.quiz.intro,
    items: [
      "Cum funcționează chestionarul AI",
      "Cum completezi profilul copilului",
      "Cum interpretezi recomandările",
      "Cum salvezi rezultatele quiz-ului",
    ],
  },
  {
    id: 2,
    icon: "fa-solid fa-magnifying-glass",
    title: "Găsirea cluburilor sportive",
    description: (
      <>
        Descoperă cum să căuți și să filtrezi{" "}
        <Link href={routes.clubs.list} className="text-primary text-decoration-underline">
          cluburile sportive verificate
        </Link>{" "}
        pentru a găsi cea mai bună opțiune. Explorează și{" "}
        <Link href={routes.sports.list} className="text-primary text-decoration-underline">
          toate sporturile disponibile
        </Link>
        .
      </>
    ),
    link: routes.clubs.list,
    items: [
      "Cum cauti cluburi după sport",
      "Cum filtrezi după locație și vârstă",
      "Cum verifici informațiile unui club",
      "Cum rezervi o ședință de probă",
    ],
  },
  {
    id: 3,
    icon: "fa-solid fa-user-doctor",
    title: "Contactarea specialiștilor pediatri",
    description: (
      <>
        Află cum să contactezi și să programezi consultații cu{" "}
        <Link href={routes.doctors.list} className="text-primary text-decoration-underline">
          specialiștii pediatri verificați
        </Link>{" "}
        de pe platformă. Recomandările AI te vor ghida când este necesar.
      </>
    ),
    link: routes.doctors.list,
    items: [
      "Cum găsești specialiști pediatri",
      "Cum filtrezi după specialitate",
      "Cum verifici disponibilitatea",
      "Cum programezi o consultație",
    ],
  },
  {
    id: 4,
    icon: "fa-solid fa-circle-user",
    title: "Gestionarea contului",
    description: "Ghid complet pentru gestionarea profilului tău, copiilor și setărilor contului.",
    items: [
      "Cum adaugi sau editezi copii",
      "Cum gestionezi rezervările",
      "Cum salvezi cluburi favorite",
      "Cum actualizezi datele de contact",
    ],
  },
  {
    id: 5,
    icon: "fa-solid fa-shield-check",
    title: "Siguranță și confidențialitate",
    description:
      "Informații despre securitatea datelor, protecția GDPR și confidențialitatea pe platformă.",
    link: routes.privacy,
    items: [
      "Cum protejăm datele copiilor",
      "Cum exerciți drepturile GDPR",
      "Cum funcționează verificarea cluburilor",
      "Cum sunt verificați specialiștii",
    ],
  },
  {
    id: 6,
    icon: "fa-solid fa-envelope",
    title: "Contact și suport",
    description: "Află cum să ne contactezi pentru întrebări, probleme tehnice sau feedback.",
    link: routes.contact,
    items: [
      "Cum trimiti un mesaj prin formular",
      "Cum contactezi echipa de suport",
      "Cum raportezi probleme tehnice",
      "Cum oferi feedback despre platformă",
    ],
  },
];

export default function HelpPage() {
  return (
    <>
      <BreadcrumbOne
        title="Ajutor"
        subTitle="Ajutor"
        items={[
          { name: "Yuvoo", url: routes.home },
          { name: "Ajutor", url: routes.help },
        ]}
      />

      {/* Hero Section */}
      <section className="bd-help-area pt-120 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="bd-help-hero text-center mb-60">
                <h1
                  className="bd-section-title mb-30 wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay=".2s"
                >
                  Ajutor și Asistență
                </h1>
                <p className="lead mb-40 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".3s">
                  Ghid complet pentru utilizarea platformei Yuvoo. Află cum să folosești toate
                  funcționalitățile pentru a găsi activitățile sportive perfecte pentru copilul tău.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Help Sections */}
      <section className="bd-help-sections pt-120 pb-70 theme-bg-7">
        <div className="container">
          <div className="row">
            {helpSections.map((section, index) => (
              <div key={section.id} className="col-lg-6 col-md-6 mb-40">
                <div
                  className="bd-help-card wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay={`${0.2 + index * 0.1}s`}
                >
                  <div className="bd-help-icon mb-25">
                    <i className={section.icon}></i>
                  </div>
                  <h3 className="bd-help-title mb-20">{section.title}</h3>
                  <div className="bd-help-description mb-25">{section.description}</div>
                  {section.items && section.items.length > 0 && (
                    <ul className="bd-help-items mb-25">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="bd-help-item">
                          <i className="fa-solid fa-check me-2"></i>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.link && (
                    <Link href={section.link} className="bd-help-link">
                      <span className="me-2">Află mai multe</span>
                      <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="bd-help-quick-links pt-120 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <SectionTitle
                title="Linkuri rapide"
                subtitle="Accesează rapid paginile importante și resursele utile"
                className="mb-60"
                animationDelay=".2s"
              />
              <div className="row">
                <div className="col-lg-3 col-md-6 mb-30">
                  <Link
                    href={routes.faq}
                    className="bd-help-quick-link-card wow fadeInUp"
                    data-wow-duration="1s"
                    data-wow-delay=".3s"
                  >
                    <div className="bd-help-quick-link-icon mb-20">
                      <i className="fa-solid fa-circle-question"></i>
                    </div>
                    <h4 className="bd-help-quick-link-title">Întrebări frecvente</h4>
                  </Link>
                </div>
                <div className="col-lg-3 col-md-6 mb-30">
                  <Link
                    href={routes.contact}
                    className="bd-help-quick-link-card wow fadeInUp"
                    data-wow-duration="1s"
                    data-wow-delay=".4s"
                  >
                    <div className="bd-help-quick-link-icon mb-20">
                      <i className="fa-solid fa-envelope"></i>
                    </div>
                    <h4 className="bd-help-quick-link-title">Contact</h4>
                  </Link>
                </div>
                <div className="col-lg-3 col-md-6 mb-30">
                  <Link
                    href={routes.privacy}
                    className="bd-help-quick-link-card wow fadeInUp"
                    data-wow-duration="1s"
                    data-wow-delay=".5s"
                  >
                    <div className="bd-help-quick-link-icon mb-20">
                      <i className="fa-solid fa-shield-check"></i>
                    </div>
                    <h4 className="bd-help-quick-link-title">Confidențialitate</h4>
                  </Link>
                </div>
                <div className="col-lg-3 col-md-6 mb-30">
                  <a
                    href={externalLinks.contactEmail}
                    className="bd-help-quick-link-card wow fadeInUp"
                    data-wow-duration="1s"
                    data-wow-delay=".6s"
                  >
                    <div className="bd-help-quick-link-icon mb-20">
                      <i className="fa-solid fa-headset"></i>
                    </div>
                    <h4 className="bd-help-quick-link-title">Suport email</h4>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
