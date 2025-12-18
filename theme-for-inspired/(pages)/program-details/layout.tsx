import { headers } from "next/headers";
import FooterOne from "@/layouts/Footer/FooterOne";
import HeaderFour from "@/layouts/Header/HeaderFour";
import Wrapper from "@/layouts/Wrapper";
import React from "react";

export default async function Layout({ children }: { children: React.ReactNode }) {
  // CRITICAL: Call headers() FIRST before anything else to make route dynamic
  // This must happen before Sentry tries to use crypto.randomUUID()
  // Use void to explicitly mark as side effect
  void (await headers());
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
