// src/hooks/useMovieFilters.js
import { useState, useMemo } from 'react';

export const useMovieFilters = (initialMovies = []) => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMovies = useMemo(() => {
    let result = [...initialMovies];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(movie => 
        movie.title.toLowerCase().includes(query) ||
        movie.director?.toLowerCase().includes(query) ||
        movie.cast?.toLowerCase().includes(query)
      );
    }

    // Apply genre filters
    if (selectedGenres.length > 0) {
      result = result.filter(movie => 
        selectedGenres.some(genre => 
          movie.genre.toLowerCase().includes(genre.toLowerCase())
        )
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        case 'duration-desc': {
          const durationA = parseInt(a.duration?.match(/\d+/)?.[0] || 0);
          const durationB = parseInt(b.duration?.match(/\d+/)?.[0] || 0);
          return durationB - durationA;
        }
        case 'duration-asc': {
          const durationA = parseInt(a.duration?.match(/\d+/)?.[0] || 0);
          const durationB = parseInt(b.duration?.match(/\d+/)?.[0] || 0);
          return durationA - durationB;
        }
        case 'newest':
        default:
          return new Date(b.releaseDate || 0) - new Date(a.releaseDate || 0);
      }
    });

    return result;
  }, [initialMovies, selectedGenres, sortBy, searchQuery]);

  const handleGenreChange = (genre) => {
    setSelectedGenres(prev => 
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const handleClearFilters = () => {
    setSelectedGenres([]);
    setSortBy('newest');
    setSearchQuery('');
  };

  return {
    filteredMovies,
    selectedGenres,
    sortBy,
    searchQuery,
    handleGenreChange,
    handleSortChange,
    handleSearchChange,
    handleClearFilters,
  };
};