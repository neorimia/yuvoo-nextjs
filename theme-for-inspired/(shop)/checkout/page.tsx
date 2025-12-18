import React from "react";
import { Metadata } from "next";
import HomeNewsletter from "@/components/Newsletter/HomeNewsletter";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import CheckoutMain from "@/components/Shop/CheckoutMain";

export const metadata: Metadata = {
  title: "Checkout - Kindergarten & School Next js Template",
};

const Checkout = () => {
  return (
    <>
      <BreadcrumbOne title="Checkout" subTitle="Checkout" />
      <CheckoutMain />
      <HomeNewsletter />
    </>
  );
};

export default Checkout;
