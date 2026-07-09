import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addNowPlayingMovies } from "../store/slices/mediaSlice";
const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const getNowPlayingMovies = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?page=1",
        API_OPTIONS,
      );

      const json = await data.json();
      //console.log(json.results);
      const movies = json.results.map((movie) => ({
        ...movie,
        media_type: "movie",
      }));
      dispatch(addNowPlayingMovies(movies));
    } catch (error) {
      console.log("Error fetching now playing movies: ", error);
    }
  };

  useEffect(() => {
    getNowPlayingMovies();
  }, []);
};

export default useNowPlayingMovies;
