"use cache";

import React from "react";
import type { Metadata } from "next";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import AboutMain from "@/components/features/about/AboutMain";
import HomeTrustSignals from "@/components/features/home/HomeTrustSignals";
import { routes } from "@/lib/routes";

// Generate metadata for about page
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Despre Noi - Misiunea, Echipa și Partenerii Yuvoo",
    description:
      "Află mai multe despre Yuvoo: misiunea noastră, echipa dedicată, partenerii de încredere și cum transformăm modul în care părinții găsesc activitățile sportive perfecte pentru copiii lor. Platformă AI verificată, colaborări medicale și sportive de încredere.",
    keywords: [
      "despre Yuvoo",
      "echipa Yuvoo",
      "parteneri Yuvoo",
      "misiune Yuvoo",
      "platformă AI sporturi copii",
      "specialiști pediatri România",
      "cluburi sportive",
      "despre platformă sport copii",
    ],
    openGraph: {
      title: "Despre Noi - Misiunea, Echipa și Partenerii Yuvoo",
      description:
        "Află mai multe despre Yuvoo: misiunea, echipa dedicată și partenerii de încredere care stau în spatele platformei AI pentru sporturi copii.",
      type: "website",
      url: `${process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro"}/despre-noi`,
      siteName: "Yuvoo",
      locale: "ro_RO",
    },
    twitter: {
      card: "summary_large_image",
      title: "Despre Noi - Misiunea, Echipa și Partenerii Yuvoo",
      description:
        "Află mai multe despre Yuvoo: misiunea, echipa dedicată și partenerii de încredere.",
    },
    alternates: {
      canonical: "/despre-noi",
    },
  };
}

/**
 * About Page
 *
 * Public marketing page about Yuvoo.
 * SEO-friendly route: /despre-noi
 */
export default async function AboutPage() {
  return (
    <>
      <BreadcrumbOne
        title="Despre Noi"
        subTitle="Despre Noi"
        items={[
          { name: "Yuvoo", url: routes.home },
          { name: "Despre Noi", url: routes.about },
        ]}
      />
      <AboutMain />
      {/* Trust Signals Section */}
      <HomeTrustSignals />
      {/* Statistics Section */}
      {/* <HomeStats /> */}
      {/* Team Section */}
      {/* <AboutTeam /> */}
      {/* Partners Section */}
      {/* <AboutPartners /> */}
    </>
  );
}
