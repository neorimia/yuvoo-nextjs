import { footerData } from '@/data';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import CopyrightTextTwo from './components/CopyrightTextTwo';
import lineShape from '../../../public/assets/img/shape/white-curved-line.png'

const FooterTwo = () => {
    return (
        <footer>
            <div className="bd-footer-area fix pt-170 theme-bg-6">
                <div className="bd-wave-wrapper">
                    <div className="bd-wave"></div>
                    <div className="bd-wave"></div>
                </div>
                <div className="theme-bg bd-footer-wrapper p-relative pt-60">
                    <div className="container">
                        <div className="bd-footer-bg-2" data-background="assets/img/bg/bg-shape.jpg"></div>
                        <div className="bd-footer-top">
                            <div className="row align-items-end">
                                <div className="col-lg-6">
                                    <div className="bd-footer-top-widget-1 mb-60">
                                        <div className="bd-footer-logo mb-15">
                                            <Link href="/">
                                                <Image style={{ width: "auto", height: "auto" }} src={footerData.description.logoWhite} alt="logo" />
                                            </Link>
                                        </div>
                                        <div className="bd-footer-widget-content is-white mb-40">
                                            <p>{footerData.description.teaser}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="bd-newsletter-content-2 p-relative z-index-1 mb-60">
                                        <h4 className="bd-footer-widget-title is-white mb-20">{footerData.description.newsTitle}</h4>
                                        <div className="bd-newsletter-form">
                                            <form action="#">
                                                <div className="bd-newsletter-input bd-newsletter-input-2">
                                                    <input type="text" placeholder="your email" />
                                                    <button type="submit" className="bd-btn">
                                                        <span className="bd-btn-inner">
                                                            <span className="bd-btn-normal"><i
                                                                className="fa-sharp fa-solid fa-paper-plane"></i>{footerData.description.newsBtn}</span>
                                                            <span className="bd-btn-hover"><i
                                                                className="fa-sharp fa-solid fa-paper-plane"></i>{footerData.description.newsBtn}</span>
                                                        </span>
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bd-footer-2 pb-15 pt-60 p-relative">
                            <div className="bd-footer-shape d-none d-lg-block">
                                <Image style={{ width: "auto", height: "auto" }} src={lineShape} alt="shape" />
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-6 col-sm-6">
                                    <div className="bd-footer-widget-2 mb-50">
                                        <div className="bd-footer-widget-content">
                                            <h4 className="bd-footer-widget-title is-white mb-20">{footerData.quick_links.title}</h4>
                                            <div className="bd-footer-list bd-footer-list-2">
                                                <ul>
                                                    {footerData.quick_links.menus.map((item) => (
                                                        <li key={item.id}><Link href={item.path}>{item.menu}</Link></li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 col-sm-6">
                                    <div className="bd-footer-widget-2 mb-50">
                                        <div className="bd-footer-widget-content">
                                            <h4 className="bd-footer-widget-title is-white mb-20">{footerData.program_links.title}</h4>
                                            <div className="bd-footer-list bd-footer-list-2">
                                                <ul>
                                                    {footerData.program_links.programs.map((item) => (
                                                        <li key={item.id}><Link href={item.path}>{item.menu}</Link></li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 col-sm-6">
                                    <div className="bd-footer-widget-2 mb-50">
                                        <div className="bd-footer-widget-content">
                                            <h4 className="bd-footer-widget-title is-white mb-20">{footerData.description.socialTitle}</h4>
                                            <div className="bd-footer-list bd-footer-list-2">
                                                <div className="bd-footer-social-wrapper is-white">
                                                    {footerData.description.social_icons.map((item) => (
                                                        <div className="bd-footer-social" key={item.id}>
                                                            <a target="_blank" href={item.url} rel="noreferrer">
                                                                <i className={item.icon}></i>{item.name}
                                                            </a>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 col-sm-6">
                                    <div className="bd-footer-widget-2 mb-50">
                                        <div className="bd-footer-widget-content">
                                            <h4 className="bd-footer-widget-title is-white mb-20">{footerData.contact_info.title}</h4>
                                            <div className="bd-footer-contact is-white">
                                                <ul>
                                                    {footerData.contact_info.infos.map((item) => (
                                                        <li key={item.id}><i className={item.icon}></i><a href={item.url}>{item.title}</a></li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <CopyrightTextTwo />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterTwo;