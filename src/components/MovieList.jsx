import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";

const MovieList = ({ title, moviesKey, type }) => {
  const movies = useSelector((state) => state.movie[moviesKey]);

  if (!movies?.length) return null;

  return (
    <div className="overflow-hidden px-8 py-4">
      <h1 className="mb-2 text-2xl font-bold text-white">{title}</h1>
      <div className="flex gap-3 overflow-x-auto overflow-y-hidden pb-14 pt-8 scrollbar-none">
        {movies.map((movie, index) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            index={index}
            totalMovies={movies.length}
            type={type}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
