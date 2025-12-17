/**
 * Children List Component
 *
 * Displays a list of user's children profiles.
 * Handles loading states, empty states, and child deletion.
 */

"use client";

import React, { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ChildCard from "./ChildCard";
import { getChildrenAction } from "@/app/actions/children";
import { routes } from "@/lib/routes";
import type { Child } from "@/modules/children/children.types";

const ChildrenList: React.FC = () => {
  const [children, setChildren] = useState<Child[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [_isPending, _startTransition] = useTransition();

  // Fetch children
  useEffect(() => {
    const fetchChildren = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const childrenData = await getChildrenAction();
        setChildren(childrenData);
      } catch (err) {
        console.error("Error fetching children:", err);
        setError("Eroare la încărcarea profilurilor copiilor. Te rugăm să reîncerci.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchChildren();
  }, []);

  const handleDelete = (childId: string) => {
    setChildren((prev) => prev.filter((c) => c.id !== childId));
    router.refresh();
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Se încarcă...</span>
        </div>
        <p className="mt-3 text-muted">Se încarcă profilurile copiilor...</p>
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
  if (children.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="mb-4">
          <i className="bi bi-person-plus" style={{ fontSize: "4rem", color: "#ccc" }}></i>
        </div>
        <h3 className="mb-3">Nu ai adăugat copii încă</h3>
        <p className="text-muted mb-4">
          Adaugă profilul copilului tău pentru a începe să folosești platforma Yuvoo și să primești
          recomandări personalizate.
        </p>
        <Link href={routes.onboarding.parent.addChild} className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Adaugă copil
        </Link>
      </div>
    );
  }

  return (
    <div className="bd-children-list">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Copiii Mei ({children.length})</h2>
        <Link href={routes.onboarding.parent.addChild} className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Adaugă copil
        </Link>
      </div>

      <div className="row">
        {children.map((child) => (
          <div key={child.id} className="col-12">
            <ChildCard child={child} onDelete={() => handleDelete(child.id)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChildrenList;
