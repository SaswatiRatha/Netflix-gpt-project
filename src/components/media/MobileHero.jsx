import { useDispatch } from "react-redux";
import { openModal } from "../../store/slices/modalSlice";
import { IMG_CDN_URL } from "../../utils/constants";

const MobileHero = ({ movie }) => {
  const dispatch = useDispatch();
  const title = movie.title || movie.name;

  return (
    <div className="flex flex-col relative items-center mx-8 mb-10 mt-1 gap-3 border border-zinc-500 text-center text-white">
      <img
        className="h-140 w-full rounded-lg object-cover shadow-lg"
        src={IMG_CDN_URL + movie.poster_path}
        alt={title}
      />
      <h1 className="absolute bottom-20 text-xl font-bold leading-tight">
        {title}
      </h1>

      <div className="absolute bottom-1 mt-1 pb-6 flex gap-3">
        <button className="w-30 rounded-sm bg-white px-4 py-2 text-sm font-semibold text-black transition-all duration-150 hover:bg-gray-200">
          <span className="mr-1 inline-block rotate-90 text-black">
            &#x25B2;
          </span>
          Play
        </button>
        <button
          onClick={() => dispatch(openModal(movie))}
          className="rounded-sm w-30 bg-gray-600/90 px-4 py-2 text-sm font-semibold text-white transition-all duration-150 hover:bg-gray-700"
        >
          &#9432; More info
        </button>
      </div>
    </div>
  );
};

export default MobileHero;
