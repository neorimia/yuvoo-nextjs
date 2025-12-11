import { MenuItem } from "@/types/menu-interface";
import { routes } from "@/lib/routes";

/**
 * Yuvoo Navigation Menu Data
 *
 * Main navigation menu structure for the Yuvoo platform.
 * All labels are in Romanian for SEO and user experience.
 * All routes use the routes helper from @/lib/routes for consistency.
 */
const menuData: MenuItem[] = [
  {
    id: 1,
    hasDropdown: false,
    title: "Acasă",
    link: routes.home,
  },
  {
    id: 2,
    hasDropdown: true,
    title: "Sporturi",
    link: routes.sports.list,
    submenus: [
      { title: "Toate sporturile", link: routes.sports.list },
      { title: "Fotbal", link: routes.sports.detail("fotbal") },
      { title: "Baschet", link: routes.sports.detail("baschet") },
      { title: "Tenis", link: routes.sports.detail("tenis") },
      { title: "Înot", link: routes.sports.detail("inot") },
      { title: "Gimnastică", link: routes.sports.detail("gimnastica") },
      { title: "Dans", link: routes.sports.detail("dans") },
    ],
  },
  {
    id: 3,
    hasDropdown: false,
    title: "Cluburi",
    link: routes.clubs.list,
  },
  {
    id: 4,
    hasDropdown: false,
    title: "Doctori",
    link: routes.doctors.list,
  },
  {
    id: 5,
    hasDropdown: false,
    title: "Chestionar",
    link: routes.quiz.intro,
  },
  {
    id: 6,
    hasDropdown: false,
    title: "Despre Noi",
    link: routes.about,
  },
  {
    id: 7,
    hasDropdown: false,
    title: "Contact",
    link: routes.contact,
  },
];

export default menuData;
