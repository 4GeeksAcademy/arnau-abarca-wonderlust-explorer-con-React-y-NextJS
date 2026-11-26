'use client';

import React, { useEffect } from 'react';
import { Experience } from '@/data/experiences';
import Link from 'next/link';
import { useFavorites } from '@/components/FavoritesProvider';

const FALLBACK_IMAGE_URL = '/experience-placeholder.svg';

interface ExperienceDetailProps {
  experience: Experience;
}

export default function ExperienceDetail({ experience }: ExperienceDetailProps) {
  const { favoriteIds, toggleFavorite } = useFavorites();
  const isFavorite = favoriteIds.includes(experience.id);

  // Update document title
  useEffect(() => {
    const originalTitle = document.title;
    document.title = `${experience.title} - EXPERIENCIAS ARNAU`;
    return () => {
      document.title = originalTitle;
    };
  }, [experience.title]);

  return (
    <main className="min-h-screen bg-white">
      {/* Back link */}
      <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <Link
          href="/experiences"
          className="text-blue-600 hover:text-blue-800 underline mb-4 inline-block"
        >
          ← Volver al Explorador
        </Link>
      </div>

      <article className="max-w-4xl mx-auto px-4 pb-8 sm:px-6 sm:pb-12 lg:px-8">
        {/* Image */}
        <div className="relative w-full mb-8 sm:mb-10 overflow-hidden rounded-lg bg-gray-100">
          <div className="relative aspect-video sm:aspect-auto sm:h-96 lg:h-[500px] flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={experience.imageUrl || FALLBACK_IMAGE_URL}
              alt={experience.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = FALLBACK_IMAGE_URL;
              }}
            />
          </div>
        </div>

        {/* Title and metadata */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {experience.title}
              </h1>
              <p className="text-gray-600 text-lg">
                {experience.destination}
              </p>
            </div>
            <button
              onClick={() => toggleFavorite(experience.id)}
              aria-pressed={isFavorite}
              aria-label={
                isFavorite
                  ? 'Remover de favoritos'
                  : 'Agregar a favoritos'
              }
              className="flex-shrink-0 text-3xl transition-colors"
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>
          </div>

          {/* Category and rating */}
          <div className="flex flex-wrap gap-4 text-sm sm:text-base">
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              {experience.category}
            </span>
            <span className="text-gray-700">
              ⭐ {experience.rating.toFixed(1)} de 5
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="mb-8 sm:mb-10">
          <p className="text-2xl sm:text-3xl font-bold text-green-600">
            €{experience.price.toFixed(2)}
          </p>
        </div>

        {/* Description */}
        <div className="mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">
            Descripción
          </h2>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed whitespace-pre-wrap break-words">
            {experience.description}
          </p>
        </div>

        {/* Back to explorer button */}
        <div className="mt-8 sm:mt-10">
          <Link
            href="/experiences"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold transition-colors"
          >
            Volver al Explorador
          </Link>
        </div>
      </article>
    </main>
  );
}
