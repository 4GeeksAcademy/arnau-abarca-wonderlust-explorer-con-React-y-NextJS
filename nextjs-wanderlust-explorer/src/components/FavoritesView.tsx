'use client';

import React from 'react';
import { experiences } from '@/data/experiences';
import { useFavorites } from '@/components/FavoritesProvider';
import ExperienceCard from '@/components/ExperienceCard';
import Link from 'next/link';

export default function FavoritesView() {
  const { favoriteIds } = useFavorites();

  const favoriteExperiences = experiences.filter((exp) =>
    favoriteIds.includes(exp.id)
  );

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          Mis Favoritos
        </h1>
        <p className="text-gray-600 mb-8">
          {favoriteExperiences.length} experiencia{favoriteExperiences.length !== 1 ? 's' : ''} guardada{favoriteExperiences.length !== 1 ? 's' : ''}
        </p>

        {favoriteExperiences.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-6">
              No tienes experiencias favoritas aún.
            </p>
            <Link
              href="/experiences"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold transition-colors"
            >
              Explorar experiencias
            </Link>
          </div>
        ) : (
          <div className="experience-grid">
            {favoriteExperiences.map((experience) => (
              <ExperienceCard
                key={experience.id}
                id={experience.id}
                image={experience.imageUrl}
                title={experience.title}
                category={experience.category}
                destination={experience.destination}
                price={experience.price}
                rating={experience.rating}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
