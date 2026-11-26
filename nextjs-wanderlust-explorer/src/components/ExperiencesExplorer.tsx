"use client";

import { useSearchParams } from "next/navigation";
import ExperienceCard from "./ExperienceCard";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import { useExperiences } from "@/hooks/useExperiences";

const imageByCategory: Record<string, string> = {
  Aventura: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
  Cultura: "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=800",
  Food: "https://images.unsplash.com/photo-1495195134817-1d2b922f7f6d?w=800",
  Naturaleza: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
  Relax: "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=800",
};

export default function ExperiencesExplorer() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const destination = searchParams.get("destination") || "";

  const filtered = useExperiences({ query, category, destination });

  return (
    <section className="experiences-section">
      <div className="experiences-header">
        <h1>Explorador de Experiencias</h1>
        <p>Descubre las mejores experiencias para tu próximo viaje</p>
      </div>

      <SearchBar />
      <FilterBar />

      <div className="experiences-info">
        {filtered.length === 0 ? (
          <p className="no-results">
            No se encontraron experiencias con los criterios seleccionados.
          </p>
        ) : (
          <p className="results-count">
            Mostrando {filtered.length} experiencia{filtered.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      <div className="experiences-grid">
        {filtered.map((experience) => {
          const image = imageByCategory[experience.category] || "/experience-placeholder.svg";
          return (
            <ExperienceCard
              key={experience.id}
              id={experience.id}
              image={image}
              title={experience.title}
              category={experience.category}
              destination={experience.destination}
              price={experience.price}
              rating={experience.rating}
            />
          );
        })}
      </div>
    </section>
  );
}


