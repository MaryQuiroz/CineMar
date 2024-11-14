import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Users, Clapperboard } from 'lucide-react';
import { fetchMovieCredits, getImageUrl } from '../../../../services/movieService';
import { useMovieCache } from '../../../../hooks/useMovieCache';

const CastTab = ({ movie }) => {
  const { t } = useTranslation(['movies']);
  const [credits, setCredits] = useState({ cast: [], crew: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Initialize cache hook with a unique key for movie credits
  const { cacheMovies, getCachedMovies, clearCache } = useMovieCache(`credits_${movie.id}`);

  useEffect(() => {
    const loadCredits = async () => {
      try {
        setLoading(true);
        
        // Try to get credits from cache first
        const cachedCredits = getCachedMovies();
        
        if (cachedCredits) {
          setCredits(cachedCredits);
          setLoading(false);
          return;
        }

        // If no cache, fetch from API
        const data = await fetchMovieCredits(movie.id);
        setCredits(data);
        
        // Cache the new data
        cacheMovies(data);
      } catch (err) {
        setError(err.message);
        clearCache(); // Clear cache in case of error
      } finally {
        setLoading(false);
      }
    };

    loadCredits();
  }, [movie.id, cacheMovies, getCachedMovies, clearCache]);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cinema-red mx-auto"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-gray-400">
        {t('error_loading_credits')}
      </div>
    );
  }

  const directors = credits.crew.filter(person => person.job === "Director");

  return (
    <div className="space-y-6">
      {/* Directors Section */}
      {directors.length > 0 && (
        <section>
          <h3 className="text-base sm:text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Clapperboard className="w-4 h-4 text-cinema-red" />
            {t('director')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {directors.map((director) => (
              <div 
                key={director.id}
                className="bg-cinema-gray/30 p-4 rounded-lg flex items-center gap-3 hover:bg-cinema-gray/50 transition-colors"
              >
                <div className="flex-shrink-0">
                  <img
                    src={director.profile_path ? getImageUrl(director.profile_path, 'w92') : '/placeholder-profile.jpg'}
                    alt={director.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-white font-medium">{director.name}</p>
                  <p className="text-gray-400 text-sm">{director.job}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Cast Section */}
      {credits.cast.length > 0 && (
        <section>
          <h3 className="text-base sm:text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Users className="w-4 h-4 text-cinema-red" />
            {t('movies:cast.cast_crew')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {credits.cast.map((actor) => (
              <div 
                key={actor.id}
                className="bg-cinema-gray/30 p-4 rounded-lg flex items-center gap-3 hover:bg-cinema-gray/50 transition-colors"
              >
                <div className="flex-shrink-0">
                  <img
                    src={actor.profile_path ? getImageUrl(actor.profile_path, 'w92') : '/placeholder-profile.jpg'}
                    alt={actor.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-white font-medium">{actor.name}</p>
                  <p className="text-gray-400 text-sm">{actor.character}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {credits.cast.length === 0 && credits.crew.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          {t('no_credits_available')}
        </div>
      )}
    </div>
  );
};

export default CastTab;