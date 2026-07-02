import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  if (!movies) return;

  return (
    <div className="px-8 py-4">
      <h1 className="text-2xl font-bold text-white mb-4">{title}</h1>
      <div className="flex overflow-x-auto overflow-y-visible gap-3 scrollbar-none py-6">
        {movies.map((movie, index) => (
          <MovieCard
            key={movie.id}
            posterPath={movie.poster_path}
            movieId={movie.id}
            index={index}
            totalMovies={movies.length}
            title={movie.title}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
