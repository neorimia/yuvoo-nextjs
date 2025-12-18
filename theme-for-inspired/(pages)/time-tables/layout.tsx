import FooterOne from "@/layouts/Footer/FooterOne";
import HeaderFour from "@/layouts/Header/HeaderFour";
import Wrapper from "@/layouts/Wrapper";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Wrapper>
        <HeaderFour />
        {children}
        <FooterOne />
      </Wrapper>
    </>
  );
}
