import { useState, useEffect, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchMovies, searchMovies } from '../services/movieService';
import { useMovieCache } from '../hooks/useMovieCache';
import MovieGrid from '../components/movies/MovieGrid';
import SearchBar from '../components/common/SearchBar';
import MovieFilters from '../components/movies/MovieFilters';
import PageHeader from '../components/common/PageHeader';

const MovieList = () => {
  const [rawMovies, setRawMovies] = useState([]); // Nuevo estado para datos sin procesar
  const [processedMovies, setProcessedMovies] = useState([]); // Estado para datos procesados
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const { t, i18n } = useTranslation(['movies', 'navigation']);

  const cacheKey = useMemo(() => 
    `${searchQuery ? 'search' : 'movieList'}_${page}`,
    [searchQuery, page]
  );
  
  const { cacheMovies, getCachedMovies, clearCache } = useMovieCache(cacheKey);

  // Procesamiento de películas separado del efecto principal
  useEffect(() => {
    const processAndSetMovies = (movieData) => {
      if (!movieData?.results || !Array.isArray(movieData.results)) {
        console.warn('Invalid movie data format:', movieData);
        setProcessedMovies([]);
        setTotalPages(0);
        return;
      }

      let filteredMovies = [...movieData.results];

      // Aplicar filtros de género
      if (selectedGenres.length > 0) {
        filteredMovies = filteredMovies.filter(movie => 
          movie.genre_ids.some(genreId => selectedGenres.includes(genreId))
        );
      }

      // Aplicar ordenamiento
      filteredMovies.sort((a, b) => {
        switch (sortBy) {
          case 'title-asc':
            return a.title.localeCompare(b.title);
          case 'title-desc':
            return b.title.localeCompare(a.title);
          case 'duration-desc':
            return (b.runtime || 0) - (a.runtime || 0);
          case 'duration-asc':
            return (a.runtime || 0) - (b.runtime || 0);
          case 'newest':
          default:
            return new Date(b.release_date) - new Date(a.release_date);
        }
      });

      setProcessedMovies(filteredMovies);
      setTotalPages(Math.min(movieData.total_pages || 1, 20));
    };

    // Procesar los datos crudos cuando cambien los filtros o el ordenamiento
    if (rawMovies.length > 0) {
      processAndSetMovies({ results: rawMovies, total_pages: totalPages });
    }
  }, [rawMovies, selectedGenres, sortBy]);

  // Efecto para cargar datos
  useEffect(() => {
    const loadMovies = async () => {
      console.log('⚡ loadMovies called - Starting data fetch process');
      
      try {
        const cached = getCachedMovies();
        console.log('💾 Cache check result:', {
          cacheKey,
          hasCachedData: !!cached,
          cachedResultsCount: cached?.results?.length || 0
        });

        if (cached?.results) {
          console.log('✅ Valid cache found, using cached data');
          setRawMovies(cached.results);
          setTotalPages(Math.min(cached.total_pages || 1, 20));
          setLoading(false);
          return;
        }

        setLoading(true);
        console.log('🌐 No valid cache found, fetching from API');
        
        const data = searchQuery
          ? await searchMovies(searchQuery, page)
          : await fetchMovies(page);

        console.log('📡 API response received:', {
          hasData: !!data,
          resultCount: data?.results?.length || 0,
          totalPages: data?.total_pages || 0
        });

        if (data?.results) {
          console.log('💾 Caching new data with key:', cacheKey);
          cacheMovies(data);
          setRawMovies(data.results);
          setTotalPages(Math.min(data.total_pages || 1, 20));
        }
      } catch (error) {
        console.error('❌ Error loading movies:', error);
        setError(t('movies:error.load_movies'));
        setRawMovies([]);
        setProcessedMovies([]);
      } finally {
        setLoading(false);
        console.log('🏁 loadMovies completed');
      }
    };

    loadMovies();
  }, [page, searchQuery, i18n.language, cacheKey, getCachedMovies, cacheMovies, t]);

  const handleSearch = useCallback((query) => {
    console.log('🔍 Search requested:', {
      currentQuery: searchQuery,
      newQuery: query,
      willClearCache: query !== searchQuery
    });
    if (query !== searchQuery) {
      clearCache();
      setSearchQuery(query);
      setPage(1);
    }
  }, [searchQuery, clearCache]);

  const handleGenreChange = useCallback((genre) => {
    setSelectedGenres(prev => {
      const newGenres = prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre];
      return newGenres;
    });
    setPage(1);
  }, []);

  const handleSortChange = useCallback((newSortBy) => {
    if (newSortBy !== sortBy) {
      setSortBy(newSortBy);
    }
  }, [sortBy]);

  const handleClearFilters = useCallback(() => {
    const hasFilters = selectedGenres.length > 0 || sortBy !== 'newest' || searchQuery !== '';
    console.log('🧹 Clear filters requested:', {
      hasFilters,
      currentGenres: selectedGenres,
      currentSort: sortBy,
      currentSearch: searchQuery
    });
    if (hasFilters) {
      clearCache();
      setSelectedGenres([]);
      setSortBy('newest');
      setSearchQuery('');
      setPage(1);
    }
  }, [selectedGenres, sortBy, searchQuery, clearCache]);

  const handlePageChange = useCallback((newPage) => {
    if (newPage !== page) {
      setPage(newPage);
      window.scrollTo(0, 0);
    }
  }, [page]);

  return (
    <div className="min-h-screen">
      <PageHeader title={t('movies:status.now_showing')} />
      
      <MovieFilters 
        selectedGenres={selectedGenres}
        sortBy={sortBy}
        onGenreChange={handleGenreChange}
        onSortChange={handleSortChange}
        onClearFilters={handleClearFilters}
        totalMovies={processedMovies.length}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="mb-6">
              <SearchBar 
                onSearch={handleSearch} 
                placeholder={t('movies:search')}
                initialValue={searchQuery}
              />
            </div>

            {loading ? (
              <div className="flex justify-center items-center min-h-[400px]">
                <div 
                  className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-cinema-red"
                  aria-label={t('movies:loading')}
                ></div>
              </div>
            ) : error ? (
              <div className="flex justify-center items-center min-h-[400px]">
                <div className="text-center">
                  <p className="text-red-500 mb-4">{error}</p>
                  <button
                    onClick={handleClearFilters}
                    className="px-4 py-2 bg-cinema-red text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    {t('movies:retry')}
                  </button>
                </div>
              </div>
            ) : processedMovies.length === 0 ? (
              <div className="flex justify-center items-center min-h-[400px]">
                <p className="text-gray-400">
                  {searchQuery 
                    ? t('movies:no_results_search')
                    : t('movies:no_movies_available')}
                </p>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <MovieGrid movies={processedMovies} />
                </div>
                
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-8">
                    <button
                      onClick={() => handlePageChange(page - 1)}
                      disabled={page === 1}
                      className="px-4 py-2 bg-cinema-gray text-white rounded-lg disabled:opacity-50 hover:bg-gray-700 transition-colors"
                    >
                      {t('movies:previous')}
                    </button>
                    <span className="px-4 py-2 bg-cinema-gray text-white rounded-lg">
                      {t('navigation:pagination.page', { current: page, total: totalPages })}
                    </span>
                    <button
                      onClick={() => handlePageChange(page + 1)}
                      disabled={page === totalPages}
                      className="px-4 py-2 bg-cinema-gray text-white rounded-lg disabled:opacity-50 hover:bg-gray-700 transition-colors"
                    >
                      {t('movies:next')}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieList;