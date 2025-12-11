import React from "react";
import { Metadata } from "next";
import HomeNewsletter from "@/components/Newsletter/HomeNewsletter";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import BlogSidebarMain from "@/components/Blog/BlogSidebarMain";

export const metadata: Metadata = {
  title: "News Sidebar - Kindergarten & School Next js Template",
};

const NewsSidebar = () => {
  return (
    <>
      <BreadcrumbOne title="News Sidebar" subTitle="News Sidebar" />
      <BlogSidebarMain />
      <HomeNewsletter />
    </>
  );
};

export default NewsSidebar;
