import { redirect } from "next/navigation";
import { routes } from "@/lib/routes";

/**
 * Legacy Programs Route Redirect
 *
 * Redirects /programs to /sporturi (new SEO-friendly route)
 */
export default function ProgramsRedirect() {
  redirect(routes.sports.list);
}
