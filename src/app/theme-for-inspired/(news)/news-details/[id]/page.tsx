import BlogDetailsMain from "@/components/Blog/BlogDetailsMain";
import RelatedBlog from "@/components/Blog/RelatedBlog";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import HomeNewsletter from "@/components/Newsletter/HomeNewsletter";
import { PageParamsProps } from "@/types/custom-interface";

// TODO: Implement proper generateStaticParams when real data fetching is added
export async function generateStaticParams() {
  return [{ id: "1" }];
}

export default async function NewsDetails(props: PageParamsProps) {
  const resolvedParams = await props.params;
  const { id } = resolvedParams;

  return (
    <>
      <BreadcrumbOne title="News Details" subTitle="News Details" />
      <BlogDetailsMain id={id} />
      <RelatedBlog />
      <HomeNewsletter />
    </>
  );
}
