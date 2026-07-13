import { useEffect, useRef, useState } from "react";
import {
  setGptMovies,
  setSearchResults,
  setSearchText,
} from "../store/slices/gptSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAiSearch from "./useAiSearch";
import { API_OPTIONS } from "../utils/constants";

const useSearchMedia = () => {
  const [searchWord, setSearchWord] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useAiSearch();
  const finalWord = useRef("");
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
  const hasTypedRef = useRef(false);

  useEffect(() => {
    if (searchWord) hasTypedRef.current = true;
    if (!searchWord && !hasTypedRef.current) return;

    const timer = setTimeout(() => {
      searchMedia(searchWord);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchWord]);
  return { searchWord, handleInputChange };
};

export default useSearchMedia;
