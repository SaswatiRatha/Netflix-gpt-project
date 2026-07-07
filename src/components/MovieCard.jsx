import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import useCardTrailer from "../hooks/useCardTrailer";
import MoviePoster from "./MoviePoster";
import TrailerPreview from "./TrailerPreview";

const MovieCard = ({ movie, index, totalMovies, type }) => {
  const [showTrailer, setShowTrailer] = useState(false);
  const { poster_path: posterPath, id: movieId } = movie;
  const title = movie.title || movie.name || "Movie";
  const trailerKey = `${type}:${movieId}`;

  const timer = useRef(null);

  const handleMouseEnter = () => {
    timer.current = setTimeout(() => setShowTrailer(true), 300);
  };

  const handleMouseLeave = () => {
    clearTimeout(timer.current);
    setShowTrailer(false);
  };

  useCardTrailer(showTrailer ? movieId : null, type);
  const trailer = useSelector((state) => state.movie.trailersById[trailerKey]);

  const isLoading = showTrailer && trailer === undefined;
  const isActive = showTrailer && !isLoading;

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative h-60 w-40 shrink-0 cursor-pointer overflow-visible rounded-md transition-all duration-300 ${
        isActive
          ? "z-50 scale-100 shadow-[0_0_0_2px_rgba(255,255,255,0.8),0_20px_45px_rgba(0,0,0,0.65)]"
          : "z-0"
      }`}
    >
      <MoviePoster posterPath={posterPath} />

      <TrailerPreview
        title={title}
        posterPath={posterPath}
        trailer={trailer}
        isActive={isActive}
        index={index}
        totalMovies={totalMovies}
        movie={movie}
      />
    </div>
  );
};

export default MovieCard;
