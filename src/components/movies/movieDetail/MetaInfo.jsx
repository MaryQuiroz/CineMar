import { Calendar, Clock, Star, Users } from 'lucide-react';
import React from 'react';

function MetaInfo({movie}) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-300">
      {movie.runtime && (
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span className="text-sm sm:text-base">{movie.runtime} min</span>
        </div>
      )}
      
      {movie.release_date && (
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span className="text-sm sm:text-base">{new Date(movie.release_date).getFullYear()}</span>
        </div>
      )}
      
      {movie.vote_average && (
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-yellow-400" />
          <span className="text-sm sm:text-base">{movie.vote_average?.toFixed(1)}</span>
        </div>
      )}

      {movie.vote_count && (
        <div className="flex items-center gap-2 text-gray-400">
          <Users className="w-4 h-4" />
          <span className="text-sm sm:text-base">
            {new Intl.NumberFormat().format(movie.vote_count)}
          </span>
        </div>
      )}
    </div>
  );
}

export default MetaInfo;