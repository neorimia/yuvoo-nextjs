import React, { useState } from "react";
import Link from "next/link";
import { menuData } from "@/data";

const MobileMenu = () => {
    const [subMenu, setSubMenu] = useState<string>("");
    const [navTitle, setNavTitle] = useState<string>("");

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
                {menuData.map((menu, i) => (
                    <React.Fragment key={i}>
                        {menu.hasDropdown && !menu?.megaMenu && !menu.pages && (
                            <li className="has-dropdown">
                                <Link href={menu.link}>{menu.title}</Link>
                                <ul
                                    className="submenu"
                                    style={{
                                        display: navTitle === menu.title ? "block" : "none",
                                    }}
                                >
                                    {menu.submenus && menu.submenus.map((sub, i) => (
                                        <li key={i}>
                                            <Link href={sub.link}>{sub.title}</Link>
                                        </li>
                                    ))}
                                </ul>
                                <a
                                    className={`mean-expand ${navTitle === menu.title ? "mean-clicked" : ""
                                        }`}
                                    onClick={() => openMobileMenu(menu.title)}
                                    style={{ fontSize: "18px", cursor: 'pointer' }}
                                >
                                    <i className="fal fa-plus"></i>
                                </a>
                            </li>
                        )}

                        {menu?.megaMenu && !menu.pages && (
                            <li className="has-dropdown has-mega-menu">
                                <Link href={menu.link}>{menu.title}</Link>
                                <ul
                                    className="mega-menu"
                                    style={{
                                        display: navTitle === menu.title ? "block" : "none",
                                    }}
                                >
                                    {menu?.mega_menus && menu?.mega_menus.map((mega_m, i) => (
                                        <li key={i}>
                                            <Link href={mega_m.link} className="mega-menu-title">
                                                {mega_m.title}
                                            </Link>
                                            <ul
                                                style={{
                                                    display: subMenu === mega_m.title ? "block" : "none",
                                                }}
                                            >
                                                {mega_m.submenus.map((sub_m, i) => (
                                                    <li key={i}>
                                                        <Link href={sub_m.link}>{sub_m.title}</Link>
                                                    </li>
                                                ))}
                                            </ul>
                                            <a
                                                className={`mean-expand ${subMenu === mega_m.title ? "mean-clicked" : ""
                                                    }`}
                                                onClick={() => openSubMobileMenu(mega_m.title)}
                                                style={{ fontSize: "18px", cursor: 'pointer' }}
                                            >
                                                <i className="fal fa-plus"></i>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                                <a
                                    className={`mean-expand ${navTitle === menu.title ? "mean-clicked" : ""
                                        }`}
                                    onClick={() => openMobileMenu(menu.title)}
                                    style={{ fontSize: "18px", cursor: 'pointer' }}
                                >
                                    <i className="fal fa-plus"></i>
                                </a>
                            </li>
                        )}

                        {menu.pages && (
                            <li className="has-dropdown has-mega-menu">
                                <Link href={menu.link}>{menu.title}</Link>
                                <ul
                                    className="mega-menu"
                                    style={{
                                        display: navTitle === menu.title ? "block" : "none",
                                    }}
                                >
                                    {menu?.mega_menus && menu?.mega_menus.map((mega_m, i) => (
                                        <li key={i}>
                                            <Link href={mega_m.link} className="mega-menu-title">
                                                {mega_m.title}
                                            </Link>
                                            <ul
                                                style={{
                                                    display: subMenu === mega_m.title ? "block" : "none",
                                                }}
                                            >
                                                {mega_m.submenus.map((sub_m, i) => (
                                                    <li key={i}>
                                                        <Link href={sub_m.link}>{sub_m.title}</Link>
                                                    </li>
                                                ))}
                                            </ul>
                                            <a
                                                className={`mean-expand ${subMenu === mega_m.title ? "mean-clicked" : ""
                                                    }`}
                                                onClick={() => openSubMobileMenu(mega_m.title)}
                                                style={{ fontSize: "18px", cursor: 'pointer' }}
                                            >
                                                <i className="fal fa-plus"></i>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                                <a
                                    className={`mean-expand ${navTitle === menu.title ? "mean-clicked" : ""
                                        }`}
                                    onClick={() => openMobileMenu(menu.title)}
                                    style={{ fontSize: "18px", cursor: 'pointer' }}
                                >
                                    <i className="fal fa-plus"></i>
                                </a>
                            </li>
                        )}
                    </React.Fragment>
                ))}
            </ul>
        </nav>
    );
};

export default MobileMenu;
