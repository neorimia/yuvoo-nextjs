"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuData } from "@/data";
import { routes } from "@/lib/routes";

interface MobileMenuProps {
  onClose?: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ onClose }) => {
  const pathname = usePathname();
  const [subMenu, setSubMenu] = useState<string>("");
  const [navTitle, setNavTitle] = useState<string>("");

  // Handle menu item click - close sidebar
  const handleLinkClick = () => {
    if (onClose) {
      onClose();
    }
  };

  // Helper function to check if a link is active
  // Uses improved logic for better active state detection
  const isActive = (link: string, isSubmenu = false) => {
    if (link === "/") {
      return pathname === "/";
    }

    // Special handling for Clubs menu
    if (link === routes.clubs.list) {
      return pathname === routes.clubs.list || pathname === `${routes.clubs.list}/`;
    }

    // Special handling for "Pentru Cluburi" submenu
    if (link === routes.clubs.landing) {
      // Active on exact match or sub-routes
      return pathname === link || pathname === `${link}/` || pathname.startsWith(`${link}/`);
    }

    // Special handling for Doctors menu
    if (link === routes.doctors.list) {
      return pathname === routes.doctors.list || pathname === `${routes.doctors.list}/`;
    }

    // Special handling for "Pentru Doctori" submenu
    if (link === routes.doctors.landing) {
      return pathname === link || pathname === `${link}/` || pathname.startsWith(`${link}/`);
    }

    // For submenus, allow sub-routes
    if (isSubmenu) {
      return pathname === link || pathname === `${link}/` || pathname.startsWith(`${link}/`);
    }

    // For parent menu items, only exact match
    return pathname === link || pathname === `${link}/`;
  };

  //openMobileMenu
  const openMobileMenu = (menu: string) => {
    if (navTitle === menu) {
      setNavTitle("");
    } else {
      setNavTitle(menu);
    }
  };
  // openSubMobileMenu
  const openSubMobileMenu = (s_menu: string) => {
    if (subMenu === s_menu) {
      setSubMenu("");
    } else {
      setSubMenu(s_menu);
    }
  };

  return (
    <nav className="mean-nav">
      <ul>
        {menuData.map((menu, i) => {
          // For parent menu items with dropdowns, check if any submenu is active
          // Parent should only be active if exact match, not if submenu is active
          let parentActive = false;
          if (menu.hasDropdown && menu.submenus) {
            const anySubmenuActive = menu.submenus.some((sub) => isActive(sub.link, true));
            // Parent is active only if exact match AND no submenu is active
            parentActive = isActive(menu.link, false) && !anySubmenuActive;
          } else {
            parentActive = isActive(menu.link, false);
          }

          // Simple menu item (no dropdown)
          if (!menu.hasDropdown && !menu.megaMenu && !menu.megaMenuTwo && !menu.pages) {
            return (
              <li key={i} className={parentActive ? "active" : ""}>
                <Link
                  href={menu.link}
                  className={parentActive ? "active" : ""}
                  onClick={handleLinkClick}
                >
                  {menu.title}
                </Link>
              </li>
            );
          }

          // Menu item with dropdown (but not mega menu)
          if (menu.hasDropdown && !menu?.megaMenu && !menu.pages && !menu.megaMenuTwo) {
            return (
              <li key={i} className={`has-dropdown ${parentActive ? "active" : ""}`}>
                <Link
                  href={menu.link}
                  className={parentActive ? "active" : ""}
                  onClick={handleLinkClick}
                >
                  {menu.title}
                </Link>
                <ul
                  className="submenu"
                  style={{
                    display: navTitle === menu.title ? "block" : "none",
                  }}
                >
                  {menu.submenus &&
                    menu.submenus.map((sub, i) => {
                      const subActive = isActive(sub.link, true);
                      return (
                        <li key={i} className={subActive ? "active" : ""}>
                          <Link
                            href={sub.link}
                            className={subActive ? "active" : ""}
                            onClick={handleLinkClick}
                          >
                            {sub.title}
                          </Link>
                        </li>
                      );
                    })}
                </ul>
                <a
                  className={`mean-expand ${navTitle === menu.title ? "mean-clicked" : ""}`}
                  onClick={() => openMobileMenu(menu.title)}
                  style={{ fontSize: "18px", cursor: "pointer" }}
                >
                  <i className="fal fa-plus"></i>
                </a>
              </li>
            );
          }

          // Mega menu (if used in future)
          if (menu?.megaMenu && !menu.pages) {
            return (
              <li key={i} className={`has-dropdown has-mega-menu ${parentActive ? "active" : ""}`}>
                <Link
                  href={menu.link}
                  className={parentActive ? "active" : ""}
                  onClick={handleLinkClick}
                >
                  {menu.title}
                </Link>
                <ul
                  className="mega-menu"
                  style={{
                    display: navTitle === menu.title ? "block" : "none",
                  }}
                >
                  {menu?.mega_menus &&
                    menu?.mega_menus.map((mega_m, i) => {
                      const megaActive = isActive(mega_m.link);
                      return (
                        <li key={i}>
                          <Link
                            href={mega_m.link}
                            className={`mega-menu-title ${megaActive ? "active" : ""}`}
                            onClick={handleLinkClick}
                          >
                            {mega_m.title}
                          </Link>
                          <ul
                            style={{
                              display: subMenu === mega_m.title ? "block" : "none",
                            }}
                          >
                            {mega_m.submenus.map((sub_m, i) => {
                              const subMegaActive = isActive(sub_m.link);
                              return (
                                <li key={i} className={subMegaActive ? "active" : ""}>
                                  <Link
                                    href={sub_m.link}
                                    className={subMegaActive ? "active" : ""}
                                    onClick={handleLinkClick}
                                  >
                                    {sub_m.title}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                          <a
                            className={`mean-expand ${subMenu === mega_m.title ? "mean-clicked" : ""}`}
                            onClick={() => openSubMobileMenu(mega_m.title)}
                            style={{ fontSize: "18px", cursor: "pointer" }}
                          >
                            <i className="fal fa-plus"></i>
                          </a>
                        </li>
                      );
                    })}
                </ul>
                <a
                  className={`mean-expand ${navTitle === menu.title ? "mean-clicked" : ""}`}
                  onClick={() => openMobileMenu(menu.title)}
                  style={{ fontSize: "18px", cursor: "pointer" }}
                >
                  <i className="fal fa-plus"></i>
                </a>
              </li>
            );
          }

          // Mega menu two (if used in future)
          if (menu.megaMenuTwo && !menu.pages) {
            return (
              <li key={i} className={`has-dropdown has-mega-menu ${parentActive ? "active" : ""}`}>
                <Link
                  href={menu.link}
                  className={parentActive ? "active" : ""}
                  onClick={handleLinkClick}
                >
                  {menu.title}
                </Link>
                <ul
                  className="mega-menu mega-menu-2"
                  style={{
                    display: navTitle === menu.title ? "block" : "none",
                  }}
                >
                  {menu?.mega_menus_two &&
                    menu?.mega_menus_two.map((megaTwo, i) => (
                      <li key={i}>
                        <ul>
                          {megaTwo.submenus.map((sub_mega_two, i) => {
                            const subMegaTwoActive = isActive(sub_mega_two?.link || "#");
                            return (
                              <li key={i} className={subMegaTwoActive ? "active" : ""}>
                                <Link
                                  href={sub_mega_two?.link || "#"}
                                  className={subMegaTwoActive ? "active" : ""}
                                  onClick={handleLinkClick}
                                >
                                  {sub_mega_two?.title}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                    ))}
                </ul>
                <a
                  className={`mean-expand ${navTitle === menu.title ? "mean-clicked" : ""}`}
                  onClick={() => openMobileMenu(menu.title)}
                  style={{ fontSize: "18px", cursor: "pointer" }}
                >
                  <i className="fal fa-plus"></i>
                </a>
              </li>
            );
          }

          // Pages menu (if used in future)
          if (menu.pages) {
            return (
              <li key={i} className={`has-dropdown has-mega-menu ${parentActive ? "active" : ""}`}>
                <Link
                  href={menu.link}
                  className={parentActive ? "active" : ""}
                  onClick={handleLinkClick}
                >
                  {menu.title}
                </Link>
                <ul
                  className="mega-menu"
                  style={{
                    display: navTitle === menu.title ? "block" : "none",
                  }}
                >
                  {menu?.mega_menus &&
                    menu?.mega_menus.map((mega_m, i) => {
                      const megaActive = isActive(mega_m.link);
                      return (
                        <li key={i}>
                          <Link
                            href={mega_m.link}
                            className={`mega-menu-title ${megaActive ? "active" : ""}`}
                            onClick={handleLinkClick}
                          >
                            {mega_m.title}
                          </Link>
                          <ul
                            style={{
                              display: subMenu === mega_m.title ? "block" : "none",
                            }}
                          >
                            {mega_m.submenus.map((sub_m, i) => {
                              const subMegaActive = isActive(sub_m.link);
                              return (
                                <li key={i} className={subMegaActive ? "active" : ""}>
                                  <Link
                                    href={sub_m.link}
                                    className={subMegaActive ? "active" : ""}
                                    onClick={handleLinkClick}
                                  >
                                    {sub_m.title}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                          <a
                            className={`mean-expand ${subMenu === mega_m.title ? "mean-clicked" : ""}`}
                            onClick={() => openSubMobileMenu(mega_m.title)}
                            style={{ fontSize: "18px", cursor: "pointer" }}
                          >
                            <i className="fal fa-plus"></i>
                          </a>
                        </li>
                      );
                    })}
                </ul>
                <a
                  className={`mean-expand ${navTitle === menu.title ? "mean-clicked" : ""}`}
                  onClick={() => openMobileMenu(menu.title)}
                  style={{ fontSize: "18px", cursor: "pointer" }}
                >
                  <i className="fal fa-plus"></i>
                </a>
              </li>
            );
          }

          return null;
        })}
      </ul>
    </nav>
  );
};

export default MobileMenu;
