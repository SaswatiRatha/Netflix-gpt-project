import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSearchMedia from "../../hooks/useSearchMedia";

const SearchBar = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const navigate = useNavigate();

  const inputFocus = useRef(null);
  const { searchWord, handleInputChange } = useSearchMedia();
  const handleIconClick = () => {
    const isMobile = window.innerWidth < 640;
    if (isMobile) {
      navigate("/search");
      return;
    }
    setShowSearchBar((prev) => !prev);
  };

  useEffect(() => {
    if (showSearchBar) {
      inputFocus.current?.focus();
    }
  }, [showSearchBar]);

  return (
    <div className={`flex  items-center gap-2`}>
      <div className="relative hidden sm:block w-screen px-4 pr-8 sm:w-auto sm:px-2">
        <input
          ref={inputFocus}
          value={searchWord}
          onChange={handleInputChange}
          className={`
    bg-black/80
    text-white
    rounded
    border
    border-gray-500
    transition-all
    duration-300
    outline-none
    p-2
    text-sm sm:text-base
    
    ${
      showSearchBar
        ? "w-full sm:w-64 opacity-100"
        : "w-0 opacity-0 border-0 px-0"
    }
  `}
          placeholder="What do you want to watch?"
        />
        {showSearchBar && (
          <button
            onClick={() => setShowSearchBar((prev) => !prev)}
            className="absolute md:right-3 right-7 top-4 -translate-y-1/2 col-span-1 items-center justify-center text-white inline-block text-2xl hover:scale-110 transition-transform duration-200 md:col-span-1"
          >
            x
          </button>
        )}
      </div>

      <button
        onClick={handleIconClick}
        className="col-span-1 items-center justify-center text-white inline-block rotate-280 text-3xl hover:scale-110 transition-transform duration-200 sm:col-span-1"
      >
        ⌕
      </button>
    </div>
  );
};

export default SearchBar;
