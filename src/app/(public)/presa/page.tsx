"use cache";

import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import SectionTitle from "@/components/shared/SectionTitle";
import { routes } from "@/lib/routes";
import { getSiteUrl } from "@/lib/seo/site-url";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = getSiteUrl();

  return {
    title: "Presă și Media | Yuvoo",
    description:
      "Resurse pentru jurnaliști: despre Yuvoo, platforma AI care ajută părinții din România să găsească sportul potrivit copiilor (4–14 ani). Contact presă și unghiuri de story.",
    alternates: {
      canonical: `${baseUrl}${routes.press}`,
    },
    openGraph: {
      title: "Presă și Media | Yuvoo",
      description:
        "Informații pentru presă despre Yuvoo — chestionar AI, director cluburi verificate, specialiști pediatri.",
      url: `${baseUrl}${routes.press}`,
      siteName: "Yuvoo",
      locale: "ro_RO",
      type: "website",
    },
  };
}

const PITCH_ANGLES = [
  {
    title: "AI pentru părinți, nu pentru antrenori",
    text: "Yuvoo folosește un chestionar ghidat (română) care recomandă 2–3 sporturi potrivite profilului copilului — temperament, energie, preferințe — apoi conectează familiile cu cluburi listate.",
  },
  {
    title: "Siguranță și verificare în sportul de copii",
    text: "Directorul de cluburi include badge de verificare Yuvoo pentru cluburi care trimit documente și respectă standarde minime — răspuns la anxietatea părinților despre calitatea programelor.",
  },
  {
    title: "Ecosistem local: cluburi + medici",
    text: "Pe lângă descoperirea cluburilor, platforma listează specialiști pediatri relevanți pentru sport (ortopedie pediatrică, nutriție), cu accent pe piața din România, start București.",
  },
];

export default async function PressPage() {
  const baseUrl = getSiteUrl();

  return (
    <>
      <BreadcrumbOne
        title="Presă"
        subTitle="Presă"
        items={[
          { name: "Yuvoo", url: routes.home },
          { name: "Presă", url: routes.press },
        ]}
      />
      <section className="bd-press-area pt-120 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <SectionTitle
                title="Presă și Media"
                subtitle="Yuvoo este platforma care ajută părinții din România să descopere sportul potrivit copiilor (4–14 ani), cu chestionar AI, director de cluburi și rețea de specialiști pediatri."
                className="mb-50 text-center"
              />

              <div className="theme-bg-6 p-4 rounded mb-5">
                <h2 className="h5 fw-semibold mb-3">Descriere scurtă (copy-paste)</h2>
                <p className="mb-0">
                  Yuvoo ({baseUrl}) este o platformă digitală din România dedicată părinților care
                  caută activități sportive potrivite pentru copiii cu vârste între 4 și 14 ani.
                  Oferă chestionar AI în limba română, director de cluburi sportive cu filtre pe
                  vârstă și locație, plus acces la specialiști pediatri relevanți pentru sport.
                  Sediul operațional: București, România. Contact presă:{" "}
                  <a href="mailto:contact@yuvoo.ro">contact@yuvoo.ro</a>.
                </p>
              </div>

              <SectionTitle title="Date rapide" className="mb-30" />
              <ul className="mb-5">
                <li>
                  <strong>Produs:</strong> Platformă web pentru părinți (B2C), onboarding cluburi și
                  doctori (B2B)
                </li>
                <li>
                  <strong>Piață:</strong> România — lansare București, extindere națională
                </li>
                <li>
                  <strong>Limbă:</strong> Română (UI, chestionar, recomandări AI)
                </li>
                <li>
                  <strong>Contact presă:</strong>{" "}
                  <a href="mailto:contact@yuvoo.ro">contact@yuvoo.ro</a> (răspuns în 24h lucrătoare)
                </li>
                <li>
                  <strong>Site:</strong>{" "}
                  <a href={baseUrl} rel="noopener noreferrer">
                    {baseUrl.replace(/^https:\/\//, "")}
                  </a>
                </li>
              </ul>

              <SectionTitle title="Unghiuri de story" className="mb-30" />
              <div className="row g-4 mb-5">
                {PITCH_ANGLES.map((angle) => (
                  <div key={angle.title} className="col-md-4">
                    <div className="theme-bg-6 p-4 rounded h-100">
                      <h3 className="h6 fw-semibold">{angle.title}</h3>
                      <p className="small text-muted mb-0">{angle.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <SectionTitle title="Resurse" className="mb-30" />
              <p className="mb-3">
                Logo SVG:{" "}
                <a href={`${baseUrl}/assets/img/logo/logo.svg`}>
                  {baseUrl}/assets/img/logo/logo.svg
                </a>
              </p>
              <p className="mb-4">
                Pentru kit media complet (PNG, screenshot-uri produs), scrie la{" "}
                <a href="mailto:contact@yuvoo.ro">contact@yuvoo.ro</a>.
              </p>

              <div className="d-flex flex-wrap gap-2">
                <Link href={routes.about} className="btn btn-yuvoo-outline-primary btn-sm">
                  Despre Yuvoo
                </Link>
                <Link href={routes.quiz.intro} className="btn btn-yuvoo-outline-primary btn-sm">
                  Chestionar AI
                </Link>
                <Link href={routes.contact} className="btn btn-yuvoo-primary btn-sm">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
