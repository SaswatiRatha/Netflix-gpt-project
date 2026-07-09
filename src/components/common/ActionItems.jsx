import { useDispatch, useSelector } from "react-redux";
import { addToWatchList } from "../../store/slices/mediaSlice";
import { openModal } from "../../store/slices/modalSlice";
import { useState } from "react";

const ActionItems = ({ movie }) => {
  const [isAddHovered, setIsAddHovered] = useState(false);
  const [isInfoHovered, setIsInfoHovered] = useState(false);
  const watchlist = useSelector((state) => state.media.myList);
  const exists = watchlist.find((item) => item.id === movie.id);
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-3 p-4 cursor-default">
      <button
        title="Where to watch"
        className=" bg-white rounded-full inline-block rotate-90 text-black text-2xl px-3 py-2 pt-1 text-center cursor-pointer align-middle justify-center transition-all duration-150 hover:bg-gray-200 "
      >
        &#x25B2;
      </button>
      <button
        onClick={() => dispatch(addToWatchList(movie))}
        onMouseEnter={() => setIsAddHovered(true)}
        onMouseLeave={() => setIsAddHovered(false)}
        className="relative rounded-full border-2 border-gray-500 hover:border-white text-3xl px-3 pb-2 cursor-pointer text-white"
      >
        {exists ? "✓" : "+"}
      </button>
      {isAddHovered && (
        <>
          <span className="absolute bottom-20 left-8 rounded-xl bg-white text-black p-2">
            {exists ? "Remove from watchlist" : "Add to watchlist"}
          </span>
          <span className="absolute bottom-14 left-20 rounded-xl fill-white  text-white p-2">
            ▼
          </span>
        </>
      )}

      <button
        onMouseEnter={() => setIsInfoHovered(true)}
        onMouseLeave={() => setIsInfoHovered(false)}
        onClick={() => dispatch(openModal(movie))}
        className="rounded-full ml-auto border-2 border-gray-500 hover:border-white text-2xl px-4 py-2 pt-1 cursor-pointer"
      >
        ∨
      </button>
      {isInfoHovered && (
        <>
          <span className="absolute bottom-20 right-1 rounded-xl bg-white text-black p-2">
            More info
          </span>
          <span className="absolute bottom-14 right-7 rounded-xl fill-white  text-white p-2">
            ▼
          </span>
        </>
      )}
    </div>
  );
};

export default ActionItems;
