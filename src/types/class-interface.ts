import { StaticImageData } from "next/image";

export interface IClassItem {
  id: number;
  icon?: string;
  title: string;
  teaser: string;
  btn: string;
  shape?: StaticImageData;
  img?: StaticImageData;
  authorImg?: StaticImageData;
  authorName?: string;
  clrClass?: string;
  price: number;
  delay?: string;
}
