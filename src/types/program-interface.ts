import { ProgramSvgOne } from "@/components/SVG";
import { StaticImageData } from "next/image";

export interface IProgramItemDetails {
  id: number;
  title: string;
  subTitle: string;
}

export interface IProgramItem {
  id: number;
  title: string;
  img: StaticImageData;
  description: string;
  icon: typeof ProgramSvgOne;
  clrClass: string;
  authorImg: StaticImageData;
  authorName: string;
  price: number;
  delay: string;
  programs: IProgramItemDetails[];
}
