import React from 'react';
import MovieCard from './MovieCard';
import { Movie } from '../types';

interface MovieGridProps {
  movies: Movie[];
  loading?: boolean;
  emptyMessage?: string;
  favorites?: Set<number>;
  onToggleFavorite?: (movie: Movie) => void;
}

const MovieGrid: React.FC<MovieGridProps> = ({
  movies,
  loading = false,
  emptyMessage = 'No movies found',
  favorites = new Set(),
  onToggleFavorite,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <div 
            key={`skeleton-${index}`}
            className="rounded-lg overflow-hidden bg-gray-200 dark:bg-dark-700 animate-pulse"
          >
            <div className="aspect-[2/3] bg-gray-300 dark:bg-dark-600"></div>
            <div className="p-3">
              <div className="h-4 bg-gray-300 dark:bg-dark-600 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-300 dark:bg-dark-600 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="flex justify-center items-center h-40 text-gray-500 dark:text-gray-400">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
      {movies.map((movie) => (
        <MovieCard 
          key={movie.id} 
          movie={movie} 
          isFavorite={favorites.has(movie.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};

export default MovieGrid;