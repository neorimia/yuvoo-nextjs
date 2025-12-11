import React from "react";
import { Metadata } from "next";
import HomeNewsletter from "@/components/Newsletter/HomeNewsletter";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import WishlistMain from "@/components/Shop/WishlistMain";

export const metadata: Metadata = {
  title: "Wishlist - Kindergarten & School Next js Template",
};

const Wishlist = () => {
  return (
    <>
      <BreadcrumbOne title="Wishlist" subTitle="Wishlist" />
      <WishlistMain />
      <HomeNewsletter />
    </>
  );
};

export default Wishlist;
