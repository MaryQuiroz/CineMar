import { useTranslation } from 'react-i18next';
import MovieGrid from './MovieGrid';

const MovieListContent = ({ movies, loading, error, searchQuery, onRetry }) => {
  const { t } = useTranslation(['movies']);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div 
          className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-cinema-red"
          aria-label={t('movies:loading')}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-cinema-red text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            {t('movies:retry')}
          </button>
        </div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-gray-400">
          {searchQuery 
            ? t('movies:no_results_search')
            : t('movies:no_movies_available')}
        </p>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <MovieGrid movies={movies} />
    </div>
  );
};

export default MovieListContent;