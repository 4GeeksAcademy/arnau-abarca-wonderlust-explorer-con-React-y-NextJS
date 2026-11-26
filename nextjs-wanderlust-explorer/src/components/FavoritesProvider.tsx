"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

type FavoritesState = {
  favoriteIds: string[];
  toggleFavorite: (id: string) => void;
};

const FavoritesContext = createContext<FavoritesState | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const toggleFavorite = (id: string) => {
    setFavoriteIds((currentIds) =>
      currentIds.includes(id)
        ? currentIds.filter((favoriteId) => favoriteId !== id)
        : [...currentIds, id],
    );
  };

  return (
    <FavoritesContext.Provider value={{ favoriteIds, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const favorites = useContext(FavoritesContext);

  if (!favorites) {
    throw new Error("useFavorites debe usarse dentro de FavoritesProvider.");
  }

  return favorites;
}
