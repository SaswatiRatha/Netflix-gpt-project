import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { setUpcomingMovies } from "../store/slices/movieSlice";
const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const getUpcomingMovies = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=4",
        API_OPTIONS,
      );
      const json = await data.json();
      //console.log(json.results);
      const movies = json.results.map((movie) => ({
        ...movie,
        media_type: "movie",
      }));
      dispatch(setUpcomingMovies(movies));
    } catch (error) {
      console.log("Error fetching popular movies: ", error);
    }
  };

  useEffect(() => {
    getUpcomingMovies();
  }, []);
};

export default useUpcomingMovies;
