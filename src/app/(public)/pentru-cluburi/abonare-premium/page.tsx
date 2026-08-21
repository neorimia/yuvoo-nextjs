import { redirect } from "next/navigation";
import { routes } from "@/lib/routes";

/** Legacy URL → club registration */
export default function ClubPremiumRedirectPage() {
  redirect(routes.registerWithRole("club_admin"));
}
