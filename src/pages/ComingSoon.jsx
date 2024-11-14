import { useState, useEffect } from 'react';
import { fetchUpcomingMovies } from '../services/movieService';
import { useMovieCache } from '../hooks/useMovieCache';
import MovieGrid from '../components/movies/MovieGrid';
import PageHeader from '../components/common/PageHeader';
import { useTranslation } from 'react-i18next';

const ComingSoon = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { t,i18n } = useTranslation(['navigation']);

  const { cachedMovies, cacheMovies, getCachedMovies } = useMovieCache('upcoming', { page });

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        const cached = getCachedMovies();
        if (cached) {
          const sortedMovies = cached.results.sort((a, b) => 
            new Date(a.release_date) - new Date(b.release_date)
          );
          setMovies(sortedMovies);
          setTotalPages(Math.min(cached.total_pages || 1, 20));
          setLoading(false);
          return;
        }

        const data = await fetchUpcomingMovies(page);
        
        if (data.results && Array.isArray(data.results)) {
          // Ordenar por fecha de estreno
          const sortedMovies = data.results.sort((a, b) => 
            new Date(a.release_date) - new Date(b.release_date)
          );
          cacheMovies(data);
          setMovies(sortedMovies);
          setTotalPages(Math.min(data.total_pages || 1, 20));
        } else {
          throw new Error('Formato de datos inválido');
        }
      } catch (error) {
        console.error('Error loading upcoming movies:', error);
        setError(t('errors.api.load_movies'));
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [page, i18n.language]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };

  const handleRetry = () => {
    setPage(1);
    setError(null);
  };

  return (
    <div className="min-h-screen">
      <PageHeader title={t('navigation:menu.coming_soon')} />

      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-cinema-red"></div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <p className="text-red-500 mb-4">{error}</p>
              <button
                onClick={handleRetry}
                className="px-4 py-2 bg-cinema-red text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                {t('common:retry')}
              </button>
            </div>
          </div>
        ) : movies.length === 0 ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <p className="text-gray-400">
              {t('movies:no_movies')}
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="mb-8">
              <MovieGrid movies={movies} showDate={true} />
            </div>
            
            {totalPages > 1 && (
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="px-4 py-2 bg-cinema-gray text-white rounded-lg disabled:opacity-50 hover:bg-gray-700 transition-colors"
                >
                  {t('common:previous')}
                </button>
                <span className="px-4 py-2 bg-cinema-gray text-white rounded-lg">
                  {t('navigation:pagination.page', { current: page, total: totalPages })}
                </span>
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  className="px-4 py-2 bg-cinema-gray text-white rounded-lg disabled:opacity-50 hover:bg-gray-700 transition-colors"
                >
                  {t('common:next')}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComingSoon;
