import { useState, useEffect } from 'react';

const useMovieProcessing = (rawMovies, { selectedGenres, sortBy, totalPages }) => {
  const [processedMovies, setProcessedMovies] = useState([]);

  useEffect(() => {
    if (!Array.isArray(rawMovies)) {
      setProcessedMovies([]);
      return;
    }

    let filteredMovies = [...rawMovies];

    if (selectedGenres.length > 0) {
      filteredMovies = filteredMovies.filter(movie => 
        movie.genre_ids.some(genreId => selectedGenres.includes(genreId))
      );
    }

    filteredMovies.sort((a, b) => {
      switch (sortBy) {
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        case 'duration-desc':
          return (b.runtime || 0) - (a.runtime || 0);
        case 'duration-asc':
          return (a.runtime || 0) - (b.runtime || 0);
        case 'newest':
        default:
          return new Date(b.release_date) - new Date(a.release_date);
      }
    });

    setProcessedMovies(filteredMovies);
  }, [rawMovies, selectedGenres, sortBy]);

  return { processedMovies };
};

export default useMovieProcessing;