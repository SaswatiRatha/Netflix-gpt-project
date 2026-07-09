import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedSeason } from "../../store/slices/modalSlice";

const SeasonDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { seasons, selectedSeason } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  return (
    <div className="relative flex flex-col">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="mt-2 w-full rounded-md border-2 border-gray-500 bg-zinc-900 px-4 py-2 text-white sm:w-auto"
      >
        Season {selectedSeason}{" "}
        <span className="fill-white text-white text-xs ml-2">▼</span>
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-full rounded-md border border-gray-600 bg-zinc-900 shadow-lg z-50">
          {Array.from({ length: seasons }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => {
                dispatch(setSelectedSeason(index + 1));
                setIsOpen(false);
              }}
              className="block w-full px-4 py-2 text-center text-white hover:bg-gray-700"
            >
              Season {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SeasonDropdown;
