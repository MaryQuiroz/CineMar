import { useState, useEffect } from 'react';
import { fetchMovieGenres } from '@/services/movieService';
import { useGenreCache } from './useGenreCache';
import { useTranslation } from 'react-i18next';

export const useGenres = () => {
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cacheGenres, getCachedGenres } = useGenreCache();
  const { i18n } = useTranslation();

  useEffect(() => {
    const loadGenres = async () => {
      try {
        setIsLoading(true);
        
        // Intentar obtener géneros del caché
        const cachedGenres = getCachedGenres();
        if (cachedGenres) {
          setGenres(cachedGenres);
          setIsLoading(false);
          return;
        }

        // Si no hay caché, cargar de la API
        console.log('🌐 Fetching genres from API');
        const genresList = await fetchMovieGenres();
        
        if (genresList) {
          cacheGenres(genresList);
          setGenres(genresList);
        }
      } catch (err) {
        console.error('❌ Error loading genres:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadGenres();
  }, [i18n.language]); // Recargar cuando cambie el idioma

  return { genres, isLoading, error };
};