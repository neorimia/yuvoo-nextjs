import { StaticImageData } from "next/image";

export interface ISocialLink {
  link: string;
  target: string;
  icon: string;
  name: string;
}

export interface ITeacher {
  id: number;
  img: StaticImageData;
  name: string;
  designation: string;
  delay: string;
  social_links: ISocialLink[];
}
