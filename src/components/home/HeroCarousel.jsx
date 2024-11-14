import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Play,
  Info,
  Plus,
  Clock,
  Star,
  Calendar
} from 'lucide-react';
import { getImageUrl } from '../../services/movieService';

const HeroCarousel = ({ movies }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplayEnabled, setIsAutoplayEnabled] = useState(true);
  const [preloadedImages, setPreloadedImages] = useState([]);
  const [key, setKey] = useState(0); // Add this to force animation restart
  const autoplayRef = useRef(null);
  const { t } = useTranslation(['movies']);

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      const promises = movies.map((movie) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = getImageUrl(movie.backdrop_path, 'original');
          img.onload = resolve;
          img.onerror = reject;
        });
      });
      
      try {
        await Promise.all(promises);
        setPreloadedImages(movies.map(movie => getImageUrl(movie.backdrop_path, 'original')));
      } catch (error) {
        console.error('Error preloading images:', error);
      }
    };

    preloadImages();
  }, [movies]);

  // Autoplay control
  useEffect(() => {
    if (isAutoplayEnabled) {
      autoplayRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % movies.length);
        setKey(prev => prev + 1); // Force animation restart on auto-change
      }, 6000);
    }

    return () => clearInterval(autoplayRef.current);
  }, [isAutoplayEnabled, movies.length]);

  const handleSlideChange = (index) => {
    clearInterval(autoplayRef.current);
    setActiveIndex(index);
    setKey(prev => prev + 1); // Force animation restart
    
    if (isAutoplayEnabled) {
      autoplayRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % movies.length);
        setKey(prev => prev + 1); // Force animation restart on auto-change
      }, 6000);
    }
  };

  const formatGenres = (genres) => {
    if (!genres) return '';
    return genres.slice(0, 3).join(' • ');
  };

  const formatRuntime = (minutes) => {
    if (!minutes) return '';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getPremiereYear = (date) => {
    return new Date(date).getFullYear();
  };

  const currentMovie = movies[activeIndex];

  return (
    <div className="relative w-full overflow-hidden
                    h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px] xl:h-[85vh]">
      {/* Dynamic Backdrop */}
      <div className="absolute inset-0 z-0">
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            className={`
              absolute inset-0 transition-all duration-[1.2s] ease-in-out
              ${index === activeIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}
            `}
          >
            <div className="relative h-full w-full">
              <img 
                src={preloadedImages[index] || ''}
                alt=""
                className="absolute w-full h-full object-cover object-center sm:object-[50%_35%]"
              />
              {/* Gradientes optimizados para cada tamaño */}
              <div className="absolute inset-0 bg-gradient-to-t 
                            from-cinema-dark via-cinema-dark/80 to-transparent sm:via-cinema-dark/60" />
              <div className="absolute inset-0 bg-gradient-to-r 
                            from-cinema-dark via-cinema-dark/60 to-transparent sm:via-cinema-dark/40" />
            </div>
          </div>
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full">
        <div className="container mx-auto px-4 h-full flex flex-col justify-end
                      pb-16 sm:pb-20 md:pb-24 lg:pb-32">
          {/* Movie Info */}
          <div className="max-w-4xl space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Movie Title */}
            <h1 
              className={`
                text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl
                font-bold text-white tracking-tight leading-none
                transition-all duration-700
                ${activeIndex === movies.indexOf(currentMovie) ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
              `}
            >
              {currentMovie?.title}
            </h1>

            {/* Movie Metadata */}
            <div 
              className={`
                flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6 text-white/90
                transition-all duration-700 delay-300
                ${activeIndex === movies.indexOf(currentMovie) ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
              `}
            >
              {currentMovie?.vote_average && (
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm sm:text-base lg:text-lg font-semibold">
                    {currentMovie.vote_average.toFixed(1)}
                  </span>
                </div>
              )}
              {currentMovie?.runtime && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base lg:text-lg">
                    {formatRuntime(currentMovie.runtime)}
                  </span>
                </div>
              )}
              {currentMovie?.release_date && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base lg:text-lg">
                    {getPremiereYear(currentMovie.release_date)}
                  </span>
                </div>
              )}
              {currentMovie?.genres && (
                <div className="text-sm sm:text-base lg:text-lg">
                  {formatGenres(currentMovie.genres)}
                </div>
              )}
            </div>

            {/* Overview - Oculto en móvil muy pequeño */}
            <p 
              className={`
                hidden sm:block text-base sm:text-lg lg:text-xl text-white/80 
                max-w-3xl line-clamp-2 sm:line-clamp-3
                transition-all duration-700 delay-[400ms]
                ${activeIndex === movies.indexOf(currentMovie) ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
              `}
            >
              {currentMovie?.overview}
            </p>

            {/* Action Buttons */}
            <div 
              className={`
                flex items-center gap-2 sm:gap-4 pt-2 sm:pt-4
                transition-all duration-700 delay-[500ms]
                ${activeIndex === movies.indexOf(currentMovie) ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
              `}
            >
              <Link
                to={`/pelicula/${currentMovie?.id}`}
                className="group flex items-center gap-2 sm:gap-3 bg-white text-cinema-dark 
                         px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4
                         rounded-full font-semibold text-sm sm:text-base lg:text-lg 
                         transition-all duration-300
                         hover:bg-cinema-red hover:text-white transform hover:scale-105"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 
                               transition-transform group-hover:scale-110" 
                     fill="currentColor" />
                <span>{t('movies:actions.buy_tickets')}</span>
              </Link>
              <Link
                to={`/pelicula/${currentMovie?.id}`}
                className="group flex items-center gap-2 sm:gap-3 bg-white/10 text-white 
                         px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4
                         rounded-full font-semibold text-sm sm:text-base lg:text-lg 
                         backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
              >
                <Info className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                <span className="hidden sm:inline">{t('actions.more_info')}</span>
              </Link>
              <button
                className="group p-2 sm:p-3 lg:p-4 bg-white/10 rounded-full backdrop-blur-sm
                         hover:bg-white/20 transition-all duration-300"
                aria-label={t('actions.add_to_watchlist')}
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white 
                               transition-transform group-hover:rotate-90" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-4 py-4 sm:py-6 lg:py-8">
        <div className="container mx-auto flex items-center gap-2 sm:gap-4">
          {movies.map((movie, index) => (
            <button
              key={movie.id}
              onClick={() => handleSlideChange(index)}
              className="group flex-1"
              aria-label={t('go_to_slide', { number: index + 1 })}
            >
              <div className="flex flex-col gap-4">
                <div 
                  className={`
                    hidden sm:block text-xs sm:text-sm transition-all duration-300
                    ${index === activeIndex ? 'text-white' : 'text-white/50'}
                    line-clamp-1
                  `}
                >
                  {movie.title}
                </div>
                <div className="relative h-1 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    key={index === activeIndex ? key : undefined}
                    className={`
                      absolute inset-y-0 left-0 bg-white rounded-full
                      transition-all duration-300
                      ${index === activeIndex ? 'w-full' : 'w-0'}
                      ${index < activeIndex ? 'w-full bg-cinema-red' : ''}
                      ${index === activeIndex && isAutoplayEnabled ? 'animate-progress' : ''}
                    `}
                    style={{
                      animationDuration: '6s',
                      animationTimingFunction: 'linear',
                      animationFillMode: 'forwards'
                    }}
                  />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0; }
          to { width: 100%; }
        }
        .animate-progress {
          animation: progress 6s linear;
        }
        @media (prefers-reduced-motion) {
          .animate-progress {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroCarousel;