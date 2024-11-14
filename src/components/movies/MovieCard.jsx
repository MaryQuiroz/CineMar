import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  CalendarIcon, 
  ClockIcon, 
  StarIcon,
  HeartIcon,
  ShareIcon,
  InfoIcon,
  LoaderIcon
} from 'lucide-react';
import { getImageUrl } from '../../services/movieService';

export const MovieCard = ({ movie, isComingSoon = false }) => {
  const { t, i18n } = useTranslation(['movies']);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const { 
    id,
    title, 
    poster_path,
    duration, 
    genre,
    overview,
    director,
    cast,
    release_date,
    vote_average,
    status 
  } = movie;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat(i18n.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  const getDaysUntilRelease = (releaseDate) => {
    if (!releaseDate) return '';
    const today = new Date();
    const release = new Date(releaseDate);
    const diffTime = release.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return t('release_today');
    if (diffDays === 1) return t('release_tomorrow');
    if (diffDays < 0) return t('status.now_showing');
    return t('days_until_release', { days: diffDays });
  };

  const getStatusLabel = (status) => {
    return status === 'PROXIMAMENTE' 
      ? t('status.coming_soon')
      : t('status.now_showing');
  };

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
    // Aquí puedes añadir la lógica para guardar en localStorage o backend
  };

  const handleShareClick = async (e) => {
    e.preventDefault();
    try {
      if (navigator.share) {
        await navigator.share({
          title: title,
          text: overview,
          url: window.location.origin + `/pelicula/${id}`
        });
      } else {
        // Fallback para navegadores que no soportan Web Share API
        navigator.clipboard.writeText(window.location.origin + `/pelicula/${id}`);
        // Aquí podrías mostrar un toast de confirmación
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <article 
      className="group relative bg-gray-900 rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Poster Container */}
      <div className="relative aspect-[2/3] overflow-hidden">
        {/* Loading Skeleton */}
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
            <LoaderIcon className="w-8 h-8 text-gray-600 animate-spin" />
          </div>
        )}

        {/* Status Badge */}
        {status && (
          <div className="absolute top-3 left-0 z-20">
            <div className={`
              px-4 py-1.5 rounded-r-full font-medium text-sm
              transform transition-transform duration-300 ${isHovered ? 'translate-x-0' : '-translate-x-2'}
              ${status === 'PROXIMAMENTE' ? 'bg-red-600' : 'bg-green-600'}
              text-white shadow-lg backdrop-blur-sm bg-opacity-90
            `}>
              {getStatusLabel(status)}
            </div>
          </div>
        )}

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 z-20">
          <div className={`
            bg-yellow-500 text-gray-900 rounded-full px-2.5 py-1 text-sm font-bold 
            flex items-center gap-1 transform transition-transform duration-300
            ${isHovered ? 'translate-y-0' : '-translate-y-2'}
          `}>
            <StarIcon size={16} className="text-yellow-800" />
            {vote_average?.toFixed(1)}
          </div>
        </div>

        {/* Release Counter */}
        {isComingSoon && (
          <div className="absolute top-14 left-0 z-20">
            <div className={`
              bg-red-600/90 text-white px-4 py-1 text-sm font-medium rounded-r-full
              transform transition-transform duration-300 ${isHovered ? 'translate-x-0' : '-translate-x-2'}
              backdrop-blur-sm
            `}>
              {getDaysUntilRelease(release_date)}
            </div>
          </div>
        )}

        {/* Poster Image */}
        <img
          src={getImageUrl(poster_path)}
          alt={t('movie_poster_alt', { title })}
          className={`
            w-full h-full object-cover transition-all duration-500
            ${isImageLoaded ? 'opacity-100' : 'opacity-0'}
            ${isHovered ? 'scale-110 brightness-75' : 'scale-100'}
          `}
          loading="lazy"
          onLoad={() => setIsImageLoaded(true)}
        />

        {/* Quick Action Buttons */}
        <div className={`
          absolute inset-x-0 bottom-0 flex justify-between items-center p-4
          transition-all duration-300
          ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
        `}>
          <div className="flex gap-3">
            <button 
              onClick={handleFavoriteClick}
              className={`
                p-2 rounded-full transition-all duration-300 
                ${isFavorite 
                  ? 'bg-red-600 text-white hover:bg-red-700' 
                  : 'bg-white/20 hover:bg-white/30 text-white'}
                transform hover:scale-110
              `}
              aria-label={t(isFavorite ? 'remove_from_favorites' : 'add_to_favorites', { title })}
            >
              <HeartIcon 
                size={20} 
                className={isFavorite ? 'fill-current' : ''}
              />
            </button>
            <button 
              onClick={handleShareClick}
              className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-all duration-300 transform hover:scale-110"
              aria-label={t('share_movie', { title })}
            >
              <ShareIcon size={20} className="text-white" />
            </button>
          </div>
          <Link 
            to={`/pelicula/${id}`}
            className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-all duration-300 transform hover:scale-110"
            aria-label={t('more_info', { title })}
          >
            <InfoIcon size={20} className="text-white" />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title */}
        <Link to={`/pelicula/${id}`}>
          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 hover:text-cinema-red transition-colors duration-300">
            {title}
          </h3>
        </Link>

        {/* Genre Tags */}
        {genre && (
          <div className="flex flex-wrap gap-2 mb-3">
            {genre.split(',').map((g) => (
              <span 
                key={g} 
                className="text-xs bg-gray-800 px-2.5 py-1 rounded-full text-gray-300
                         transition-colors duration-300 hover:bg-gray-700"
              >
                {g.trim()}
              </span>
            ))}
          </div>
        )}

        {/* Movie Details */}
        <div className="space-y-2 text-sm text-gray-400 mb-4">
          {duration && (
            <div className="flex items-center gap-2 group">
              <ClockIcon className="h-4 w-4 group-hover:text-cinema-red transition-colors duration-300" />
              <span className="group-hover:text-white transition-colors duration-300">
                {t('duration_format', { duration })}
              </span>
            </div>
          )}
          {release_date && (
            <div className="flex items-center gap-2 group">
              <CalendarIcon className="h-4 w-4 group-hover:text-cinema-red transition-colors duration-300" />
              <span className="group-hover:text-white transition-colors duration-300">
                {isComingSoon 
                  ? t('release_date_format', { date: formatDate(release_date) })
                  : formatDate(release_date)
                }
              </span>
            </div>
          )}
        </div>

        {/* Synopsis */}
        {overview && (
          <p className="text-sm text-gray-400 mb-4 line-clamp-3 group-hover:text-gray-300 transition-colors duration-300">
            {overview}
          </p>
        )}

        {/* Credits */}
        {director && (
          <div className="text-sm group">
            <span className="text-gray-500">{t('director')}: </span>
            <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
              {director}
            </span>
          </div>
        )}
        {cast && (
          <div className="text-sm mt-1 mb-4 group">
            <span className="text-gray-500">{t('cast')}: </span>
            <span className="text-gray-300 group-hover:text-white transition-colors duration-300 line-clamp-1">
              {cast}
            </span>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-auto pt-4">
          <Link
            to={`/pelicula/${id}`}
            className="block w-full text-center bg-cinema-red hover:bg-red-700 text-white 
                     px-4 py-2.5 rounded-lg transition-all duration-300 
                     transform hover:scale-105 font-medium"
          >
            {isComingSoon ? t('see_details') : t('movies:actions.buy_tickets')}
          </Link>
        </div>
      </div>
    </article>
  );
};