import { useRef, useState } from "react";
import { IMG_CDN_URL } from "../utils/constants";
import { useSelector } from "react-redux";
import useCardTrailer from "../hooks/useCardTrailer";

const MovieCard = ({ posterPath, movieId, index, totalMovies, title }) => {
  const [showTrailer, setShowTrailer] = useState(false);
  const previewPosition =
    index === 0
      ? "left-0"
      : index === totalMovies - 1
        ? "right-0"
        : "left-1/2 -translate-x-1/2";

  const timer = useRef(null);

  const handleMouseEnter = () => {
    timer.current = setTimeout(() => setShowTrailer(true), 400);
  };

  const handleMouseLeave = () => {
    clearTimeout(timer.current);
    setShowTrailer(false);
  };

  useCardTrailer(showTrailer ? movieId : null);
  const trailer = useSelector((state) => state.movie.cardTrailer[movieId]);

  const isLoading = showTrailer && trailer === undefined;
  const isActive = showTrailer && !isLoading; // popup shows once fetch settles, trailer or not

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative w-40 h-60 shrink-0 cursor-pointer transition-[z-index] ${
        isActive ? "z-50" : "z-0"
      }`}
    >
      <img
        className="w-full h-full object-cover rounded-md"
        src={IMG_CDN_URL + posterPath}
        alt="moviecard"
      />

      <div
        className={`absolute top-1/2 ${previewPosition}
          w-[420px] rounded-3xl overflow-hidden bg-zinc-900 shadow-2xl
          transition-all duration-300 ease-out
          ${
            isActive
              ? "opacity-100 scale-100 translate-y-[-50%] pointer-events-auto"
              : "opacity-0 scale-90 translate-y-[-40%] pointer-events-none"
          }`}
      >
        <div className="aspect-video bg-black">
          {isActive &&
            (trailer ? (
              <>
                <iframe
                  className="w-full h-full pointer-events-none"
                  src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&playsinline=1&controls=0&disablekb=1&modestbranding=1&rel=0&iv_load_policy=3&fs=0&showinfo=0`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <p className="absolute font-bold text-3xl text-white bg-linear-30 from-black -mt-16 w-full h-16 px-2">
                  {title}
                </p>
              </>
            ) : (
              <img
                className="w-full h-full object-cover"
                src={IMG_CDN_URL + posterPath}
                alt="moviecard"
              />
            ))}
        </div>
        <div className="flex items-center gap-3 p-4">
          <button className="flex px-6 py-2 bg-white text-black rounded-md">
            Play
          </button>
          <button className="bg-gray-100 px-4 py-2 rounded-md">
            + Add Watchlist
          </button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded-md">
            👍
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
