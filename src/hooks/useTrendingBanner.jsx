import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import {
  setTrending,
  setTrendingMovie,
  setTrendingTV,
} from "../store/slices/mediaSlice";
const useTrendingBanner = () => {
  const dispatch = useDispatch();
  const getTrending = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/trending/all/day?language=en-US",
        API_OPTIONS,
      );
      const json = await data.json();
      //console.log(json.results);
      dispatch(setTrending(json.results));
      const movie = json.results.filter(
        (movie) => movie.media_type === "movie",
      );
      dispatch(setTrendingMovie(movie));
      //console.log(movie);

      const tv = json.results.filter((tv) => tv.media_type === "tv");
      dispatch(setTrendingTV(tv));
      //console.log(tv);
    } catch (error) {
      console.log("Error fetching trendoing today: ", error);
    }
  };

  useEffect(() => {
    getTrending();
  }, []);
};

export default useTrendingBanner;
