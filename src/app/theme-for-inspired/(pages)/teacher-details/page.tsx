import React from "react";
import { Metadata } from "next";
import HomeNewsletter from "@/components/Newsletter/HomeNewsletter";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import TeacherDetailsMain from "@/components/Teacher/TeacherDetailsMain";
import TeacherTimeTable from "@/components/Teacher/TeacherTimeTable";

export const metadata: Metadata = {
  title: "Teacher Details - Kindergarten & School Next js Template",
};

const TeacherDetails = () => {
  return (
    <>
      <BreadcrumbOne title="Teacher Details" subTitle="Teacher Details" />
      <TeacherDetailsMain id={1} />
      <TeacherTimeTable />
      <HomeNewsletter />
    </>
  );
};

export default TeacherDetails;
