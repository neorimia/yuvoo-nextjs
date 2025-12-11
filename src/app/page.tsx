import Wrapper from "@/layouts/Wrapper";
import { Metadata } from "next";
import FooterOne from "@/layouts/Footer/FooterOne";
import HeaderOne from "@/layouts/Header/HeaderOne";
import HomePage from "./home/page";

export const metadata: Metadata = {
  title: "Yuvoo - Descoperă sportul potrivit copilului tău",
  description:
    "Platformă pentru găsirea sportului potrivit pentru copiii tăi. Cu ajutorul AI Coach, descoperă cluburi sportive verificate și consultează specialiști pediatri.",
  keywords: [
    "sport copii",
    "cluburi sportive",
    "sporturi pentru copii",
    "AI Coach",
    "specialiști pediatri",
    "România",
  ],
};

const Home = () => {
  return (
    <>
      <Wrapper>
        <HeaderOne />
        <main>
          <HomePage />
        </main>
        <FooterOne />
      </Wrapper>
    </>
  );
};

export default Home;
