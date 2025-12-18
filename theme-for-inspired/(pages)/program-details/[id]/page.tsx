"use client";

import { useParams } from "next/navigation";
import HomeBannerArea from "@/components/Banner/HomeBannerArea";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import ProgramCategories from "@/components/Categories/ProgramCategories";
import ClassDetailsWidget from "@/components/Class/ClassDetailsWidget";
import ClassDetailsWidgetTwo from "@/components/Class/ClassDetailsWidgetTwo";
import LearningSchedule from "@/components/Class/LearningSchedule";
import HomeNewsletter from "@/components/Newsletter/HomeNewsletter";
import ProgramDetailsMain from "@/components/Program/ProgramDetailsMain";
import MoreProgrammers from "@/components/Program/ProgramSlider";

// Convert to client component to avoid Sentry crypto.randomUUID() issue during build
// This is a legacy theme page, so client-side rendering is acceptable

export default function ProgramDetails() {
  const params = useParams();
  const id = parseInt(params?.id as string);

  return (
    <>
      <BreadcrumbOne title="Program Details" subTitle="Program Details" />
      <ProgramDetailsMain id={id} />
      <ProgramCategories />
      <ClassDetailsWidget />
      <LearningSchedule />
      <ClassDetailsWidgetTwo />
      <HomeBannerArea />
      <MoreProgrammers />
      <HomeNewsletter />
    </>
  );
}
