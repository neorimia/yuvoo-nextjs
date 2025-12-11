import React from "react";
import { Metadata } from "next";
import HomeThreeFeatureArea from "@/components/Feature/HomeThreeFeatureArea";
import HomeNewsletter from "@/components/Newsletter/HomeNewsletter";
import HomeTeacherArea from "@/components/Teacher/HomeTeacherArea";
import HomePromotionArea from "@/components/Promotion/HomePromotionArea";
import promoImgTwo from "../../../../../public/assets/img/promotion/2.png";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import AboutPromotionArea from "@/components/Promotion/AboutPromotionArea";
import AboutTestimonialArea from "@/components/Testimonial/AboutTestimonialArea";
import AboutFactArea from "@/components/Fact/AboutFactArea";

export const metadata: Metadata = {
  title: "About - Kindergarten & School Next js Template",
};

const About = () => {
  return (
    <>
      <BreadcrumbOne title="About" subTitle="About Us" />
      <HomePromotionArea promo_space="pt-120 pb-60" promoImg={promoImgTwo} />
      <HomeThreeFeatureArea wave={true} />
      <AboutPromotionArea />
      <AboutTestimonialArea />
      <HomeTeacherArea />
      <AboutFactArea />
      <HomeNewsletter />
    </>
  );
};

export default About;
