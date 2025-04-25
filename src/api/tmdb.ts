import axios from 'axios';
import { Movie, MovieDetails, MoviesResponse, Genre } from '../types';

// Create a base axios instance for TMDB API
const tmdbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  },
});

// Define error handler
const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    console.error('API Error:', error.response?.data || error.message);
  } else {
    console.error('Unexpected error:', error);
  }
  return null;
};

// Get trending movies
export const getTrendingMovies = async (): Promise<Movie[]> => {
  try {
    const response = await tmdbApi.get<MoviesResponse>('/trending/movie/day');
    return response.data.results;
  } catch (error) {
    handleApiError(error);
    return [];
  }
};

// Get popular movies
export const getPopularMovies = async (page = 1): Promise<MoviesResponse | null> => {
  try {
    const response = await tmdbApi.get<MoviesResponse>('/movie/popular', {
      params: { page },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
    return null;
  }
};

// Get top rated movies
export const getTopRatedMovies = async (page = 1): Promise<MoviesResponse | null> => {
  try {
    const response = await tmdbApi.get<MoviesResponse>('/movie/top_rated', {
      params: { page },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
    return null;
  }
};

// Get movie details
export const getMovieDetails = async (id: string): Promise<MovieDetails | null> => {
  try {
    const response = await tmdbApi.get<MovieDetails>(`/movie/${id}`, {
      params: {
        append_to_response: 'videos,credits,similar',
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
    return null;
  }
};

// Search movies
export const searchMovies = async (query: string, page = 1): Promise<MoviesResponse | null> => {
  try {
    const response = await tmdbApi.get<MoviesResponse>('/search/movie', {
      params: {
        query,
        page,
        include_adult: false,
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
    return null;
  }
};

// Get all genres
export const getGenres = async (): Promise<Genre[]> => {
  try {
    const response = await tmdbApi.get<{ genres: Genre[] }>('/genre/movie/list');
    return response.data.genres;
  } catch (error) {
    handleApiError(error);
    return [];
  }
};

// Get movies by genre
export const getMoviesByGenre = async (genreId: number, page = 1): Promise<MoviesResponse | null> => {
  try {
    const response = await tmdbApi.get<MoviesResponse>('/discover/movie', {
      params: {
        with_genres: genreId,
        page,
        sort_by: 'popularity.desc',
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
    return null;
  }
};

// Get image URL
export const getImageUrl = (path: string | null, size: string = 'original'): string => {
  if (!path) return '/placeholder.jpg';
  return `https://image.tmdb.org/t/p/${size}${path}`;
};