import { useDispatch } from "react-redux";
import { addToWatchList, openModal } from "../store/slices/movieSlice";

const ActionItems = ({ movie }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center gap-3 p-4 cursor-default">
      <button className=" bg-white rounded-full inline-block rotate-90 text-black text-2xl px-3 py-2 pt-1 text-center cursor-pointer align-middle justify-center transition-all duration-150 hover:bg-gray-200 ">
        &#x25B2;
      </button>
      <button
        onClick={() => dispatch(addToWatchList(movie))}
        className="rounded-full border-2 border-gray-500 hover:border-white text-3xl px-3 pb-2 cursor-pointer"
      >
        +
      </button>
      <button className="rounded-md border-2 border-gray-500 px-4 py-2 text-white cursor-pointer">
        👍
      </button>
      <button
        onClick={() => dispatch(openModal(movie))}
        className="rounded-full ml-auto border-2 border-gray-500 hover:border-white text-2xl px-4 py-2 pt-1 cursor-pointer"
      >
        ∨
      </button>
    </div>
  );
};

export default ActionItems;
