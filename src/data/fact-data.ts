import { IFactItem } from "@/types/fact-interface";

/**
 * Yuvoo Statistics Data
 *
 * Facts and statistics displayed throughout the Yuvoo platform.
 * All content is in Romanian for consistency with the brand.
 */
const factData: IFactItem[] = [
  {
    id: 1,
    count: 5000,
    title: "Familii",
    subTitle: " în comunitate",
    text: "+",
  },
  {
    id: 2,
    count: 500,
    title: "Cluburi",
    subTitle: "sportive",
    text: "+",
  },
  // {
  //   id: 3,
  //   count: 50,
  //   title: "Specialiști ",
  //   subTitle: "pediatri verificați",
  //   text: "+",
  // },
  {
    id: 4,
    count: 5000,
    title: "Familii folosesc Yuvoo",
    icon: "flaticon-user-interface",
    text: "+",
  },
  {
    id: 5,
    count: 500,
    title: "Cluburi sportive",
    icon: "flaticon-reading",
    text: "+",
  },
  {
    id: 6,
    count: 50,
    title: "Sporturi disponibile",
    icon: "flaticon-badge",
    text: "+",
  },
];

export default factData;
