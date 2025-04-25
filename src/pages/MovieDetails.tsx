import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { X } from 'lucide-react';
import { getMovieDetails } from '../api/tmdb';
import { MovieDetails as MovieDetailsType, Video } from '../types';
import MovieHero from '../components/MovieHero';
import MovieGrid from '../components/MovieGrid';
import SectionHeader from '../components/SectionHeader';
import { useFavorites } from '../hooks/useFavorites';

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTrailer, setActiveTrailer] = useState<Video | null>(null);
  const { favoriteIds, toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const data = await getMovieDetails(id);
        if (data) {
          setMovie(data);
          // Get scroll position to top when new movie loads
          window.scrollTo(0, 0);
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handlePlayTrailer = () => {
    if (!movie?.videos?.results) return;
    
    // Find official trailer first
    const trailers = movie.videos.results.filter(
      video => video.site === 'YouTube' && video.type === 'Trailer'
    );
    
    if (trailers.length > 0) {
      // Prefer official trailers
      const officialTrailer = trailers.find(t => t.official) || trailers[0];
      setActiveTrailer(officialTrailer);
    }
  };

  const handleToggleFavorite = () => {
    if (movie) {
      toggleFavorite(movie);
    }
  };

  if (isLoading) {
    return (
      <div className="pt-16 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="pt-24 container mx-auto px-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Movie not found
        </h1>
      </div>
    );
  }

  return (
    <>
      <MovieHero
        movie={movie}
        isFavorite={isFavorite(movie.id)}
        onToggleFavorite={handleToggleFavorite}
        onPlayTrailer={handlePlayTrailer}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Cast section */}
        {movie.credits?.cast && movie.credits.cast.length > 0 && (
          <section className="mb-10">
            <SectionHeader title="Cast" />
            <div className="overflow-x-auto pb-4">
              <div className="flex space-x-4" style={{ minWidth: 'max-content' }}>
                {movie.credits.cast.slice(0, 10).map(person => (
                  <div 
                    key={`${person.id}-${person.order}`}
                    className="w-32 flex-shrink-0"
                  >
                    <div className="bg-gray-200 dark:bg-dark-700 rounded-lg overflow-hidden aspect-[2/3] mb-2">
                      {person.profile_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                          alt={person.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                          No Image
                        </div>
                      )}
                    </div>
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm leading-tight">
                      {person.name}
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">
                      {person.character}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Similar movies section */}
        {movie.similar?.results && movie.similar.results.length > 0 && (
          <section className="mb-10">
            <SectionHeader title="Similar Movies" />
            <MovieGrid
              movies={movie.similar.results.slice(0, 10)}
              favorites={favoriteIds}
              onToggleFavorite={toggleFavorite}
            />
          </section>
        )}
      </div>

      {/* YouTube trailer modal */}
      {activeTrailer && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80 p-4">
          <div className="bg-dark-900 rounded-lg overflow-hidden w-full max-w-4xl">
            <div className="p-4 flex justify-between items-center">
              <h3 className="text-white font-medium">{activeTrailer.name}</h3>
              <button
                onClick={() => setActiveTrailer(null)}
                className="p-1 rounded-full hover:bg-dark-700 text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="aspect-video bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${activeTrailer.key}?autoplay=1`}
                title={activeTrailer.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetails;