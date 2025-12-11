import { redirect } from "next/navigation";
import { routes } from "@/lib/routes";

/**
 * Legacy Classes Route Redirect
 *
 * Redirects /classes to /cluburi (new SEO-friendly route)
 */
export default function ClassesRedirect() {
  redirect(routes.clubs.list);
}
