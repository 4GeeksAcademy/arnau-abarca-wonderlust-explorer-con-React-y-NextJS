"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (query.trim()) {
      params.set("q", query);
    } else {
      params.delete("q");
    }
    router.push(`/experiences?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar experiencias..."
        className="search-input"
        aria-label="Buscar experiencias"
      />
      <button type="submit" className="search-btn">
        🔍
      </button>
    </form>
  );
}
