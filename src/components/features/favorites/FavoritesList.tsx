/**
 * Favorites List Component
 *
 * Displays a list of user favorites (clubs and doctors).
 * Handles loading states, empty states, and favorite removal.
 */

"use client";

import React, { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import FavoriteCard from "./FavoriteCard";
import { getFavoritesAction } from "@/app/actions/favorites";
import { getClubByIdAction } from "@/app/actions/clubs";
import { getDoctorByIdAction } from "@/app/actions/doctors";
import { routes } from "@/lib/routes";
import type { Favorite } from "@/modules/favorites/favorites.types";
import type { Club } from "@/modules/clubs/clubs.types";
import type { Doctor } from "@/modules/doctors/doctors.types";

interface FavoriteWithEntity extends Favorite {
  entity?: Club | Doctor;
}

const FavoritesList: React.FC = () => {
  const [favorites, setFavorites] = useState<FavoriteWithEntity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [_isPending, _startTransition] = useTransition();

  // Fetch favorites and related data
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const favoritesData = await getFavoritesAction();

        // Fetch entity details for each favorite
        const favoritesWithEntities = await Promise.all(
          favoritesData.map(async (favorite) => {
            const entity =
              favorite.entityType === "club"
                ? await getClubByIdAction(favorite.entityId).catch(() => null)
                : await getDoctorByIdAction(favorite.entityId).catch(() => null);

            return {
              ...favorite,
              entity: entity || undefined,
            };
          })
        );

        setFavorites(favoritesWithEntities);
      } catch (err) {
        console.error("Error fetching favorites:", err);
        setError("Eroare la încărcarea favoritelor. Te rugăm să reîncerci.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemove = (favoriteId: string) => {
    setFavorites((prev) => prev.filter((f) => f.id !== favoriteId));
    router.refresh();
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Se încarcă...</span>
        </div>
        <p className="mt-3 text-muted">Se încarcă favoritele...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <i className="bi bi-exclamation-circle me-2"></i>
        {error}
      </div>
    );
  }

  // Empty state
  if (favorites.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="mb-4">
          <i className="bi bi-heart" style={{ fontSize: "4rem", color: "#ccc" }}></i>
        </div>
        <h3 className="mb-3">Nu ai favorite încă</h3>
        <p className="text-muted mb-4">
          Explorează cluburile și doctorii disponibili și salvează-le pentru acces rapid mai târziu.
        </p>
        <div className="d-flex gap-3 justify-content-center flex-wrap">
          <Link href={routes.clubs.list} className="btn btn-primary">
            <i className="bi bi-building me-2"></i>
            Vezi cluburi
          </Link>
          <Link href={routes.doctors.list} className="btn btn-outline-primary">
            <i className="bi bi-person-badge me-2"></i>
            Vezi doctori
          </Link>
        </div>
      </div>
    );
  }

  // Group favorites by type
  const clubFavorites = favorites.filter((f) => f.entityType === "club" && f.entity);
  const doctorFavorites = favorites.filter((f) => f.entityType === "doctor" && f.entity);

  return (
    <div className="bd-favorites-list">
      {/* Club Favorites */}
      {clubFavorites.length > 0 && (
        <div className="mb-5">
          <h2 className="mb-4">
            <i className="bi bi-building me-2"></i>
            Cluburi Favorite ({clubFavorites.length})
          </h2>
          {clubFavorites.map((favorite) => (
            <FavoriteCard
              key={favorite.id}
              favorite={favorite}
              entity={favorite.entity as Club}
              onRemove={() => handleRemove(favorite.id)}
            />
          ))}
        </div>
      )}

      {/* Doctor Favorites */}
      {doctorFavorites.length > 0 && (
        <div className="mb-5">
          <h2 className="mb-4">
            <i className="bi bi-person-badge me-2"></i>
            Doctori Favoriți ({doctorFavorites.length})
          </h2>
          {doctorFavorites.map((favorite) => (
            <FavoriteCard
              key={favorite.id}
              favorite={favorite}
              entity={favorite.entity as Doctor}
              onRemove={() => handleRemove(favorite.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesList;
