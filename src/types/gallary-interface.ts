import { StaticImageData } from "next/image";

export interface IGalleryInner {
  id: number;
  img: StaticImageData;
  icon: string;
}

export interface IGalleryItem {
  id: number;
  img: StaticImageData;
  icon: string;
  wrap?: string;
  inners?: IGalleryInner[];
}
