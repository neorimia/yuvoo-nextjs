import { StaticImageData } from "next/image";

export interface ISocialIcon {
  id: number;
  icon: string;
  url: string;
  name: string;
}

export interface IMenuItem {
  id: number;
  menu: string;
  path: string;
}

export interface IContactInfo {
  id: number;
  icon: string;
  url: string;
  title: string;
}

export interface IFooterDescription {
  id: number;
  logo: StaticImageData;
  logoWhite: StaticImageData;
  teaser: string;
  socialTitle: string;
  newsTitle: string;
  newsBtn: string;
  social_icons: ISocialIcon[];
}

export interface IQuickLinks {
  id: number;
  title: string;
  menus: IMenuItem[];
}

export interface IProgramLinks {
  id: number;
  title: string;
  programs: IMenuItem[];
}

export interface ICustomerServices {
  id: number;
  title: string;
  services: IMenuItem[];
}

export interface IContactInfoSection {
  id: number;
  title: string;
  infos: IContactInfo[];
}

export interface IFooterData {
  description: IFooterDescription;
  quick_links: IQuickLinks;
  program_links: IProgramLinks;
  customer_services: ICustomerServices;
  contact_info: IContactInfoSection;
}
