import React, { useEffect, useState } from 'react';
import { getPopularMovies, getTrendingMovies, getTopRatedMovies } from '../api/tmdb';
import MovieGrid from '../components/MovieGrid';
import SectionHeader from '../components/SectionHeader';
import { Movie } from '../types';
import { useFavorites } from '../hooks/useFavorites';

const Home: React.FC = () => {
  const [trending, setTrending] = useState<Movie[]>([]);
  const [popular, setPopular] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { favoriteIds, toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        // Fetch all data in parallel
        const [trendingData, popularData, topRatedData] = await Promise.all([
          getTrendingMovies(),
          getPopularMovies(),
          getTopRatedMovies()
        ]);
        
        setTrending(trendingData);
        setPopular(popularData?.results || []);
        setTopRated(topRatedData?.results || []);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="pt-20 pb-12">
      <div className="container mx-auto px-4">
        <section className="mb-12">
          <SectionHeader 
            title="Trending Today" 
            viewAllLink="/trending"
          />
          <MovieGrid 
            movies={trending.slice(0, 5)} 
            loading={isLoading}
            favorites={favoriteIds}
            onToggleFavorite={toggleFavorite}
          />
        </section>

        <section className="mb-12">
          <SectionHeader 
            title="Popular Movies" 
            viewAllLink="/popular"
          />
          <MovieGrid 
            movies={popular.slice(0, 10)} 
            loading={isLoading}
            favorites={favoriteIds}
            onToggleFavorite={toggleFavorite}
          />
        </section>

        <section className="mb-12">
          <SectionHeader 
            title="Top Rated" 
            viewAllLink="/top-rated"
          />
          <MovieGrid 
            movies={topRated.slice(0, 10)} 
            loading={isLoading}
            favorites={favoriteIds}
            onToggleFavorite={toggleFavorite}
          />
        </section>
      </div>
    </div>
  );
};

export default Home;