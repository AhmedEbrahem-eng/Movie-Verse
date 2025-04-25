import { useState, useEffect } from 'react';
import { Movie } from '../types';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<Set<number>>(new Set());
  
  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('movieFavorites');
    if (storedFavorites) {
      try {
        const parsedFavorites = JSON.parse(storedFavorites) as Movie[];
        setFavorites(parsedFavorites);
        setFavoriteIds(new Set(parsedFavorites.map(movie => movie.id)));
      } catch (e) {
        console.error('Failed to parse favorites from localStorage:', e);
      }
    }
  }, []);
  
  // Update localStorage when favorites change
  useEffect(() => {
    localStorage.setItem('movieFavorites', JSON.stringify(favorites));
  }, [favorites]);
  
  const toggleFavorite = (movie: Movie) => {
    setFavorites(prev => {
      if (favoriteIds.has(movie.id)) {
        // Remove from favorites
        const newFavorites = prev.filter(m => m.id !== movie.id);
        setFavoriteIds(new Set(newFavorites.map(m => m.id)));
        return newFavorites;
      } else {
        // Add to favorites
        const newFavorites = [...prev, movie];
        setFavoriteIds(new Set(newFavorites.map(m => m.id)));
        return newFavorites;
      }
    });
  };
  
  const isFavorite = (movieId: number) => favoriteIds.has(movieId);
  
  return {
    favorites,
    favoriteIds,
    toggleFavorite,
    isFavorite,
  };
};