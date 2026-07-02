import { useRef, useState } from "react";
import { IMG_CDN_URL } from "../utils/constants";
import { useSelector } from "react-redux";
import useCardTrailer from "../hooks/useCardTrailer";

const MovieCard = ({ posterPath, movieId }) => {
  const [showTrailer, setShowTrailer] = useState(false);

  const timer = useRef(null);

  const handleMouseEnter = () => {
    timer.current = setTimeout(() => {
      setShowTrailer(true);
    }, 400);
  };

  const handleMouseLeave = () => {
    clearTimeout(timer.current);
    setShowTrailer(false);
  };

  useCardTrailer(showTrailer ? movieId : null);
  const trailer = useSelector((state) => state.movie.cardTrailer[movieId]);
  console.log(trailer);
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="min-w-40 w-40 flex shrink-0 relative group cursor-pointer transition-transform duration-300 ease-in-out hover:scale-200 hover:z-20 hover:shadow-2xl"
    >
      {showTrailer && trailer ? (
        <div className="w-[420px] rounded-xl overflow-hidden bg-zinc-900 shadow-2xl">
          <div className="w-full h-[180px] overflow-hidden">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${trailer?.key}?autoplay=1&mute=1&playsinline=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="absolute scale-50 flex -mt-10 bg-black gap-3 p-2">
            <button className="flex px-4 bg-white text-black">▶ Play</button>

            <button className="bg-gray-100 px-4">+ Add Watchlist</button>

            <button className="flex items-center justify-center">👍</button>
          </div>
        </div>
      ) : (
        <img
          className="w-full h-60 object-fit rounded-md"
          src={IMG_CDN_URL + posterPath}
          alt="moviecard"
        />
      )}
    </div>
  );
};

export default MovieCard;
