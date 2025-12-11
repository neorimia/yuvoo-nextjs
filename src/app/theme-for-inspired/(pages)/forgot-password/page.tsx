import React from "react";
import { Metadata } from "next";
import HomeNewsletter from "@/components/Newsletter/HomeNewsletter";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import ForgotPasswordMain from "@/components/Auth/ForgotPasswordMain";

export const metadata: Metadata = {
  title: "Forgot Password - Kindergarten & School Next js Template",
};

const ForgotPassword = () => {
  return (
    <>
      <BreadcrumbOne title="Forgot Password" subTitle="Forgot Password" />
      <ForgotPasswordMain />
      <HomeNewsletter />
    </>
  );
};

export default ForgotPassword;
