import React from 'react';
import MetaInfo from './MetaInfo';

function MovieInfo({movie, t}) {
  return (
    <div className="absolute inset-0 flex flex-col justify-start sm:justify-start p-4 sm:p-6 md:p-8 lg:p-12">
      {/* Container con gradiente sutil */}
      <div className="max-w-4xl relative z-10">
        {/* MetaInfo component */}
        <MetaInfo movie={movie} t={t} />

        {/* Title con mejor escala tipográfica */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-4 tracking-tight">
          {movie.title}
        </h1>

        {/* Tagline con estilo más sutil */}
        {movie.tagline && (
          <p className="text-base sm:text-lg md:text-xl text-gray-300 italic opacity-90">
            "{movie.tagline}"
          </p>
        )}

        {/* Géneros - solo desktop, muy sutil */}
        {movie.genres && (
          <div className="hidden sm:flex flex-wrap gap-2 mt-4 opacity-80">
            {movie.genres.map((genre) => (
              <span 
                key={genre.id}
                className="text-sm text-gray-300"
              >
                {genre.name}
                {/* Separador excepto para el último */}
                {genre.id !== movie.genres[movie.genres.length - 1].id && (
                  <span className="mx-2">•</span>
                )}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieInfo;