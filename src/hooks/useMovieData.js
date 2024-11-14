import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchMovies, searchMovies } from '../services/movieService';
import { useMovieCache } from './useMovieCache';

const useMovieData = (cacheKey, searchQuery, page) => {
  const [rawMovies, setRawMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t, i18n } = useTranslation(['movies']);
  
  const { cacheMovies, getCachedMovies, clearCache } = useMovieCache(cacheKey);

  const loadMovies = useCallback(async () => {
    try {
      const cached = getCachedMovies();
      if (cached?.results) {
        setRawMovies(cached.results);
        setTotalPages(Math.min(cached.total_pages || 1, 20));
        setLoading(false);
        return;
      }

      setLoading(true);
      const data = searchQuery
        ? await searchMovies(searchQuery, page)
        : await fetchMovies(page);

      if (data?.results) {
        cacheMovies(data);
        setRawMovies(data.results);
        setTotalPages(Math.min(data.total_pages || 1, 20));
      }
    } catch (err) {
      setError(t('movies:error.load_movies'));
      setRawMovies([]);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, page, i18n.language, cacheKey]);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  return {
    rawMovies,
    totalPages,
    loading,
    error,
    clearCache,
    handleSearch: loadMovies,
  };
};

export default useMovieData;
