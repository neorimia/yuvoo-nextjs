"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuData } from "@/data";

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
  const isActive = (link: string) => {
    if (link === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(link);
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
          const active = isActive(menu.link);

          // Simple menu item (no dropdown)
          if (!menu.hasDropdown && !menu.megaMenu && !menu.megaMenuTwo && !menu.pages) {
            return (
              <li key={i} className={active ? "active" : ""}>
                <Link href={menu.link} className={active ? "active" : ""} onClick={handleLinkClick}>
                  {menu.title}
                </Link>
              </li>
            );
          }

          // Menu item with dropdown (but not mega menu)
          if (menu.hasDropdown && !menu?.megaMenu && !menu.pages && !menu.megaMenuTwo) {
            return (
              <li key={i} className={`has-dropdown ${active ? "active" : ""}`}>
                <Link href={menu.link} className={active ? "active" : ""} onClick={handleLinkClick}>
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
                      const subActive = isActive(sub.link);
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
              <li key={i} className={`has-dropdown has-mega-menu ${active ? "active" : ""}`}>
                <Link href={menu.link} className={active ? "active" : ""} onClick={handleLinkClick}>
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
              <li key={i} className={`has-dropdown has-mega-menu ${active ? "active" : ""}`}>
                <Link href={menu.link} className={active ? "active" : ""} onClick={handleLinkClick}>
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
              <li key={i} className={`has-dropdown has-mega-menu ${active ? "active" : ""}`}>
                <Link href={menu.link} className={active ? "active" : ""} onClick={handleLinkClick}>
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
