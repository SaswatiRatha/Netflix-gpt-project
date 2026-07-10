import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";
//import { useState } from "react";

const MovieList = ({ title, moviesKey, type }) => {
  //const [showMore,setShowMore] = useState(false)
  const movies = useSelector((state) => state.media[moviesKey]);

  if (!movies?.length) return null;

  return (
    <div className="overflow-hidden px-4 py-4 sm:px-8">
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
