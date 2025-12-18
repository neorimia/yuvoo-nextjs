import React from "react";
import { Metadata } from "next";
import HomeNewsletter from "@/components/Newsletter/HomeNewsletter";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import BlogClassicMain from "@/components/Blog/BlogClassicMain";

export const metadata: Metadata = {
  title: "News Classic - Kindergarten & School Next js Template",
};

const NewsClassic = () => {
  return (
    <>
      <BreadcrumbOne title="News Classic" subTitle="News Classic" />
      <BlogClassicMain />
      <HomeNewsletter />
    </>
  );
};

export default NewsClassic;
