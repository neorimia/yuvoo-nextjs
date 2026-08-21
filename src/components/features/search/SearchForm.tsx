"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { routes } from "@/lib/routes";

export default function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      router.push(routes.search);
      return;
    }
    router.push(`${routes.search}?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="bd-search-form mb-4" role="search">
      <label htmlFor="search-query" className="form-label visually-hidden">
        Caută cluburi, doctori sau sporturi
      </label>
      <div className="input-group input-group-lg">
        <input
          id="search-query"
          type="search"
          className="form-control"
          placeholder="Caută cluburi, doctori, sporturi..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
        />
        <button type="submit" className="btn btn-yuvoo-primary">
          <i className="bi bi-search me-1" aria-hidden="true" />
          Caută
        </button>
      </div>
    </form>
  );
}
