import { useCallback } from 'react';

export const useYouTubeCache = () => {
  const CACHE_KEY = 'youtube_player_preferences';
  const API_CACHE_KEY = 'youtube_api_loaded';

  const getCachedPreferences = useCallback(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        return JSON.parse(cached);
      }
      return null;
    } catch (e) {
      console.error('Error reading YouTube preferences:', e);
      return null;
    }
  }, []);

  const cachePreferences = useCallback((preferences) => {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        ...preferences,
        timestamp: Date.now()
      }));
    } catch (e) {
      console.error('Error caching YouTube preferences:', e);
    }
  }, []);

  const getAPILoadedStatus = useCallback(() => {
    try {
      return localStorage.getItem(API_CACHE_KEY) === 'true';
    } catch (e) {
      return false;
    }
  }, []);

  const setAPILoadedStatus = useCallback((status) => {
    try {
      localStorage.setItem(API_CACHE_KEY, status ? 'true' : 'false');
    } catch (e) {
      console.error('Error saving API status:', e);
    }
  }, []);

  return {
    getCachedPreferences,
    cachePreferences,
    getAPILoadedStatus,
    setAPILoadedStatus
  };
};