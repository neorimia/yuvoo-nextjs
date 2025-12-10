import { StaticImageData } from "next/image";

export interface IHeroItem {
  id: number;
  shape: StaticImageData;
  bg: StaticImageData;
  subTitle: string;
  title: string;
  btn: string;
}