import HomeAboutArea from "@/components/About/HomeAboutArea";
import HomeBannerArea from "@/components/Banner/HomeBannerArea";
import HomeBlogArea from "@/components/Blog/HomeBlogArea";
import HeroYuvoo from "@/components/features/home/HeroYuvoo";
import HomeNewsletter from "@/components/Newsletter/HomeNewsletter";
import HomeProgramArea from "@/components/Program/HomeProgramArea";
import HomePromotionArea from "@/components/Promotion/HomePromotionArea";
import HomeTeacherArea from "@/components/Teacher/HomeTeacherArea";
import HomeTestimonialArea from "@/components/Testimonial/HomeTestimonialArea";
import HomeClubArea from "@/components/features/clubs/HomeClubArea";
import { getFeaturedClubs } from "@/app/actions/clubs";
import React from "react";

export default async function HomePage() {
  // Fetch featured clubs for homepage
  const clubsResult = await getFeaturedClubs();
  const clubs = clubsResult.success ? clubsResult.data || [] : [];

  return (
    <>
      <HeroYuvoo />
      <HomePromotionArea promo_space="pt-120" />
      <HomeClubArea clubs={clubs} />
      <HomeProgramArea />
      <HomeAboutArea />
      <HomeBannerArea />
      <HomeTeacherArea />
      <HomeTestimonialArea />
      <HomeBlogArea />
      <HomeNewsletter />
    </>
  );
}
