import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchMovies, getImageUrl } from '../services/movieService';
import { useMovieCache } from '../hooks/useMovieCache';
import HeroCarousel from '../components/home/HeroCarousel';
import MovieGrid from '../components/movies/MovieGrid';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation(['common', 'movies', 'navigation']);
  
  // Definimos una key específica para el caché de la página Home
  const { cacheMovies, getCachedMovies } = useMovieCache('home_featured');

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      try {
        const cached = getCachedMovies();
        if (cached) {
          setMovies(cached.results.slice(0, 10));
          setLoading(false);
          return;
        }

        const data = await fetchMovies();
        if (data?.results) {
          cacheMovies(data);
          setMovies(data.results.slice(0, 10));
        }
      } catch (error) {
        console.error('Error loading movies:', error);
        setMovies([]); // Aseguramos que movies esté vacío en caso de error
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [i18n.language, cacheMovies, getCachedMovies]); // Añadimos las dependencias del efecto

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div 
          className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-cinema-red"
          aria-label={t('common:loading')}
        ></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {movies.length > 0 && <HeroCarousel movies={movies.slice(0, 10)} />}
      
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">{t('navigation:menu.movies')}</h2>
          <Link 
            to="/cartelera" 
            className="text-cinema-red hover:text-red-400 transition-colors"
          >
            {t('navigation:actions.view_all')}
          </Link>
        </div>

        {movies.length > 0 ? (
          <MovieGrid movies={movies} />
        ) : (
          <div className="text-center text-gray-400 py-8">
            {t('movies:no_movies_available')}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;