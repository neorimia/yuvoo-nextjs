import React from "react";
import { Metadata } from "next";
import HomeNewsletter from "@/components/Newsletter/HomeNewsletter";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import BlogDetailsMain from "@/components/Blog/BlogDetailsMain";
import RelatedBlog from "@/components/Blog/RelatedBlog";

export const metadata: Metadata = {
  title: "News Details - Kindergarten & School Next js Template",
};

const NewsDetails = () => {
  return (
    <>
      <BreadcrumbOne title="News Details" subTitle="News Details" />
      <BlogDetailsMain id={1} />
      <RelatedBlog />
      <HomeNewsletter />
    </>
  );
};

export default NewsDetails;
