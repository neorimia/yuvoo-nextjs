import { StaticImageData } from "next/image";

export interface IProductImage {
  id: number;
  img: StaticImageData; 
}

export interface IRating {
  id: number;
  icon: string;
}

export interface IProduct {
  id: number | string;
  title: string;
  price: number;
  discount: number | string;
  delay: string;
  badge: string;
  productImg: StaticImageData; 
  images: IProductImage[];
  ratings: IRating[];
  sale?: boolean;
  new?: boolean;
  sold?: boolean;
  hot?: boolean;
  name?: string;
  quantity?: number;
  [key: string]: unknown;
}

export interface CartProduct {
  id: number | string;
  title: string;
  price: number;
  quantity: number;
  productImg?: StaticImageData;
  [key: string]: unknown;
}

export interface CartItem {
  id: number | string;
  title: string;
  price: number;
  quantity: number;
}