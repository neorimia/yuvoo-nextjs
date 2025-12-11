"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/assets/img/logo/logo.svg";
import useGlobalContext from "@/hooks/useContext";
import SearchPopup from "./components/Popup/SearchPopup";
import TopbarOne from "./components/Topbar/TopbarOne";
import HeaderMenus from "./components/Menu/HeaderMenus";
import MenuSidebar from "./components/Sidebar/MenuSidebar";

const HeaderOne = () => {
    const { scrollDirection, sideMenuOpen, setSideMenuOpen, isSearchOpen, setIsSearchOpen } = useGlobalContext()
    return (
        <>
            <header>
                <div className="bd-header">
                    <TopbarOne />
                    <div id="header-sticky"
                        className={`bd-header-bottom ${scrollDirection === "down" ? "header-sticky" : ""}`}>
                        <div className="container">
                            <div className="mega-menu-wrapper p-relative">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="bd-header-logo">
                                        <Link href="/">
                                            <Image src={logo}
                                                style={
                                                    {
                                                        width: "100%",
                                                        height: "100%"
                                                    }
                                                }
                                                alt="img not found"/>
                                        </Link>
                                    </div>
                                    <div className="bd-main-menu d-none d-lg-flex align-items-center">
                                        <nav id="mobile-menu">
                                            <HeaderMenus />
                                        </nav>
                                        <div className="bd-search-btn-wrapper">
                                            <button className="bd-search-open-btn" type="button"
                                                onClick={
                                                    () => setIsSearchOpen(true)
                                            }>
                                                <i className="flaticon-search"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="bd-header-bottom-right d-flex justify-content-end align-items-center">
                                        <div className="bd-header-meta-item d-none bd-header-menu-meta d-xxl-flex align-items-center">
                                            <div className="bd-header-meta-icon">
                                                <i className="flaticon-phone-call"></i>
                                            </div>
                                            <div className="bd-header-meta-text">
                                                <p>
                                                    <a href="tel:9072003462">907-200-3462</a>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="bd-header-btn d-none d-xl-block">
                                            <Link href="/contact" className="bd-btn">
                                                <span className="bd-btn-inner">
                                                    <span className="bd-btn-normal">Apply now</span>
                                                    <span className="bd-btn-hover">Apply now</span>
                                                </span>
                                            </Link>
                                        </div>
                                        <div className="header-hamburger">
                                            <button type="button" className="hamburger-btn offcanvas-open-btn" onClick={() => setSideMenuOpen(true)}
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
            <SearchPopup isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen}/> 
            {/* search modal end */}

            {/* full canvas area start */}
            <MenuSidebar sideMenuOpen={sideMenuOpen} setSideMenuOpen={setSideMenuOpen}/>
            {/* full canvas area end */} </>
    );
};

export default HeaderOne;
