import React from 'react';
import { useTranslation } from 'react-i18next';
import { Clock, Calendar, Star, PlayCircle } from 'lucide-react';
import { getImageUrl } from '../../../services/movieService';
import YouTubePlayer from '../../youtube/YouTubePlayer';
import MovieInfo from './MovieInfo';

const MovieHero = ({ movie, videos }) => {
  const { t } = useTranslation(['movies']);
  const trailer = videos.find(video => video.type === 'Trailer' && video.site === 'YouTube');

  return (
    <div className="h-[45vh] sm:h-[85vh] bg-cinema-dark">
      <div className="relative h-full overflow-hidden">
        {/* Background Image/Video */}
        <div className="absolute inset-0">
          {trailer ? (
            <YouTubePlayer videoId={trailer.key} t={t} />
          ) : (
            <img
              src={getImageUrl(movie.backdrop_path, 'original')}
              alt={movie.title}
              className="w-full h-80 object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-cinema-dark via-cinema-dark/90 to-transparent" />
        </div>

        <MovieInfo movie={movie} t={t} />
      </div>
    </div>
  );
};

export default MovieHero;
