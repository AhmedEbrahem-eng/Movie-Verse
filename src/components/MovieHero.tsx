import React from 'react';
import { getImageUrl } from '../api/tmdb';
import { MovieDetails } from '../types';
import Rating from './ui/Rating';
import Button from './ui/Button';
import { Play, Heart, Calendar, Clock } from 'lucide-react';

interface MovieHeroProps {
  movie: MovieDetails;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onPlayTrailer?: () => void;
}

const MovieHero: React.FC<MovieHeroProps> = ({
  movie,
  isFavorite = false,
  onToggleFavorite,
  onPlayTrailer,
}) => {
  const releaseYear = movie.release_date 
    ? new Date(movie.release_date).getFullYear() 
    : 'Unknown';
    
  const hasTrailer = movie.videos?.results.some(
    video => video.site === 'YouTube' && video.type === 'Trailer'
  );

  // Format runtime from minutes to hours and minutes
  const formatRuntime = (minutes: number | null) => {
    if (!minutes) return 'Unknown';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="relative">
      {/* Backdrop */}
      <div className="relative h-[70vh] overflow-hidden">
        {movie.backdrop_path ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/80 to-transparent"></div>
            <img
              src={getImageUrl(movie.backdrop_path, 'original')}
              alt={movie.title}
              className="w-full h-full object-cover object-center opacity-70"
            />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-dark-800"></div>
        )}
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-end">
        <div className="container mx-auto px-4 pb-12 md:pb-16">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
            {/* Poster */}
            <div className="w-40 md:w-52 lg:w-64 shrink-0 rounded-lg overflow-hidden shadow-2xl transform -translate-y-16 md:-translate-y-20 hidden sm:block">
              {movie.poster_path ? (
                <img
                  src={getImageUrl(movie.poster_path, 'w500')}
                  alt={movie.title}
                  className="w-full h-auto"
                />
              ) : (
                <div className="aspect-[2/3] bg-dark-800 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex-1 text-white">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                {movie.title}
              </h1>
              
              {movie.tagline && (
                <p className="text-gray-300 text-lg italic mb-4">
                  {movie.tagline}
                </p>
              )}
              
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-4">
                <Rating value={movie.vote_average} size="lg" />
                
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                  <span>{releaseYear}</span>
                </div>
                
                {movie.runtime && (
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-gray-400 mr-2" />
                    <span>{formatRuntime(movie.runtime)}</span>
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map(genre => (
                  <span 
                    key={genre.id}
                    className="px-3 py-1 bg-dark-700/80 backdrop-blur-sm rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-300 max-w-prose line-clamp-3 lg:line-clamp-none">
                  {movie.overview}
                </p>
                
                <div className="flex flex-wrap gap-3 pt-2">
                  {hasTrailer && onPlayTrailer && (
                    <Button variant="accent" onClick={onPlayTrailer}>
                      <Play className="w-5 h-5" />
                      <span>Play Trailer</span>
                    </Button>
                  )}
                  
                  {onToggleFavorite && (
                    <Button 
                      variant={isFavorite ? 'primary' : 'outline'}
                      onClick={onToggleFavorite}
                    >
                      <Heart 
                        className="w-5 h-5" 
                        fill={isFavorite ? 'currentColor' : 'none'}
                      />
                      <span>{isFavorite ? 'Saved' : 'Add to Favorites'}</span>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieHero;