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


export default async function ProgramDetails(props: PageParamsProps) {
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