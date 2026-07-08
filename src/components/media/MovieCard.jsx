import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import MoviePoster from "./MoviePoster";
import TrailerPreview from "./TrailerPreview";
import useMovieTrailer from "../../hooks/useMovieTrailer";

const MovieCard = ({ movie, index, totalMovies }) => {
  const [showTrailer, setShowTrailer] = useState(false);
  const { poster_path: posterPath, id: movieId } = movie;
  const title = movie.title || movie.name || "Movie";
  const trailerKey = `${movie.media_type}:${movieId}`;

  const timer = useRef(null);
  //console.log(movie);

  const handleMouseEnter = () => {
    timer.current = setTimeout(() => setShowTrailer(true), 300);
  };

  const handleMouseLeave = () => {
    clearTimeout(timer.current);
    setShowTrailer(false);
  };
  //console.log(trailerKey);

  useMovieTrailer(showTrailer ? movieId : null, movie.media_type);
  const trailer = useSelector((state) => state.movie.trailersById[trailerKey]);

  const isLoading = showTrailer && trailer === undefined;
  const isActive = showTrailer && !isLoading;

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative h-52 w-36 shrink-0 cursor-pointer overflow-visible rounded-md transition-all duration-300 sm:h-60 sm:w-40 ${
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
