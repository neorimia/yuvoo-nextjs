import { Metadata } from "next";
import { headers } from "next/headers";
import HeroYuvoo from "@/components/features/home/HeroYuvoo";
import React from "react";
import HomePromotionArea from "@/components/features/home/HomePromotionArea";
import HowItWorks from "@/components/features/home/HowItWorks";
import FeaturedSports from "@/components/features/home/FeaturedSports";
import FeaturedClubs from "@/components/features/home/FeaturedClubs";
import HomeTestimonial from "@/components/features/home/HomeTestimonial";
import FeaturedDoctors from "@/components/features/home/FeaturedDoctors";
import HomeFaq from "@/components/features/home/HomeFaq";
import HomeTrustSignals from "@/components/features/home/HomeTrustSignals";
import HomeStats from "@/components/features/home/HomeStats";

export const metadata: Metadata = {
  title: "Yuvoo - Descoperă sportul potrivit copilului tău",
  description:
    "Descoperă cluburi sport verificate pentru copii în București. Recomandări personalizate bazate pe profilul copilului tău cu AI Coach. Începe chestionarul gratuit.",
  keywords: [
    "sport copii bucuresti",
    "cluburi sport copii",
    "sport potrivit copil",
    "cluburi verificate copii",
    "specialist pediatru sport",
    "ce sport i se potriveste copilului",
    "cluburi fotbal copii bucuresti",
    "activitati sportive copii",
    "recomandari sport AI",
    "sporturi pentru copii romania",
  ],
  openGraph: {
    title: "Yuvoo - Descoperă sportul potrivit copilului tău",
    description:
      "Descoperă cluburi sport verificate pentru copii în București. Recomandări personalizate bazate pe profilul copilului tău cu AI Coach.",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro",
    siteName: "Yuvoo",
    locale: "ro_RO",
    type: "website",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro"}/assets/img/logo/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Yuvoo - Platformă AI pentru sporturi copii",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yuvoo - Descoperă sportul potrivit copilului tău",
    description:
      "Descoperă cluburi sport verificate pentru copii în București. Recomandări personalizate cu AI Coach.",
    images: [
      `${process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro"}/assets/img/logo/og-image.jpg`,
    ],
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro",
  },
};

const Home = async () => {
  // Make page dynamic to avoid Sentry crypto.randomUUID() issue during build
  await headers();
  return (
    <>
      <HeroYuvoo />
      <HowItWorks />
      <HomePromotionArea promo_space="pt-120 pb-60" />
      <HomeTrustSignals />
      <HomeStats />
      <FeaturedSports />
      <FeaturedClubs />
      <FeaturedDoctors />
      <HomeTestimonial />
      <HomeFaq />
    </>
  );
};

export default Home;
