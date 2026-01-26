import logo from "../../public/assets/img/logo/logo.svg";
import logoWhite from "../../public/assets/img/logo/logo-white.svg";
import { IFooterData } from "@/types/footer-interface";

const footerData: IFooterData = {
  description: {
    id: 1,
    logo: logo,
    logoWhite: logoWhite,
    teaser:
      "Yuvoo te ajută să găsești activitățile sportive perfecte pentru copilul tău. Descoperă sporturi personalizate și cluburi sportive.",
    socialTitle: "Social",
    newsTitle: "Alătură-te Newsletter-ului",
    newsBtn: "Abonează-te acum",
    social_icons: [
      {
        id: 1,
        icon: "fa-brands fa-facebook-f",
        url: "https://facebook.com/yuvoo",
        name: "Facebook",
      },
      {
        id: 2,
        icon: "fa-brands fa-twitter",
        url: "https://twitter.com/yuvoo",
        name: "Twitter",
      },
      {
        id: 3,
        icon: "fa-brands fa-instagram",
        url: "https://instagram.com/yuvoo",
        name: "Instagram",
      },
    ],
  },
  quick_links: {
    id: 2,
    title: "Link-uri rapide",
    menus: [
      {
        id: 1,
        menu: "Despre noi",
        path: "/despre-noi",
      },
      {
        id: 2,
        menu: "Sporturi",
        path: "/sporturi",
      },
      {
        id: 3,
        menu: "Cluburi",
        path: "/cluburi",
      },
      {
        id: 4,
        menu: "Pentru Cluburi",
        path: "/pentru-cluburi",
      },
      // {
      //   id: 5,
      //   menu: "Doctori",
      //   path: "/doctori",
      // },
      // {
      //   id: 6,
      //   menu: "Pentru Doctori",
      //   path: "/pentru-doctori",
      // },
      {
        id: 7,
        menu: "Chestionar",
        path: "/chestionar",
      },
      {
        id: 8,
        menu: "Contact",
        path: "/contact",
      },
    ],
  },
  program_links: {
    id: 3,
    title: "Sporturi populare",
    programs: [
      {
        id: 1,
        menu: "Fotbal",
        path: "/sporturi/fotbal",
      },
      {
        id: 2,
        menu: "Baschet",
        path: "/sporturi/baschet",
      },
      {
        id: 3,
        menu: "Tenis",
        path: "/sporturi/tenis",
      },
      {
        id: 4,
        menu: "Înot",
        path: "/sporturi/inot",
      },
      {
        id: 5,
        menu: "Dans",
        path: "/sporturi/dans",
      },
      {
        id: 6,
        menu: "Gimnastică",
        path: "/sporturi/gimnastica",
      },
    ],
  },
  customer_services: {
    id: 3,
    title: "Servicii",
    services: [
      {
        id: 1,
        menu: "Chestionar AI",
        path: "/chestionar",
      },
      {
        id: 2,
        menu: "Cluburi sportive",
        path: "/cluburi",
      },
      {
        id: 3,
        menu: "Pentru Cluburi",
        path: "/pentru-cluburi",
      },
      // {
      //   id: 4,
      //   menu: "Specialiști pediatri",
      //   path: "/doctori",
      // },
      // {
      //   id: 5,
      //   menu: "Pentru Doctori",
      //   path: "/pentru-doctori",
      // },
      {
        id: 6,
        menu: "Întrebări frecvente",
        path: "/intrebari-frecvente",
      },
      {
        id: 7,
        menu: "Ajutor",
        path: "/ajutor",
      },
    ],
  },
  contact_info: {
    id: 4,
    title: "Contactează-ne",
    infos: [
      {
        id: 1,
        icon: "fa-light fa-location-dot",
        url: "#",
        title: "București, România",
      },
      {
        id: 2,
        icon: "fa-light fa-phone",
        url: "tel:+40746385038",
        title: "+40 746 385 038",
      },
      {
        id: 3,
        icon: "fa-light fa-envelope",
        url: "mailto:contact@yuvoo.ro",
        title: "contact@yuvoo.ro",
      },
    ],
  },
};

export default footerData;
