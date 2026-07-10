import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import { useRef } from "react";
//import { useState } from "react";

const MovieList = ({ title, moviesKey, type }) => {
  //const [showMore,setShowMore] = useState(false)
  const sliderRef = useRef(null);
  const movies = useSelector((state) => state.media[moviesKey]);

  if (!movies?.length) return null;

  const scrollLeft = () => {
    sliderRef.current.scrollBy({
      left: -800,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: 800,
      behavior: "smooth",
    });
  };

  return (
    <div className="overflow-hidden px-4 py-4 sm:px-8">
      <h1 className="mb-2 text-2xl font-bold text-white">{title}</h1>
      <div className="relative group">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10
                   hidden group-hover:flex items-center justify-center
                   h-full w-14 bg-black/50 text-white text-4xl"
        >
          ❮
        </button>
        <div
          ref={sliderRef}
          className="flex gap-3 overflow-x-auto overflow-y-hidden scrollbar-none"
        >
          {movies.map((movie, index) =>
            movie.poster_path ? (
              <MovieCard
                key={movie.id}
                movie={movie}
                index={index}
                totalMovies={movies.length}
                type={type}
              />
            ) : (
              ""
            ),
          )}
        </div>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10
                   hidden group-hover:flex items-center justify-center
                   h-full w-14 bg-black/50 text-white text-4xl"
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default MovieList;
