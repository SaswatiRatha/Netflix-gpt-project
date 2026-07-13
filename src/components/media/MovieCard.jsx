import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MoviePoster from "./MoviePoster";
import TrailerPreview from "./TrailerPreview";
import useMovieTrailer from "../../hooks/useMovieTrailer";
import useIsMobile from "../../hooks/useIsMobile";
import { openModal } from "../../store/slices/modalSlice";

const MovieCard = ({ movie, variant = "row" }) => {
  const [showTrailer, setShowTrailer] = useState(false);
  const [previewPosition, setPreviewPosition] = useState("center");
  const { poster_path: posterPath, id: movieId } = movie;
  const title = movie.title || movie.name || "Movie";
  const trailerKey = `${movie.media_type}:${movieId}`;
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const timer = useRef(null);
  const cardRef = useRef(null);
  //console.log(movie);
  const sizeClasses =
    variant === "grid"
      ? "aspect-2/3 w-full sm:h-60 sm:w-40"
      : "h-52 w-36 shrink-0 sm:h-60 sm:w-40";

  const handleMouseEnter = () => {
    if (isMobile) return;
    const rect = cardRef.current.getBoundingClientRect();

    const leftSpace = rect.left;
    const rightSpace = window.innerWidth - rect.right;

    if (leftSpace < 180) {
      setPreviewPosition("left");
    } else if (rightSpace < 180) {
      setPreviewPosition("right");
    } else {
      setPreviewPosition("center");
    }

    timer.current = setTimeout(() => setShowTrailer(true), 300);
  };

  const handleMouseLeave = () => {
    clearTimeout(timer.current);
    setShowTrailer(false);
  };
  //console.log(trailerKey);

  const handleCardClick = () => {
    if (isMobile) dispatch(openModal(movie));
  };

  useMovieTrailer(showTrailer && !isMobile ? movieId : null, movie.media_type);
  const trailer = useSelector((state) => state.media.trailersById[trailerKey]);

  const isLoading = showTrailer && trailer === undefined;
  const isActive = showTrailer && !isLoading;

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      className={`relative ${sizeClasses} cursor-pointer overflow-visible rounded-md transition-all duration-300 ${
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
        previewPosition={previewPosition}
        movie={movie}
      />
    </div>
  );
};

export default MovieCard;
