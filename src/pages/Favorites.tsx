import React from 'react';
import { useFavorites } from '../hooks/useFavorites';
import MovieGrid from '../components/MovieGrid';

const Favorites: React.FC = () => {
  const { favorites, toggleFavorite, favoriteIds } = useFavorites();

  return (
    <div className="pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Your Favorite Movies
        </h1>

        {favorites.length > 0 ? (
          <MovieGrid 
            movies={favorites} 
            favorites={favoriteIds}
            onToggleFavorite={toggleFavorite}
            emptyMessage="No favorites added yet" 
          />
        ) : (
          <div className="text-center py-12 bg-gray-50 dark:bg-dark-800 rounded-lg">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              No favorites yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Start browsing and mark movies as favorites to see them here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;