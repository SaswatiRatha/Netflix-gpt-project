import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedGenre,
  setSelectedLanguage,
} from "../../store/slices/mediaSlice";

const Dropdown = ({ value, type }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedGenre = useSelector((state) => state.media.selectedGenre);
  const selectedLanguage = useSelector((state) => state.media.selectedLanguage);
  const dispatch = useDispatch();
  //console.log(genres);

  return (
    <div className="relative flex flex-col justify-center items-center">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center rounded-md border-2 border-gray-500 bg-zinc-900 px-4 py-1 text-white sm:w-auto text-base"
      >
        {type === "genre" ? selectedGenre.name : selectedLanguage.name}
        <span className="fill-white text-white text-xs ml-2">▼</span>
      </button>
      {isOpen && (
        <div className="absolute grid grid-rows-9 grid-flow-col top-full left-0 mt-1 w-max rounded-md border border-gray-600 bg-zinc-900 shadow-lg z-50">
          {type === "genre" && (
            <button
              onClick={() => {
                dispatch(setSelectedGenre({ id: 0, name: "Genre" }));
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-center text-white hover:bg-gray-700 text-base"
            >
              All genre
            </button>
          )}
          {value.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                type === "genre"
                  ? dispatch(setSelectedGenre(item))
                  : dispatch(setSelectedLanguage(item));
                setIsOpen(false);
              }}
              className=" w-full px-4 py-2 text-center text-white hover:bg-gray-700 text-sm"
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
