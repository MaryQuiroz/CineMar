import { MovieCard } from "./MovieCard";

const MovieGrid = ({ movies, showComingSoon = false }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isComingSoon={showComingSoon}
        />
      ))}
    </div>
  );
};

export default MovieGrid;