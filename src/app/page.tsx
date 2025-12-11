import Wrapper from "@/layouts/Wrapper";
import { Metadata } from "next";
import FooterOne from "@/layouts/Footer/FooterOne";
import HeaderOne from "@/layouts/Header/HeaderOne";
import HomePage from "./home/page";

export const metadata: Metadata = {
  title: "Home - Kindergarten & School Next js Template",
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
