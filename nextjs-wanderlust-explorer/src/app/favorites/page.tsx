import { Suspense } from 'react';
import FavoritesView from '@/components/FavoritesView';

export const metadata = {
  title: 'Mis Favoritos - EXPERIENCIAS ARNAU',
  description: 'Tus experiencias favoritas guardadas.',
};

export default function FavoritesPage() {
  return (
    <Suspense>
      <FavoritesView />
    </Suspense>
  );
}
