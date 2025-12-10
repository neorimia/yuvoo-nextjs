import { StaticImageData } from "next/image";

export interface ITestimonialItem {
  id: number;
  review: string;
  author: string;
  clrClass?: string;
  delay?: string;
  authorImg: StaticImageData;
  rating: number;
}
