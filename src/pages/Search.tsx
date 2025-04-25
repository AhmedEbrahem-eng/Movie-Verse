import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../api/tmdb';
import MovieGrid from '../components/MovieGrid';
import SearchBar from '../components/SearchBar';
import { Movie } from '../types';
import { useFavorites } from '../hooks/useFavorites';

const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  const { favoriteIds, toggleFavorite } = useFavorites();

  useEffect(() => {
    // Reset state when query changes
    if (query) {
      setMovies([]);
      setCurrentPage(1);
      setTotalPages(0);
      setTotalResults(0);
      fetchMovies(query, 1);
    }
  }, [query]);

  const fetchMovies = async (searchQuery: string, page: number) => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await searchMovies(searchQuery, page);
      if (response) {
        setMovies(response.results);
        setTotalResults(response.total_results);
        setTotalPages(response.total_pages);
        setCurrentPage(response.page);
      }
    } catch (error) {
      console.error('Error searching movies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (newQuery: string) => {
    setSearchParams({ q: newQuery });
  };

  return (
    <div className="pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Search Movies
          </h1>
          <SearchBar
            className="max-w-2xl"
            initialQuery={query}
            onSearch={handleSearch}
            placeholder="Search for movies..."
          />
        </div>

        {query ? (
          <>
            <div className="mb-4 text-gray-600 dark:text-gray-400">
              {!isLoading && totalResults > 0 && (
                <p>Found {totalResults} results for "{query}"</p>
              )}
            </div>
            
            <MovieGrid
              movies={movies}
              loading={isLoading}
              emptyMessage={
                query ? `No results found for "${query}"` : 'Enter a search term to find movies'
              }
              favorites={favoriteIds}
              onToggleFavorite={toggleFavorite}
            />
            
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() => fetchMovies(query, currentPage - 1)}
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
                    onClick={() => fetchMovies(query, currentPage + 1)}
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
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Enter a search term to find movies
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;