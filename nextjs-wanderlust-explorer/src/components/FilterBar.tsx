"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const CATEGORIES = ["Aventura", "Cultura", "Food", "Naturaleza", "Relax"];

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [destination, setDestination] = useState(searchParams.get("destination") || "");

  const handleFilter = () => {
    const params = new URLSearchParams(searchParams);
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    if (destination) {
      params.set("destination", destination);
    } else {
      params.delete("destination");
    }
    router.push(`/experiences?${params.toString()}`);
  };

  const handleClear = () => {
    setCategory("");
    setDestination("");
    router.push("/experiences");
  };

  return (
    <div className="filter-bar">
      <fieldset className="filter-group">
        <legend>Categoría</legend>
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          onBlur={handleFilter}
          className="filter-select"
          aria-label="Filtrar por categoría"
        >
          <option value="">Todas</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </fieldset>

      <fieldset className="filter-group">
        <legend>Destino</legend>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          onBlur={handleFilter}
          placeholder="Ej: Lisboa, Portugal"
          className="filter-input"
          aria-label="Filtrar por destino"
        />
      </fieldset>

      <button onClick={handleClear} className="filter-clear-btn">
        Limpiar filtros
      </button>
    </div>
  );
}
