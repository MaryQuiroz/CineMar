import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const useGenreCache = () => {
  const { i18n } = useTranslation();
  
  const getCacheKey = useCallback(() => {
    return `movie_genres_${i18n.language}`;
  }, [i18n.language]);

  const getCachedGenres = useCallback(() => {
    const fullKey = getCacheKey();
    try {
      const cached = localStorage.getItem(fullKey);
      if (cached) {
        const parsedData = JSON.parse(cached);
        const cacheTime = parsedData.timestamp || 0;
        const now = Date.now();
        // Cache válido por 24 horas para los géneros
        const isValid = now - cacheTime < 24 * 60 * 60 * 1000;

        if (isValid) {
          console.log('✅ Using cached genres');
          return parsedData.data;
        } else {
          console.log('❌ Genres cache expired');
          localStorage.removeItem(fullKey);
        }
      }
      return null;
    } catch (e) {
      console.error('Error reading genres cache:', e);
      return null;
    }
  }, [getCacheKey]);

  const cacheGenres = useCallback((data) => {
    const fullKey = getCacheKey();
    try {
      const cacheData = {
        data,
        timestamp: Date.now()
      };
      localStorage.setItem(fullKey, JSON.stringify(cacheData));
      console.log('💾 Genres cached successfully');
    } catch (e) {
      console.error('Error caching genres:', e);
    }
  }, [getCacheKey]);

  return { cacheGenres, getCachedGenres };
};