"use client";

import BackToTop from "@/components/Common/BackToTop";
// import Preloader from "@/components/Common/Preloader/Preloader";
import React, { useEffect } from "react";

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  // Load Bootstrap JS only on the client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("bootstrap/dist/js/bootstrap.bundle.min")
        .then((bootstrap) => {
          // Bootstrap 5.3.3 should automatically expose itself to window.bootstrap
          // But we ensure it's available
          const bootstrapDefault = (bootstrap as { default?: unknown }).default;
          if (!window.bootstrap && bootstrap && bootstrapDefault) {
            // Type assertion needed for window.bootstrap which isn't in window types
            (window as { bootstrap?: unknown }).bootstrap = bootstrapDefault;
          }
          console.log(
            "Bootstrap loaded",
            window.bootstrap ? "and available on window" : "but not on window"
          );
        })
        .catch((err) => console.error("Bootstrap failed to load", err));
    }
  }, []);

  // Initialize WOW.js animations on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("wow.js").then((WOWModule) => {
        const WOWClass = WOWModule.default; // Access the default export
        const wow = new WOWClass({
          boxClass: "wow",
          animateClass: "animated",
          offset: 0,
          mobile: true,
          live: true,
        });
        wow.init();
      });
    }
  }, []);

  return (
    <>
      {/*{isLoading ? <Preloader /> : children}*/}
      {children}
      <BackToTop />
    </>
  );
};

export default Wrapper;
