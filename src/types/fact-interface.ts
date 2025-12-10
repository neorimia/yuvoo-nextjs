import { ReactNode } from "react";

export interface IFactItem {
  id: number;
  count: number;
  title?: string | ReactNode;
  icon?: string;
  subTitle?: string;
  text?: string;
}
