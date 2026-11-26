"use client";

import Link from "next/link";
import { useFavorites } from "./FavoritesProvider";

export interface ExperienceCardProps {
  id: string;
  image: string;
  title: string;
  category: string;
  destination: string;
  price: number;
  rating: number;
}

export default function ExperienceCard({
  id,
  image,
  title,
  category,
  destination,
  price,
  rating,
}: ExperienceCardProps) {
  const { favoriteIds, toggleFavorite } = useFavorites();
  const isFavorite = favoriteIds.includes(id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(id);
  };

  return (
    <article className="experience-card">
      <Link href={`/experiences/${id}`} className="card-link">
        <div className="card-image-container">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={title}
            className="card-image"
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.src = "/experience-placeholder.svg";
            }}
          />
        </div>
        <div className="card-content">
          <h3 className="card-title">{title}</h3>
          <p className="card-category">{category}</p>
          <p className="card-destination">{destination}</p>
          <div className="card-footer">
            <span className="card-price">€{price}</span>
            <span className="card-rating" aria-label={`Calificación: ${rating} de 5 estrellas`}>
              ⭐ {rating.toFixed(1)}
            </span>
          </div>
        </div>
      </Link>
      <button
        type="button"
        className={`card-favorite-btn ${isFavorite ? "active" : ""}`}
        onClick={handleFavoriteClick}
        aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
        aria-pressed={isFavorite}
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>
    </article>
  );
}
