import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedGenre } from "../../store/slices/mediaSlice";

const GenreDropdown = ({ genres }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedGenre = useSelector((state) => state.media.selectedGenre);
  const dispatch = useDispatch();
  //console.log(genres);
  const genreLength = genres.length;
  console.log(genreLength);

  return (
    <div className="relative flex flex-col">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="mt-2 w-full rounded-md border-2 border-gray-500 bg-zinc-900 px-4 py-2 text-white sm:w-auto text-base"
      >
        {selectedGenre.name}
        <span className="fill-white text-white text-xs ml-2">▼</span>
      </button>
      {isOpen && (
        <div className="absolute grid grid-rows-9 grid-flow-col top-full left-0  mt-1 w-max rounded-md border border-gray-600 bg-zinc-900 shadow-lg z-50">
          <button
            onClick={() => {
              dispatch(setSelectedGenre({ id: 0, name: "Genre" }));
              setIsOpen(false);
            }}
            className="w-full px-4 py-2 text-center text-white hover:bg-gray-700 text-base"
          >
            Genre
          </button>
          {genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => {
                dispatch(setSelectedGenre(genre));
                setIsOpen(false);
              }}
              className=" w-full px-4 py-2 text-center text-white hover:bg-gray-700 text-sm"
            >
              {genre.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default GenreDropdown;
