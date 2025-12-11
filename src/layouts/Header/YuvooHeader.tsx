"use client";

import useGlobalContext from "@/hooks/useContext";
import React from "react";
import TopbarFour from "./components/Topbar/TopbarFour";
import Link from "next/link";
import Image from "next/image";
import HeaderMenus from "./components/Menu/HeaderMenus";
import logo from "../../../public/assets/img/logo/logo.svg";
import SearchPopup from "./components/Popup/SearchPopup";
import MenuSidebar from "./components/Sidebar/MenuSidebar";
import { routes } from "@/lib/routes";

const YuvooHeader = () => {
  const { scrollDirection, sideMenuOpen, setSideMenuOpen, isSearchOpen, setIsSearchOpen } =
    useGlobalContext();
  return (
    <>
      <header>
        <div className="bd-header">
          <TopbarFour />
          <div
            id="header-sticky"
            className={`bd-header-bottom ${scrollDirection === "down" ? "header-sticky" : ""}`}
          >
            <div className="container">
              <div className="mega-menu-wrapper p-relative">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="bd-header-logo">
                    <Link href={routes.home}>
                      <Image
                        src={logo}
                        style={{ width: "100%", height: "100%" }}
                        alt="Yuvoo Logo"
                      />
                    </Link>
                  </div>
                  <div className="bd-main-menu d-none d-lg-flex align-items-center">
                    <nav id="mobile-menu">
                      <HeaderMenus />
                    </nav>
                    <div className="bd-search-btn-wrapper">
                      <button className="bd-search-open-btn" onClick={() => setIsSearchOpen(true)}>
                        <i className="flaticon-search"></i>
                      </button>
                    </div>
                  </div>
                  <div className="bd-header-bottom-right d-flex justify-content-end align-items-center">
                    <div className="bd-header-btn d-none d-xl-block">
                      <Link href={routes.quiz.intro} className="bd-btn">
                        <span className="bd-btn-inner">
                          <span className="bd-btn-normal">Începe Chestionarul</span>
                          <span className="bd-btn-hover">Începe Chestionarul</span>
                        </span>
                      </Link>
                    </div>
                    <div className="header-hamburger">
                      <button
                        type="button"
                        className="hamburger-btn offcanvas-open-btn"
                        onClick={() => setSideMenuOpen(true)}
                      >
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* search modal start */}
      <SearchPopup isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
      {/* search modal end */}

      {/* full canvas area start */}
      <MenuSidebar sideMenuOpen={sideMenuOpen} setSideMenuOpen={setSideMenuOpen} />
      {/* full canvas area end */}
    </>
  );
};

export default YuvooHeader;
