import { useRef } from "react";
import groq from "../utils/groq";
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
        `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false`,
        API_OPTIONS,
      );
      const json = await data.json();
      //console.log(json.results);
      const filteredMovies = json.results.filter(
        (movie) =>
          movie.original_language === "en" || movie.original_language === "hi",
      );
      //console.log("filtered:", filteredMovies);
      return filteredMovies;
    } catch (error) {
      console.log("Error fetching movies: ", error);
      return [];
    }
  };

  const handleSearchClick = async () => {
    const tmdbSearchResult = await tmdbSearch(searchText.current.value);

    dispatch(setSearchResults(normalizeMovies(tmdbSearchResult)));

    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query: " +
      searchText.current.value +
      ". Only give me names of 10 movies, comma separated like the example result given ahead. Example Result: Elemental, BhootBangla, Housefull, Koi Mil Gaya, Kuch Kuch Hota Hai";

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: gptQuery,
        },
      ],
    });

    const movies = completion.choices[0].message.content
      .split(",")
      .map((movie) => movie.trim());

    const movieResults = [];

    for (const movie of movies) {
      const searchResults = await tmdbSearch(movie);
      const firstMatch = searchResults[0];

      if (firstMatch) {
        movieResults.push(firstMatch);
      }
    }

    console.log(movieResults);

    dispatch(setGptMovies(movieResults));
    dispatch(setSearchText(searchText.current.value));
    navigate("search");
  };

  return (
    <div className="grid grid-cols-12 gap-2">
      <input
        ref={searchText}
        className="col-span-8 rounded-md bg-white px-4 py-2 text-black placeholder:text-gray-500"
        type="text"
        placeholder="What do you want to watch?"
      />
      <button
        onClick={handleSearchClick}
        className="text-white inline-block rotate-280 text-3xl"
      >
        ⌕
      </button>
    </div>
  );
};

export default SearchBar;
