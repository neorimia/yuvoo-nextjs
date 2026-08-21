import { permanentRedirect } from "next/navigation";
import { routes } from "@/lib/routes";

/**
 * Legacy favorites route — redirects to canonical saved items page.
 * Route: /parent/favorites → /parent/saved (301)
 */
export default function FavoritesPage() {
  permanentRedirect(routes.parent.savedItems);
}
