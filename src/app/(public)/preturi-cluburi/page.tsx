import { redirect } from "next/navigation";
import { routes } from "@/lib/routes";

/** Legacy URL → clubs landing pricing section */
export default function ClubPricingRedirectPage() {
  redirect(routes.clubs.pricing);
}
