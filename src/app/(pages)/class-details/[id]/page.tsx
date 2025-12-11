import HomeBannerArea from "@/components/Banner/HomeBannerArea";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import ClassDetailsMain from "@/components/Class/ClassDetailsMain";
import HomeNewsletter from "@/components/Newsletter/HomeNewsletter";
import MoreProgrammers from "@/components/Program/ProgramSlider";
import { PageParamsProps } from "@/types/custom-interface";


export default async function ClassDetails(props: PageParamsProps) {
    const resolvedParams = await props.params;
    const { id } = resolvedParams;

    return (
        <>
            <BreadcrumbOne title="Class Details" subTitle="Class Details" />
            <ClassDetailsMain id={id} />
            <HomeBannerArea />
            <MoreProgrammers />
            <HomeNewsletter />
        </>
    );
}