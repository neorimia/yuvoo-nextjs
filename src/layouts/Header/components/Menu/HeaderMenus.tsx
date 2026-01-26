"use client";

import { menuData } from "@/data";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  isSubmenuLinkActive,
  isClubsMenuActive,
  isClubsLandingSubmenuActive,
} from "@/lib/navigation-utils";
import { routes } from "@/lib/routes";

const HeaderMenus = () => {
  const pathname = usePathname();

  // Helper function to check if a link is active
  // Uses improved logic for better active state detection
  const isActive = (link: string, isSubmenu = false) => {
    if (link === "/") {
      return pathname === "/";
    }

    // Special handling for Clubs menu
    if (link === routes.clubs.list) {
      return isClubsMenuActive(pathname);
    }

    // Special handling for "Pentru Cluburi" submenu
    if (link === routes.clubs.landing) {
      return isClubsLandingSubmenuActive(pathname);
    }

    // For submenus, allow sub-routes
    if (isSubmenu) {
      return isSubmenuLinkActive(pathname, link);
    }

    // For parent menu items, only exact match (unless it's a dropdown with active submenu)
    return pathname === link || pathname === `${link}/`;
  };

  return (
    <ul>
      {menuData.map((menu, i) => {
        // For parent menu items with dropdowns, check if any submenu is active
        // Parent should only be active if exact match, not if submenu is active
        let parentActive = false;
        if (menu.hasDropdown && menu.submenus) {
          const anySubmenuActive = menu.submenus.some((sub) =>
            isSubmenuLinkActive(pathname, sub.link)
          );
          // Parent is active only if exact match AND no submenu is active
          parentActive = isActive(menu.link, false) && !anySubmenuActive;
        } else {
          parentActive = isActive(menu.link, false);
        }

        return (
          <li
            key={i}
            className={`${menu.megaMenu ? "has-dropdown has-mega-menu" : ""} ${menu.megaMenuTwo ? "has-dropdown has-mega-menu" : ""} ${menu.hasDropdown ? "has-dropdown" : ""} ${parentActive ? "active" : ""}`}
          >
            <Link href={menu.link} className={parentActive ? "active" : ""}>
              {menu.title}
            </Link>
            {menu.hasDropdown && (
              <ul className="submenu">
                {menu.submenus &&
                  menu.submenus.map((sub, i) => {
                    const subActive = isActive(sub.link, true);
                    return (
                      <li key={i} className={subActive ? "active" : ""}>
                        <Link href={sub.link} className={subActive ? "active" : ""}>
                          {sub.title}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            )}
            {menu.mega_menus && (
              <ul className="mega-menu">
                {menu.mega_menus.map((mega, i) => {
                  const megaActive = isActive(mega.link);
                  return (
                    <li key={i}>
                      <Link
                        href={mega.link}
                        className={`mega-menu-title ${megaActive ? "active" : ""}`}
                      >
                        {mega.title}
                      </Link>
                      <ul>
                        {mega.submenus.map((sub_mega, i) => {
                          const subMegaActive = isActive(sub_mega.link);
                          return (
                            <li key={i} className={subMegaActive ? "active" : ""}>
                              <Link href={sub_mega.link} className={subMegaActive ? "active" : ""}>
                                {sub_mega.title}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  );
                })}
              </ul>
            )}
            {menu.mega_menus_two && (
              <ul className="mega-menu mega-menu-2">
                {menu.mega_menus_two.map((megaTwo, i) => (
                  <li key={i}>
                    <ul>
                      {megaTwo.submenus.map((sub_mega_two, i) => {
                        const subMegaTwoActive = isActive(sub_mega_two?.link || "#");
                        return (
                          <li key={i} className={subMegaTwoActive ? "active" : ""}>
                            <Link
                              href={sub_mega_two?.link || "#"}
                              className={`mega-program ${subMegaTwoActive ? "active" : ""}`}
                            >
                              {!sub_mega_two.programImg && (
                                <>
                                  <div className="mega-menu-2-inner-num">
                                    <span>{sub_mega_two?.count}</span>
                                  </div>
                                  <div className="mega-menu-2-inner-title">
                                    <h6>{sub_mega_two?.title}</h6>
                                    <span>{sub_mega_two?.age}</span>
                                  </div>
                                </>
                              )}

                              {sub_mega_two.programImg && (
                                <div className="mega-menu-2-inner-thumb p-relative">
                                  {sub_mega_two.img && (
                                    <Image
                                      src={sub_mega_two.img}
                                      width={300}
                                      height={200}
                                      alt="img not found"
                                    />
                                  )}
                                  <div className="mega-menu-2-inner-thumb-content">
                                    <h4>{sub_mega_two.title}</h4>
                                    <div className="mega-menu-2-inner-thumb-btn mb-25">
                                      <button type="button" className="mega-btn">
                                        {sub_mega_two.btn}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default HeaderMenus;
