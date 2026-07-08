import { useRef } from "react";
import useAiSearch from "../hooks/useAiSearch";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import {
  setGptMovies,
  setSearchResults,
  setSearchText,
} from "../store/slices/gptSlice";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const searchText = useRef(null);
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

  const handleSearchClick = async () => {
    navigate("search");
    const tmdbSearchResult = await tmdbSearch(searchText.current.value);

    dispatch(setSearchResults(normalizeMovies(tmdbSearchResult)));
    const aiResults = await search(searchText.current.value);

    dispatch(setGptMovies(aiResults));

    dispatch(setSearchText(searchText.current.value));
  };

  return (
    <div className="grid grid-cols-12 gap-2">
      <input
        ref={searchText}
        className="col-span-8 px-4 py-2 text-white placeholder:text-gray-500 rounded-full border border-gray-600 bg-black/50 backdrop-blur-md focus:border-white"
        type="text"
        placeholder="What do you want to watch?"
      />
      <button
        onClick={handleSearchClick}
        className="text-white inline-block rotate-280 text-3xl hover:scale-110 transition-transform duration-200"
      >
        ⌕
      </button>
    </div>
  );
};

export default SearchBar;
