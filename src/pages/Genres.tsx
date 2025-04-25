import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getGenres } from '../api/tmdb';
import { Genre } from '../types';

const Genres: React.FC = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      setIsLoading(true);
      try {
        const data = await getGenres();
        setGenres(data);
      } catch (error) {
        console.error('Error fetching genres:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGenres();
  }, []);

  // Background colors for genre cards
  const bgColors = [
    'bg-primary-600',
    'bg-secondary-600',
    'bg-accent-600',
    'bg-emerald-600',
    'bg-purple-600',
    'bg-rose-600',
    'bg-blue-600',
    'bg-yellow-600',
  ];

  if (isLoading) {
    return (
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Movie Genres
          </h1>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Array.from({ length: 16 }).map((_, index) => (
              <div 
                key={`skeleton-${index}`}
                className="rounded-lg bg-gray-200 dark:bg-dark-700 h-32 animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Movie Genres
        </h1>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {genres.map((genre, index) => (
            <Link
              key={genre.id}
              to={`/genre/${genre.id}`}
              className={`${
                bgColors[index % bgColors.length]
              } rounded-lg p-6 text-white hover:shadow-lg transition-shadow flex items-center justify-center h-32`}
            >
              <span className="text-xl font-medium text-center">
                {genre.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Genres;