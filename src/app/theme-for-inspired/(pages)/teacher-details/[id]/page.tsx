import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import HomeNewsletter from "@/components/Newsletter/HomeNewsletter";
import TeacherDetailsMain from "@/components/Teacher/TeacherDetailsMain";
import TeacherTimeTable from "@/components/Teacher/TeacherTimeTable";
import { PageParamsProps } from "@/types/custom-interface";

// TODO: Implement proper generateStaticParams when real data fetching is added
// For now, returning a dummy value to satisfy Cache Components requirement
export async function generateStaticParams() {
  return [{ id: "1" }];
}

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
