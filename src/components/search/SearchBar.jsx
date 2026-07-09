import { useEffect, useRef, useState } from "react";
import useAiSearch from "../../hooks/useAiSearch";
import { API_OPTIONS } from "../../utils/constants";
import { useDispatch } from "react-redux";
import {
  setGptMovies,
  setSearchResults,
  setSearchText,
} from "../../store/slices/gptSlice";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const finalWord = useRef("");
  const inputFocus = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useAiSearch();

  const normalizeMovies = (results = []) => {
    const flattenedResults = results.flat().filter(Boolean);
    const uniqueMovies = [];
    const seenMovieIds = new Set();

    flattenedResults.forEach((movie) => {
      if (movie?.id && !seenMovieIds.has(movie.id)) {
        seenMovieIds.add(movie.id);
        uniqueMovies.push(movie);
      }
    });

    return uniqueMovies;
  };

  const tmdbSearch = async (movie) => {
    console.log("checking tmdb");

    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/search/multi?query=${movie}&include_adult=false`,
        API_OPTIONS,
      );
      const json = await data.json();
      //console.log(json.results);
      const filteredMovies = json.results.filter(
        (item) =>
          (item.media_type === "movie" || item.media_type === "tv") &&
          (item.original_language === "en" || item.original_language === "hi"),
      );
      //console.log("filtered:", filteredMovies);
      return filteredMovies;
    } catch (error) {
      console.log("Error fetching movies: ", error);
      return [];
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchWord(value);
    dispatch(setSearchText(value));
  };

  const searchMedia = async (value) => {
    finalWord.current = value;
    if (!value.trim()) {
      dispatch(setSearchResults([]));
      dispatch(setGptMovies([]));
      navigate("/browse");
      return;
    }
    navigate("/search");
    const [tmdbSearchResult, aiResults] = await Promise.all([
      tmdbSearch(value),
      search(value),
    ]);
    if (finalWord.current !== value) return;
    dispatch(setSearchResults(normalizeMovies(tmdbSearchResult)));
    dispatch(setGptMovies(aiResults));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      searchMedia(searchWord);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchWord]);

  useEffect(() => {
    if (showSearchBar) {
      inputFocus.current?.focus();
    }
  }, [showSearchBar]);

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
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
      ${showSearchBar ? "w-64 opacity-100" : "w-0 opacity-0 border-0 px-0"}
    `}
          placeholder="What do you want to watch?"
        />
        {showSearchBar && (
          <button
            onClick={() => setShowSearchBar((prev) => !prev)}
            className="absolute right-3 top-4 -translate-y-1/2 col-span-1 items-center justify-center text-white inline-block text-2xl hover:scale-110 transition-transform duration-200 sm:col-span-1"
          >
            x
          </button>
        )}
      </div>

      <button
        onClick={() => setShowSearchBar((prev) => !prev)}
        className="col-span-1 items-center justify-center text-white inline-block rotate-280 text-3xl hover:scale-110 transition-transform duration-200 sm:col-span-1"
      >
        ⌕
      </button>
    </div>
  );
};

export default SearchBar;
