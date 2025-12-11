"use cache";
import React from "react";
import { Metadata } from "next";
import HomeNewsletter from "@/components/Newsletter/HomeNewsletter";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import ForgotPasswordMain from "@/components/Auth/ForgotPasswordMain";
// import { cacheLife } from "next/cache";

export const metadata: Metadata = {
  title: "Forgot Password - Kindergarten & School Next js Template",
};

const ForgotPassword = async () => {
  // CACHED: Static page - no user-specific data, safe to cache
  // cacheLife('hours') - page content changes infrequently
  return (
    <>
      <BreadcrumbOne title="Forgot Password" subTitle="Forgot Password" />
      <ForgotPasswordMain />
      <HomeNewsletter />
    </>
  );
};

export default ForgotPassword;
