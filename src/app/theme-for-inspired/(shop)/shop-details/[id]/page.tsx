import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import HomeNewsletter from "@/components/Newsletter/HomeNewsletter";
import ShopDetailsMain from "@/components/Shop/ShopDetailsMain";
import { PageParamsProps } from "@/types/custom-interface";

// TODO: Implement proper generateStaticParams when real data fetching is added
export async function generateStaticParams() {
  return [{ id: "1" }];
}

export default async function ShopDetails(props: PageParamsProps) {
  const resolvedParams = await props.params;
  const { id } = resolvedParams;

  return (
    <>
      <BreadcrumbOne title="Shop Details" subTitle="Shop Details" />
      <ShopDetailsMain id={id} />
      <HomeNewsletter />
    </>
  );
}
