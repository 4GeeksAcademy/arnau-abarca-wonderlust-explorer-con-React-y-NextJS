'use client';

import React from 'react';
import Link from 'next/link';

interface ProfileViewProps {
  favoriteCount: number;
}

export default function ProfileView({ favoriteCount }: ProfileViewProps) {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Mi Perfil
          </h1>
        </div>

        {/* Profile Card */}
        <div className="bg-gray-50 rounded-lg p-6 sm:p-8 mb-8">
          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-blue-600 flex items-center justify-center text-4xl sm:text-5xl">
              👤
            </div>
          </div>

          {/* Name */}
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-2">
            Arnau Abarca
          </h2>

          {/* Bio */}
          <p className="text-gray-600 text-center text-base sm:text-lg mb-8">
            Explorador apasionado de experiencias únicas alrededor del mundo.
            Me encanta descubrir nuevas culturas, probar gastronomía local y vivir
            aventuras inolvidables.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg text-center">
              <p className="text-gray-600 text-sm sm:text-base mb-2">
                Experiencias Favoritas
              </p>
              <p className="text-3xl sm:text-4xl font-bold text-blue-600">
                {favoriteCount}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <p className="text-gray-600 text-sm sm:text-base mb-2">
                Destinos Visitados
              </p>
              <p className="text-3xl sm:text-4xl font-bold text-green-600">
                12
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white p-4 rounded-lg mb-8">
            <p className="text-gray-600 text-sm mb-2">Email</p>
            <p className="text-gray-900 font-semibold">arnau@experiencias.com</p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/favorites"
              className="inline-block text-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors flex-1"
            >
              Ver Favoritos
            </Link>
            <Link
              href="/experiences"
              className="inline-block text-center bg-gray-300 hover:bg-gray-400 text-gray-900 px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors flex-1"
            >
              Explorar Más
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
