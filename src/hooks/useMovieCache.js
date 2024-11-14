import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const useMovieCache = (key) => {
  const { i18n } = useTranslation();

  const getCacheKey = useCallback(() => {
    const lang = i18n.language;
    return `movies_cache_${key}_${lang}`;
  }, [key, i18n.language]);

  const getCachedMovies = useCallback(() => {
    const fullKey = getCacheKey();
    console.log('Attempting to get cache with key:', fullKey);
    try {
      const cached = localStorage.getItem(fullKey);
      if (cached) {
        const parsedData = JSON.parse(cached);
        // Verificar si el caché es válido (no más viejo que 5 minutos)
        const cacheTime = parsedData.timestamp || 0;
        const now = Date.now();
        const isValid = now - cacheTime < 5 * 60 * 1000; // 5 minutos

        if (isValid) {
          console.log('Retrieved valid cache for key:', fullKey);
          return parsedData.data;
        } else {
          console.log('Cache expired for key:', fullKey);
          localStorage.removeItem(fullKey);
          return null;
        }
      }
      console.log('No cache found for key:', fullKey);
      return null;
    } catch (e) {
      console.error('Error reading cache:', e);
      return null;
    }
  }, [getCacheKey]);

  const cacheMovies = useCallback((data) => {
    const fullKey = getCacheKey();
    try {
      // Guardar los datos junto con una marca de tiempo
      const cacheData = {
        data,
        timestamp: Date.now()
      };
      localStorage.setItem(fullKey, JSON.stringify(cacheData));
      console.log('Data cached with key:', fullKey);
    } catch (e) {
      console.error('Error caching data:', e);
    }
  }, [getCacheKey]);

  const clearCache = useCallback(() => {
    const fullKey = getCacheKey();
    try {
      localStorage.removeItem(fullKey);
      console.log('Cache cleared for key:', fullKey);
    } catch (e) {
      console.error('Error clearing cache:', e);
    }
  }, [getCacheKey]);

  return { cacheMovies, getCachedMovies, clearCache };
};