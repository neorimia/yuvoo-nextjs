import React from "react";
import { headers } from "next/headers";
import { Metadata } from "next";
import HomeNewsletter from "@/components/Newsletter/HomeNewsletter";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import GalleryMain from "@/components/Gallery/GalleryMain";

export const metadata: Metadata = {
  title: "Gallery - Kindergarten & School Next js Template",
};

const Gallery = async () => {
  // Make page dynamic to avoid Sentry crypto.randomUUID() issue during build
  await headers();
  return (
    <>
      <BreadcrumbOne title="Gallery" subTitle="Gallery" />
      <GalleryMain />
      <HomeNewsletter />
    </>
  );
};

export default Gallery;
