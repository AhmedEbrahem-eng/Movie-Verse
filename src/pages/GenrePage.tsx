import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMoviesByGenre, getGenres } from '../api/tmdb';
import { Movie, Genre } from '../types';
import MovieGrid from '../components/MovieGrid';
import { useFavorites } from '../hooks/useFavorites';

const GenrePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [genreName, setGenreName] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { favoriteIds, toggleFavorite } = useFavorites();

  useEffect(() => {
    if (!id) return;

    const fetchGenreName = async () => {
      try {
        const genres = await getGenres();
        const genre = genres.find(g => g.id === parseInt(id));
        if (genre) {
          setGenreName(genre.name);
        }
      } catch (error) {
        console.error('Error fetching genre name:', error);
      }
    };

    fetchGenreName();
    fetchMovies(1);
  }, [id]);

  const fetchMovies = async (page: number) => {
    if (!id) return;
    
    setIsLoading(true);
    try {
      const response = await getMoviesByGenre(parseInt(id), page);
      if (response) {
        setMovies(response.results);
        setTotalPages(response.total_pages);
        setCurrentPage(response.page);
        window.scrollTo(0, 0);
      }
    } catch (error) {
      console.error('Error fetching movies by genre:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
          {genreName || 'Loading genre...'}
        </h1>
        
        <MovieGrid
          movies={movies}
          loading={isLoading}
          emptyMessage="No movies found in this genre"
          favorites={favoriteIds}
          onToggleFavorite={toggleFavorite}
        />
        
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button
                onClick={() => fetchMovies(currentPage - 1)}
                disabled={currentPage === 1 || isLoading}
                className={`px-4 py-2 rounded border ${
                  currentPage === 1 || isLoading
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Previous
              </button>
              
              <span className="text-gray-700 dark:text-gray-300">
                Page {currentPage} of {totalPages}
              </span>
              
              <button
                onClick={() => fetchMovies(currentPage + 1)}
                disabled={currentPage === totalPages || isLoading}
                className={`px-4 py-2 rounded border ${
                  currentPage === totalPages || isLoading
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenrePage;