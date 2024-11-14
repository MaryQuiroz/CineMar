import { useState, useEffect, useRef, Suspense, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchMovieDetails, fetchMovieVideos } from '../services/movieService';
import { useMovieCache } from '../hooks/useMovieCache';
import MovieDetailSkeleton from '../components/movies/MovieDetailSkeleton';
import MovieHero from '../components/movies/movieDetail/MovieHero';
import { useToast } from '../hooks/useToast';
import MovieContent from '../components/movies/movieDetail/MovieContent';
import MovieSidebar from '../components/movies/movieDetail/MovieSidebar';
import ErrorBoundary from '../components/common/ErrorBoundary';
import { Sheet, SheetContent, SheetTrigger } from '../components/ui/sheet';
import { Ticket } from 'lucide-react';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const { t, i18n } = useTranslation(['movies', 'common']);
  const isLoading = useRef(false);
  const { showToast } = useToast();

  const { 
    cacheMovies: cacheDetails, 
    getCachedMovies: getCachedDetails
  } = useMovieCache(`movie-details-${id}`, { id, lang: i18n.language });

  const { 
    cacheMovies: cacheVideos, 
    getCachedMovies: getCachedVideos
  } = useMovieCache(`movie-videos-${id}`, { id, lang: i18n.language });

  const loadMovieData = useCallback(async () => {
    if (isLoading.current) return;
    
    try {
      isLoading.current = true;
      setLoading(true);
      setError(null);

      setMovie(null);
      setVideos([]);
      setSelectedDate(null);
      setSelectedSession(null);

      const cachedMovieDetails = getCachedDetails();
      const cachedMovieVideos = getCachedVideos();

      if (cachedMovieDetails?.data && cachedMovieVideos?.data) {
        console.log(`Using cached data for movie ${id}`);
        setMovie(cachedMovieDetails.data);
        setVideos(cachedMovieVideos.data.results);
        setLoading(false);
        isLoading.current = false;
        return;
      }

      const [movieData, videosData] = await Promise.all([
        fetchMovieDetails(id),
        fetchMovieVideos(id)
      ]);
      
      if (movieData && videosData) {
        cacheDetails({ 
          data: movieData,
          results: [movieData]
        });
        
        cacheVideos({ 
          data: videosData,
          results: videosData.results
        });
        
        setMovie(movieData);
        setVideos(videosData.results);
      }
    } catch (error) {
      console.error(`Error loading movie details for ID ${id}:`, error);
      setError(error);
      showToast('error', t('errors.loading_movie'));
    } finally {
      setLoading(false);
      isLoading.current = false;
    }
  }, [id, i18n.language, cacheDetails, cacheVideos, getCachedDetails, getCachedVideos, t, showToast]);

  useEffect(() => {
    loadMovieData();
  }, [i18n.languages]);

  const handleDateSelect = useCallback((date) => {
    setSelectedDate(date);
  }, []);

  const handleSessionSelect = useCallback((session) => {
    setSelectedSession(session);
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-cinema-dark flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            {t('errors.something_went_wrong')}
          </h2>
          <p className="text-gray-400 mb-6">{t('errors.try_again')}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-cinema-red text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            {t('actions.reload')}
          </button>
        </div>
      </div>
    );
  }

  if (loading || !movie) {
    return <MovieDetailSkeleton />;
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-cinema-dark">
        <Suspense fallback={<MovieDetailSkeleton />}>
          <MovieHero movie={movie} videos={videos} />
          
          <div className="container mx-auto px-4 -mt-32 sm:-mt-48 relative z-30">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              <div className="lg:col-span-2">
                <MovieContent movie={movie} />
              </div>
              
              {/* Desktop Sidebar */}
              <div className="hidden lg:block lg:col-span-1">
                <MovieSidebar
                  movie={movie}
                  selectedDate={selectedDate}
                  selectedSession={selectedSession}
                  onDateSelect={handleDateSelect}
                  onSessionSelect={handleSessionSelect}
                />
              </div>

              {/* Mobile Sheet */}
              <div className="fixed bottom-6 left-0 right-0 px-4 lg:hidden z-50">
                <Sheet>
                  <SheetTrigger asChild>
                    <button className="w-full bg-cinema-red text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-lg">
                      <Ticket className="w-5 h-5" />
                      {t('movies:actions.buy_tickets')}
                    </button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="h-[85vh] bg-cinema-dark border-cinema-gray">
                    <MovieSidebar
                      movie={movie}
                      selectedDate={selectedDate}
                      selectedSession={selectedSession}
                      onDateSelect={handleDateSelect}
                      onSessionSelect={handleSessionSelect}
                    />
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </Suspense>
      </div>
    </ErrorBoundary>
  );
};

export default MovieDetail;
