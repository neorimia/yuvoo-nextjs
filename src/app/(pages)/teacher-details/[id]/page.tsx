import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import HomeNewsletter from "@/components/Newsletter/HomeNewsletter";
import TeacherDetailsMain from "@/components/Teacher/TeacherDetailsMain";
import TeacherTimeTable from "@/components/Teacher/TeacherTimeTable";
import { PageParamsProps } from "@/types/custom-interface";


export default async function TeacherDetails(props: PageParamsProps) {
    const resolvedParams = await props.params;
    const { id } = resolvedParams;

    return (
        <>
            <BreadcrumbOne title="Teacher Details" subTitle="Teacher Details" />
            <TeacherDetailsMain id={id} />
            <TeacherTimeTable />
            <HomeNewsletter />
        </>
    );
}