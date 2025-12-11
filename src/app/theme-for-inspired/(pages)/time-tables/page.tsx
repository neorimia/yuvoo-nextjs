import React from "react";
import { Metadata } from "next";
import HomeNewsletter from "@/components/Newsletter/HomeNewsletter";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import TimeTablesMain from "@/components/TimeTable/TimeTablesMain";

export const metadata: Metadata = {
  title: "Time Tables - Kindergarten & School Next js Template",
};

const TimeTables = () => {
  return (
    <>
      <BreadcrumbOne title="Time Tables" subTitle="Time Tables" />
      <TimeTablesMain />
      <HomeNewsletter />
    </>
  );
};

export default TimeTables;
