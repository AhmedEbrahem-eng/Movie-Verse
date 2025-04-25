import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { Movie } from '../types';
import { getImageUrl } from '../api/tmdb';
import Rating from './ui/Rating';

interface MovieCardProps {
  movie: Movie;
  isFavorite?: boolean;
  onToggleFavorite?: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  isFavorite = false,
  onToggleFavorite,
}) => {
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(movie);
    }
  };

  const releaseYear = movie.release_date 
    ? new Date(movie.release_date).getFullYear() 
    : 'Unknown';

  return (
    <Link 
      to={`/movie/${movie.id}`}
      className="group relative flex flex-col rounded-lg overflow-hidden shadow-md hover:shadow-xl bg-white dark:bg-dark-800 transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-gray-100 dark:bg-dark-700">
        {movie.poster_path ? (
          <img
            src={getImageUrl(movie.poster_path, 'w500')}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-dark-800 text-gray-400">
            No Image
          </div>
        )}
        
        {/* Rating badge */}
        <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm rounded-md px-2 py-1">
          <Rating value={movie.vote_average} size="sm" />
        </div>
        
        {/* Bookmark button */}
        {onToggleFavorite && (
          <button
            onClick={handleToggleFavorite}
            className="absolute top-2 right-2 p-1.5 bg-black/70 backdrop-blur-sm rounded-full text-white hover:bg-accent-500 transition-colors"
          >
            {isFavorite ? (
              <BookmarkCheck className="w-5 h-5" />
            ) : (
              <Bookmark className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
      
      <div className="p-3 flex-1 flex flex-col">
        <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2">
          {movie.title}
        </h3>
        <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {releaseYear}
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;