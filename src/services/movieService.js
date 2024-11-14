import i18next from 'i18next';

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;
const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;

if (!API_KEY || !API_URL || !IMAGE_URL) {
  console.error('Missing environment variables. Please check your .env file');
}

const getLanguage = () => {
  const lang = i18next.language;
  switch (lang) {
    case 'ca':
      return 'ca-ES';
    case 'fr':
      return 'fr-FR';
    case 'en':
      return 'en-US';
    default:
      return 'es-ES';
  }
};

export const getImageUrl = (path, size = 'w500') => {
  if (!path) return '/placeholder.jpg';
  return `${IMAGE_URL}/${size}${path}`;
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error en la petición a la API');
  }
  return response.json();
};

export const fetchMovies = async (page = 1) => {
  console.log(page)
  try {
    const response = await fetch(
      `${API_URL}/movie/now_playing?api_key=${API_KEY}&language=${getLanguage()}&page=${page}&region=ES`
    );
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const fetchUpcomingMovies = async (page = 1) => {
  try {
    const response = await fetch(
      `${API_URL}/movie/upcoming?api_key=${API_KEY}&language=${getLanguage()}&page=${page}&region=ES`
    );
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching upcoming movies:', error);
    throw error;
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await fetch(
      `${API_URL}/movie/${movieId}?api_key=${API_KEY}&language=${getLanguage()}`
    );
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await fetch(
      `${API_URL}/search/movie?api_key=${API_KEY}&language=${getLanguage()}&query=${encodeURIComponent(query)}&page=${page}&region=ES`
    );
    return handleResponse(response);
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const fetchMovieVideos = async (movieId) => {
  try {
    const response = await fetch(
      `${API_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=${getLanguage()}`
    );
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching movie videos:', error);
    throw error;
  }
};

export const fetchMovieSessions = async (movieId, date) => {
  // Simulamos una llamada a API con datos estáticos por ahora
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        sessions: [
          { id: 1, time: '16:00', format: '2D', language: 'ESP', seats: 120 },
          { id: 2, time: '18:30', format: '3D', language: 'ESP', seats: 90 },
          { id: 3, time: '19:45', format: '2D', language: 'VOSE', seats: 110 },
          { id: 4, time: '22:00', format: '2D', language: 'ESP', seats: 100 },
          { id: 5, time: '22:30', format: '3D', language: 'ESP', seats: 85 }
        ]
      });
    }, 300);
  });
};

export const fetchMovieGenres = async () => {
  try {
    const response = await fetch(
      `${API_URL}/genre/movie/list?api_key=${API_KEY}&language=${getLanguage()}`
    );
    const data = await handleResponse(response);
    return data.genres;
  } catch (error) {
    console.error('Error fetching movie genres:', error);
    throw error;
  }
};

export const fetchMovieCredits = async (movieId) => {
  try {
    const response = await fetch(
      `${API_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=${getLanguage()}`
    );
    const data = await handleResponse(response);
    // Retornamos el cast del objeto credits
    // Opcionalmente podemos limitar el número de actores retornados
    return {
      cast: data.cast.slice(0, 10), // Limitamos a los primeros 10 actores
      crew: data.crew.filter(person => 
        person.job === "Director" || person.job === "Producer"
      ) // Filtramos solo directores y productores principales
    };
  } catch (error) {
    console.error('Error fetching movie credits:', error);
    throw error;
  }
};