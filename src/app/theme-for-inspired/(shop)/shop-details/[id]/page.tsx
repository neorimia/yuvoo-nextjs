import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import HomeNewsletter from "@/components/Newsletter/HomeNewsletter";
import ShopDetailsMain from "@/components/Shop/ShopDetailsMain";
import { PageParamsProps } from "@/types/custom-interface";

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
