import React from "react";
import { Metadata } from "next";
import HomeNewsletter from "@/components/Newsletter/HomeNewsletter";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import AboutTestimonialArea from "@/components/Testimonial/AboutTestimonialArea";
import ProgramPromotionArea from "@/components/Promotion/ProgramPromotionArea";
import ClassesMain from "@/components/Class/ClassesMain";

export const metadata: Metadata = {
  title: "Our Classes - Kindergarten & School Next js Template",
};

const Classes = () => {
  return (
    <>
      <BreadcrumbOne title="Classes" subTitle="Our Classes" />
      <ClassesMain />
      <AboutTestimonialArea />
      <ProgramPromotionArea />
      <HomeNewsletter />
    </>
  );
};

export default Classes;
