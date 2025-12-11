import React from "react";
import { Metadata } from "next";
import HomeNewsletter from "@/components/Newsletter/HomeNewsletter";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import TestimonialMain from "@/components/Testimonial/TestimonialMain";

export const metadata: Metadata = {
  title: "Testimonials - Kindergarten & School Next js Template",
};

const Testimonials = () => {
  return (
    <>
      <BreadcrumbOne title="Testimonials" subTitle="Testimonials" />
      <TestimonialMain />
      <HomeNewsletter />
    </>
  );
};

export default Testimonials;
