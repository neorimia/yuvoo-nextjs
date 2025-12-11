import { redirect } from "next/navigation";
import { routes } from "@/lib/routes";

/**
 * Legacy Teachers Route Redirect
 *
 * Redirects /teachers to /doctori (new SEO-friendly route)
 */
export default function TeachersRedirect() {
  redirect(routes.doctors.list);
}
