import React from "react";
import { headers } from "next/headers";
import { Metadata } from "next";
import HomeNewsletter from "@/components/Newsletter/HomeNewsletter";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import ProgramPromotionArea from "@/components/Promotion/ProgramPromotionArea";
import FaqMain from "@/components/FAQ/FaqMain";
import FaqQuestions from "@/components/FAQ/FaqQuestions";

export const metadata: Metadata = {
  title: "FAQ - Kindergarten & School Next js Template",
};

const FAQ = async () => {
  // Make page dynamic to avoid Sentry crypto.randomUUID() issue during build
  await headers();
  return (
    <>
      <BreadcrumbOne title="FAQ" subTitle="FAQ" />
      <FaqMain />
      <FaqQuestions />
      <ProgramPromotionArea />
      <HomeNewsletter />
    </>
  );
};

export default FAQ;
