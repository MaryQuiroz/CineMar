import { Film, MessageCircle, ThumbsUp } from 'lucide-react';
import React from 'react'
import { useTranslation } from 'react-i18next';

const SynopsisTab = ({ movie }) => {
    console.log(movie)
    const { t } = useTranslation(['movies']);
    
    return (
      <div className="space-y-6">
        <section>
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Film className="w-5 h-5 text-cinema-red" />
            {t('movies:details.synopsis')}
          </h2>
          <p className="text-gray-300 leading-relaxed">
            {movie.overview}
          </p>
        </section>
  
        {movie.tagline && (
          <section>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-2 flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-cinema-red" />
              {t('movies:details.tagline')}
            </h3>
            <p className="text-gray-300 italic">"{movie.tagline}"</p>
          </section>
        )}
  
        {movie.vote_average > 0 && (
          <section className="bg-cinema-gray/30 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-5 h-5 text-cinema-red" />
                <span className="text-white font-medium">{t('movies:details.rating')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-white">
                  {movie.vote_average.toFixed(1)}
                </span>
                <span className="text-gray-400 text-sm">/ 10</span>
              </div>
            </div>
            <div className="mt-2">
              <div className="h-2 bg-gray-700 rounded-full">
                <div 
                  className="h-2 bg-cinema-red rounded-full transition-all duration-500"
                  style={{ width: `${(movie.vote_average / 10) * 100}%` }}
                />
              </div>
              <p className="text-gray-400 text-sm mt-1">
                {t('movies:details.votes', { count: movie.vote_count })}
              </p>
            </div>
          </section>
        )}
      </div>
    );
  };

export default SynopsisTab