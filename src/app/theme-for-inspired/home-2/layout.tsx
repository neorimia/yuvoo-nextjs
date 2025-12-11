import FooterTwo from "@/layouts/Footer/FooterTwo";
import HeaderTwo from "@/layouts/Header/HeaderTwo";
import Wrapper from "@/layouts/Wrapper";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Wrapper>
        <HeaderTwo />
        {children}
        <FooterTwo />
      </Wrapper>
    </>
  );
}
