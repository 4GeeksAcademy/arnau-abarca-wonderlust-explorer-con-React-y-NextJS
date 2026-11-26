'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          404
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-6">
          No encontramos la experiencia que buscas.
        </p>
        <Link
          href="/experiences"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold transition-colors"
        >
          Volver al Explorador
        </Link>
      </div>
    </main>
  );
}
