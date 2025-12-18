/**
 * Favorite Card Component
 *
 * Displays a favorite club or doctor with actions to remove.
 */

"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { routes } from "@/lib/routes";
import { removeFavoriteAction } from "@/app/actions/favorites";
import type { Favorite } from "@/modules/favorites/favorites.types";
import type { Club } from "@/modules/clubs/clubs.types";
import type { Doctor } from "@/modules/doctors/doctors.types";
import { isPlaceholderUrl } from "@/lib/utils/image-helpers";

interface FavoriteCardProps {
  favorite: Favorite;
  entity?: Club | Doctor;
  onRemove?: () => void;
}

const FavoriteCard: React.FC<FavoriteCardProps> = ({ favorite, entity, onRemove }) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const [_isPending, startTransition] = useTransition();

  const handleRemove = () => {
    if (!confirm("Ești sigur că vrei să elimini acest element din favorite?")) {
      return;
    }

    startTransition(async () => {
      try {
        setIsRemoving(true);
        const result = await removeFavoriteAction(favorite.id);

        if (result.success) {
          onRemove?.();
        } else {
          alert(result.error || "Eroare la eliminarea din favorite");
        }
      } catch (error) {
        console.error("Error removing favorite:", error);
        alert("Eroare la eliminarea din favorite");
      } finally {
        setIsRemoving(false);
      }
    });
  };

  if (!entity) {
    return (
      <div className="card mb-3">
        <div className="card-body">
          <p className="text-muted mb-0">Se încarcă...</p>
        </div>
      </div>
    );
  }

  const isClub = favorite.entityType === "club";
  const detailUrl = isClub
    ? routes.clubs.detail((entity as Club).slug)
    : routes.doctors.detail((entity as Doctor).slug);

  // Get image URL with fallback to placeholder
  let imageUrl: string;
  if (isClub) {
    imageUrl = (entity as Club).images?.[0] || "/assets/img/placeholder-club.jpg";
  } else {
    imageUrl = (entity as Doctor).image || "/assets/img/placeholder-doctor.jpg";
  }

  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-3">
          <div className="position-relative" style={{ height: "150px", overflow: "hidden" }}>
            <Image
              src={imageUrl}
              alt={isClub ? (entity as Club).name : (entity as Doctor).name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{ objectFit: "cover" }}
              quality={85}
              unoptimized={isPlaceholderUrl(imageUrl)}
            />
          </div>
        </div>
        <div className="col-md-9">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start">
              <div className="flex-grow-1">
                <h5 className="card-title mb-2">
                  <Link href={detailUrl} className="text-decoration-none">
                    {isClub ? (entity as Club).name : (entity as Doctor).name}
                  </Link>
                </h5>
                <p className="card-text text-muted small mb-2">
                  {isClub
                    ? `${(entity as Club).sportName} • ${(entity as Club).location.city}`
                    : `${(entity as Doctor).specialty} • ${(entity as Doctor).location.city}`}
                </p>
                {isClub && (entity as Club).description && (
                  <p className="card-text small text-muted">
                    {(entity as Club).description.substring(0, 100)}...
                  </p>
                )}
                {!isClub && (entity as Doctor).description && (
                  <p className="card-text small text-muted">
                    {(entity as Doctor).description.substring(0, 100)}...
                  </p>
                )}
              </div>
              <button
                className="btn btn-sm btn-outline-danger ms-3"
                onClick={handleRemove}
                disabled={isRemoving}
                title="Elimină din favorite"
              >
                {isRemoving ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  <i className="bi bi-heart-fill"></i>
                )}
              </button>
            </div>
            <div className="mt-3">
              <Link href={detailUrl} className="btn btn-sm btn-primary">
                Vezi detalii
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCard;
