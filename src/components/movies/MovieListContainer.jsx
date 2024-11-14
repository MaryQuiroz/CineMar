import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import useMovieData from '../../hooks/useMovieData';
import useMovieProcessing from '../../hooks/useMovieProcessing';
import MovieListHeader from './MovieListHeader';
import MovieListContent from './MovieListContent';
import MovieListPagination from './MovieListPagination';

const MovieListContainer = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const { t } = useTranslation(['movies']);

  const cacheKey = useMemo(() => 
    `${searchQuery ? 'search' : 'movieList'}_${page}`,
    [searchQuery, page]
  );

  const {
    rawMovies,
    totalPages,
    loading,
    error,
    clearCache,
    handleSearch: triggerSearch,
  } = useMovieData(cacheKey, searchQuery, page);

  const { processedMovies } = useMovieProcessing(rawMovies, {
    selectedGenres,
    sortBy,
    totalPages,
  });

  const handleSearch = (query) => {
    if (query !== searchQuery) {
      clearCache();
      setSearchQuery(query);
      setPage(1);
      triggerSearch(query);
    }
  };

  const handleGenreChange = (genre) => {
    setSelectedGenres(prev => {
      const newGenres = prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre];
      return newGenres;
    });
    setPage(1);
  };

  const handleSortChange = (newSortBy) => {
    if (newSortBy !== sortBy) {
      setSortBy(newSortBy);
    }
  };

  const handleClearFilters = () => {
    const hasFilters = selectedGenres.length > 0 || sortBy !== 'newest' || searchQuery !== '';
    if (hasFilters) {
      clearCache();
      setSelectedGenres([]);
      setSortBy('newest');
      setSearchQuery('');
      setPage(1);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage !== page) {
      setPage(newPage);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen">
      <MovieListHeader 
        title={t('movies:status.now_showing')}
        selectedGenres={selectedGenres}
        sortBy={sortBy}
        onGenreChange={handleGenreChange}
        onSortChange={handleSortChange}
        onClearFilters={handleClearFilters}
        totalMovies={processedMovies.length}
        onSearch={handleSearch}
        searchQuery={searchQuery}
      />

      <MovieListContent
        movies={processedMovies}
        loading={loading}
        error={error}
        searchQuery={searchQuery}
        onRetry={handleClearFilters}
      />

      {!loading && !error && totalPages > 1 && (
        <MovieListPagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default MovieListContainer;