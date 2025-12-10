import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../../../public/assets/img/logo/logo.svg";
import MobileMenu from "./MobileMenu";

interface MenuSidebarProps {
  sideMenuOpen: boolean;
  setSideMenuOpen: (open: boolean) => void;
}

const MenuSidebar: React.FC<MenuSidebarProps> = ({ sideMenuOpen, setSideMenuOpen }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <React.Fragment>
      <div className={`offcanvas__area ${sideMenuOpen ? "offcanvas-opened" : ""}`}>
        <div className="offcanvas__bg"></div>
        <div className="offcanvas__wrapper">
          <div className="offcanvas__content">
            <div className="offcanvas__top mb-40 d-flex justify-content-between align-items-center">
              <div className="offcanvas__logo logo">
                <Link href="/">
                  <Image src={logo} style={{ width: "100%", height: "100%" }} alt="img not found" />
                </Link>
              </div>
              <div className="offcanvas__close">
                <button
                  className="offcanvas__close-btn"
                  type="button"
                  onClick={() => setSideMenuOpen(false)}
                >
                  <i className="fa-thin fa-times"></i>
                </button>
              </div>
            </div>
            <div className="offcanvas__search mb-40">
              <form onSubmit={handleSubmit}>
                <button type="submit">
                  <i className="flaticon-search"></i>
                </button>
                <input type="text" placeholder="Caută aici..." />
              </form>
            </div>
            <div className="mobile-menu fix mb-30 menu-counter d-lg-none mean-container">
              <div className="mean-bar">
                <MobileMenu />
              </div>
            </div>
            <div className="offcanvas__about d-none d-lg-block mb-30">
              <h4>Despre Yuvoo</h4>
              <p>
                Yuvoo te ajută să găsești activitățile sportive perfecte pentru copilul tău.
                Descoperă sporturi personalizate, cluburi verificate și specialiști pediatri.
              </p>
            </div>
            <div className="offcanvas__contact mb-30">
              <h4>Informații de contact</h4>
              <ul>
                <li className="d-flex align-items-center gap-2">
                  <div className="offcanvas__contact-icon">
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://www.google.com/maps/place/Bucharest"
                    >
                      <i className="fal fa-map-marker-alt"></i>
                    </a>
                  </div>
                  <div className="offcanvas__contact-text">
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://www.google.com/maps/place/Bucharest"
                    >
                      București, România
                    </a>
                  </div>
                </li>
                <li className="d-flex align-items-center gap-2">
                  <div className="offcanvas__contact-icon">
                    <a href="tel:+40700000000">
                      <i className="far fa-phone"></i>
                    </a>
                  </div>
                  <div className="offcanvas__contact-text">
                    <a href="tel:+40700000000">+40 700 000 000</a>
                  </div>
                </li>
                <li className="d-flex align-items-center gap-2">
                  <div className="offcanvas__contact-icon">
                    <a href="mailto:contact@yuvoo.ro">
                      <i className="fal fa-envelope"></i>
                    </a>
                  </div>
                  <div className="offcanvas__contact-text">
                    <a href="mailto:contact@yuvoo.ro">contact@yuvoo.ro</a>
                  </div>
                </li>
              </ul>
            </div>
            <div className="offcanvas__social">
              <ul>
                <li>
                  <a target="_blank" rel="noreferrer" href="https://www.facebook.com/">
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a target="_blank" rel="noreferrer" href="https://twitter.com/">
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a target="_blank" rel="noreferrer" href="https://www.youtube.com/">
                    <i className="fa-brands fa-youtube"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`body-overlay ${sideMenuOpen ? "opened" : ""}`}
        onClick={() => setSideMenuOpen(false)}
      ></div>
    </React.Fragment>
  );
};

export default MenuSidebar;
