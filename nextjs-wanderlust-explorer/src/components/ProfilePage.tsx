'use client';

import React from 'react';
import { useFavorites } from '@/components/FavoritesProvider';
import ProfileView from '@/components/ProfileView';

export default function ProfilePage() {
  const { favoriteIds } = useFavorites();

  return <ProfileView favoriteCount={favoriteIds.length} />;
}
