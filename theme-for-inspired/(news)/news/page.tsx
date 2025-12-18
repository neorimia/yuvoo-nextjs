import React from "react";
import { Metadata } from "next";
import HomeNewsletter from "@/components/Newsletter/HomeNewsletter";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import BlogPageMain from "@/components/Blog/BlogPageMain";

export const metadata: Metadata = {
  title: "News - Kindergarten & School Next js Template",
};

const News = () => {
  return (
    <>
      <BreadcrumbOne title="News" subTitle="News" />
      <BlogPageMain />
      <HomeNewsletter />
    </>
  );
};

export default News;
