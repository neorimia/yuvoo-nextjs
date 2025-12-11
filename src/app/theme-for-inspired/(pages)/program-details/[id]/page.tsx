import HomeBannerArea from "@/components/Banner/HomeBannerArea";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import ProgramCategories from "@/components/Categories/ProgramCategories";
import ClassDetailsWidget from "@/components/Class/ClassDetailsWidget";
import ClassDetailsWidgetTwo from "@/components/Class/ClassDetailsWidgetTwo";
import LearningSchedule from "@/components/Class/LearningSchedule";
import HomeNewsletter from "@/components/Newsletter/HomeNewsletter";
import ProgramDetailsMain from "@/components/Program/ProgramDetailsMain";
import MoreProgrammers from "@/components/Program/ProgramSlider";
import { PageParamsProps } from "@/types/custom-interface";

// TODO: Implement proper generateStaticParams when real data fetching is added
// For now, returning a dummy value to satisfy Cache Components requirement
export async function generateStaticParams() {
  return [{ id: "1" }];
}

export default async function ProgramDetails(props: PageParamsProps) {
  // Page uses params which makes it dynamic - no need for headers()
  const resolvedParams = await props.params;
  const { id } = resolvedParams;

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
