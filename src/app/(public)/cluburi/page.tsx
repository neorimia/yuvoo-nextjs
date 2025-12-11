import React from "react";
import type { Metadata } from "next";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import ClubsMain from "@/components/features/clubs/ClubsMain";
import type { Club } from "@/modules/clubs/clubs.types";

export const metadata: Metadata = {
  title: "Cluburi Sportive - Yuvoo",
  description:
    "Descoperă cluburi sportive verificate pentru copii. Găsește activități sportive potrivite în orașul tău.",
};

/**
 * Clubs Listing Page
 *
 * Public page displaying all sports clubs.
 * SEO-friendly route: /cluburi
 */
export default async function ClubsPage() {
  // TODO: Fetch clubs from database
  // const clubs = await getClubs();
  const clubs: Club[] = []; // Empty array for now

  return (
    <>
      <BreadcrumbOne title="Cluburi Sportive" subTitle="Cluburi" />
      <ClubsMain clubs={clubs} />
    </>
  );
}
