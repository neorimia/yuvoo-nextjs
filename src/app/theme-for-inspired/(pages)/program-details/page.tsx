import React from "react";
import { Metadata } from "next";
import HomeNewsletter from "@/components/Newsletter/HomeNewsletter";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import ProgramDetailsMain from "@/components/Program/ProgramDetailsMain";
import ProgramCategories from "@/components/Categories/ProgramCategories";
import ClassDetailsWidget from "@/components/Class/ClassDetailsWidget";
import LearningSchedule from "@/components/Class/LearningSchedule";
import ClassDetailsWidgetTwo from "@/components/Class/ClassDetailsWidgetTwo";
import HomeBannerArea from "@/components/Banner/HomeBannerArea";
import MoreProgrammers from "@/components/Program/ProgramSlider";

export const metadata: Metadata = {
  title: "Program Details - Kindergarten & School Next js Template",
};

const ProgramDetails = () => {
  return (
    <>
      <BreadcrumbOne title="Program Details" subTitle="Program Details" />
      <ProgramDetailsMain id={1} />
      <ProgramCategories />
      <ClassDetailsWidget />
      <LearningSchedule />
      <ClassDetailsWidgetTwo />
      <HomeBannerArea />
      <MoreProgrammers />
      <HomeNewsletter />
    </>
  );
};

export default ProgramDetails;
