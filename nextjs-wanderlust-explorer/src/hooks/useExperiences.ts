import { useMemo } from "react";
import { experiences } from "@/data/experiences";

export interface UseExperiencesOptions {
  query?: string;
  category?: string;
  destination?: string;
}

const VALID_CATEGORIES = ["Aventura", "Cultura", "Food", "Naturaleza", "Relax"];

export function useExperiences(options: UseExperiencesOptions = {}) {
  const { query = "", category = "", destination = "" } = options;

  const filtered = useMemo(() => {
    let results = experiences;

    if (query.trim()) {
      const q = query.toLowerCase();
      results = results.filter(
        (exp) =>
          exp.title.toLowerCase().includes(q) ||
          exp.destination.toLowerCase().includes(q)
      );
    }

    // Solo filtrar por categoría si es válida
    if (category.trim()) {
      const c = category.toLowerCase();
      const isValidCategory = VALID_CATEGORIES.some(
        (cat) => cat.toLowerCase() === c
      );
      if (isValidCategory) {
        results = results.filter((exp) => exp.category.toLowerCase() === c);
      }
      // Si no es válida, ignora el filtro y mantiene todos los resultados
    }

    if (destination.trim()) {
      const d = destination.toLowerCase();
      results = results.filter((exp) =>
        exp.destination.toLowerCase().includes(d)
      );
    }

    return results;
  }, [query, category, destination]);

  return filtered;
}
