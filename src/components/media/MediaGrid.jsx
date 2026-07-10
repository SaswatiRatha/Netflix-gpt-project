import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";

const MediaGrid = ({ title, moviesKey, type }) => {
  const movies = useSelector((state) => state.media[moviesKey]);

  if (!movies?.length) return null;

  return (
    <div className="px-4 py-4 sm:px-8">
      <h1 className="mb-4 text-2xl font-bold text-white">{title}</h1>
      <div className="grid grid-cols-3 gap-3 pb-14 overflow-hidden sm:grid-cols-4 sm:gap-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
        {movies.map((movie, index) => (
          <div key={movie.id} className="flex justify-center">
            <MovieCard
              movie={movie}
              index={index}
              totalMovies={movies.length}
              type={type}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaGrid;
