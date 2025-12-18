import React from "react";
import { Metadata } from "next";
import HeroHomeThree from "@/components/HeroArea/HeroHomeThree";
import CategoriesHomeThree from "@/components/Categories/CategoriesHomeThree";
import HomeThreeBannerArea from "@/components/Banner/HomeThreeBannerArea";
import HomeThreeAboutArea from "@/components/About/HomeThreeAboutArea";
import HomeThreeFeatureArea from "@/components/Feature/HomeThreeFeatureArea";
import HomeBlogArea from "@/components/Blog/HomeBlogArea";
import HomeNewsletter from "@/components/Newsletter/HomeNewsletter";
import HomeThreeShop from "@/components/Product/ProductHomeThree";

export const metadata: Metadata = {
  title: "Home Three - Kindergarten & School Next js Template",
};

const HomeTwo = () => {
  return (
    <>
      <HeroHomeThree />
      <CategoriesHomeThree />
      <HomeThreeBannerArea />
      <HomeThreeShop />
      <HomeThreeAboutArea />
      <HomeThreeFeatureArea />
      <HomeBlogArea blog_wrap="bd-blog-content-2" blog_date="bd-blog-date-2" blog_dot={true} />
      <HomeNewsletter />
    </>
  );
};

export default HomeTwo;
